import React from 'react';
import {render} from 'ink-testing-library';
import {CompleteMessage, HighlightedText, SearchInput} from '../src/ui';

describe('CompleteMessage component', () => {
    const value = 'some.file.name';
    const ORIGINAL_CWD = process.cwd;
    beforeAll(() => {
        process.cwd = () => 'path/to';
    });
    afterAll(() => {
        process.cwd = ORIGINAL_CWD;
    });
    test('can render message for file name copies (default)', () => {
        const {lastFrame} = render(<CompleteMessage value={value}/>);
        expect(lastFrame()).toMatchSnapshot();
    });
    test('can render message for content copies', () => {
        const {lastFrame} = render(<CompleteMessage value={value} copyFileContent={true}/>);
        expect(lastFrame()).toMatchSnapshot();
    });
    test('can render message for file saves', () => {
        const outputFileName = 'foo.txt';
        const {lastFrame} = render(<CompleteMessage value={value} outputFileName={outputFileName}/>);
        expect(lastFrame()).toMatchSnapshot();
    });
});
describe('HighlightedText component', () => {
    test('can render highlighted text (start of string)', () => {
        const re = 'foo';
        const item = 'foobar';
        const bold = false; // not selected
        const {lastFrame} = render(<HighlightedText re={re} bold={bold}>{item}</HighlightedText>);
        expect(lastFrame()).toMatchSnapshot();
    });
    test('can render highlighted text (middle of string)', () => {
        const re = 'bar';
        const item = 'foobarbaz';
        const bold = false; // not selected
        const {lastFrame} = render(<HighlightedText re={re} bold={bold}>{item}</HighlightedText>);
        expect(lastFrame()).toMatchSnapshot();
    });
    test('can render highlighted text (selected)', () => {
        const re = 'foo';
        const item = 'foobar';
        const bold = true; // selected
        const {lastFrame} = render(<HighlightedText re={re} bold={bold}>{item}</HighlightedText>);
        expect(lastFrame()).toMatchSnapshot();
    });
    test('can render highlighted text (empty query)', () => {
        const re = '';
        const item = 'barbaz';
        const bold = true; // selected
        const {lastFrame} = render(<HighlightedText re={re} bold={bold}>{item}</HighlightedText>);
        expect(lastFrame()).toMatchSnapshot();
    });
    test('can render highlighted text (no match)', () => {
        const re = 'foo';
        const item = 'barbaz';
        const bold = true; // selected
        const {lastFrame} = render(<HighlightedText re={re} bold={bold}>{item}</HighlightedText>);
        expect(lastFrame()).toMatchSnapshot();
    });
});
describe('SearchInput component', () => {
    test('can render input', () => {
        const path = '/path/to/some/directory';
        const value = 'foobar';
        const onChange = jest.fn();
        const {lastFrame} = render(<SearchInput path={path} value={value} onChange={onChange}/>);
        expect(lastFrame()).toMatchSnapshot();
    });
});