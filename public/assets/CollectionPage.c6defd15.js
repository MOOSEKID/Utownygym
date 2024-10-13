import{T as B,U as T,_ as D,d as u,o as p,e as b,w as n,h as o,al as Q,g as a,ah as R,X as G,V as M,f as S,F as A,p as E,R as L,N as h,O as X,W as O,j as m,t as v,i as P,ck as Y,cl as K,s as f,aq as Z,ad as $,af as ee,cr as oe,m as C,cw as te,n as le,k as ne,ae as ie}from"./index.ec7eb99e.js";import{Q as w}from"./QSelect.ad394656.js";import{Q as se}from"./QPage.b13c45b6.js";import{S as ae}from"./SeoSection.b5bacff3.js";import{u as U}from"./index.22ce7155.js";import{S as de}from"./SkeletonSinglePage.dba71dd3.js";import{u as re}from"./category.83d9548f.js";import{u as ue}from"./collection.5ec0fec2.js";import"./QField.ad3f8f9a.js";import"./QChip.cb7fa0e0.js";import"./QMenu.76199ca9.js";import"./selection.571043d0.js";import"./rtl.276c3f1b.js";import"./tag.6f04df2c.js";import"./QSkeleton.73bc54f6.js";const ce={data(){return{selected:this.modelValue,products:[],current_page:1,last_page:1,loading:!1,filter:this.query,sortBy:"TITLE_ASC"}},props:{modelValue:{required:!1,type:[Array],default:()=>[]},hint:[String],query:[String],title:{type:[String],default:"Select products"},loadFromServer:{type:[Boolean],required:!1,default:!0}},emits:["ok","hide"],methods:{...B(U,["get"]),onLoadProduct(l){console.func("components/product/ProductSelector:methods.onLoadProduct()",arguments),this.loading=!0,this.current_page=l.page,this.get({...l,filter:this.filter,order:this.sortBy,limit:10,order:"title",descending:"asc",options:!0}).then(({data:t,meta:r})=>{this.products=t,this.current_page=r.current_page,this.last_page=r.last_page,this.loading=!1}).catch(()=>{this.loading=!1})},async show(){console.func("components/product/ProductSelector:methods.show()",arguments),this.loadFromServer&&await this.onLoadProduct({page:this.current_page}),this.$refs.dialog.show()},hide(){console.func("components/product/ProductSelector:methods.close()",arguments),this.$refs.dialog.hide()},onDialogHide(){console.func("components/product/ProductSelector:methods.onDialogHide()",arguments),this.$emit("hide")},onDone(){console.func("components/product/ProductSelector:methods.onDone()",arguments),this.$emit("ok",this.selected),this.hide()},onBrowseProduct(l){console.func("components/product/ProductSelector:methods.onBrowseProduct()",arguments),this.filter=l,this.onLoadProduct({page:1})}},computed:{...T(U,["sortOptions"]),disable(){return this.selected===this.modelValue}}},pe={class:"col"},me={class:"col-auto"},ge={class:"q-gutter-sm"};function he(l,t,r,V,e,s){const g=u("base-thumbnail"),y=u("base-status"),c=u("base-dialog");return p(),b(c,{title:r.title,"body-class":"q-pa-none","body-style":"",ref:"dialog",persistent:"",onHide:s.onDialogHide,"use-separator":""},{body:n(()=>[o(Q,{class:"q-col-gutter-md row"},{default:n(()=>[a("div",pe,[o(R,{dense:"",outlined:"",type:"text",modelValue:e.filter,"onUpdate:modelValue":[t[0]||(t[0]=d=>e.filter=d),t[1]||(t[1]=d=>s.onBrowseProduct(d,"filter"))],clearable:"",debounce:"500",placeholder:"Search products"},null,8,["modelValue"])]),a("div",me,[o(w,{style:{width:"200px"},prefix:"Sort: ","map-options":"","options-dense":"","emit-value":"",modelValue:e.sortBy,"onUpdate:modelValue":[t[2]||(t[2]=d=>e.sortBy=d),t[3]||(t[3]=d=>s.onBrowseProduct(d,"sortBy"))],options:l.sortOptions,dense:"",outlined:""},null,8,["modelValue","options"])])]),_:1}),o(G),o(M,{class:"bordered scroll",style:{"max-height":"50vh","min-height":"50vh"}},{default:n(()=>[e.loading?P("",!0):(p(!0),S(A,{key:0},E(e.products,(d,q)=>(p(),b(L,{key:q,class:"",tag:"label"},{default:n(()=>[o(h,{style:{"min-width":"auto"},avatar:""},{default:n(()=>[o(X,{size:"sm",dense:"",modelValue:e.selected,"onUpdate:modelValue":t[4]||(t[4]=k=>e.selected=k),val:d.id},null,8,["modelValue","val"])]),_:2},1024),o(h,{style:{"min-width":"auto"},avatar:""},{default:n(()=>[o(g,{size:50,media:d.thumbnail},null,8,["media"])]),_:2},1024),o(h,null,{default:n(()=>[o(O,{class:"label"},{default:n(()=>[m(v(d.title),1)]),_:2},1024),o(O,{class:"status"},{default:n(()=>[o(y,{type:d.status},null,8,["type"])]),_:2},1024)]),_:2},1024)]),_:2},1024))),128)),o(Y,{showing:e.loading},{default:n(()=>[o(K,{size:"50px",color:"primary"})]),_:1},8,["showing"])]),_:1})]),footer:n(()=>[o(Q,{class:"flex"},{default:n(()=>[r.loadFromServer?(p(),S(A,{key:0},[o(f,{disable:e.current_page<=1||e.loading,onClick:t[5]||(t[5]=d=>s.onLoadProduct({page:e.current_page-1>=1?e.current_page-1:1})),dense:"",round:"",flat:"",color:"primary",icon:"fal fa-angle-left"},null,8,["disable"]),o(f,{disable:e.current_page==e.last_page||e.loading,onClick:t[6]||(t[6]=d=>s.onLoadProduct({page:e.current_page+1<=e.last_page?e.current_page+1:1})),dense:"",round:"",flat:"",color:"primary",icon:"fal fa-angle-right"},null,8,["disable"])],64)):P("",!0),o(Z),a("div",ge,[$(o(f,{"no-caps":"",outline:"",label:l.$t("label.cancel"),color:"grey"},null,8,["label"]),[[ee]]),o(f,{disable:s.disable,"no-caps":"",label:l.$t("label.done"),color:"primary",onClick:s.onDone},null,8,["disable","label","onClick"])])]),_:1})]),_:1},8,["title","onHide"])}var be=D(ce,[["render",he]]);const x={name:"",description:"",status:"Draft",type:"manual",conditions:[{id:!1,type:"title",relation:"EQUALS",value:null}]},fe={components:{SeoSection:ae,ThumbnailSelector:oe,SkeletonSinglePage:de},data(){return{loaded:!1,submited:!1,default:C.exports.cloneDeep(x),collection:C.exports.cloneDeep(x),pagination:{sortBy:"TITLE_ASC",descending:!1,page:1,filter:"",rowsPerPage:15,rowsNumber:15,loaded:!1,loading:!1},options:[],condition_types_options:[{label:"Product title",value:"title"},{label:"Product category",value:"category:name"},{label:"Product vendor",value:"vendor:name"},{label:"Product price",value:"variants:price"},{label:"Product tag",value:"tags:name"},{label:"Compare at price",value:"variants:compare_at_price"},{label:"Weight",value:"variants:weight"},{label:"Inventory stock",value:"stocks"},{label:"Variant\u2019s title",value:"variants:title"}],condition_relations_options:[{label:"is equal to",value:"EQUALS"},{label:"is not equal to",value:"NOT_EQUALS"},{label:"is greater than",value:"GREATER_THAN"},{label:"is less than",value:"LESS_THAN"},{label:"starts with",value:"STARTS_WITH"},{label:"ends with",value:"ENDS_WITH"},{label:"contains",value:"CONTAINS"},{label:"does not contain",value:"NOT_CONTAINS"},{label:"is not empty",value:"IS_NULL"},{label:"is empty",value:"IS_NOT_NULL"}]}},methods:{...B(ue,["show","store","update","addProducts"]),...B(U,["get"]),onSubmit(l){console.func("pages/admins/collections/CollectionPage:methods.onSubmit()",arguments),this.submited=!0,(this.creating?this.store:this.update)(this.collection).then(({data:r,message:V})=>{this.submited=!1,this.$q.notify(V),this.collection=r,this.default=C.exports.cloneDeep(r),this.$router.push({name:"Collection",params:{id:r.id},query:{action:"edit"}}),this.onRequestProduct({pagination:this.pagination})}).catch(r=>{this.submited=!1,this.$core.error(r,{title:"Error"})})},onReset(l){console.func("pages/admins/collections/CollectionPage:methods.onReset()",arguments),this.loaded=!1,setTimeout(()=>{this.collection=C.exports.cloneDeep(this.default),this.loaded=!0,this.onRequestProduct({pagination:this.pagination})},1)},onCancel(l){console.func("pages/admins/collections/CollectionPage:methods.onCancel()",arguments),this.$router.back()},onAddCondition(l){console.func("pages/admins/collections/CollectionPage:method.onAddCondition()",arguments),this.collection.conditions.push(l)},onRemoveCondition(l){console.func("pages/admins/collections/CollectionPage:method.onRemoveCondition()",arguments),this.collection.conditions.splice(l,1),this.onRequestProduct({pagination:this.pagination})},onRequestProduct(l){var g,y;console.func("pages/admins/collections/CollectionPage:methods.onRequest()",arguments);const{page:t,rowsPerPage:r,sortBy:V,descending:e}=l.pagination;this.pagination=l.pagination;const s={...l.pagination,descending:e?"desc":"asc",collection:this.collection.id};this.collection.type==="automated"&&(s.conditions_type=this.collection.conditions_type,s.conditions=(y=(g=this.collection)==null?void 0:g.conditions)==null?void 0:y.filter(c=>c.value).map(c=>({type:c.type,relation:c.relation,value:c.value}))),this.get(s).then(({data:c,meta:d})=>{this.pagination.rowsNumber=d.total,this.pagination.page=t,this.pagination.rowsPerPage=r,this.pagination.sortBy=V,this.pagination.descending=e,this.pagination.loaded=!0,this.pagination.from=d.from,this.pagination.to=d.to,this.pagination.loading=!1}).catch(()=>{this.pagination.loading=!1})},onUpdateType(l){console.func("pages/admins/collections/CollectionPage:methods.onUpdateType()",arguments),this.collection.type=l,this.onRequestProduct({pagination:this.pagination})},onUpdateConditionType(l){console.func("pages/admins/collections/CollectionPage:methods.onUpdateConditionType()",arguments),this.collection.conditions_type=l,this.onRequestProduct({pagination:this.pagination})},onUpdateCondition(){console.func("pages/admins/collections/CollectionPage:methods.onUpdateCondition()",arguments),this.onRequestProduct({pagination:this.pagination})},onUpdateSortBy(){console.func("pages/admins/collections/CollectionPage:methods.onUpdateSortBy()",arguments),this.onRequestProduct({pagination:this.pagination})},onBrowseProduct(l){console.func("pages/admins/collections/CollectionPage:methods.onBrowseProduct()",arguments),this.$q.dialog({component:be,componentProps:{query:l}}).onOk(t=>{console.func("pages/admins/collections/CollectionPage:methods.onBrowseProduct.onOk()",t),this.addProducts({id:this.collection.id,products:t}).then(({message:r})=>{this.$q.notify(r),this.pagination.page=1,this.onRequestProduct({pagination:this.pagination})}).catch(r=>{this.$core.error(r,{title:"Error"})})})}},mounted(){this.creating?(this.loaded=!0,this.pagination.loaded=!0,this.pagination.loading=!1):this.show(this.id).then(l=>{this.collection=l,this.default=C.exports.cloneDeep(l),this.loaded=!0,this.onRequestProduct({pagination:this.pagination})}).catch(l=>{this.$core.error(l,{title:this.$t("dialog.title.error")})})},computed:{...T(U,["rows","sortOptions"]),...T(re,{columns:"productColumns"}),edit(){return["add","edit"].includes(this.action)||this.creating},creating(){return this.id==="add"},id(){return this.$route.params.id},action(){return this.$route.query.action},disable(){return this.default&&JSON.stringify(this.collection)===JSON.stringify(this.default)},resetable(){return this.default&&JSON.stringify(this.collection)!==JSON.stringify(this.default)}}},ye={class:"row q-col-gutter-md"},_e={class:"col-xs-12 col-sm-9"},ve={class:"q-gutter-md"},Se={class:"col-xs-12"},Pe={class:"col-xs-12"},Ve={class:"col-xs-12"},Ce={key:0,class:"conditions-box q-mt-sm"},we={class:"conditions-type"},Ue={class:"conditions-list q-mt-md"},qe={class:"q-mb-md row q-col-gutter-md"},ke={key:0,class:"col"},Be={class:"col-xs-12 col-sm-3"},Te={class:"q-gutter-md"};function Re(l,t,r,V,e,s){const g=u("base-label"),y=u("base-editor"),c=u("base-section"),d=u("base-radio"),q=u("base-input"),k=u("base-thumbnail"),I=u("base-btn"),z=u("base-status"),H=u("base-table"),F=u("seo-section"),J=u("thumbnail-selector"),W=u("base-form"),j=u("skeleton-single-page");return p(),b(se,{padding:""},{default:n(()=>[e.loaded?(p(),b(W,{key:0,onSubmit:s.onSubmit,onCancel:s.onCancel,onReset:s.onReset,resetable:s.resetable,disable:s.disable,submited:e.submited},{default:n(()=>[a("div",ye,[a("div",_e,[a("div",ve,[o(c,{flat:"",bordered:"",title:"General information",description:"A great collection title and description has the power to turn a casual shopper into a revenue-generating buyer."},{default:n(()=>[a("div",Se,[o(g,null,{default:n(()=>[m(v(l.$t("label.name")),1)]),_:1}),o(R,{dense:"",outlined:"",modelValue:e.collection.name,"onUpdate:modelValue":t[0]||(t[0]=i=>e.collection.name=i),type:"text",placeholder:"e.g. Summer collection, Under $100, Staff picks"},null,8,["modelValue"])]),a("div",Pe,[o(g,null,{default:n(()=>[m(v(l.$t("label.descriptionOptional")),1)]),_:1}),o(y,{modelValue:e.collection.description,"onUpdate:modelValue":t[1]||(t[1]=i=>e.collection.description=i),"min-height":"10rem"},null,8,["modelValue"])])]),_:1}),o(c,{flat:"",bordered:"",title:"Collection type"},{default:n(()=>[a("div",Ve,[o(d,{"onUpdate:modelValue":[s.onUpdateType,t[2]||(t[2]=i=>e.collection.type=i)],modelValue:e.collection.type,label:l.$t("label.manual"),val:"manual"},{hint:n(()=>t[12]||(t[12]=[m(" Add products to this collection one by one. Learn more about "),a("a",{href:"javascript:void(0)"},"manual collections",-1),m(". ")])),_:1},8,["onUpdate:modelValue","modelValue","label"]),o(d,{"onUpdate:modelValue":[s.onUpdateType,t[3]||(t[3]=i=>e.collection.type=i)],modelValue:e.collection.type,label:l.$t("label.automated"),val:"automated"},{hint:n(()=>t[13]||(t[13]=[m(" Existing and future products that match the conditions you set will automatically be added to this collection. Learn more about "),a("a",{href:"javascript:void(0)"},"automated collections",-1),m(". ")])),_:1},8,["onUpdate:modelValue","modelValue","label"]),e.collection.type==="automated"?(p(),S("div",Ce,[a("div",we,[t[14]||(t[14]=a("div",{class:"text-label"}," Conditions (products must match) ",-1)),a("div",null,[o(te,{modelValue:e.collection.conditions_type,"onUpdate:modelValue":[t[4]||(t[4]=i=>e.collection.conditions_type=i),s.onUpdateConditionType],inline:"",dense:"",size:"sm",options:[{label:"all conditions",value:"all"},{label:"any conditions",value:"any"}]},null,8,["modelValue","onUpdate:modelValue"])])]),a("div",Ue,[(p(!0),S(A,null,E(e.collection.conditions,(i,N)=>(p(),S("div",{key:N,class:"q-mb-sm condition"},[o(L,{class:"q-pa-none"},{default:n(()=>[o(h,null,{default:n(()=>[o(w,{"map-options":"","options-dense":"","emit-value":"",modelValue:i.type,"onUpdate:modelValue":[_=>i.type=_,s.onUpdateCondition],options:e.condition_types_options,dense:"",outlined:"",debounce:"500"},null,8,["modelValue","onUpdate:modelValue","options"])]),_:2},1024),o(h,null,{default:n(()=>[o(w,{"map-options":"","options-dense":"","emit-value":"",modelValue:i.relation,"onUpdate:modelValue":[_=>i.relation=_,s.onUpdateCondition],options:e.condition_relations_options,dense:"",outlined:"",debounce:"500"},null,8,["modelValue","onUpdate:modelValue","options"])]),_:2},1024),o(h,null,{default:n(()=>[o(R,{"map-options":"","options-dense":"","emit-value":"",modelValue:i.value,"onUpdate:modelValue":[_=>i.value=_,s.onUpdateCondition],options:e.condition_relations_options,dense:"",outlined:"",debounce:"500"},null,8,["modelValue","onUpdate:modelValue","options"])]),_:2},1024),e.collection.conditions.length>1?(p(),b(h,{key:0,style:{"padding-left":"8px"},side:""},{default:n(()=>[o(f,{size:"sm",padding:"11px",outline:"",color:"negative",icon:"fad fa-trash-alt",dense:"",onClick:_=>s.onRemoveCondition(N)},null,8,["onClick"])]),_:2},1024)):P("",!0)]),_:2},1024)]))),128)),o(f,{class:"q-mt-sm","no-caps":"",outline:"",label:l.$t("label.addAnotherCondition"),onClick:t[5]||(t[5]=i=>s.onAddCondition({id:!1,type:"title",relation:"EQUALS",value:null}))},null,8,["label"])])])):P("",!0)])]),_:1}),!this.creating||this.creating&&e.collection.type==="automated"?(p(),b(c,{key:0,flat:"",bordered:"",title:"Products","no-row":""},{default:n(()=>[a("div",qe,[e.collection.type==="manual"?(p(),S("div",ke,[o(q,{placeholder:"Search products",debounce:"500","onUpdate:modelValue":s.onBrowseProduct},{after:n(()=>[o(f,{onClick:t[6]||(t[6]=i=>s.onBrowseProduct("")),"no-caps":"",outline:"",padding:"8px",style:{width:"100px"},color:"primary",label:l.$t("label.browse")},null,8,["label"])]),_:1},8,["onUpdate:modelValue"])])):P("",!0),a("div",{class:le({"col-auto":e.collection.type==="manual",col:e.collection.type!=="manual"})},[o(w,{style:ne({width:e.collection.type!=="manual"?"100%":"200px"}),prefix:"Sort: ","map-options":"","options-dense":"","emit-value":"",modelValue:e.pagination.sortBy,"onUpdate:modelValue":[t[7]||(t[7]=i=>e.pagination.sortBy=i),s.onUpdateSortBy],options:l.sortOptions,dense:"",outlined:""},null,8,["style","modelValue","options","onUpdate:modelValue"])],2)]),a("div",null,[o(H,{columns:l.columns,rows:l.rows,loading:e.pagination.loading,pagination:e.pagination,"hide-top":"",onRequest:s.onRequestProduct,"no-data-label":l.$t("label.noProductAvaialble")},{"body-cell-title":n(i=>[o(L,{class:"q-pa-none",dense:""},{default:n(()=>[o(h,{avatar:""},{default:n(()=>[o(k,{size:40,media:i.row.thumbnail},null,8,["media"])]),_:2},1024),o(h,{avatar:""},{default:n(()=>[o(I,{onClick:t[8]||(t[8]=ie(()=>{},["stop"])),link:"",size:"12px",tag:"a",to:{name:"Product",params:{id:i.row.id},query:{action:"edit"}}},{default:n(()=>[m(v(i.value),1)]),_:2},1032,["to"])]),_:2},1024)]),_:2},1024)]),"body-cell-status":n(i=>[o(z,{type:i.value},null,8,["type"])]),_:1},8,["columns","rows","loading","pagination","onRequest","no-data-label"])])]),_:1})):P("",!0),o(F,{flat:"",bordered:"",prefix:"http://yourshop.com/collections/",modelValue:e.collection,"onUpdate:modelValue":t[9]||(t[9]=i=>e.collection=i),message:"Add a name and description to see how this collection might appear in a search engine listing"},null,8,["modelValue"])])]),a("div",Be,[o(c,{flat:"",bordered:"","no-row":""},{default:n(()=>[a("div",Te,[a("div",null,[o(g,null,{default:n(()=>[m(v(l.$t("label.collectionStatus")),1)]),_:1}),o(w,{"options-dense":"",modelValue:e.collection.status,"onUpdate:modelValue":t[10]||(t[10]=i=>e.collection.status=i),options:["Active","Draft"],dense:"",outlined:""},null,8,["modelValue"])]),a("div",null,[o(g,null,{default:n(()=>[m(v(l.$t("label.thumbnail")),1)]),_:1}),o(J,{loadFromServer:!0,"dialog-label":l.$t("label.uploadthumbnail"),hint:"You can only choose images as collection thumbnail.",modelValue:e.collection.thumbnail,"onUpdate:modelValue":t[11]||(t[11]=i=>e.collection.thumbnail=i)},null,8,["dialog-label","modelValue"])])])]),_:1})])])]),_:1},8,["onSubmit","onCancel","onReset","resetable","disable","submited"])):(p(),b(j,{key:1}))]),_:1})}var Ge=D(fe,[["render",Re]]);export{Ge as default};
