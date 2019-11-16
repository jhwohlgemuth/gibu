"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard"),_interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");require("core-js/modules/es.array.includes"),require("core-js/modules/es.array.iterator"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.Main=exports.CompleteMessage=exports.SearchInput=exports.HighlightedText=void 0;var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_path=require("path"),_util=require("util"),_fsExtra=require("fs-extra"),_react=_interopRequireWildcard(require("react")),_propTypes=_interopRequireDefault(require("prop-types")),_figures=require("figures"),_clipboardy=_interopRequireDefault(require("clipboardy")),_ink=require("ink"),_inkTextInput=_interopRequireDefault(require("ink-text-input"));const getFileContent=(0,_util.promisify)(_fsExtra.readFile),getDirectoryContent=(0,_util.promisify)(_fsExtra.readdir),writeContent=(0,_util.promisify)(_fsExtra.writeFile),getStat=(0,_util.promisify)(_fsExtra.stat),{min,max}=Math,createFormatter=(a,b,c)=>{const{removeExtension:d,filenameOnly:e}=c;return c=>[].concat(d?a=>(0,_path.parse)(a).name:[],e?[]:c=>(0,_path.join)((0,_path.resolve)(a,b),c)).reduce((a,b)=>b(a),c)},HighlightedText=({children:a,bold:b,re:c})=>{const[d]=a.match(c)||[],e=d?a.indexOf(d):0,{length:f}=d||a;return""===d?_react.default.createElement(_ink.Color,{dim:!0,bold:b},a):_react.default.createElement(_ink.Box,null,_react.default.createElement(_ink.Color,{dim:!0,bold:b},a.substring(0,e)),_react.default.createElement(_ink.Color,{bold:!0,cyan:!0},d),_react.default.createElement(_ink.Color,{dim:!0,bold:b},a.substring(e+f)))};exports.HighlightedText=HighlightedText;const SearchInput=({value:a,path:b,onChange:c})=>_react.default.createElement(_ink.Box,{marginBottom:1,marginTop:1},_react.default.createElement(_ink.Color,{dim:!0},b,"/"),_react.default.createElement(_ink.Color,{bold:!0,cyan:!0},_react.default.createElement(_inkTextInput.default,{value:a,onChange:c})));exports.SearchInput=SearchInput;const CompleteMessage=({value:a,copyFileContent:b=!1,outputFileName:c=""})=>{const d=b?_react.default.createElement(_ink.Color,{bold:!0,cyan:!0}," ",a," content "):_react.default.createElement(_ink.Color,{bold:!0,cyan:!0}," \u201C",a,"\u201D ");return _react.default.createElement(_ink.Box,{marginBottom:1},_react.default.createElement(_ink.Box,{paddingLeft:2},c?_react.default.createElement(_react.Fragment,null,_react.default.createElement(_ink.Color,null,"\u21B3 Saved"),_react.default.createElement(_ink.Color,{bold:!0,cyan:!0}," ",a),_react.default.createElement(_ink.Color,null," to ",process.cwd(),"/"),_react.default.createElement(_ink.Color,{bold:!0,cyan:!0},c)):_react.default.createElement(_react.Fragment,null,_react.default.createElement(_ink.Color,null,"\u21B3 Copied"),d,_react.default.createElement(_ink.Color,null,"to clipboard!"))))};exports.CompleteMessage=CompleteMessage;const Main=({flags:a,input:b,stdin:c})=>{const[d=process.cwd()]=b,{limit:e,removeExtension:f,content:g,output:h}=a,{exit:i}=(0,_react.useContext)(_ink.AppContext),j=(0,_path.resolve)(d),[k,l]=(0,_react.useState)(j),[m,n]=(0,_react.useState)(""),[o,p]=(0,_react.useState)([]),[q,r]=(0,_react.useState)([]),[s,t]=(0,_react.useState)(0),[u,v]=(0,_react.useState)(void 0),[w,x]=(0,_react.useState)(void 0),y=()=>{n(""),p(q),t(0)};return(0,_react.useEffect)(()=>{function a(){return b.apply(this,arguments)}function b(){return b=(0,_asyncToGenerator2.default)(function*(){const a=yield getDirectoryContent(j);p(a),r(a)}),b.apply(this,arguments)}a()},[]),c||(0,_ink.useInput)(/*#__PURE__*/function(){var b=(0,_asyncToGenerator2.default)(function*(b,c){const d=createFormatter(j,k,a);if(c.return){const a=o[s],b=(0,_path.join)(k,a);if((yield getStat(b)).isDirectory()){const a=yield getDirectoryContent(b);l(b),n(""),p(a),r(a),t(0)}else{if(g&&f)x({message:"Cannot use --remove-extension/-r AND --content/-c options at the same time!"});else{const b=d(a);try{const a=g||h?yield getFileContent(b,"utf8"):b;yield _clipboardy.default.write(a),h&&writeContent(h,a)}catch(a){x(a)}v(b)}i()}}if(((a,b)=>"i"===a&&b.ctrl)(b,c)&&t(s+1===o.length?0:s+1),c.downArrow&&t(min(s+1,o.length-1)),c.upArrow){const{length:a}=o;t(s>a?a-1:max(s-1,0))}});return function(){return b.apply(this,arguments)}}()),c?_react.default.createElement(_ink.Color,{dim:!0},"handle input from stdin..."):_react.default.createElement(_react.Fragment,null,w&&_react.default.createElement(_ink.Box,{margin:1,flexDirection:"row"},_react.default.createElement(_ink.Color,{red:!0},"ERROR: "),_react.default.createElement(_ink.Text,null,w.message)),u?w||_react.default.createElement(CompleteMessage,{value:u,copyFileContent:g,outputFileName:h}):_react.default.createElement(_ink.Box,{flexDirection:"column"},_react.default.createElement(SearchInput,{value:m,path:k,onChange:a=>{const b=["[","]","(",")","\\","*","+","?"];if((a=>b.every(b=>!a.startsWith(b))&&!a.includes("\t"))(a)){let b;try{b=new RegExp(a)}catch(a){x({message:"Invalid regular expression"}),y()}b&&(x(void 0),n(a),p(q.filter(a=>b.test(a))))}s>o.length&&t(o.length-1)}}),o.slice(0,e).map((a,b)=>_react.default.createElement(_ink.Box,{key:b,marginLeft:1},b===s?_react.default.createElement(_ink.Color,{bold:!0,cyan:!0},_figures.play," "):_react.default.createElement(_ink.Color,null,"  "),_react.default.createElement(HighlightedText,{re:m,bold:s===b},a))),o.length>e&&_react.default.createElement(_ink.Box,{marginLeft:1},_react.default.createElement(_ink.Color,{dim:!0},"  ..."))))};exports.Main=Main,HighlightedText.propTypes={children:_propTypes.default.node,bold:_propTypes.default.bool,re:_propTypes.default.string},SearchInput.propTypes={value:_propTypes.default.string,path:_propTypes.default.string,onChange:_propTypes.default.func},CompleteMessage.propTypes={copyFileContent:_propTypes.default.bool,outputFileName:_propTypes.default.string,value:_propTypes.default.string},Main.propTypes={flags:_propTypes.default.object,input:_propTypes.default.array,stdin:_propTypes.default.string};var _default=Main;exports.default=_default;