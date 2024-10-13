import{Q as y}from"./QPage.b13c45b6.js";import{_ as x,m,T as N,d as p,o as g,e as f,w as n,g as i,h as o,j as c,t as h}from"./index.ec7eb99e.js";import{S as k}from"./SkeletonSinglePage.dba71dd3.js";import{u as q}from"./guest-pass.62880fda.js";import"./QSkeleton.73bc54f6.js";const b={},v={components:{SkeletonSinglePage:k},data(){return{default:m.exports.cloneDeep(b),guestPass:m.exports.cloneDeep(b),loaded:!1,submited:!1}},methods:{...N(q,["store","show","update"]),onSubmit(e){console.func("pages/guest-passes/GuestPassPage:methods.onSubmit()",arguments),this.submited=!0,(this.creating?this.store:this.update)(this.guestPass).then(({data:l,message:_})=>{this.submited=!1,this.$q.notify(_),this.guestPass=l,this.default=m.exports.cloneDeep(l),this.$router.push({name:"Guest Pass",params:{id:l.id,title:l.name},query:{action:"edit"}})}).catch(l=>{this.submited=!1,this.$core.error(l,{title:this.$t("dialog.title.error")})})},onReset(e){console.func("pages/guest-passes/GuestPassPage:methods.onReset()",arguments),this.loaded=!1,this.$nextTick(()=>{this.guestPass=m.exports.cloneDeep(this.default),this.loaded=!0})},onCancel(e){console.func("pages/guest-passes/GuestPassPage:methods.onCancel()",arguments),this.$router.go(-1)}},async mounted(){this.creating?this.loaded=!0:this.show(this.id).then(e=>{this.guestPass=e,this.default=m.exports.cloneDeep(e),this.$app.setTitle(e.name),this.loaded=!0}).catch(e=>{this.$emit("error",e)})},computed:{edit(){return["add","edit"].includes(this.action)||this.id==="add"},creating(){return this.id==="add"},id(){return this.$route.params.id},action(){return this.$route.query.action},disable(){return this.default&&JSON.stringify(this.guestPass)===JSON.stringify(this.default)},resetable(){return this.default&&JSON.stringify(this.guestPass)!==JSON.stringify(this.default)}}},C={class:"q-gutter-md"},D={class:"col-xs-12 col-sm-5"},G={class:"col-xs-12 col-sm-5"},R={class:"col-xs-12 col-sm-4"},U={class:"col-xs-12 col-sm-4"},w={class:"col-xs-12 col-sm-12"};function J(e,t,l,_,s,u){const r=p("base-label"),d=p("base-input"),P=p("base-section"),V=p("base-form"),S=p("skeleton-single-page");return g(),f(y,{padding:""},{default:n(()=>[s.loaded?(g(),f(V,{key:0,onSubmit:u.onSubmit,onCancel:u.onCancel,onReset:u.onReset,resetable:u.resetable,disable:u.disable,submited:s.submited},{default:n(()=>[i("div",C,[o(P,{flat:"",bordered:"",title:e.$t("guestInformation")},{default:n(()=>[i("div",D,[o(r,{required:""},{default:n(()=>[c(h(e.$t("firstName")),1)]),_:1}),o(d,{name:"first_name",modelValue:s.guestPass.first_name,"onUpdate:modelValue":t[0]||(t[0]=a=>s.guestPass.first_name=a)},null,8,["modelValue"])]),i("div",G,[o(r,{required:""},{default:n(()=>[c(h(e.$t("surname")),1)]),_:1}),o(d,{name:"last_name",modelValue:s.guestPass.last_name,"onUpdate:modelValue":t[1]||(t[1]=a=>s.guestPass.last_name=a)},null,8,["modelValue"])]),i("div",R,[o(r,{required:""},{default:n(()=>[c(h(e.$t("emailAddress")),1)]),_:1}),o(d,{name:"email",modelValue:s.guestPass.email,"onUpdate:modelValue":t[2]||(t[2]=a=>s.guestPass.email=a)},null,8,["modelValue"])]),i("div",U,[o(r,{required:""},{default:n(()=>[c(h(e.$t("phoneNumber")),1)]),_:1}),o(d,{name:"phone_number",modelValue:s.guestPass.phone_number,"onUpdate:modelValue":t[3]||(t[3]=a=>s.guestPass.phone_number=a)},null,8,["modelValue"])]),i("div",w,[o(r,null,{default:n(()=>[c(h(e.$t("note")),1)]),_:1}),o(d,{name:"note",modelValue:s.guestPass.note,"onUpdate:modelValue":t[4]||(t[4]=a=>s.guestPass.note=a),type:"textarea"},null,8,["modelValue"])])]),_:1},8,["title"])])]),_:1},8,["onSubmit","onCancel","onReset","resetable","disable","submited"])):(g(),f(S,{key:1}))]),_:1})}var Q=x(v,[["render",J]]);export{Q as default};
