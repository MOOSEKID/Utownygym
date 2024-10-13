import{_ as p,T as u,U as b,d as s,o as g,e as f,w as t,h as a,ae as k,j as w,t as C,Y as v}from"./index.ec7eb99e.js";import{Q as P}from"./QPage.b13c45b6.js";import{u as i}from"./plan.0dadec60.js";import{R as y,d as _}from"./mixins.af528ab3.js";import{S as h}from"./SettingsPageHeader.b1719c9d.js";import"./StateSelect.d3ce42fc.js";import"./index.becf6c0c.js";import"./CitySelect.367b922a.js";import"./BaseSectionSkeleton.971da8dd.js";import"./QSkeleton.73bc54f6.js";import"./page.e7247b54.js";import"./QExpansionItem.38c12bfd.js";import"./QSlideTransition.d1b840b3.js";import"./QMenu.76199ca9.js";import"./selection.571043d0.js";import"./SkeletonSinglePage.dba71dd3.js";const R={components:{SettingsPageHeader:h},mixins:[y],data(){return{store:i(),pagination:{..._,sortBy:"label"}}},methods:{...u(i,["get","changeActive"]),singleRoute(e){return{name:"Plan",params:{id:e.id},query:{action:"edit",title:e.label}}}},computed:{...b(i,["actions","rows","columns","module","toolbar","filters"])}};function S(e,n,q,A,l,T){const r=s("settings-page-header"),d=s("base-btn"),m=s("base-table"),c=s("base-section");return g(),f(P,{padding:""},{default:t(()=>[a(r,{"back-route":"Settings",class:"q-mb-md",title:"Plans",hint:"Effortlessly manage and customize your subscription plans in the Settings section for a tailored and seamless experience."}),a(c,{flat:"",bordered:"","no-row":""},{default:t(()=>[a(m,{"hide-label":"",store:l.store,module:e.module,columns:e.columns,rows:e.rows,actions:e.actions,toolbar:e.toolbar,filters:e.filters,loading:e.loading,pagination:l.pagination,onRequest:e.onRequest,onActionClicked:e.actionClicked,onToolbarClicked:e.toolbarClicked,onRowClicked:e.rowClicked,"no-data-label":e.$t("plans.noData"),"table-key":"plans",selection:"multiple",selected:e.selected,"onUpdate:selected":n[1]||(n[1]=o=>e.selected=o),"grid-columns":["label,prices"]},{"body-cell-label":t(o=>[a(d,{onClick:n[0]||(n[0]=k(()=>{},["stop"])),link:"",tag:"a",to:{name:"Plan",params:{id:o.row.id},query:{action:"edit"}}},{default:t(()=>[w(C(o.value),1)]),_:2},1032,["to"])]),"body-cell-is_active":t(o=>[a(v,{"onUpdate:modelValue":U=>e.changeActive(o.row),size:"sm",dense:"","model-value":o.row.is_active,color:"green"},null,8,["onUpdate:modelValue","model-value"])]),_:1},8,["store","module","columns","rows","actions","toolbar","filters","loading","pagination","onRequest","onActionClicked","onToolbarClicked","onRowClicked","no-data-label","selected"])]),_:1})]),_:1})}var K=p(R,[["render",S]]);export{K as default};
