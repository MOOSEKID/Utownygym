import{bt as s,A as o}from"./index.ec7eb99e.js";const n=e=>[{label:e.$t("label.all"),value:null},{label:e.$t("label.active"),value:"Active"},{label:e.$t("label.draft"),value:"Draft"}],i=s("product/collection",{state:()=>({rows:[]}),getters:{module:e=>({name:"Collections",label:e.$t("label.collections"),singular:e.$t("singular.collection"),plural:e.$t("plural.collections")}),columns:e=>[{name:"name",align:"left",label:e.$t("label.name"),field:"name",style:"width: 40px",sortable:!0},{name:"slug",align:"left",label:e.$t("label.slug"),field:"slug",style:"width: 40px",sortable:!0},{name:"status",align:"left",label:e.$t("label.status"),field:"status",style:"width: 40px",sortable:!0},{name:"actions",align:"right",sortable:!1}],actions:e=>[{label:e.$t("label.edit"),action:"route",route:"Collection",params:l=>({id:l.id}),query:l=>({action:"edit"}),icon:"fas fa-edit",deleted:!1},{label:e.$t("label.delete"),action:"delete",icon:"fas fa-trash-alt",deleted:!1},{label:e.$t("label.restore"),action:"restore",icon:"fas fa-trash-undo",deleted:!0}],toolbar:e=>[{label:e.$t("label.trashed"),action:"request",component:"base-toggle",dense:!0,key:"deleted",checkedIcon:"delete",deleted:"all"},{title:e.$t("label.status"),action:"request",component:"base-select",dense:!0,outlined:!0,key:"active",placeholder:e.$t("placeholder.select"),optionsDense:!0,style:"width: 150px",mapOptions:!0,emitValue:!0,options:n(e),prefix:e.$t("prefix.status"),deleted:"all"},{icon:"fad fa-plus-circle",label:e.$t("label.addCollection"),action:"route",params:{id:"add"},route:"Collection",color:"primary",deleted:"all"}],filters:e=>[]},actions:{get(e){return new Promise((l,a)=>{o.get("collections",e).then(t=>{this.setRows(t.data),l(t)}).catch(t=>{a(t)})})},options(e){return new Promise((l,a)=>{o.get("collections/options",e).then(t=>{this.setRows(t.data),l(t)}).catch(t=>{a(t)})})},store(e){return new Promise((l,a)=>{o.post("collections/store",e).then(t=>{l(t)}).catch(t=>{a(t)})})},show(e){return new Promise((l,a)=>{o.get(`collections/${e}`).then(t=>{l(t)}).catch(t=>{a(t)})})},update(e){return new Promise((l,a)=>{o.put(`collections/${e.id}`,e).then(t=>{l(t)}).catch(t=>{a(t)})})},delete(e){return new Promise((l,a)=>{o.delete(`collections/${e}/destroy`).then(t=>{l(t)}).catch(t=>{a(t)})})},deleteSelected(e){return new Promise((l,a)=>{o.delete("collections/destroy",{items:e}).then(t=>{l(t)}).catch(t=>{a(t)})})},restore(e){return new Promise((l,a)=>{o.post(`collections/${e}/restore`).then(t=>{l(t)}).catch(t=>{a(t)})})},restoreSelected(e){return new Promise((l,a)=>{o.post("collections/restore",{items:e}).then(t=>{l(t)}).catch(t=>{a(t)})})},addProducts(e){return new Promise((l,a)=>{o.post(`collections/${e.id}/add-products`,{products:e.products}).then(t=>{l(t)}).catch(t=>{a(t)})})}}});export{i as u};
