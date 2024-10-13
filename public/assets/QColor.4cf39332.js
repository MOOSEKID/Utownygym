import{T as Ge}from"./TouchPan.7d0ea6c3.js";import{a2 as Xe,B as _,E as r,aG as Ne,a1 as Ye,a0 as Je,b2 as xe,a_ as lt,b3 as rt,a8 as Le,I as o,b4 as Ze,z as $e,a5 as et,v as Ae,a3 as nt,G as ge,aK as De,aB as Ve,aC as Qe,b5 as ot,b6 as ut,J as it,Q as Me,b7 as st,b8 as tt,aQ as ct,b9 as Pe,H as vt,ad as dt,ba as bt,bb as ft,aL as gt,b1 as mt,bc as ht,bd as kt,be as Ct,bf as yt,bg as ze,bh as He,bi as Fe,bj as pt,bk as xt,M as fe,bl as Oe,a7 as je,bm as wt}from"./index.ec7eb99e.js";import{Q as St}from"./QResizeObserver.0de2c530.js";import{r as Tt}from"./rtl.276c3f1b.js";import{Q as Ee,a as _t,u as qt}from"./QTabPanel.fe7180a4.js";const Ue="q-slider__marker-labels",Mt=e=>({value:e}),$t=({marker:e})=>o("div",{key:e.value,style:e.style,class:e.classes},e.label),at=[34,37,40,33,39,38],At={...Ye,...Je,min:{type:Number,default:0},max:{type:Number,default:100},innerMin:Number,innerMax:Number,step:{type:Number,default:1,validator:e=>e>=0},snap:Boolean,vertical:Boolean,reverse:Boolean,color:String,markerLabelsClass:String,label:Boolean,labelColor:String,labelTextColor:String,labelAlways:Boolean,switchLabelSide:Boolean,markers:[Boolean,Number],markerLabels:[Boolean,Array,Object,Function],switchMarkerLabelsSide:Boolean,trackImg:String,trackColor:String,innerTrackImg:String,innerTrackColor:String,selectionColor:String,selectionImg:String,thumbSize:{type:String,default:"20px"},trackSize:{type:String,default:"4px"},disable:Boolean,readonly:Boolean,dense:Boolean,tabindex:[String,Number],thumbColor:String,thumbPath:{type:String,default:"M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0"}},Bt=["pan","update:modelValue","change"];function Rt({updateValue:e,updatePosition:V,getDragging:B,formAttrs:c}){const{props:t,emit:R,slots:O,proxy:{$q:q}}=$e(),G=Xe(t,q),X=et(c),I=_(!1),K=_(!1),u=_(!1),m=_(!1),x=r(()=>t.vertical===!0?"--v":"--h"),j=r(()=>"-"+(t.switchLabelSide===!0?"switched":"standard")),Q=r(()=>t.vertical===!0?t.reverse===!0:t.reverse!==(q.lang.rtl===!0)),F=r(()=>isNaN(t.innerMin)===!0||t.innerMin<t.min?t.min:t.innerMin),p=r(()=>isNaN(t.innerMax)===!0||t.innerMax>t.max?t.max:t.innerMax),s=r(()=>t.disable!==!0&&t.readonly!==!0&&F.value<p.value),w=r(()=>{if(t.step===0)return d=>d;const l=(String(t.step).trim().split(".")[1]||"").length;return d=>parseFloat(d.toFixed(l))}),A=r(()=>t.step===0?1:t.step),P=r(()=>s.value===!0?t.tabindex||0:-1),E=r(()=>t.max-t.min),U=r(()=>p.value-F.value),W=r(()=>be(F.value)),ve=r(()=>be(p.value)),Y=r(()=>t.vertical===!0?Q.value===!0?"bottom":"top":Q.value===!0?"right":"left"),ne=r(()=>t.vertical===!0?"height":"width"),ie=r(()=>t.vertical===!0?"width":"height"),ae=r(()=>t.vertical===!0?"vertical":"horizontal"),se=r(()=>{const l={role:"slider","aria-valuemin":F.value,"aria-valuemax":p.value,"aria-orientation":ae.value,"data-step":t.step};return t.disable===!0?l["aria-disabled"]="true":t.readonly===!0&&(l["aria-readonly"]="true"),l}),S=r(()=>`q-slider q-slider${x.value} q-slider--${I.value===!0?"":"in"}active inline no-wrap `+(t.vertical===!0?"row":"column")+(t.disable===!0?" disabled":" q-slider--enabled"+(s.value===!0?" q-slider--editable":""))+(u.value==="both"?" q-slider--focus":"")+(t.label||t.labelAlways===!0?" q-slider--label":"")+(t.labelAlways===!0?" q-slider--label-always":"")+(G.value===!0?" q-slider--dark":"")+(t.dense===!0?" q-slider--dense q-slider--dense"+x.value:""));function Z(l){const d="q-slider__"+l;return`${d} ${d}${x.value} ${d}${x.value}${j.value}`}function oe(l){const d="q-slider__"+l;return`${d} ${d}${x.value}`}const me=r(()=>{const l=t.selectionColor||t.color;return"q-slider__selection absolute"+(l!==void 0?` text-${l}`:"")}),we=r(()=>oe("markers")+" absolute overflow-hidden"),le=r(()=>oe("track-container")),re=r(()=>Z("pin")),de=r(()=>Z("label")),he=r(()=>Z("text-container")),ke=r(()=>Z("marker-labels-container")+(t.markerLabelsClass!==void 0?` ${t.markerLabelsClass}`:"")),J=r(()=>"q-slider__track relative-position no-outline"+(t.trackColor!==void 0?` bg-${t.trackColor}`:"")),Se=r(()=>{const l={[ie.value]:t.trackSize};return t.trackImg!==void 0&&(l.backgroundImage=`url(${t.trackImg}) !important`),l}),Te=r(()=>"q-slider__inner absolute"+(t.innerTrackColor!==void 0?` bg-${t.innerTrackColor}`:"")),Ce=r(()=>{const l=ve.value-W.value,d={[Y.value]:`${100*W.value}%`,[ne.value]:l===0?"2px":`${100*l}%`};return t.innerTrackImg!==void 0&&(d.backgroundImage=`url(${t.innerTrackImg}) !important`),d});function ye(l){const{min:d,max:k,step:$}=t;let H=d+l*(k-d);if($>0){const ce=(H-F.value)%$;H+=(Math.abs(ce)>=$/2?(ce<0?-1:1)*$:0)-ce}return H=w.value(H),xe(H,F.value,p.value)}function be(l){return E.value===0?0:(l-t.min)/E.value}function a(l,d){const k=lt(l),$=t.vertical===!0?xe((k.top-d.top)/d.height,0,1):xe((k.left-d.left)/d.width,0,1);return xe(Q.value===!0?1-$:$,W.value,ve.value)}const v=r(()=>rt(t.markers)===!0?t.markers:A.value),b=r(()=>{const l=[],d=v.value,k=t.max;let $=t.min;do l.push($),$+=d;while($<k);return l.push(k),l}),h=r(()=>{const l=` ${Ue}${x.value}-`;return Ue+`${l}${t.switchMarkerLabelsSide===!0?"switched":"standard"}${l}${Q.value===!0?"rtl":"ltr"}`}),D=r(()=>t.markerLabels===!1?null:L(t.markerLabels).map((l,d)=>({index:d,value:l.value,label:l.label||l.value,classes:h.value+(l.classes!==void 0?" "+l.classes:""),style:{...ee(l.value),...l.style||{}}}))),g=r(()=>({markerList:D.value,markerMap:ue.value,classes:h.value,getStyle:ee})),z=r(()=>{const l=U.value===0?"2px":100*v.value/U.value;return{...Ce.value,backgroundSize:t.vertical===!0?`2px ${l}%`:`${l}% 2px`}});function L(l){if(l===!1)return null;if(l===!0)return b.value.map(Mt);if(typeof l=="function")return b.value.map(k=>{const $=l(k);return Le($)===!0?{...$,value:k}:{value:k,label:$}});const d=({value:k})=>k>=t.min&&k<=t.max;return Array.isArray(l)===!0?l.map(k=>Le(k)===!0?k:{value:k}).filter(d):Object.keys(l).map(k=>{const $=l[k],H=Number(k);return Le($)===!0?{...$,value:H}:{value:H,label:$}}).filter(d)}function ee(l){return{[Y.value]:`${100*(l-t.min)/E.value}%`}}const ue=r(()=>{if(t.markerLabels===!1)return null;const l={};return D.value.forEach(d=>{l[d.value]=d}),l});function n(){if(O["marker-label-group"]!==void 0)return O["marker-label-group"](g.value);const l=O["marker-label"]||$t;return D.value.map(d=>l({marker:d,...g.value}))}const i=r(()=>[[Ge,f,void 0,{[ae.value]:!0,prevent:!0,stop:!0,mouse:!0,mouseAllDir:!0}]]);function f(l){l.isFinal===!0?(m.value!==void 0&&(V(l.evt),l.touch===!0&&e(!0),m.value=void 0,R("pan","end")),I.value=!1,u.value=!1):l.isFirst===!0?(m.value=B(l.evt),V(l.evt),e(),I.value=!0,R("pan","start")):(V(l.evt),e())}function T(){u.value=!1}function M(l){V(l,B(l)),e(),K.value=!0,I.value=!0,document.addEventListener("mouseup",y,!0)}function y(){K.value=!1,I.value=!1,e(!0),T(),document.removeEventListener("mouseup",y,!0)}function C(l){V(l,B(l)),e(!0)}function N(l){at.includes(l.keyCode)&&e(!0)}function te(l){if(t.vertical===!0)return null;const d=q.lang.rtl!==t.reverse?1-l:l;return{transform:`translateX(calc(${2*d-1} * ${t.thumbSize} / 2 + ${50-100*d}%))`}}function _e(l){const d=r(()=>K.value===!1&&(u.value===l.focusValue||u.value==="both")?" q-slider--focus":""),k=r(()=>`q-slider__thumb q-slider__thumb${x.value} q-slider__thumb${x.value}-${Q.value===!0?"rtl":"ltr"} absolute non-selectable`+d.value+(l.thumbColor.value!==void 0?` text-${l.thumbColor.value}`:"")),$=r(()=>({width:t.thumbSize,height:t.thumbSize,[Y.value]:`${100*l.ratio.value}%`,zIndex:u.value===l.focusValue?2:void 0})),H=r(()=>l.labelColor.value!==void 0?` text-${l.labelColor.value}`:""),ce=r(()=>te(l.ratio.value)),Re=r(()=>"q-slider__text"+(l.labelTextColor.value!==void 0?` text-${l.labelTextColor.value}`:""));return()=>{const Ie=[o("svg",{class:"q-slider__thumb-shape absolute-full",viewBox:"0 0 20 20","aria-hidden":"true"},[o("path",{d:t.thumbPath})]),o("div",{class:"q-slider__focus-ring fit"})];return(t.label===!0||t.labelAlways===!0)&&(Ie.push(o("div",{class:re.value+" absolute fit no-pointer-events"+H.value},[o("div",{class:de.value,style:{minWidth:t.thumbSize}},[o("div",{class:he.value,style:ce.value},[o("span",{class:Re.value},l.label.value)])])])),t.name!==void 0&&t.disable!==!0&&X(Ie,"push")),o("div",{class:k.value,style:$.value,...l.getNodeData()},Ie)}}function Be(l,d,k,$){const H=[];t.innerTrackColor!=="transparent"&&H.push(o("div",{key:"inner",class:Te.value,style:Ce.value})),t.selectionColor!=="transparent"&&H.push(o("div",{key:"selection",class:me.value,style:l.value})),t.markers!==!1&&H.push(o("div",{key:"marker",class:we.value,style:z.value})),$(H);const ce=[Ze("div",{key:"trackC",class:le.value,tabindex:d.value,...k.value},[o("div",{class:J.value,style:Se.value},H)],"slide",s.value,()=>i.value)];if(t.markerLabels!==!1){const Re=t.switchMarkerLabelsSide===!0?"unshift":"push";ce[Re](o("div",{key:"markerL",class:ke.value},n()))}return ce}return Ne(()=>{document.removeEventListener("mouseup",y,!0)}),{state:{active:I,focus:u,preventFocus:K,dragging:m,editable:s,classes:S,tabindex:P,attributes:se,roundValueFn:w,keyStep:A,trackLen:E,innerMin:F,innerMinRatio:W,innerMax:p,innerMaxRatio:ve,positionProp:Y,sizeProp:ne,isReversed:Q},methods:{onActivate:M,onMobileClick:C,onBlur:T,onKeyup:N,getContent:Be,getThumbRenderFn:_e,convertRatioToModel:ye,convertModelToRatio:be,getDraggingRatio:a}}}const It=()=>({});var pe=Ae({name:"QSlider",props:{...At,modelValue:{required:!0,default:null,validator:e=>typeof e=="number"||e===null},labelValue:[String,Number]},emits:Bt,setup(e,{emit:V}){const{proxy:{$q:B}}=$e(),{state:c,methods:t}=Rt({updateValue:x,updatePosition:Q,getDragging:j,formAttrs:nt(e)}),R=_(null),O=_(0),q=_(0);function G(){q.value=e.modelValue===null?c.innerMin.value:xe(e.modelValue,c.innerMin.value,c.innerMax.value)}ge(()=>`${e.modelValue}|${c.innerMin.value}|${c.innerMax.value}`,G),G();const X=r(()=>t.convertModelToRatio(q.value)),I=r(()=>c.active.value===!0?O.value:X.value),K=r(()=>{const s={[c.positionProp.value]:`${100*c.innerMinRatio.value}%`,[c.sizeProp.value]:`${100*(I.value-c.innerMinRatio.value)}%`};return e.selectionImg!==void 0&&(s.backgroundImage=`url(${e.selectionImg}) !important`),s}),u=t.getThumbRenderFn({focusValue:!0,getNodeData:It,ratio:I,label:r(()=>e.labelValue!==void 0?e.labelValue:q.value),thumbColor:r(()=>e.thumbColor||e.color),labelColor:r(()=>e.labelColor),labelTextColor:r(()=>e.labelTextColor)}),m=r(()=>c.editable.value!==!0?{}:B.platform.is.mobile===!0?{onClick:t.onMobileClick}:{onMousedown:t.onActivate,onFocus:F,onBlur:t.onBlur,onKeydown:p,onKeyup:t.onKeyup});function x(s){q.value!==e.modelValue&&V("update:modelValue",q.value),s===!0&&V("change",q.value)}function j(){return R.value.getBoundingClientRect()}function Q(s,w=c.dragging.value){const A=t.getDraggingRatio(s,w);q.value=t.convertRatioToModel(A),O.value=e.snap!==!0||e.step===0?A:t.convertModelToRatio(q.value)}function F(){c.focus.value=!0}function p(s){if(!at.includes(s.keyCode))return;De(s);const w=([34,33].includes(s.keyCode)?10:1)*c.keyStep.value,A=([34,37,40].includes(s.keyCode)?-1:1)*(c.isReversed.value===!0?-1:1)*(e.vertical===!0?-1:1)*w;q.value=xe(c.roundValueFn.value(q.value+A),c.innerMin.value,c.innerMax.value),x()}return()=>{const s=t.getContent(K,c.tabindex,m,w=>{w.push(u())});return o("div",{ref:R,class:c.classes.value+(e.modelValue===null?" q-slider--no-value":""),...c.attributes.value,"aria-valuenow":e.modelValue},s)}}});function Lt(e,V,B){const c=B===!0?["left","right"]:["top","bottom"];return`absolute-${V===!0?c[0]:c[1]}${e?` text-${e}`:""}`}const Vt=["left","center","right","justify"];var We=Ae({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>Vt.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:V,emit:B}){const{proxy:c}=$e(),{$q:t}=c,{registerTick:R}=Ve(),{registerTick:O}=Ve(),{registerTick:q}=Ve(),{registerTimeout:G,removeTimeout:X}=Qe(),{registerTimeout:I,removeTimeout:K}=Qe(),u=_(null),m=_(null),x=_(e.modelValue),j=_(!1),Q=_(!0),F=_(!1),p=_(!1),s=[],w=_(0),A=_(!1);let P=null,E=null,U;const W=r(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:Lt(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),ve=r(()=>{const n=w.value,i=x.value;for(let f=0;f<n;f++)if(s[f].name.value===i)return!0;return!1}),Y=r(()=>`q-tabs__content--align-${j.value===!0?"left":p.value===!0?"justify":e.align}`),ne=r(()=>`q-tabs row no-wrap items-center q-tabs--${j.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),ie=r(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+Y.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),ae=r(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),se=r(()=>e.vertical!==!0&&t.lang.rtl===!0),S=r(()=>Tt===!1&&se.value===!0);ge(se,re),ge(()=>e.modelValue,n=>{Z({name:n,setCurrent:!0,skipEmit:!0})}),ge(()=>e.outsideArrows,oe);function Z({name:n,setCurrent:i,skipEmit:f}){x.value!==n&&(f!==!0&&e["onUpdate:modelValue"]!==void 0&&B("update:modelValue",n),(i===!0||e["onUpdate:modelValue"]===void 0)&&(we(x.value,n),x.value=n))}function oe(){R(()=>{me({width:u.value.offsetWidth,height:u.value.offsetHeight})})}function me(n){if(ae.value===void 0||m.value===null)return;const i=n[ae.value.container],f=Math.min(m.value[ae.value.scroll],Array.prototype.reduce.call(m.value.children,(M,y)=>M+(y[ae.value.content]||0),0)),T=i>0&&f>i;j.value=T,T===!0&&O(re),p.value=i<parseInt(e.breakpoint,10)}function we(n,i){const f=n!=null&&n!==""?s.find(M=>M.name.value===n):null,T=i!=null&&i!==""?s.find(M=>M.name.value===i):null;if(ue===!0)ue=!1;else if(f&&T){const M=f.tabIndicatorRef.value,y=T.tabIndicatorRef.value;P!==null&&(clearTimeout(P),P=null),M.style.transition="none",M.style.transform="none",y.style.transition="none",y.style.transform="none";const C=M.getBoundingClientRect(),N=y.getBoundingClientRect();y.style.transform=e.vertical===!0?`translate3d(0,${C.top-N.top}px,0) scale3d(1,${N.height?C.height/N.height:1},1)`:`translate3d(${C.left-N.left}px,0,0) scale3d(${N.width?C.width/N.width:1},1,1)`,q(()=>{P=setTimeout(()=>{P=null,y.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",y.style.transform="none"},70)})}T&&j.value===!0&&le(T.rootRef.value)}function le(n){const{left:i,width:f,top:T,height:M}=m.value.getBoundingClientRect(),y=n.getBoundingClientRect();let C=e.vertical===!0?y.top-T:y.left-i;if(C<0){m.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(C),re();return}C+=e.vertical===!0?y.height-M:y.width-f,C>0&&(m.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(C),re())}function re(){const n=m.value;if(n===null)return;const i=n.getBoundingClientRect(),f=e.vertical===!0?n.scrollTop:Math.abs(n.scrollLeft);se.value===!0?(Q.value=Math.ceil(f+i.width)<n.scrollWidth-1,F.value=f>0):(Q.value=f>0,F.value=e.vertical===!0?Math.ceil(f+i.height)<n.scrollHeight:Math.ceil(f+i.width)<n.scrollWidth)}function de(n){E!==null&&clearInterval(E),E=setInterval(()=>{Ce(n)===!0&&J()},5)}function he(){de(S.value===!0?Number.MAX_SAFE_INTEGER:0)}function ke(){de(S.value===!0?0:Number.MAX_SAFE_INTEGER)}function J(){E!==null&&(clearInterval(E),E=null)}function Se(n,i){const f=Array.prototype.filter.call(m.value.children,N=>N===i||N.matches&&N.matches(".q-tab.q-focusable")===!0),T=f.length;if(T===0)return;if(n===36)return le(f[0]),f[0].focus(),!0;if(n===35)return le(f[T-1]),f[T-1].focus(),!0;const M=n===(e.vertical===!0?38:37),y=n===(e.vertical===!0?40:39),C=M===!0?-1:y===!0?1:void 0;if(C!==void 0){const N=se.value===!0?-1:1,te=f.indexOf(i)+C*N;return te>=0&&te<T&&(le(f[te]),f[te].focus({preventScroll:!0})),!0}}const Te=r(()=>S.value===!0?{get:n=>Math.abs(n.scrollLeft),set:(n,i)=>{n.scrollLeft=-i}}:e.vertical===!0?{get:n=>n.scrollTop,set:(n,i)=>{n.scrollTop=i}}:{get:n=>n.scrollLeft,set:(n,i)=>{n.scrollLeft=i}});function Ce(n){const i=m.value,{get:f,set:T}=Te.value;let M=!1,y=f(i);const C=n<y?-1:1;return y+=C*5,y<0?(M=!0,y=0):(C===-1&&y<=n||C===1&&y>=n)&&(M=!0,y=n),T(i,y),re(),M}function ye(n,i){for(const f in n)if(n[f]!==i[f])return!1;return!0}function be(){let n=null,i={matchedLen:0,queryDiff:9999,hrefLen:0};const f=s.filter(C=>C.routeData!==void 0&&C.routeData.hasRouterLink.value===!0),{hash:T,query:M}=c.$route,y=Object.keys(M).length;for(const C of f){const N=C.routeData.exact.value===!0;if(C.routeData[N===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:te,query:_e,matched:Be,href:l}=C.routeData.resolvedLink.value,d=Object.keys(_e).length;if(N===!0){if(te!==T||d!==y||ye(M,_e)===!1)continue;n=C.name.value;break}if(te!==""&&te!==T||d!==0&&ye(_e,M)===!1)continue;const k={matchedLen:Be.length,queryDiff:y-d,hrefLen:l.length-te.length};if(k.matchedLen>i.matchedLen){n=C.name.value,i=k;continue}else if(k.matchedLen!==i.matchedLen)continue;if(k.queryDiff<i.queryDiff)n=C.name.value,i=k;else if(k.queryDiff!==i.queryDiff)continue;k.hrefLen>i.hrefLen&&(n=C.name.value,i=k)}if(n===null&&s.some(C=>C.routeData===void 0&&C.name.value===x.value)===!0){ue=!1;return}Z({name:n,setCurrent:!0})}function a(n){if(X(),A.value!==!0&&u.value!==null&&n.target&&typeof n.target.closest=="function"){const i=n.target.closest(".q-tab");i&&u.value.contains(i)===!0&&(A.value=!0,j.value===!0&&le(i))}}function v(){G(()=>{A.value=!1},30)}function b(){z.avoidRouteWatcher===!1?I(be):K()}function h(){if(U===void 0){const n=ge(()=>c.$route.fullPath,b);U=()=>{n(),U=void 0}}}function D(n){s.push(n),w.value++,oe(),n.routeData===void 0||c.$route===void 0?I(()=>{if(j.value===!0){const i=x.value,f=i!=null&&i!==""?s.find(T=>T.name.value===i):null;f&&le(f.rootRef.value)}}):(h(),n.routeData.hasRouterLink.value===!0&&b())}function g(n){s.splice(s.indexOf(n),1),w.value--,oe(),U!==void 0&&n.routeData!==void 0&&(s.every(i=>i.routeData===void 0)===!0&&U(),b())}const z={currentModel:x,tabProps:W,hasFocus:A,hasActiveTab:ve,registerTab:D,unregisterTab:g,verifyRouteModel:b,updateModel:Z,onKbdNavigate:Se,avoidRouteWatcher:!1};st(tt,z);function L(){P!==null&&clearTimeout(P),J(),U!==void 0&&U()}let ee,ue;return Ne(L),ot(()=>{ee=U!==void 0,L()}),ut(()=>{ee===!0&&(h(),ue=!0,b()),oe()}),()=>o("div",{ref:u,class:ne.value,role:"tablist",onFocusin:a,onFocusout:v},[o(St,{onResize:me}),o("div",{ref:m,class:ie.value,onScroll:re},it(V.default)),o(Me,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(Q.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||t.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:he,onTouchstartPassive:he,onMouseupPassive:J,onMouseleavePassive:J,onTouchendPassive:J}),o(Me,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(F.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||t.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:ke,onTouchstartPassive:ke,onMouseupPassive:J,onMouseleavePassive:J,onTouchendPassive:J})])}});let Pt=0;const Ft=["click","keydown"],Et={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Pt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function Dt(e,V,B,c){const t=ct(tt,Pe);if(t===Pe)return console.error("QTab/QRouteTab component needs to be child of QTabs"),Pe;const{proxy:R}=$e(),O=_(null),q=_(null),G=_(null),X=r(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),I=r(()=>t.currentModel.value===e.name),K=r(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(I.value===!0?" q-tab--active"+(t.tabProps.value.activeClass?" "+t.tabProps.value.activeClass:"")+(t.tabProps.value.activeColor?` text-${t.tabProps.value.activeColor}`:"")+(t.tabProps.value.activeBgColor?` bg-${t.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&t.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||t.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(c!==void 0?c.linkClass.value:"")),u=r(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(t.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),m=r(()=>e.disable===!0||t.hasFocus.value===!0||I.value===!1&&t.hasActiveTab.value===!0?-1:e.tabindex||0);function x(s,w){if(w!==!0&&O.value!==null&&O.value.focus(),e.disable===!0){c!==void 0&&c.hasRouterLink.value===!0&&De(s);return}if(c===void 0){t.updateModel({name:e.name}),B("click",s);return}if(c.hasRouterLink.value===!0){const A=(P={})=>{let E;const U=P.to===void 0||ht(P.to,e.to)===!0?t.avoidRouteWatcher=kt():null;return c.navigateToRouterLink(s,{...P,returnRouterError:!0}).catch(W=>{E=W}).then(W=>{if(U===t.avoidRouteWatcher&&(t.avoidRouteWatcher=!1,E===void 0&&(W===void 0||W.message!==void 0&&W.message.startsWith("Avoided redundant navigation")===!0)&&t.updateModel({name:e.name})),P.returnRouterError===!0)return E!==void 0?Promise.reject(E):W})};B("click",s,A),s.defaultPrevented!==!0&&A();return}B("click",s)}function j(s){ft(s,[13,32])?x(s,!0):gt(s)!==!0&&s.keyCode>=35&&s.keyCode<=40&&s.altKey!==!0&&s.metaKey!==!0&&t.onKbdNavigate(s.keyCode,R.$el)===!0&&De(s),B("keydown",s)}function Q(){const s=t.tabProps.value.narrowIndicator,w=[],A=o("div",{ref:G,class:["q-tab__indicator",t.tabProps.value.indicatorClass]});e.icon!==void 0&&w.push(o(Me,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&w.push(o("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&w.push(e.alertIcon!==void 0?o(Me,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):o("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),s===!0&&w.push(A);const P=[o("div",{class:"q-focus-helper",tabindex:-1,ref:O}),o("div",{class:u.value},mt(V.default,w))];return s===!1&&P.push(A),P}const F={name:r(()=>e.name),rootRef:q,tabIndicatorRef:G,routeData:c};Ne(()=>{t.unregisterTab(F)}),vt(()=>{t.registerTab(F)});function p(s,w){const A={ref:q,class:K.value,tabindex:m.value,role:"tab","aria-selected":I.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:x,onKeydown:j,...w};return dt(o(s,A,Q()),[[bt,X.value]])}return{renderTab:p,$tabs:t}}var qe=Ae({name:"QTab",props:Et,emits:Ft,setup(e,{slots:V,emit:B}){const{renderTab:c}=Dt(e,V,B);return()=>c("div")}});const Nt=["rgb(255,204,204)","rgb(255,230,204)","rgb(255,255,204)","rgb(204,255,204)","rgb(204,255,230)","rgb(204,255,255)","rgb(204,230,255)","rgb(204,204,255)","rgb(230,204,255)","rgb(255,204,255)","rgb(255,153,153)","rgb(255,204,153)","rgb(255,255,153)","rgb(153,255,153)","rgb(153,255,204)","rgb(153,255,255)","rgb(153,204,255)","rgb(153,153,255)","rgb(204,153,255)","rgb(255,153,255)","rgb(255,102,102)","rgb(255,179,102)","rgb(255,255,102)","rgb(102,255,102)","rgb(102,255,179)","rgb(102,255,255)","rgb(102,179,255)","rgb(102,102,255)","rgb(179,102,255)","rgb(255,102,255)","rgb(255,51,51)","rgb(255,153,51)","rgb(255,255,51)","rgb(51,255,51)","rgb(51,255,153)","rgb(51,255,255)","rgb(51,153,255)","rgb(51,51,255)","rgb(153,51,255)","rgb(255,51,255)","rgb(255,0,0)","rgb(255,128,0)","rgb(255,255,0)","rgb(0,255,0)","rgb(0,255,128)","rgb(0,255,255)","rgb(0,128,255)","rgb(0,0,255)","rgb(128,0,255)","rgb(255,0,255)","rgb(245,0,0)","rgb(245,123,0)","rgb(245,245,0)","rgb(0,245,0)","rgb(0,245,123)","rgb(0,245,245)","rgb(0,123,245)","rgb(0,0,245)","rgb(123,0,245)","rgb(245,0,245)","rgb(214,0,0)","rgb(214,108,0)","rgb(214,214,0)","rgb(0,214,0)","rgb(0,214,108)","rgb(0,214,214)","rgb(0,108,214)","rgb(0,0,214)","rgb(108,0,214)","rgb(214,0,214)","rgb(163,0,0)","rgb(163,82,0)","rgb(163,163,0)","rgb(0,163,0)","rgb(0,163,82)","rgb(0,163,163)","rgb(0,82,163)","rgb(0,0,163)","rgb(82,0,163)","rgb(163,0,163)","rgb(92,0,0)","rgb(92,46,0)","rgb(92,92,0)","rgb(0,92,0)","rgb(0,92,46)","rgb(0,92,92)","rgb(0,46,92)","rgb(0,0,92)","rgb(46,0,92)","rgb(92,0,92)","rgb(255,255,255)","rgb(205,205,205)","rgb(178,178,178)","rgb(153,153,153)","rgb(127,127,127)","rgb(102,102,102)","rgb(76,76,76)","rgb(51,51,51)","rgb(25,25,25)","rgb(0,0,0)"],Ke="M5 5 h10 v10 h-10 v-10 z",Qt="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAH0lEQVQoU2NkYGAwZkAFZ5G5jPRRgOYEVDeB3EBjBQBOZwTVugIGyAAAAABJRU5ErkJggg==";var Wt=Ae({name:"QColor",props:{...Ye,...Je,modelValue:String,defaultValue:String,defaultView:{type:String,default:"spectrum",validator:e=>["spectrum","tune","palette"].includes(e)},formatModel:{type:String,default:"auto",validator:e=>["auto","hex","rgb","hexa","rgba"].includes(e)},palette:Array,noHeader:Boolean,noHeaderTabs:Boolean,noFooter:Boolean,square:Boolean,flat:Boolean,bordered:Boolean,disable:Boolean,readonly:Boolean},emits:["update:modelValue","change"],setup(e,{emit:V}){const{proxy:B}=$e(),{$q:c}=B,t=Xe(e,c),{getCache:R}=qt(),O=_(null),q=_(null),G=r(()=>e.formatModel==="auto"?null:e.formatModel.indexOf("hex")!==-1),X=r(()=>e.formatModel==="auto"?null:e.formatModel.indexOf("a")!==-1),I=_(e.formatModel==="auto"?e.modelValue===void 0||e.modelValue===null||e.modelValue===""||e.modelValue.startsWith("#")?"hex":"rgb":e.formatModel.startsWith("hex")?"hex":"rgb"),K=_(e.defaultView),u=_(ne(e.modelValue||e.defaultValue)),m=r(()=>e.disable!==!0&&e.readonly!==!0),x=r(()=>e.modelValue===void 0||e.modelValue===null||e.modelValue===""||e.modelValue.startsWith("#")),j=r(()=>G.value!==null?G.value:x.value),Q=r(()=>({type:"hidden",name:e.name,value:u.value[j.value===!0?"hex":"rgb"]})),F=et(Q),p=r(()=>X.value!==null?X.value:u.value.a!==void 0),s=r(()=>({backgroundColor:u.value.rgb||"#000"})),w=r(()=>`q-color-picker__header-content q-color-picker__header-content--${(u.value.a!==void 0&&u.value.a<65?!0:pt(u.value)>.4)?"light":"dark"}`),A=r(()=>({background:`hsl(${u.value.h},100%,50%)`})),P=r(()=>({top:`${100-u.value.v}%`,[c.lang.rtl===!0?"right":"left"]:`${u.value.s}%`})),E=r(()=>e.palette!==void 0&&e.palette.length!==0?e.palette:Nt),U=r(()=>"q-color-picker"+(e.bordered===!0?" q-color-picker--bordered":"")+(e.square===!0?" q-color-picker--square no-border-radius":"")+(e.flat===!0?" q-color-picker--flat no-shadow":"")+(e.disable===!0?" disabled":"")+(t.value===!0?" q-color-picker--dark q-dark":"")),W=r(()=>e.disable===!0?{"aria-disabled":"true"}:{}),ve=r(()=>[[Ge,me,void 0,{prevent:!0,stop:!0,mouse:!0}]]);ge(()=>e.modelValue,a=>{const v=ne(a||e.defaultValue);v.hex!==u.value.hex&&(u.value=v)}),ge(()=>e.defaultValue,a=>{if(!e.modelValue&&a){const v=ne(a);v.hex!==u.value.hex&&(u.value=v)}});function Y(a,v){u.value.hex=ze(a),u.value.rgb=He(a),u.value.r=a.r,u.value.g=a.g,u.value.b=a.b,u.value.a=a.a;const b=u.value[j.value===!0?"hex":"rgb"];V("update:modelValue",b),v===!0&&V("change",b)}function ne(a){const v=X.value!==void 0?X.value:e.formatModel==="auto"?null:e.formatModel.indexOf("a")!==-1;if(typeof a!="string"||a.length===0||Ct.anyColor(a.replace(/ /g,""))!==!0)return{h:0,s:0,v:0,r:0,g:0,b:0,a:v===!0?100:void 0,hex:void 0,rgb:void 0};const b=yt(a);return v===!0&&b.a===void 0&&(b.a=100),b.hex=ze(b),b.rgb=He(b),Object.assign(b,Fe(b))}function ie(a,v,b){const h=O.value;if(h===null)return;const D=h.clientWidth,g=h.clientHeight,z=h.getBoundingClientRect();let L=Math.min(D,Math.max(0,a-z.left));c.lang.rtl===!0&&(L=D-L);const ee=Math.min(g,Math.max(0,v-z.top)),ue=Math.round(100*L/D),n=Math.round(100*Math.max(0,Math.min(1,-(ee/g)+1))),i=Oe({h:u.value.h,s:ue,v:n,a:p.value===!0?u.value.a:void 0});u.value.s=ue,u.value.v=n,Y(i,b)}function ae(a,v){const b=Math.round(a),h=Oe({h:b,s:u.value.s,v:u.value.v,a:p.value===!0?u.value.a:void 0});u.value.h=b,Y(h,v)}function se(a){ae(a,!0)}function S(a,v,b,h,D){if(h!==void 0&&fe(h),!/^[0-9]+$/.test(a)){D===!0&&B.$forceUpdate();return}const g=Math.floor(Number(a));if(g<0||g>b){D===!0&&B.$forceUpdate();return}const z={r:v==="r"?g:u.value.r,g:v==="g"?g:u.value.g,b:v==="b"?g:u.value.b,a:p.value===!0?v==="a"?g:u.value.a:void 0};if(v!=="a"){const L=Fe(z);u.value.h=L.h,u.value.s=L.s,u.value.v=L.v}if(Y(z,D),h!==void 0&&D!==!0&&h.target.selectionEnd!==void 0){const L=h.target.selectionEnd;je(()=>{h.target.setSelectionRange(L,L)})}}function Z(a,v){let b;const h=a.target.value;if(fe(a),I.value==="hex"){if(h.length!==(p.value===!0?9:7)||!/^#[0-9A-Fa-f]+$/.test(h))return!0;b=wt(h)}else{let g;if(h.endsWith(")"))if(p.value!==!0&&h.startsWith("rgb(")){if(g=h.substring(4,h.length-1).split(",").map(z=>parseInt(z,10)),g.length!==3||!/^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/.test(h))return!0}else if(p.value===!0&&h.startsWith("rgba(")){if(g=h.substring(5,h.length-1).split(","),g.length!==4||!/^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/.test(h))return!0;for(let L=0;L<3;L++){const ee=parseInt(g[L],10);if(ee<0||ee>255)return!0;g[L]=ee}const z=parseFloat(g[3]);if(z<0||z>1)return!0;g[3]=z}else return!0;else return!0;if(g[0]<0||g[0]>255||g[1]<0||g[1]>255||g[2]<0||g[2]>255||p.value===!0&&(g[3]<0||g[3]>1))return!0;b={r:g[0],g:g[1],b:g[2],a:p.value===!0?g[3]*100:void 0}}const D=Fe(b);if(u.value.h=D.h,u.value.s=D.s,u.value.v=D.v,Y(b,v),v!==!0){const g=a.target.selectionEnd;je(()=>{a.target.setSelectionRange(g,g)})}}function oe(a){const v=ne(a),b={r:v.r,g:v.g,b:v.b,a:v.a};b.a===void 0&&(b.a=u.value.a),u.value.h=v.h,u.value.s=v.s,u.value.v=v.v,Y(b,!0)}function me(a){a.isFinal?ie(a.position.left,a.position.top,!0):we(a)}const we=xt(a=>{ie(a.position.left,a.position.top)},20);function le(a){ie(a.pageX-window.pageXOffset,a.pageY-window.pageYOffset,!0)}function re(a){ie(a.pageX-window.pageXOffset,a.pageY-window.pageYOffset)}function de(a){q.value!==null&&(q.value.$el.style.opacity=a?1:0)}function he(a){I.value=a}function ke(){const a=[];return e.noHeaderTabs!==!0&&a.push(o(We,{class:"q-color-picker__header-tabs",modelValue:I.value,dense:!0,align:"justify","onUpdate:modelValue":he},()=>[o(qe,{label:"HEX"+(p.value===!0?"A":""),name:"hex",ripple:!1}),o(qe,{label:"RGB"+(p.value===!0?"A":""),name:"rgb",ripple:!1})])),a.push(o("div",{class:"q-color-picker__header-banner row flex-center no-wrap"},[o("input",{class:"fit",value:u.value[I.value],...m.value!==!0?{readonly:!0}:{},...R("topIn",{onInput:v=>{de(Z(v)===!0)},onChange:fe,onBlur:v=>{Z(v,!0)===!0&&B.$forceUpdate(),de(!1)}})}),o(Me,{ref:q,class:"q-color-picker__error-icon absolute no-pointer-events",name:c.iconSet.type.negative})])),o("div",{class:"q-color-picker__header relative-position overflow-hidden"},[o("div",{class:"q-color-picker__header-bg absolute-full"}),o("div",{class:w.value,style:s.value},a)])}function J(){return o(_t,{modelValue:K.value,animated:!0},()=>[o(Ee,{class:"q-color-picker__spectrum-tab overflow-hidden",name:"spectrum"},Ce),o(Ee,{class:"q-pa-md q-color-picker__tune-tab",name:"tune"},ye),o(Ee,{class:"q-color-picker__palette-tab",name:"palette"},be)])}function Se(a){K.value=a}function Te(){return o("div",{class:"q-color-picker__footer relative-position overflow-hidden"},[o(We,{class:"absolute-full",modelValue:K.value,dense:!0,align:"justify","onUpdate:modelValue":Se},()=>[o(qe,{icon:c.iconSet.colorPicker.spectrum,name:"spectrum",ripple:!1}),o(qe,{icon:c.iconSet.colorPicker.tune,name:"tune",ripple:!1}),o(qe,{icon:c.iconSet.colorPicker.palette,name:"palette",ripple:!1})])])}function Ce(){const a={ref:O,class:"q-color-picker__spectrum non-selectable relative-position cursor-pointer"+(m.value!==!0?" readonly":""),style:A.value,...m.value===!0?{onClick:le,onMousedown:re}:{}},v=[o("div",{style:{paddingBottom:"100%"}}),o("div",{class:"q-color-picker__spectrum-white absolute-full"}),o("div",{class:"q-color-picker__spectrum-black absolute-full"}),o("div",{class:"absolute",style:P.value},[u.value.hex!==void 0?o("div",{class:"q-color-picker__spectrum-circle"}):null])],b=[o(pe,{class:"q-color-picker__hue non-selectable",modelValue:u.value.h,min:0,max:360,trackSize:"8px",innerTrackColor:"transparent",selectionColor:"transparent",readonly:m.value!==!0,thumbPath:Ke,"onUpdate:modelValue":ae,onChange:se})];return p.value===!0&&b.push(o(pe,{class:"q-color-picker__alpha non-selectable",modelValue:u.value.a,min:0,max:100,trackSize:"8px",trackColor:"white",innerTrackColor:"transparent",selectionColor:"transparent",trackImg:Qt,readonly:m.value!==!0,hideSelection:!0,thumbPath:Ke,...R("alphaSlide",{"onUpdate:modelValue":h=>S(h,"a",100),onChange:h=>S(h,"a",100,void 0,!0)})})),[Ze("div",a,v,"spec",m.value,()=>ve.value),o("div",{class:"q-color-picker__sliders"},b)]}function ye(){return[o("div",{class:"row items-center no-wrap"},[o("div","R"),o(pe,{modelValue:u.value.r,min:0,max:255,color:"red",dark:t.value,readonly:m.value!==!0,...R("rSlide",{"onUpdate:modelValue":a=>S(a,"r",255),onChange:a=>S(a,"r",255,void 0,!0)})}),o("input",{value:u.value.r,maxlength:3,readonly:m.value!==!0,onChange:fe,...R("rIn",{onInput:a=>S(a.target.value,"r",255,a),onBlur:a=>S(a.target.value,"r",255,a,!0)})})]),o("div",{class:"row items-center no-wrap"},[o("div","G"),o(pe,{modelValue:u.value.g,min:0,max:255,color:"green",dark:t.value,readonly:m.value!==!0,...R("gSlide",{"onUpdate:modelValue":a=>S(a,"g",255),onChange:a=>S(a,"g",255,void 0,!0)})}),o("input",{value:u.value.g,maxlength:3,readonly:m.value!==!0,onChange:fe,...R("gIn",{onInput:a=>S(a.target.value,"g",255,a),onBlur:a=>S(a.target.value,"g",255,a,!0)})})]),o("div",{class:"row items-center no-wrap"},[o("div","B"),o(pe,{modelValue:u.value.b,min:0,max:255,color:"blue",readonly:m.value!==!0,dark:t.value,...R("bSlide",{"onUpdate:modelValue":a=>S(a,"b",255),onChange:a=>S(a,"b",255,void 0,!0)})}),o("input",{value:u.value.b,maxlength:3,readonly:m.value!==!0,onChange:fe,...R("bIn",{onInput:a=>S(a.target.value,"b",255,a),onBlur:a=>S(a.target.value,"b",255,a,!0)})})]),p.value===!0?o("div",{class:"row items-center no-wrap"},[o("div","A"),o(pe,{modelValue:u.value.a,color:"grey",readonly:m.value!==!0,dark:t.value,...R("aSlide",{"onUpdate:modelValue":a=>S(a,"a",100),onChange:a=>S(a,"a",100,void 0,!0)})}),o("input",{value:u.value.a,maxlength:3,readonly:m.value!==!0,onChange:fe,...R("aIn",{onInput:a=>S(a.target.value,"a",100,a),onBlur:a=>S(a.target.value,"a",100,a,!0)})})]):null]}function be(){const a=v=>o("div",{class:"q-color-picker__cube col-auto",style:{backgroundColor:v},...m.value===!0?R("palette#"+v,{onClick:()=>{oe(v)}}):{}});return[o("div",{class:"row items-center q-color-picker__palette-rows"+(m.value===!0?" q-color-picker__palette-rows--editable":"")},E.value.map(a))]}return()=>{const a=[J()];return e.name!==void 0&&e.disable!==!0&&F(a,"push"),e.noHeader!==!0&&a.unshift(ke()),e.noFooter!==!0&&a.push(Te()),o("div",{class:U.value,...W.value},a)}}});export{Wt as Q,Ft as a,Dt as b,qe as c,We as d,Et as u};
