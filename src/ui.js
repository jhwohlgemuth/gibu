import {join, parse, relative, resolve} from 'path';
import {promisify} from 'util';
import {readdir, readFile, stat, writeFile} from 'fs-extra';
import React, {Fragment, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {play} from 'figures';
import clipboard from 'clipboardy';
import {AppContext, Box, Color, Text, useInput} from 'ink';
import TextInput from 'ink-text-input';

const getFileContent = promisify(readFile);
const getDirectoryContent = promisify(readdir);
const writeContent = promisify(writeFile);
const getStat = promisify(stat);
const {min, max} = Math;

const createFormatter = (base, current, options) => {
    const {
        removeExtension,
        filenameOnly,
    } = options;
    return value => [].concat(
        removeExtension ? it => parse(it).name : [],
        filenameOnly ? [] : it => join(resolve(base, current), it)
    ).reduce((result, fn) => fn(result), value);
};

export const HighlightedText = ({children, bold, re}) => {
    const [match] = children.match(re) || [];
    const start = match ? children.indexOf(match) : 0;
    const {length} = match || children;
    return match === '' ? <Color dim bold={bold}>{children}</Color> : <Box>
        <Color dim bold={bold}>{children.substring(0, start)}</Color>
        <Color bold cyan>{match}</Color>
        <Color dim bold={bold}>{children.substring(start + length)}</Color>
    </Box>;
};
export const SearchInput = ({value, path, onChange}) => <Box marginBottom={1} marginTop={1}>
    <Color dim>{path}/</Color>
    <Color bold cyan>
        <TextInput value={value} onChange={onChange}/>
    </Color>
</Box>;
export const CompleteMessage = ({value, copyFileContent = false, outputFileName = ''}) => {
    const copyMessage = copyFileContent ? <Color bold cyan> {value} content </Color> : <Color bold cyan> &ldquo;{value}&rdquo; </Color>;
    return <Box marginBottom={1}>
        <Box paddingLeft={2}>
            {outputFileName ?
                <Fragment>
                    <Color>↳ Saved</Color>
                    <Color bold cyan> {value}</Color><Color> to {process.cwd()}/</Color>
                    <Color bold cyan>{outputFileName}</Color>
                </Fragment> :
                <Fragment>
                    <Color>↳ Copied</Color>{copyMessage}<Color>to clipboard!</Color>
                </Fragment>}
        </Box>
    </Box>;
};
export const Main = ({flags, input, stdin}) => {
    const [folderPath = process.cwd()] = input;
    const {
        limit,
        removeExtension,
        content: copyFileContent,
        output: outputFileName
    } = flags;
    const {exit} = useContext(AppContext);
    const basePath = resolve(folderPath);
    const [currentDirectory, setCurrentDirectory] = useState(basePath);
    const [query, setQuery] = useState('');
    const [items, setItems] = useState([]);
    const [initialItems, setInitialItems] = useState([]);
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState(undefined);
    const [error, setError] = useState(undefined);
    const reset = () => {
        setQuery('');
        setItems(initialItems);
        setIndex(0);
    };
    const inputHandler = value => {
        const BAD_CHARACTERS = ['[', ']', '(', ')', '\\', '*', '+', '?'];
        const isValidInput = value => BAD_CHARACTERS.every(character => !value.startsWith(character)) && !value.includes('\t');
        if (isValidInput(value)) {
            let re;
            try {
                re = new RegExp(value);
            } catch (e) {
                setError({message: 'Invalid regular expression'});
                reset();
            }
            if (re) {
                setError(undefined);
                setQuery(value);
                setItems(initialItems.filter(item => re.test(item)));
            }
        }
        index > items.length && setIndex(items.length - 1);
    };
    useEffect(() => {
        async function getContent() {
            const content = await getDirectoryContent(basePath);
            setItems(content);
            setInitialItems(content);
        }
        getContent();
    }, []);
    stdin || useInput(async (input, key) => {
        const isTab = (input, key) => input === 'i' && key.ctrl;
        const format = createFormatter(basePath, currentDirectory, flags);
        if (key.return) {
            const input = items[index];
            const nextPath = join(currentDirectory, input);
            if ((await getStat(nextPath)).isDirectory()) {
                const updatedContent = await getDirectoryContent(nextPath);
                setCurrentDirectory(nextPath);
                setQuery('');
                setItems(updatedContent);
                setInitialItems(updatedContent);
                setIndex(0);
            } else {
                if (copyFileContent && removeExtension) {
                    setError({message: 'Cannot use --remove-extension/-r AND --content/-c options at the same time!'});
                } else {
                    const output = format(input);
                    try {
                        const results = (copyFileContent || outputFileName) ? await getFileContent(output, 'utf8') : output;
                        await clipboard.write(results);
                        outputFileName && writeContent(outputFileName, results);
                    } catch (e) {
                        setError(e);
                    }
                    setSelected(output);
                }
                exit();
            }
        }
        if (isTab(input, key)) {
            setIndex(index + 1 === items.length ? 0 : index + 1);
        }
        if (key.downArrow) {
            setIndex(min(index + 1, items.length - 1));
        }
        if (key.upArrow) {
            const {length} = items;
            setIndex(index > length ? length - 1 : max(index - 1, 0));
        }
    });
    return stdin ? <Color dim>handle input from stdin...</Color> : <Fragment>
        {error && <Box margin={1} flexDirection='row'><Color red>ERROR: </Color><Text>{error.message}</Text></Box>}
        {selected ?
            error || <CompleteMessage value={selected} copyFileContent={copyFileContent} outputFileName={outputFileName}/> :
            <Box flexDirection={'column'}>
                <SearchInput value={query} path={currentDirectory} onChange={inputHandler}/>
                {items.slice(0, limit).map((item, i) => <Box key={i} marginLeft={1}>
                    {i === index ? <Color bold cyan>{play} </Color> : <Color>  </Color>}
                    <HighlightedText re={query} bold={index === i}>{item}</HighlightedText>
                </Box>)}
                {items.length > limit && <Box marginLeft={1}><Color dim>  ...</Color></Box>}
            </Box>}
    </Fragment>;
};
HighlightedText.propTypes = {
    children: PropTypes.node,
    bold: PropTypes.bool,
    re: PropTypes.string
};
SearchInput.propTypes = {
    value: PropTypes.string,
    path: PropTypes.string,
    onChange: PropTypes.func
};
CompleteMessage.propTypes = {
    copyFileContent: PropTypes.bool,
    outputFileName: PropTypes.string,
    value: PropTypes.string
};
Main.propTypes = {
    flags: PropTypes.object,
    input: PropTypes.array,
    stdin: PropTypes.string
};
export default Main;