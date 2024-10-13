import{Q as B}from"./QBanner.29df4abb.js";import{Q as E}from"./QPopupProxy.64b9fae0.js";import{Q as U}from"./QPage.b13c45b6.js";import{u as S,bt as H,c as P,A as L,T as A,m as v,U as C,_ as N,d as r,o as b,e as h,w as a,h as o,g as m,j as f,t as u,f as V,i as _,F as R,p as O,ar as T,al as z,ck as F,cl as I,n as J,ae as x,ad as j,ag as G}from"./index.ec7eb99e.js";import{i as K,u as $}from"./member.8ccf3331.js";import{Q as W}from"./QSelect.ad394656.js";import{Q as X}from"./QExpansionItem.38c12bfd.js";import{Q as Y}from"./QTimeline.c279b714.js";import{P as Z}from"./ParqForm.cc3166b0.js";import{A as ee}from"./AddressFields.afbf970a.js";import"./QMenu.76199ca9.js";import"./selection.571043d0.js";import"./QField.ad3f8f9a.js";import"./QChip.cb7fa0e0.js";import"./rtl.276c3f1b.js";import"./QSlideTransition.d1b840b3.js";import"./mixins.af528ab3.js";import"./StateSelect.d3ce42fc.js";import"./index.becf6c0c.js";import"./CitySelect.367b922a.js";import"./BaseSectionSkeleton.971da8dd.js";import"./QSkeleton.73bc54f6.js";import"./page.e7247b54.js";import"./SkeletonSinglePage.dba71dd3.js";S();const te=e=>[{label:e.$t("label.all"),value:null},{label:e.$t("label.pending"),value:"Pending"},{label:e.$t("label.deactive"),value:"Deactive"},{label:e.$t("label.hold"),value:"Hold"},{label:e.$t("label.lost"),value:"Lost"}],le=e=>e&&e.options&&e.options.ref?e.options.ref:e&&e.admin?`${e.admin.name}`:"Direct",M=H("member/enquiry",{state:()=>({rows:[],permissions:{new:"members:new",edit:"members:edit",delete:"members:delete"}}),getters:{module:e=>({name:"Members",label:e.$t("label.members"),singular:e.$t("singular.enquiry"),plural:e.$t("plural.enquiries")}),columns:e=>[{name:"id",align:"left",label:e.$t("label.memberID"),field:"member_id_formated",style:"width: 40px",sortable:!0},{name:"created_at",align:"left",label:e.$t("label.date"),field:"created_at",format:P.formatDateAsHuman,style:"width: 40px",sortable:!0},{name:"name",align:"left",label:e.$t("label.name"),field:"name",style:"width: 40px",sortable:!0},{name:"email",align:"left",label:e.$t("label.email"),field:"email",style:"width: 40px",sortable:!0},{name:"phone_number",align:"left",label:e.$t("label.contact"),field:"phone_number",style:"width: 40px",sortable:!0},{name:"last_update",align:"left",label:e.$t("label.lastUpdate"),field:"last_update",format:t=>P.lastUpdate(t,"admin"),style:"width: 40px",sortable:!0},{name:"status",align:"center",label:e.$t("label.status"),field:"status",style:"width: 40px",sortable:!0},{name:"created_by",align:"center",label:e.$t("label.createdBy"),field:"created_by",format:t=>le(t),style:"width: 40px",sortable:!0},{name:"actions",align:"right",sortable:!1}],toolbar:e=>[{label:e.$t("label.trashed"),action:"request",component:"base-toggle",dense:!0,key:"deleted",checkedIcon:"delete",guard:["admins"],deleted:"all"},{title:e.$t("label.status"),action:"request",component:"base-select",dense:!0,outlined:!0,key:"status",placeholder:e.$t("placeholder.select"),optionsDense:!0,style:"width: 180px",mapOptions:!0,emitValue:!0,options:te(e),deleted:"all",prefix:e.$t("prefix.status")},{title:e.$t("label.rag"),action:"request",component:"base-select",dense:!0,outlined:!0,key:"rag",placeholder:e.$t("placeholder.rag"),optionsDense:!0,style:"width: 110px",mapOptions:!0,emitValue:!0,options:[null,"red","green","amber","white"].map(t=>({label:t?`<div class="text-center"><i class="q-icon fas fa-circle rag-${t}" style="font-size: 13px;" aria-hidden="true" role="presentation" ></i></div>`:`<div class="text-center">${e.$t("label.all")}</div>`,value:t})),optionsHtml:!0,prefix:e.$t("prefix.rag"),deleted:"all"},{tooltip:e.$t("tooltip.exportAsCsv"),icon:"fas fa-file-csv",action:"export",color:"grey",deleted:"all",type:"csv",method:e.get},{icon:"fad fa-file-import",tooltip:e.$t("importByCsv"),permission:"members:new",action:K,color:"grey",deleted:"all"},{icon:"fad fa-plus-circle",label:e.$t("label.addEnquiry"),permission:"members:new",action:"route",params:{id:"add"},route:"Member",color:"primary",deleted:"all"}],filters:e=>[]},actions:{get(e){return new Promise((t,c)=>{L.get("users/enquiry",e).then(p=>{this.setRows(p.data),t(p)}).catch(p=>{c(p)})})}}}),oe={components:{ParqForm:Z,AddressFields:ee},data(){return{member:{address:{}},default:{address:{}},loading:!0,parq:!1,paymentLoading:!1}},props:{title:{type:String,default:"memberInfo"},id:[Number,String],isEnquiry:Boolean},emits:["ok","hide"],methods:{...A($,{showMember:"show",update:"update",notes:"notes",markAsPaid:"markAsPaid"}),async show(){console.func("components/MemberDialog:methods.show()",arguments),this.loading=!0,this.$refs.dialog.show(),this.showMember(this.id).then(e=>{this.member=e,this.default=v.exports.cloneDeep(e),this.loading=!1}).catch(e=>{this.$core.error(e,{title:this.$t("dialog.title.error")}),this.hide(),this.loading=!1})},hide(){console.func("components/MemberDialog:methods.close()",arguments),this.$refs.dialog.hide()},onDialogHide(){console.func("components/MemberDialog:methods.onDialogHide()",arguments),this.$emit("hide")},onDone(){console.func("components/MemberDialog:methods.onDone()",arguments),this.$emit("ok"),this.hide()},onSubmit(e){console.func("components/MemberDialog:methods.onSubmit()",arguments),this.loading=!0,this.update(this.member).then(({message:t})=>{this.default=v.exports.cloneDeep(this.member),this.loading=!1,this.$q.notify(t)}).catch(t=>{this.loading=!1,this.$core.error(t,{title:this.$t("dialog.title.error")})})},onSaveAsMember(){console.func("components/MemberDialog:methods.onSaveAsMember()",arguments),this.loading=!0,this.update({...this.member,status:"Active",is_enquiry:!1}).then(({message:e})=>{this.loading=!1,this.$core.success(e),this.onDone()}).catch(e=>{this.loading=!1,this.$core.error(e,{title:this.$t("dialog.title.error")})})},onCreateNote(e){console.func("components/MemberDialog:methods.onCreateNote()",arguments),e?this.member.notes.splice(0,0,e):this.showMember(this.id).then(t=>{this.member=t,this.default=v.exports.cloneDeep(t),this.loading=!1})},async onCollectPayment(e){console.func("components/MemberDialog:methods.onCollectPayment()",arguments),this.paymentLoading=!0,await this.markAsPaid(this.member).then(()=>{this.show()}).catch(()=>{}),this.paymentLoading=!1}},computed:{...C(S,["user"]),disable(){return this.default&&JSON.stringify(this.member)===JSON.stringify(this.default)}}},ae={class:"col-xs-12 col-sm-3"},se={class:"col-xs-12 col-sm-3"},ne={class:"col-xs-12 col-sm-4"},ie={class:"col-xs-12 col-sm-3"},re={class:"col-xs-12 col-sm-3"},me={class:"col-xs-12"},de={class:"col-xs-12 col-sm-12"},ue={key:0,class:"col-xs-12"};function ce(e,t,c,p,l,n){const d=r("base-label"),g=r("base-input"),w=r("address-fields"),q=r("parq-form"),y=r("base-section"),i=r("base-note-card"),k=r("base-btn"),Q=r("base-dialog");return b(),h(Q,{title:c.title,"body-class":"q-pa-none scroll","content-style":"width: 950px; max-width: 95vw",ref:"dialog",onHide:n.onDialogHide,"use-separator":"",persistent:""},{body:a(()=>[o(y,{flat:""},{default:a(()=>[m("div",ae,[o(d,null,{default:a(()=>[f(u(e.$t("firstName")),1)]),_:1}),o(g,{modelValue:l.member.first_name,"onUpdate:modelValue":t[0]||(t[0]=s=>l.member.first_name=s)},null,8,["modelValue"])]),m("div",se,[o(d,null,{default:a(()=>[f(u(e.$t("surname")),1)]),_:1}),o(g,{modelValue:l.member.last_name,"onUpdate:modelValue":t[1]||(t[1]=s=>l.member.last_name=s)},null,8,["modelValue"])]),m("div",ne,[o(d,null,{default:a(()=>[f(u(e.$t("emailAddress")),1)]),_:1}),o(g,{modelValue:l.member.email,"onUpdate:modelValue":t[2]||(t[2]=s=>l.member.email=s)},null,8,["modelValue"])]),m("div",ie,[o(d,null,{default:a(()=>[f(u(e.$t("phoneNumber")),1)]),_:1}),o(g,{modelValue:l.member.phone_number,"onUpdate:modelValue":t[3]||(t[3]=s=>l.member.phone_number=s)},null,8,["modelValue"])]),m("div",re,[o(d,null,{default:a(()=>[f(u(e.$t("label.status")),1)]),_:1}),o(W,{dense:"",outlined:"",modelValue:l.member.status,"onUpdate:modelValue":t[4]||(t[4]=s=>l.member.status=s),options:["Active","Pending","Deactive","Lost"]},null,8,["modelValue"])]),m("div",me,[o(w,{modelValue:l.member.address,"onUpdate:modelValue":t[5]||(t[5]=s=>l.member.address=s)},null,8,["modelValue"])]),m("div",de,[o(d,null,{default:a(()=>[f(u(e.$t("specialNote")),1)]),_:1}),o(g,{modelValue:l.member.special_note,"onUpdate:modelValue":t[6]||(t[6]=s=>l.member.special_note=s),type:"textarea"},null,8,["modelValue"])]),c.isEnquiry?(b(),V("div",ue,[o(X,{"header-class":"bg-grey-3",icon:"fas fa-clipboard-list-check",label:e.$t("parq"),onShow:t[8]||(t[8]=s=>l.parq=!0),onHide:t[9]||(t[9]=s=>l.parq=!1)},{default:a(()=>[l.parq?(b(),h(q,{key:0,class:"q-pa-md border-all",member:l.member,"onUpdate:member":t[7]||(t[7]=s=>l.member=s)},null,8,["member"])):_("",!0)]),_:1},8,["label"])])):_("",!0)]),_:1}),o(y,{flat:"",title:e.$t("notes"),description:e.$t("members.activityDesc"),"no-row":"","body-class":"q-px-lg","head-class":"q-pt-none"},{default:a(()=>[o(Y,{class:"comments",color:"secondary"},{default:a(()=>[o(i,{"module-action":e.notes,"module-id":l.member.id,class:"comment",creating:"",onCreate:n.onCreateNote},null,8,["module-action","module-id","onCreate"]),(b(!0),V(R,null,O(l.member.notes,s=>(b(),h(i,T({class:"comment",key:s.id,ref_for:!0},s,{"module-id":l.member.id,user:s.admin}),null,16,["module-id","user"]))),128))]),_:1})]),_:1},8,["title","description"])]),footer:a(()=>[o(z,{class:"text-right q-gutter-x-sm"},{default:a(()=>{var s,D;return[((D=(s=l.member)==null?void 0:s.latest_invoice)==null?void 0:D.status)==="open"?(b(),h(k,{key:0,color:"positive",icon:"fas fa-money-bill-1",label:e.$t("collectPayment"),onClick:n.onCollectPayment,loading:l.paymentLoading},null,8,["label","onClick","loading"])):_("",!0),c.isEnquiry?(b(),h(k,{key:1,color:"secondary",label:e.$t("saveAsMember"),onClick:n.onSaveAsMember},null,8,["label","onClick"])):_("",!0),o(k,{color:"primary",label:e.$t("update"),disable:n.disable,onClick:n.onSubmit},null,8,["label","disable","onClick"])]}),_:1})]),loading:a(()=>[o(F,{showing:l.loading},{default:a(()=>[o(I,{size:"50px",color:"primary"})]),_:1},8,["showing"])]),_:1},8,["title","onHide"])}var pe=N(oe,[["render",ce]]);const be={data(){return{loading:!1,loaded:!1,selected:[],pagination:{sortBy:"id",descending:!0,page:1,filter:"",status:"Pending",rag:null,advancedFilter:{},deleted:!1,rowsPerPage:15,rowsNumber:15,loaded:!1,isEnquiry:!0,includes:["lastUpdate.admin","createdBy.admin"],override:["includes"]},useMemberStore:$()}},methods:{...A(M,["get"]),onRequest(e){console.func("admins/members/EnquiryPage:methods.onRequest()",arguments);const{page:t,rowsPerPage:c,sortBy:p,descending:l}=e.pagination;this.pagination=e.pagination,this.loading=!0,this.get({...e.pagination,direction:l?"desc":"asc"}).then(({meta:n})=>{this.pagination.rowsNumber=n.total,this.pagination.page=t,this.pagination.rowsPerPage=c,this.pagination.sortBy=p,this.pagination.descending=l,this.pagination.loaded=!0,this.pagination.from=n.from,this.pagination.to=n.to,this.loading=!1}).catch(n=>{this.$core.error(n,{title:this.$t("dialog.title.error")})})},async actionClicked(e,t){console.func("admins/members/EnquiryPage:methods.actionClicked()",arguments)},async toolbarClicked(e,t){console.func("admins/members/EnquiryPage:methods.toolbarClicked()",arguments)},rowClicked(e,t){console.func("admins/members/EnquiryPage:methods.rowClicked()",arguments),this.$q.dialog({component:pe,componentProps:{title:t.name,id:t.id,isEnquiry:!0}}).onOk(()=>{this.onRequest({pagination:this.pagination})})}},computed:{...C($,["actions"]),...C(M,["columns","toolbar","filters","module","rows"]),permissions(){return[]}}},fe=["innerHTML"];function ge(e,t,c,p,l,n){const d=r("base-btn"),g=r("base-status"),w=r("base-label"),q=r("base-table"),y=r("base-section");return b(),h(U,{padding:""},{default:a(()=>[o(y,{flat:"",bordered:"","no-row":""},{default:a(()=>[o(q,{store:l.useMemberStore,module:e.module,columns:e.columns,rows:e.rows,actions:e.actions,toolbar:e.toolbar,filters:e.filters,loading:l.loading,pagination:l.pagination,onRequest:n.onRequest,onActionClicked:n.actionClicked,onToolbarClicked:n.toolbarClicked,onRowClicked:n.rowClicked,"no-data-label":e.$t("enquiry.noData"),"table-key":"members/enquiries",selection:"multiple",selected:l.selected,"onUpdate:selected":t[2]||(t[2]=i=>l.selected=i)},{"body-cell-name":a(i=>[m("i",{class:J(`q-mr-sm q-icon fas fa-circle rag-${i.row.rag||"white"}`),style:{"font-size":"8px"},"aria-hidden":"true",role:"presentation"},null,2),o(d,{onClick:t[0]||(t[0]=x(()=>{},["stop"])),link:"",size:"12px",tag:"a",to:{name:"Member",params:{id:i.row.id},query:{action:"edit"}}},{default:a(()=>[f(u(i.value),1)]),_:2},1032,["to"])]),"body-cell-status":a(i=>[o(g,{type:i.value},null,8,["type"])]),"body-cell-last_update":a(i=>[j(o(d,{class:"q-mr-xs",size:"md",link:"",color:"black",icon:"fal fa-align-left",onClick:t[1]||(t[1]=x(()=>{},["stop"]))},{default:a(()=>[o(E,null,{default:a(()=>[o(B,{style:{width:"350px"}},{default:a(()=>[o(w,null,{default:a(()=>[f(u(e.$t("label.note")),1)]),_:1}),m("span",{innerHTML:e.$core.nl2br(i.row.last_update.message)},null,8,fe)]),_:2},1024)]),_:2},1024)]),_:2},1536),[[G,i.row.last_update]]),m("span",null,u(i.value),1)]),_:1},8,["store","module","columns","rows","actions","toolbar","filters","loading","pagination","onRequest","onActionClicked","onToolbarClicked","onRowClicked","no-data-label","selected"])]),_:1})]),_:1})}var Oe=N(be,[["render",ge]]);export{Oe as default};
