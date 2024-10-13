import{bt as V,A as h,_ as I,T as q,m as L,U as C,d as g,o as v,e as j,w as i,h as n,R as P,N as y,ae as w,j as B,t as _,f as S,i as $,g as u,ah as T,s as E,F as O}from"./index.ec7eb99e.js";import{Q as U}from"./QSelect.ad394656.js";import{Q as x}from"./QPage.b13c45b6.js";import{u as M,a as N}from"./tag.6f04df2c.js";import{u as Q}from"./category.83d9548f.js";import{u as D}from"./collection.5ec0fec2.js";import{u as R}from"./location.60ab6585.js";import"./QField.ad3f8f9a.js";import"./QChip.cb7fa0e0.js";import"./QMenu.76199ca9.js";import"./selection.571043d0.js";import"./rtl.276c3f1b.js";const Z=M(),K=Q(),z=N(),F=D(),k=R(),A=e=>[{label:e.$t("label.bestSelling"),value:"BEST_SELLING"},{label:e.$t("label.productTitleAZ"),value:"TITLE_ASC"},{label:e.$t("label.productTitleZA"),value:"TITLE_DESC"},{label:e.$t("label.lowestAvailable"),value:"AVAILABLE_ASC"},{label:e.$t("label.highestAvailable"),value:"AVAILABLE_DESC"},{label:e.$t("label.skuAZ"),value:"SKU_ASC"},{label:e.$t("label.skuZA"),value:"SKU_DESC"}],f=V("product/inventory",{getters:{module:e=>({name:"Inventories",label:e.$t("label.inventories"),singular:e.$t("singular.inventory"),plural:e.$t("plural.inventories")}),columns:e=>[{name:"product",align:"left",label:e.$t("label.product"),field:"product_title",style:"width: 40px",sortable:!1},{name:"sku",align:"left",label:e.$t("label.sku"),field:t=>t.sku?t.sku:"No SKU",sortable:!1},{name:"out_of_stock_track_inventory",align:"left",label:e.$t("label.whenSoldOut"),field:t=>t.out_of_stock_track_inventory?"Continue selling":"Stop selling",sortable:!1},{name:"available",align:"center",label:e.$t("label.available"),field:t=>t.available<=0?`<span class="no-inventory">${t.available}</span>`:t.available,sortable:!1},{name:"edit_quantity",align:"left",label:e.$t("label.editQuantity"),field:"edit_quantity",style:"width: 250px",sortable:!1}],toolbar:e=>[{title:e.$t("label.location"),placeholder:"Select location",component:"base-select",filterMethod:k.get,action:"request",icon:"fas fa-map-marker-alt",key:"location",emitValue:!0,dense:!0,outlined:!0,mapOptions:!0,optionLabel:"name",optionvalue:"id",style:"min-width: 200px",deleted:"all"},{title:e.$t("label.sortBy"),action:"request",component:"base-select",dense:!0,outlined:!0,key:"sortBy",optionsDense:!0,mapOptions:!0,emitValue:!0,icon:"fas fa-sort",options:A(e),deleted:"all"},{label:e.$t("label.filters"),icon:"fas fa-sort-alt",action:"filter",color:"grey-6",deleted:"all"},{label:e.$t("label.viewProducts"),action:"route",route:"Products",color:"primary",deleted:"all"}],filters:e=>[{title:e.$t("label.vendor"),component:"base-select",filterMethod:Z.get,placeholder:"Select vendor",mapOptions:!0,optionLabel:"name",optionvalue:"id",outlined:!0,dense:!0,clearable:!0,emitValue:!0,key:"vendor"},{title:e.$t("label.category"),component:"base-select",placeholder:"Select category",filterMethod:K.get,mapOptions:!0,optionLabel:"name",optionvalue:"id",outlined:!0,dense:!0,clearable:!0,emitValue:!0,key:"category"},{title:e.$t("label.taggedWith"),component:"base-select",placeholder:"Select tag",filterMethod:z.get,mapOptions:!0,optionLabel:"name",optionvalue:"id",outlined:!0,dense:!0,clearable:!0,emitValue:!0,key:"tag"},{title:e.$t("label.collection"),component:"base-select",placeholder:"Select collection",filterMethod:F.get,mapOptions:!0,optionLabel:"name",optionvalue:"id",outlined:!0,dense:!0,clearable:!0,emitValue:!0,key:"collection"},{title:e.$t("label.location"),placeholder:"Select location",component:"base-select",filterMethod:k.get,mapOptions:!0,optionLabel:"name",optionvalue:"id",outlined:!0,dense:!0,clearable:!0,emitValue:!0,key:"location"},{title:e.$t("label.sortBy"),component:"base-select",dense:!0,outlined:!0,key:"sortBy",optionsDense:!0,mapOptions:!0,emitValue:!0,options:A(e)}]},actions:{get(e){return new Promise((t,o)=>{h.get("inventories",e).then(l=>{this.setRows(l.data.map(s=>({...s,adjust_type:"add",adjust_value:0,has_changed:!1}))),t(l)}).catch(l=>{o(l)})})},update(e){return new Promise((t,o)=>{h.put(`inventories/${e.id}`,e).then(l=>{t(l)}).catch(l=>{o(l)})})}}});const H={data(){return{loading:!1,loaded:!1,pagination:{sortBy:"TITLE_ASC",descending:!1,page:1,filter:"",deleted:!1,rowsPerPage:15,rowsNumber:15,loaded:!1},useInventoryStore:f()}},methods:{...q(f,["get","update"]),onRequest(e){console.func("pages/admins/products/InventoryPage:methods.onRequest()",arguments);const{page:t,rowsPerPage:o,sortBy:l,descending:s,location:r,vendor:c,category:b,tag:m,collection:p}=e.pagination;this.pagination=e.pagination,this.loading=!0,this.get({...e.pagination,vendor:c==null?void 0:c.id,category:b==null?void 0:b.id,tag:m==null?void 0:m.id,collection:p==null?void 0:p.id,location:r==null?void 0:r.id,has_adjust:!0,descending:s?"desc":"asc"}).then(({meta:a})=>{this.pagination.rowsNumber=a.total,this.pagination.page=t,this.pagination.rowsPerPage=o,this.pagination.sortBy=l,this.pagination.descending=s,this.pagination.loaded=!0,this.pagination.from=a.from,this.pagination.to=a.to,this.loading=!1}).catch(a=>{this.$emit("error",a)})},onUpdate(e){console.func("pages/admins/products/InventoryPage:methods.Update()",arguments);const t=L.exports.cloneDeep(e);t.available=t.adjust_type==="add"?parseInt(t.available)+parseInt(t.adjust_value):t.adjust_value,t.has_adjust=!0,this.update(t).then(({data:o,message:l})=>{Object.assign(e,o),this.$q.notify(l)}).catch(o=>{this.$core.error(o,{title:"Error"})})},getAvailable(e){return e.adjust_type==="add"?parseInt(e.available)+parseInt(e.adjust_value):e.adjust_value}},computed:{...C(f,["rows","module","columns","toolbar","filters"])}},G={key:0},W={class:"qtype col-auto"},J={class:"qvalue col"},X={class:"qbutton col-auto"},Y=["innerHTML"],ee={class:"q-ml-xs no-inventory"};function te(e,t,o,l,s,r){const c=g("base-thumbnail"),b=g("base-btn"),m=g("base-table"),p=g("base-section");return v(),j(x,{padding:""},{default:i(()=>[n(p,{flat:"",bordered:"","no-row":""},{default:i(()=>[n(m,{store:s.useInventoryStore,module:e.module,columns:e.columns,rows:e.rows,toolbar:e.toolbar,filters:e.filters,loading:s.loading,pagination:s.pagination,onRequest:r.onRequest,"no-data-label":e.$t("label.noInventoryAvaialble")},{"body-cell-product":i(a=>[n(P,{class:"q-pa-none",dense:""},{default:i(()=>[n(y,{avatar:""},{default:i(()=>[n(c,{size:40,media:a.row.thumbnail},null,8,["media"])]),_:2},1024),n(y,{avatar:""},{default:i(()=>{var d;return[n(b,{onClick:t[0]||(t[0]=w(()=>{},["stop"])),link:"",size:"12px",tag:"a",to:{name:"Products Variant",params:{product_id:a.row.variant.product_id,variant_id:a.row.variant_id},query:{action:"edit"}}},{default:i(()=>[B(_(a.value),1)]),_:2},1032,["to"]),a.row.variant?(v(),S("div",G,_((d=a.row.variant)==null?void 0:d.title),1)):$("",!0)]}),_:2},1024)]),_:2},1024)]),"body-cell-edit_quantity":i(a=>[u("div",{onClick:t[1]||(t[1]=w(()=>{},["stop"])),class:"edit-quantity rounded-borders row"},[u("div",W,[n(U,{dense:"",borderless:"",modelValue:a.row.adjust_type,"onUpdate:modelValue":d=>a.row.adjust_type=d,"map-options":"","emit-value":"",options:[{label:"Set",value:"set"},{label:"Add",value:"add"}]},null,8,["modelValue","onUpdate:modelValue"])]),u("div",J,[n(T,{dense:"",borderless:"",modelValue:a.row.adjust_value,"onUpdate:modelValue":[d=>a.row.adjust_value=d,d=>a.row.has_changed=!0],type:"number","input-style":"text-align: center"},null,8,["modelValue","onUpdate:modelValue"])]),u("div",X,[n(E,{flat:"",disable:!a.row.has_changed,color:a.row.has_changed?"primary":"grey",icon:"fal fa-save",style:{height:"100%"},onClick:d=>r.onUpdate(a.row)},null,8,["disable","color","onClick"])])])]),"body-cell-available":i(a=>[u("span",{innerHTML:a.value},null,8,Y),a.row.available!==r.getAvailable(a.row)?(v(),S(O,{key:0},[t[2]||(t[2]=u("span",{class:"q-ml-xs text-bold"},">",-1)),u("span",ee,_(r.getAvailable(a.row)),1)],64)):$("",!0)]),_:1},8,["store","module","columns","rows","toolbar","filters","loading","pagination","onRequest","no-data-label"])]),_:1})]),_:1})}var pe=I(H,[["render",te]]);export{pe as default};
