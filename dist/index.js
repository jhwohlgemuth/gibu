#!/usr/bin/env node
"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_path=require("path"),_react=_interopRequireDefault(require("react")),_chalk=require("chalk"),_meow=_interopRequireDefault(require("meow")),_getStdin=_interopRequireDefault(require("get-stdin")),_readPkg=_interopRequireDefault(require("read-pkg")),_ink=require("ink"),_ui=_interopRequireDefault(require("./ui"));// import reopenTTY from 'reopen-tty';
const showVersion=()=>{const a=(0,_path.join)(__dirname,".."),{version:b}=_readPkg.default.sync({cwd:a});// eslint-disable-line no-console
console.log(b),process.exit()},help=`
    ${_chalk.dim.bold("Usage")}

        ${(0,_chalk.cyan)(">")} gibu [path/to/folder] [options]

    ${_chalk.dim.bold("Options")}

        --absolute          -a  Copy absolute path for file [Default: false]
        --content           -c  Copy file content instead of file name [Default: false]
        --debug             -d  Show debug data [Default: false]
        --filename-only     -f  Copy only filename, not the entire path [Default: false]
        --help              -h  Shoq this help message
        --ignore-warnings,  -i  Ignore warning messages [Default: false]
        --limit             -l  Set maximum number of items to be shown at once [Default: 30]
        --output            -o  Choose output file to save clipboard content to [Default: '']
        --remove-extension  -r  Remove file extension from returned string [Default: false]
        --version,          -v  Print version

    ${_chalk.dim.bold("Options")}

        ${(0,_chalk.dim)("Copy the NSE script name for use with \"nmap $IP --script <paste here>\"")}
        ${(0,_chalk.cyan)(">")} gibu /usr/share/nmap/scripts --remove-extension

        ${(0,_chalk.dim)("Copy path to wordlist for use with hydra, medusa, gobuster, etc...")}
        ${(0,_chalk.cyan)(">")} gibu /usr/share/wordlist --absolute

        ${(0,_chalk.dim)("Copy exploit content to clipboard")}
        ${(0,_chalk.cyan)(">")} gibu /usr/share/exploitdb/exploits --content


`,options={help,flags:{absolute:{type:"boolean",default:!1,alias:"a"},content:{type:"boolean",default:!1,alias:"c"},debug:{type:"boolean",default:!1,alias:"d"},filenameOnly:{type:"boolean",default:!1,alias:"f"},help:{type:"boolean",default:!1,alias:"h"},ignoreWarnings:{type:"boolean",default:!1,alias:"i"},limit:{type:"number",default:40,alias:"l"},output:{type:"string",default:"",alias:"o"},removeExtension:{type:"boolean",default:!1,alias:"r"},version:{type:"boolean",default:!1,alias:"v"}}};(0,_asyncToGenerator2.default)(function*(){const a=yield(0,_getStdin.default)(),{input:b,flags:c}=(0,_meow.default)(options);// const foo = await getFileContent('.editorconfig', 'utf8');
// console.log(foo);
("version"===b[0]||c.version)&&showVersion(),(0,_ink.render)(_react.default.createElement(_ui.default,{flags:c,input:b,stdin:a}),{exitOnCtrlC:!0})})();var _default={};exports.default=_default;