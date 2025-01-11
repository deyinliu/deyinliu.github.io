"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[373],{4951:(e,t,n)=>{n.d(t,{A:()=>l});var o=n(85407),c=n(12115);let r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"}}]},name:"check-circle",theme:"filled"};var a=n(84021);let l=c.forwardRef(function(e,t){return c.createElement(a.default,(0,o.A)({},e,{ref:t,icon:r}))})},51629:(e,t,n)=>{n.d(t,{A:()=>l});var o=n(85407),c=n(12115);let r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}}]},name:"exclamation-circle",theme:"filled"};var a=n(84021);let l=c.forwardRef(function(e,t){return c.createElement(a.default,(0,o.A)({},e,{ref:t,icon:r}))})},92984:(e,t,n)=>{n.d(t,{A:()=>l});var o=n(85407),c=n(12115);let r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"}}]},name:"info-circle",theme:"filled"};var a=n(84021);let l=c.forwardRef(function(e,t){return c.createElement(a.default,(0,o.A)({},e,{ref:t,icon:r}))})},99373:(e,t,n)=>{n.d(t,{Ay:()=>ef});var o=n(39014),c=n(12115);let r=c.createContext({});var a=n(31049),l=n(11432),i=n(24330),s=n(4951),u=n(6140),f=n(51629),m=n(92984),d=n(16419),p=n(4617),v=n.n(p),g=n(59912),y=n(64406),h=n(85268),b=n(47650),A=n(85407),E=n(1568),x=n(72261),C=n(21855),k=n(23672),O=n(97181),N=c.forwardRef(function(e,t){var n=e.prefixCls,o=e.style,r=e.className,a=e.duration,l=void 0===a?4.5:a,i=e.showProgress,s=e.pauseOnHover,u=void 0===s||s,f=e.eventKey,m=e.content,d=e.closable,p=e.closeIcon,y=void 0===p?"x":p,h=e.props,b=e.onClick,x=e.onNoticeClose,N=e.times,j=e.hovering,w=c.useState(!1),S=(0,g.A)(w,2),R=S[0],M=S[1],P=c.useState(0),I=(0,g.A)(P,2),F=I[0],z=I[1],H=c.useState(0),D=(0,g.A)(H,2),B=D[0],L=D[1],T=j||R,W=l>0&&i,K=function(){x(f)};c.useEffect(function(){if(!T&&l>0){var e=Date.now()-B,t=setTimeout(function(){K()},1e3*l-B);return function(){u&&clearTimeout(t),L(Date.now()-e)}}},[l,T,N]),c.useEffect(function(){if(!T&&W&&(u||0===B)){var e,t=performance.now();return function n(){cancelAnimationFrame(e),e=requestAnimationFrame(function(e){var o=Math.min((e+B-t)/(1e3*l),1);z(100*o),o<1&&n()})}(),function(){u&&cancelAnimationFrame(e)}}},[l,B,T,W,N]);var _=c.useMemo(function(){return"object"===(0,C.A)(d)&&null!==d?d:d?{closeIcon:y}:{}},[d,y]),Q=(0,O.A)(_,!0),X=100-(!F||F<0?0:F>100?100:F),Y="".concat(n,"-notice");return c.createElement("div",(0,A.A)({},h,{ref:t,className:v()(Y,r,(0,E.A)({},"".concat(Y,"-closable"),d)),style:o,onMouseEnter:function(e){var t;M(!0),null==h||null===(t=h.onMouseEnter)||void 0===t||t.call(h,e)},onMouseLeave:function(e){var t;M(!1),null==h||null===(t=h.onMouseLeave)||void 0===t||t.call(h,e)},onClick:b}),c.createElement("div",{className:"".concat(Y,"-content")},m),d&&c.createElement("a",(0,A.A)({tabIndex:0,className:"".concat(Y,"-close"),onKeyDown:function(e){("Enter"===e.key||"Enter"===e.code||e.keyCode===k.A.ENTER)&&K()},"aria-label":"Close"},Q,{onClick:function(e){e.preventDefault(),e.stopPropagation(),K()}}),_.closeIcon),W&&c.createElement("progress",{className:"".concat(Y,"-progress"),max:"100",value:X},X+"%"))}),j=c.createContext({});let w=function(e){var t=e.children,n=e.classNames;return c.createElement(j.Provider,{value:{classNames:n}},t)},S=function(e){var t,n,o,c={offset:8,threshold:3,gap:16};return e&&"object"===(0,C.A)(e)&&(c.offset=null!==(t=e.offset)&&void 0!==t?t:8,c.threshold=null!==(n=e.threshold)&&void 0!==n?n:3,c.gap=null!==(o=e.gap)&&void 0!==o?o:16),[!!e,c]};var R=["className","style","classNames","styles"];let M=function(e){var t=e.configList,n=e.placement,r=e.prefixCls,a=e.className,l=e.style,i=e.motion,s=e.onAllNoticeRemoved,u=e.onNoticeClose,f=e.stack,m=(0,c.useContext)(j).classNames,d=(0,c.useRef)({}),p=(0,c.useState)(null),b=(0,g.A)(p,2),C=b[0],k=b[1],O=(0,c.useState)([]),w=(0,g.A)(O,2),M=w[0],P=w[1],I=t.map(function(e){return{config:e,key:String(e.key)}}),F=S(f),z=(0,g.A)(F,2),H=z[0],D=z[1],B=D.offset,L=D.threshold,T=D.gap,W=H&&(M.length>0||I.length<=L),K="function"==typeof i?i(n):i;return(0,c.useEffect)(function(){H&&M.length>1&&P(function(e){return e.filter(function(e){return I.some(function(t){return e===t.key})})})},[M,I,H]),(0,c.useEffect)(function(){var e,t;H&&d.current[null===(e=I[I.length-1])||void 0===e?void 0:e.key]&&k(d.current[null===(t=I[I.length-1])||void 0===t?void 0:t.key])},[I,H]),c.createElement(x.aF,(0,A.A)({key:n,className:v()(r,"".concat(r,"-").concat(n),null==m?void 0:m.list,a,(0,E.A)((0,E.A)({},"".concat(r,"-stack"),!!H),"".concat(r,"-stack-expanded"),W)),style:l,keys:I,motionAppear:!0},K,{onAllRemoved:function(){s(n)}}),function(e,t){var a=e.config,l=e.className,i=e.style,s=e.index,f=a.key,p=a.times,g=String(f),b=a.className,E=a.style,x=a.classNames,k=a.styles,O=(0,y.A)(a,R),j=I.findIndex(function(e){return e.key===g}),w={};if(H){var S=I.length-1-(j>-1?j:s-1),F="top"===n||"bottom"===n?"-50%":"0";if(S>0){w.height=W?null===(z=d.current[g])||void 0===z?void 0:z.offsetHeight:null==C?void 0:C.offsetHeight;for(var z,D,L,K,_=0,Q=0;Q<S;Q++)_+=(null===(K=d.current[I[I.length-1-Q].key])||void 0===K?void 0:K.offsetHeight)+T;var X=(W?_:S*B)*(n.startsWith("top")?1:-1),Y=!W&&null!=C&&C.offsetWidth&&null!==(D=d.current[g])&&void 0!==D&&D.offsetWidth?((null==C?void 0:C.offsetWidth)-2*B*(S<3?S:3))/(null===(L=d.current[g])||void 0===L?void 0:L.offsetWidth):1;w.transform="translate3d(".concat(F,", ").concat(X,"px, 0) scaleX(").concat(Y,")")}else w.transform="translate3d(".concat(F,", 0, 0)")}return c.createElement("div",{ref:t,className:v()("".concat(r,"-notice-wrapper"),l,null==x?void 0:x.wrapper),style:(0,h.A)((0,h.A)((0,h.A)({},i),w),null==k?void 0:k.wrapper),onMouseEnter:function(){return P(function(e){return e.includes(g)?e:[].concat((0,o.A)(e),[g])})},onMouseLeave:function(){return P(function(e){return e.filter(function(e){return e!==g})})}},c.createElement(N,(0,A.A)({},O,{ref:function(e){j>-1?d.current[g]=e:delete d.current[g]},prefixCls:r,classNames:x,styles:k,className:v()(b,null==m?void 0:m.notice),style:E,times:p,key:f,eventKey:f,onNoticeClose:u,hovering:H&&M.length>0})))})};var P=c.forwardRef(function(e,t){var n=e.prefixCls,r=void 0===n?"rc-notification":n,a=e.container,l=e.motion,i=e.maxCount,s=e.className,u=e.style,f=e.onAllRemoved,m=e.stack,d=e.renderNotifications,p=c.useState([]),v=(0,g.A)(p,2),y=v[0],A=v[1],E=function(e){var t,n=y.find(function(t){return t.key===e});null==n||null===(t=n.onClose)||void 0===t||t.call(n),A(function(t){return t.filter(function(t){return t.key!==e})})};c.useImperativeHandle(t,function(){return{open:function(e){A(function(t){var n,c=(0,o.A)(t),r=c.findIndex(function(t){return t.key===e.key}),a=(0,h.A)({},e);return r>=0?(a.times=((null===(n=t[r])||void 0===n?void 0:n.times)||0)+1,c[r]=a):(a.times=0,c.push(a)),i>0&&c.length>i&&(c=c.slice(-i)),c})},close:function(e){E(e)},destroy:function(){A([])}}});var x=c.useState({}),C=(0,g.A)(x,2),k=C[0],O=C[1];c.useEffect(function(){var e={};y.forEach(function(t){var n=t.placement,o=void 0===n?"topRight":n;o&&(e[o]=e[o]||[],e[o].push(t))}),Object.keys(k).forEach(function(t){e[t]=e[t]||[]}),O(e)},[y]);var N=function(e){O(function(t){var n=(0,h.A)({},t);return(n[e]||[]).length||delete n[e],n})},j=c.useRef(!1);if(c.useEffect(function(){Object.keys(k).length>0?j.current=!0:j.current&&(null==f||f(),j.current=!1)},[k]),!a)return null;var w=Object.keys(k);return(0,b.createPortal)(c.createElement(c.Fragment,null,w.map(function(e){var t=k[e],n=c.createElement(M,{key:e,configList:t,placement:e,prefixCls:r,className:null==s?void 0:s(e),style:null==u?void 0:u(e),motion:l,onNoticeClose:E,onAllNoticeRemoved:N,stack:m});return d?d(n,{prefixCls:r,key:e}):n})),a)}),I=["getContainer","motion","prefixCls","maxCount","className","style","onAllRemoved","stack","renderNotifications"],F=function(){return document.body},z=0,H=n(7926),D=n(67548),B=n(78877),L=n(70695),T=n(1086),W=n(56204);let K=e=>{let{componentCls:t,iconCls:n,boxShadow:o,colorText:c,colorSuccess:r,colorError:a,colorWarning:l,colorInfo:i,fontSizeLG:s,motionEaseInOutCirc:u,motionDurationSlow:f,marginXS:m,paddingXS:d,borderRadiusLG:p,zIndexPopup:v,contentPadding:g,contentBg:y}=e,h="".concat(t,"-notice"),b=new D.Mo("MessageMoveIn",{"0%":{padding:0,transform:"translateY(-100%)",opacity:0},"100%":{padding:d,transform:"translateY(0)",opacity:1}}),A=new D.Mo("MessageMoveOut",{"0%":{maxHeight:e.height,padding:d,opacity:1},"100%":{maxHeight:0,padding:0,opacity:0}}),E={padding:d,textAlign:"center",["".concat(t,"-custom-content")]:{display:"flex",alignItems:"center"},["".concat(t,"-custom-content > ").concat(n)]:{marginInlineEnd:m,fontSize:s},["".concat(h,"-content")]:{display:"inline-block",padding:g,background:y,borderRadius:p,boxShadow:o,pointerEvents:"all"},["".concat(t,"-success > ").concat(n)]:{color:r},["".concat(t,"-error > ").concat(n)]:{color:a},["".concat(t,"-warning > ").concat(n)]:{color:l},["".concat(t,"-info > ").concat(n,",\n      ").concat(t,"-loading > ").concat(n)]:{color:i}};return[{[t]:Object.assign(Object.assign({},(0,L.dF)(e)),{color:c,position:"fixed",top:m,width:"100%",pointerEvents:"none",zIndex:v,["".concat(t,"-move-up")]:{animationFillMode:"forwards"},["\n        ".concat(t,"-move-up-appear,\n        ").concat(t,"-move-up-enter\n      ")]:{animationName:b,animationDuration:f,animationPlayState:"paused",animationTimingFunction:u},["\n        ".concat(t,"-move-up-appear").concat(t,"-move-up-appear-active,\n        ").concat(t,"-move-up-enter").concat(t,"-move-up-enter-active\n      ")]:{animationPlayState:"running"},["".concat(t,"-move-up-leave")]:{animationName:A,animationDuration:f,animationPlayState:"paused",animationTimingFunction:u},["".concat(t,"-move-up-leave").concat(t,"-move-up-leave-active")]:{animationPlayState:"running"},"&-rtl":{direction:"rtl",span:{direction:"rtl"}}})},{[t]:{["".concat(h,"-wrapper")]:Object.assign({},E)}},{["".concat(t,"-notice-pure-panel")]:Object.assign(Object.assign({},E),{padding:0,textAlign:"start"})}]},_=(0,T.OF)("Message",e=>[K((0,W.oX)(e,{height:150}))],e=>({zIndexPopup:e.zIndexPopupBase+B.jH+10,contentBg:e.colorBgElevated,contentPadding:"".concat((e.controlHeightLG-e.fontSize*e.lineHeight)/2,"px ").concat(e.paddingSM,"px")}));var Q=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&0>t.indexOf(o)&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var c=0,o=Object.getOwnPropertySymbols(e);c<o.length;c++)0>t.indexOf(o[c])&&Object.prototype.propertyIsEnumerable.call(e,o[c])&&(n[o[c]]=e[o[c]]);return n};let X={info:c.createElement(m.A,null),success:c.createElement(s.A,null),error:c.createElement(u.A,null),warning:c.createElement(f.A,null),loading:c.createElement(d.A,null)},Y=e=>{let{prefixCls:t,type:n,icon:o,children:r}=e;return c.createElement("div",{className:v()("".concat(t,"-custom-content"),"".concat(t,"-").concat(n))},o||X[n],c.createElement("span",null,r))};var V=n(79624),q=n(28415);function G(e){let t;let n=new Promise(n=>{t=e(()=>{n(!0)})}),o=()=>{null==t||t()};return o.then=(e,t)=>n.then(e,t),o.promise=n,o}var J=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&0>t.indexOf(o)&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var c=0,o=Object.getOwnPropertySymbols(e);c<o.length;c++)0>t.indexOf(o[c])&&Object.prototype.propertyIsEnumerable.call(e,o[c])&&(n[o[c]]=e[o[c]]);return n};let U=e=>{let{children:t,prefixCls:n}=e,o=(0,H.A)(n),[r,a,l]=_(n,o);return r(c.createElement(w,{classNames:{list:v()(a,l,o)}},t))},Z=(e,t)=>{let{prefixCls:n,key:o}=t;return c.createElement(U,{prefixCls:n,key:o},e)},$=c.forwardRef((e,t)=>{let{top:n,prefixCls:r,getContainer:l,maxCount:i,duration:s=3,rtl:u,transitionName:f,onAllRemoved:m}=e,{getPrefixCls:d,getPopupContainer:p,message:h,direction:b}=c.useContext(a.QO),A=r||d("message"),E=c.createElement("span",{className:"".concat(A,"-close-x")},c.createElement(V.A,{className:"".concat(A,"-close-icon")})),[x,C]=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.getContainer,n=void 0===t?F:t,r=e.motion,a=e.prefixCls,l=e.maxCount,i=e.className,s=e.style,u=e.onAllRemoved,f=e.stack,m=e.renderNotifications,d=(0,y.A)(e,I),p=c.useState(),v=(0,g.A)(p,2),h=v[0],b=v[1],A=c.useRef(),E=c.createElement(P,{container:h,ref:A,prefixCls:a,motion:r,maxCount:l,className:i,style:s,onAllRemoved:u,stack:f,renderNotifications:m}),x=c.useState([]),C=(0,g.A)(x,2),k=C[0],O=C[1],N=c.useMemo(function(){return{open:function(e){var t=function(){for(var e={},t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];return n.forEach(function(t){t&&Object.keys(t).forEach(function(n){var o=t[n];void 0!==o&&(e[n]=o)})}),e}(d,e);(null===t.key||void 0===t.key)&&(t.key="rc-notification-".concat(z),z+=1),O(function(e){return[].concat((0,o.A)(e),[{type:"open",config:t}])})},close:function(e){O(function(t){return[].concat((0,o.A)(t),[{type:"close",key:e}])})},destroy:function(){O(function(e){return[].concat((0,o.A)(e),[{type:"destroy"}])})}}},[]);return c.useEffect(function(){b(n())}),c.useEffect(function(){A.current&&k.length&&(k.forEach(function(e){switch(e.type){case"open":A.current.open(e.config);break;case"close":A.current.close(e.key);break;case"destroy":A.current.destroy()}}),O(function(e){return e.filter(function(e){return!k.includes(e)})}))},[k]),[N,E]}({prefixCls:A,style:()=>({left:"50%",transform:"translateX(-50%)",top:null!=n?n:8}),className:()=>v()({["".concat(A,"-rtl")]:null!=u?u:"rtl"===b}),motion:()=>(function(e,t){return{motionName:null!=t?t:"".concat(e,"-move-up")}})(A,f),closable:!1,closeIcon:E,duration:s,getContainer:()=>(null==l?void 0:l())||(null==p?void 0:p())||document.body,maxCount:i,onAllRemoved:m,renderNotifications:Z});return c.useImperativeHandle(t,()=>Object.assign(Object.assign({},x),{prefixCls:A,message:h})),C}),ee=0;function et(e){let t=c.useRef(null);return(0,q.rJ)("Message"),[c.useMemo(()=>{let e=e=>{var n;null===(n=t.current)||void 0===n||n.close(e)},n=n=>{if(!t.current){let e=()=>{};return e.then=()=>{},e}let{open:o,prefixCls:r,message:a}=t.current,l="".concat(r,"-notice"),{content:i,icon:s,type:u,key:f,className:m,style:d,onClose:p}=n,g=J(n,["content","icon","type","key","className","style","onClose"]),y=f;return null==y&&(ee+=1,y="antd-message-".concat(ee)),G(t=>(o(Object.assign(Object.assign({},g),{key:y,content:c.createElement(Y,{prefixCls:r,type:u,icon:s},i),placement:"top",className:v()(u&&"".concat(l,"-").concat(u),m,null==a?void 0:a.className),style:Object.assign(Object.assign({},null==a?void 0:a.style),d),onClose:()=>{null==p||p(),t()}})),()=>{e(y)}))},o={open:n,destroy:n=>{var o;void 0!==n?e(n):null===(o=t.current)||void 0===o||o.destroy()}};return["info","success","warning","error","loading"].forEach(e=>{o[e]=(t,o,c)=>{let r,a,l;return r=t&&"object"==typeof t&&"content"in t?t:{content:t},"function"==typeof o?l=o:(a=o,l=c),n(Object.assign(Object.assign({onClose:l,duration:a},r),{type:e}))}}),o},[]),c.createElement($,Object.assign({key:"message-holder"},e,{ref:t}))]}let en=null,eo=e=>e(),ec=[],er={};function ea(){let{getContainer:e,duration:t,rtl:n,maxCount:o,top:c}=er,r=(null==e?void 0:e())||document.body;return{getContainer:()=>r,duration:t,rtl:n,maxCount:o,top:c}}let el=c.forwardRef((e,t)=>{let{messageConfig:n,sync:o}=e,{getPrefixCls:l}=(0,c.useContext)(a.QO),i=er.prefixCls||l("message"),s=(0,c.useContext)(r),[u,f]=et(Object.assign(Object.assign(Object.assign({},n),{prefixCls:i}),s.message));return c.useImperativeHandle(t,()=>{let e=Object.assign({},u);return Object.keys(e).forEach(t=>{e[t]=function(){return o(),u[t].apply(u,arguments)}}),{instance:e,sync:o}}),f}),ei=c.forwardRef((e,t)=>{let[n,o]=c.useState(ea),r=()=>{o(ea)};c.useEffect(r,[]);let a=(0,l.cr)(),i=a.getRootPrefixCls(),s=a.getIconPrefixCls(),u=a.getTheme(),f=c.createElement(el,{ref:t,sync:r,messageConfig:n});return c.createElement(l.Ay,{prefixCls:i,iconPrefixCls:s,theme:u},a.holderRender?a.holderRender(f):f)});function es(){if(!en){let e=document.createDocumentFragment(),t={fragment:e};en=t,eo(()=>{(0,i.K)()(c.createElement(ei,{ref:e=>{let{instance:n,sync:o}=e||{};Promise.resolve().then(()=>{!t.instance&&n&&(t.instance=n,t.sync=o,es())})}}),e)});return}en.instance&&(ec.forEach(e=>{let{type:t,skipped:n}=e;if(!n)switch(t){case"open":eo(()=>{let t=en.instance.open(Object.assign(Object.assign({},er),e.config));null==t||t.then(e.resolve),e.setCloseFn(t)});break;case"destroy":eo(()=>{null==en||en.instance.destroy(e.key)});break;default:eo(()=>{var n;let c=(n=en.instance)[t].apply(n,(0,o.A)(e.args));null==c||c.then(e.resolve),e.setCloseFn(c)})}}),ec=[])}let eu={open:function(e){let t=G(t=>{let n;let o={type:"open",config:e,resolve:t,setCloseFn:e=>{n=e}};return ec.push(o),()=>{n?eo(()=>{n()}):o.skipped=!0}});return es(),t},destroy:e=>{ec.push({type:"destroy",key:e}),es()},config:function(e){er=Object.assign(Object.assign({},er),e),eo(()=>{var e;null===(e=null==en?void 0:en.sync)||void 0===e||e.call(en)})},useMessage:function(e){return et(e)},_InternalPanelDoNotUseOrYouWillBeFired:e=>{let{prefixCls:t,className:n,type:o,icon:r,content:l}=e,i=Q(e,["prefixCls","className","type","icon","content"]),{getPrefixCls:s}=c.useContext(a.QO),u=t||s("message"),f=(0,H.A)(u),[m,d,p]=_(u,f);return m(c.createElement(N,Object.assign({},i,{prefixCls:u,className:v()(n,d,"".concat(u,"-notice-pure-panel"),p,f),eventKey:"pure",duration:null,content:c.createElement(Y,{prefixCls:u,type:o,icon:r},l)})))}};["success","info","warning","error","loading"].forEach(e=>{eu[e]=function(){for(var t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];return function(e,t){(0,l.cr)();let n=G(n=>{let o;let c={type:e,args:t,resolve:n,setCloseFn:e=>{o=e}};return ec.push(c),()=>{o?eo(()=>{o()}):c.skipped=!0}});return es(),n}(e,n)}});let ef=eu}}]);