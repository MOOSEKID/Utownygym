import{Q as c}from"./QPage.b13c45b6.js";import{_ as u,T as b,U as f,d as s,o as g,e as k,w as t,h as i,ae as C,j as w,t as l,g as R}from"./index.ec7eb99e.js";import{u as n}from"./group.1903fd21.js";import{R as y,d as _}from"./mixins.af528ab3.js";import"./StateSelect.d3ce42fc.js";import"./index.becf6c0c.js";import"./CitySelect.367b922a.js";import"./BaseSectionSkeleton.971da8dd.js";import"./QSkeleton.73bc54f6.js";import"./page.e7247b54.js";import"./QExpansionItem.38c12bfd.js";import"./QSlideTransition.d1b840b3.js";import"./QMenu.76199ca9.js";import"./selection.571043d0.js";import"./SkeletonSinglePage.dba71dd3.js";const q={mixins:[y],data(){return{store:n(),pagination:{..._,sortBy:"name"}}},methods:{...b(n,["get"]),singleRoute(o){return{name:"Group",params:{id:o.id},query:{action:"edit",title:o.name}}}},computed:{...f(n,["actions","rows","columns","module","toolbar","filters"])}},v={class:"ellipsis-2-lines"};function B(o,a,G,P,r,T){const d=s("base-btn"),p=s("base-table"),m=s("base-section");return g(),k(c,{padding:""},{default:t(()=>[i(m,{flat:"",bordered:"","no-row":""},{default:t(()=>[i(p,{store:r.store,module:o.module,columns:o.columns,rows:o.rows,actions:o.actions,toolbar:o.toolbar,filters:o.filters,loading:o.loading,pagination:r.pagination,onRequest:o.onRequest,onActionClicked:o.actionClicked,onToolbarClicked:o.toolbarClicked,onRowClicked:o.rowClicked,"no-data-label":o.$t("groups.noData"),"table-key":"groups",selection:"multiple",selected:o.selected,"onUpdate:selected":a[1]||(a[1]=e=>o.selected=e),"hide-label":""},{"body-cell-name":t(e=>[i(d,{onClick:a[0]||(a[0]=C(()=>{},["stop"])),link:"",tag:"a",to:{name:"Group",params:{id:e.row.id},query:{action:"edit"}}},{default:t(()=>[w(l(e.value),1)]),_:2},1032,["to"])]),"body-cell-description":t(e=>[R("div",v,l(e.value),1)]),_:1},8,["store","module","columns","rows","actions","toolbar","filters","loading","pagination","onRequest","onActionClicked","onToolbarClicked","onRowClicked","no-data-label","selected"])]),_:1})]),_:1})}var I=u(q,[["render",B]]);export{I as default};
