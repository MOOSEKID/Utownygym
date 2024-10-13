import{bt as o,c as s,A as l}from"./index.ec7eb99e.js";const c=o("announcement",{state:()=>({rows:[],permissions:{new:"announcements:new",edit:"announcements:edit",delete:"announcements:delete"}}),getters:{module:e=>({name:"Announcements",label:e.$t("label.announcements"),singular:e.$t("singular.announcement"),plural:e.$t("plural.announcements")}),columns:e=>[{name:"date",align:"left",label:e.$t("label.date"),field:"date_formated",style:"width: 40px",sortable:!0},{name:"open_at",align:"left",label:e.$t("label.openAt"),field:n=>n.is_closed?"-":n.open_at_formated,style:"width: 40px",sortable:!0},{name:"close_at",align:"left",label:e.$t("label.closeAt"),field:n=>n.is_closed?"-":n.close_at_formated,style:"width: 40px",sortable:!0},{name:"note",align:"left",label:e.$t("label.note"),field:"note",style:"width: 250px; white-space: normal",sortable:!1},{name:"created_at",align:"left",label:e.$t("label.createdAt"),field:"created_at",format:s.formatDateAsHuman,style:"width: 40px",sortable:!0},{name:"actions",align:"right",sortable:!1}],actions:e=>[{label:e.$t("label.edit"),permission:"announcements:edit",action:"route",route:"Announcement",params:n=>({id:n.id}),query:n=>({action:"edit"}),icon:"fas fa-edit",deleted:!1},{label:e.$t("label.delete"),permission:"announcements:delete",action:"delete",icon:"fas fa-trash-alt",deleted:!1},{label:e.$t("label.restore"),permission:"announcements:delete",action:"restore",icon:"fas fa-trash-undo",deleted:!0}],toolbar:e=>[{label:e.$t("label.trashed"),action:"request",component:"base-toggle",dense:!0,key:"deleted",checkedIcon:"delete",permission:"announcements:delete",deleted:"all"},{icon:"fad fa-plus-circle",label:e.$t("label.addAnnouncement"),permission:"announcements:new",action:"route",params:{id:"add"},route:"Announcement",color:"primary",deleted:"all"}],filters:e=>[]},actions:{get(e){return new Promise((n,a)=>{l.get("announcements",e).then(t=>{this.setRows(t.data),n(t)}).catch(t=>{a(t)})})},store(e){return new Promise((n,a)=>{l.post("announcements/store",e).then(t=>{n(t)}).catch(t=>{a(t)})})},show(e){return new Promise((n,a)=>{l.get(`announcements/${e}`).then(t=>{n(t)}).catch(t=>{a(t)})})},update(e){return new Promise((n,a)=>{l.put(`announcements/${e.id}`,e).then(t=>{n(t)}).catch(t=>{a(t)})})},delete(e){return new Promise((n,a)=>{l.delete(`announcements/${e}/destroy`).then(t=>{n(t)}).catch(t=>{a(t)})})},deleteSelected(e){return new Promise((n,a)=>{l.delete("announcements/destroy",{items:e}).then(t=>{n(t)}).catch(t=>{a(t)})})},restore(e){return new Promise((n,a)=>{l.post(`announcements/${e}/restore`).then(t=>{n(t)}).catch(t=>{a(t)})})},restoreSelected(e){return new Promise((n,a)=>{l.post("announcements/restore",{items:e}).then(t=>{n(t)}).catch(t=>{a(t)})})}}});export{c as u};
