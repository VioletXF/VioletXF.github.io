(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[691],{84058:function(e,t,n){"use strict";var r=n(64836);t.__esModule=!0;var o={Link:!0,withIntl:!0,navigate:!0,changeLocale:!0,IntlContextProvider:!0,IntlContextConsumer:!0};t.withIntl=t.navigate=t.changeLocale=t.Link=t.IntlContextProvider=t.IntlContextConsumer=void 0;var a=n(46384);Object.keys(a).forEach((function(e){"default"!==e&&"__esModule"!==e&&(Object.prototype.hasOwnProperty.call(o,e)||e in t&&t[e]===a[e]||(t[e]=a[e]))}));var l=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=u(t);if(n&&n.has(e))return n.get(e);var r={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var l=o?Object.getOwnPropertyDescriptor(e,a):null;l&&(l.get||l.set)?Object.defineProperty(r,a,l):r[a]=e[a]}r.default=e,n&&n.set(e,r);return r}(n(59029));t.Link=l.default,t.navigate=l.navigate,t.changeLocale=l.changeLocale;var i=r(n(99982));t.withIntl=i.default;var s=n(66971);function u(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(u=function(e){return e?n:t})(e)}t.IntlContextProvider=s.IntlContextProvider,t.IntlContextConsumer=s.IntlContextConsumer},59029:function(e,t,n){"use strict";var r=n(64836);t.__esModule=!0,t.navigate=t.default=t.changeLocale=void 0;var o=r(n(10434)),a=r(n(7071)),l=r(n(67294)),i=r(n(45697)),s=n(11883),u=n(66971),c=["to","language","children","onClick"],d=l.default.forwardRef((function(e,t){var n=e.to,r=e.language,i=e.children,d=e.onClick,f=(0,a.default)(e,c);return l.default.createElement(u.IntlContextConsumer,null,(function(e){var a=r||e.language,u=e.routed||r?"/"+a+n:""+n;return l.default.createElement(s.Link,(0,o.default)({},f,{to:u,onClick:function(e){r&&localStorage.setItem("gatsby-intl-language",r),d&&d(e)},ref:t}),i)}))}));d.propTypes={children:i.default.node.isRequired,to:i.default.string,language:i.default.string},d.defaultProps={to:""};var f=d;t.default=f;t.navigate=function(e,t){if("undefined"!=typeof window){var n=window.___gatsbyIntl,r=n.language,o=n.routed?"/"+r+e:""+e;(0,s.navigate)(o,t)}};t.changeLocale=function(e,t){if("undefined"!=typeof window){var n=window.___gatsbyIntl.routed,r="/"+e+(t||function(e){if(!n)return e;var t=e.indexOf("/",1);return e.substring(t)}(window.location.pathname))+window.location.search;localStorage.setItem("gatsby-intl-language",e),(0,s.navigate)(r)}}},99982:function(e,t,n){"use strict";var r=n(64836);t.__esModule=!0,t.default=void 0;var o=r(n(67294)),a=n(46384);t.default=function(e){return function(t){return console.warn("withIntl is deprecated. Please use injectIntl instead."),o.default.createElement((0,a.injectIntl)(e),t)}}},37200:function(e,t,n){"use strict";n.r(t),n.d(t,{Head:function(){return d}});var r=n(11883),o=n(7464),a=n(24842),l=n(4001),i=n(84058),s=n(10294),u=n(27477),c=n(85893);t.default=function(e){var t;let{data:n,location:l}=e;const d=(null===(t=n.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",f=(0,i.useIntl)().locale,g=n.allMarkdownRemark.nodes.filter((e=>e.frontmatter.lang===f));return n.allMarkdownRemark.nodes.forEach((e=>{if(e.frontmatter.lang!==f&&("en"===e.frontmatter.lang||!e.frontmatter.lang)){const t=e=>e.replace(/^\/.*?\//,"");g.find((n=>t(n.fields.slug)===t(e.fields.slug)))||g.push(e)}})),g.sort(((e,t)=>new Date(t.frontmatter.date).getTime()-new Date(e.frontmatter.date).getTime())),0===g.length?(0,c.jsxs)(a.Z,{location:l,title:d,children:[(0,c.jsx)(o.Z,{}),(0,c.jsx)("p",{children:'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).'})]}):(0,c.jsxs)(a.Z,{location:l,title:d,children:[(0,c.jsx)(o.Z,{}),(0,c.jsx)(u.W,{}),(0,c.jsx)("ol",{style:{listStyle:"none"},children:g.map((e=>{const t=e.frontmatter.title||e.fields.slug;return(0,c.jsx)("li",{children:(0,c.jsxs)("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article",children:[(0,c.jsxs)("header",{children:[(0,c.jsx)("h2",{children:(0,c.jsx)(r.Link,{to:(0,s.Z)(e),itemProp:"url",children:(0,c.jsx)("span",{itemProp:"headline",children:t})})}),(0,c.jsx)("small",{children:e.frontmatter.date})]}),(0,c.jsx)("section",{children:(0,c.jsx)("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.description||e.excerpt},itemProp:"description"})})]})},e.fields.slug)}))})]})};const d=()=>(0,c.jsx)(l.Z,{title:"All posts"})},10434:function(e){function t(){return e.exports=t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},e.exports.__esModule=!0,e.exports.default=e.exports,t.apply(this,arguments)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports},7071:function(e){e.exports=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o},e.exports.__esModule=!0,e.exports.default=e.exports}}]);
//# sourceMappingURL=component---src-pages-index-tsx-bee89d48f571588c153c.js.map