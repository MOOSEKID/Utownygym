import{U as b,u as y,_ as S,d,o as u,e as D,S as E,w as l,h as t,g as r,T as w,t as i,j as m,Q as V,f as g,F as P,p as M,i as L,ar as N,O as Q,ae as U}from"./index.ec7eb99e.js";import{Q as A}from"./QForm.74e427bf.js";import{Q as F}from"./QPage.b13c45b6.js";import{u as k}from"./PlanCard.3180e3c1.js";import{P as O}from"./PaymentMethodCard.b5da68e2.js";import{A as B}from"./AddressFields.afbf970a.js";import{C as I,P as z}from"./PlansCard.4391c04e.js";import{T as j}from"./TextSkeleton.6498b2fb.js";import"./StateSelect.d3ce42fc.js";import"./index.becf6c0c.js";import"./CitySelect.367b922a.js";import"./BaseSectionSkeleton.971da8dd.js";import"./QSkeleton.73bc54f6.js";const R={components:{TextSkeleton:j},data(){return{title:null,content:null,loading:!0}},props:{type:String},emits:["ok","hide"],methods:{async show(){console.func("components/MemberDialog:methods.show()",arguments),this.$refs.dialog.show(),this.title=this.type=="privacy"?this.$t("privacyPolicy"):this.$t("termsAndConditions"),setTimeout(()=>{this.content=this[this.type],this.loading=!1},300)},hide(){console.func("components/MemberDialog:methods.close()",arguments),this.$refs.dialog.hide()},onDialogHide(){console.func("components/MemberDialog:methods.onDialogHide()",arguments),this.$emit("hide")},onDone(){console.func("components/MemberDialog:methods.onDone()",arguments),this.$emit("ok"),this.hide()}},computed:{...b(y,["tos","privacy"])}},J=["innerHTML"];function Y(o,s,h,f,e,a){const p=d("text-skeleton"),c=d("base-dialog");return u(),D(c,{title:e.title,"body-class":"scroll terms-dialog","content-style":"width: 950px; max-width: 95vw",ref:"dialog",onHide:a.onDialogHide,"use-separator":"",persistent:"","cancel-label":o.$t("decline"),"done-label":o.$t("accept"),loading:e.loading,onOk:a.onDone},E({body:l(()=>[r("div",{innerHTML:e.content},null,8,J)]),_:2},[e.loading?{name:"loading",fn:l(()=>[t(p)]),key:"0"}:void 0]),1032,["title","onHide","cancel-label","done-label","loading","onOk"])}var G=S(R,[["render",Y]]);const K="users",W={components:{PaymentMethodCard:O,AddressFields:B,CouponCard:I,PlansCard:z},data(){return{plan:null,paymentMethod:null,form:{title:"Mr",plan:null,promotion_code:null,terms:!1,guard:K},errors:{},processing:!1,disabled:!1,isPwd1:!0,isPwd2:!0,amount:0}},methods:{...w(y,["signUp","currentUser"]),...w(k,["confirm","subscribe","getPlans"]),onReset(){this.errors={},this.processing=!0},onSubmit(){console.func("pages/SignUpPage:methods.onSubmit()",arguments),this.onReset(),this.signUp(this.form).then(o=>{var s,h;console.log("pages/SignUpPage:methods.signUp().then()",o),this.subscribe({...this.form,plan:(s=this.plan)==null?void 0:s.id,payment_method:(h=this.paymentMethod)==null?void 0:h.id}).then(f=>{console.log("pages/SignUpPage:methods.signUp().then().subscribe().then()",f);const{message:e,payment:a}=f;this.currentUser("users").then(()=>{a?this.$redirect(a):(this.$core.success(e,{title:this.$t("dialog.title.success")}),this.$router.push({name:"Dashboard"}),this.processing=!1)})}).catch(f=>{this.$router.push({name:"Dashboard"}),this.$core.error(f,{title:this.$t("dialog.title.error")}),this.processing=!1})}).catch(({errors:o,message:s})=>{this.processing=!1,o?this.errors=o:this.$core.error(s)})},onTermsDialog(o){console.func("pages/SignUpPage:methods.onTermsDialog()",arguments),this.$q.dialog({component:G,componentProps:{type:o}}).onOk(()=>{this.form.terms=!0}).onCancel(()=>{this.form.terms=!1})}},computed:{...b(y,["paymentMethods","config"]),...b(k,["plans","defaultPlan"]),intervalLabel(){return this.$core.priceToInterval(this.plan||{},!1,!0)},queryPlan(){const{plan:o}=this.$route.query,s=this.plans.find(({id:h})=>h===Number(o));return s||null}},async mounted(){await this.getPlans(),this.$nextTick(()=>{var o;this.paymentMethod=this.paymentMethods[0],Object.assign(this,{plan:this.queryPlan||this.defaultPlan,interval:((o=this.$route.query)==null?void 0:o.interval)||"month"})})}},X={class:"signup-container q-pa-xl"},Z={class:"text-h5 q-mb-md"},$={class:"row q-col-gutter-md"},ee={class:"col-sm-12 col-xs-12"},se={class:"text-h6"},oe={class:"col-sm-6 col-xs-12"},re={class:"col-sm-6 col-xs-12"},ne={class:"col-xs-12 col-sm-12"},te={class:"row q-col-gutter-md"},le={class:"col-sm-4 col-xs-12"},ie={class:"col-sm-4 col-xs-12"},ae={class:"col-sm-12 col-xs-12"},me={class:"col-xs-12 col-sm-12"},de={class:"row q-col-gutter-md"},pe={class:"col-sm-4 col-xs-12"},ce={class:"col-sm-4 col-xs-12"},ue={class:"col-sm-12 col-xs-12"},he={key:0,class:"col-sm-12 co-xs-12 plan-actions"},fe={class:"plan q-pa-lg"},ge={class:"text-h6"},_e={class:"info"},ve={class:"features"},be={class:"flex"},ye=["innerHTML"],we={class:"col-xs-12 col-sm-12"},Ve={class:"col-sm-12 col-xs-12"},Pe={class:"row q-col-gutter-md"},Me={class:"col-sm-12 col-xs-12"},Ue={class:"text-h6"},ke={class:"col-xs-12 col-sm-5 offset-sm-4"},Se={class:"terms"},De={class:"col-sm-3 co-xs-12"};function xe(o,s,h,f,e,a){const p=d("base-label"),c=d("base-input"),x=d("address-fields"),T=d("plans-card"),C=d("coupon-card"),q=d("payment-method-card"),_=d("base-btn");return u(),D(F,{class:"row flex-center items-center vertical-middle",padding:""},{default:l(()=>[r("div",X,[r("div",Z,i(o.$t("Signup Form")),1),t(A,{onSubmit:a.onSubmit},{default:l(()=>[r("div",$,[r("div",ee,[r("div",se,i(o.$t("Personal details")),1)]),r("div",oe,[t(p,null,{default:l(()=>[m(i(o.$t("firstName")),1)]),_:1}),t(c,{"error-message":o.$core.errorMessage("first_name",e.errors),error:o.$core.hasError("first_name",e.errors),placeholder:"Jone",modelValue:e.form.first_name,"onUpdate:modelValue":s[0]||(s[0]=n=>e.form.first_name=n),name:"first_name"},null,8,["error-message","error","modelValue"])]),r("div",re,[t(p,null,{default:l(()=>[m(i(o.$t("surname")),1)]),_:1}),t(c,{"error-message":o.$core.errorMessage("last_name",e.errors),error:o.$core.hasError("last_name",e.errors),placeholder:"Done",modelValue:e.form.last_name,"onUpdate:modelValue":s[1]||(s[1]=n=>e.form.last_name=n),name:"last_name"},null,8,["error-message","error","modelValue"])]),r("div",ne,[r("div",te,[r("div",le,[t(p,null,{default:l(()=>[m(i(o.$t("email")),1)]),_:1}),t(c,{"error-message":o.$core.errorMessage("email",e.errors),error:o.$core.hasError("email",e.errors),placeholder:"yourname@example.com",modelValue:e.form.email,"onUpdate:modelValue":s[2]||(s[2]=n=>e.form.email=n),name:"email"},null,8,["error-message","error","modelValue"])]),r("div",ie,[t(p,null,{default:l(()=>[m(i(o.$t("phoneNumber")),1)]),_:1}),t(c,{"error-message":o.$core.errorMessage("phone_number",e.errors),error:o.$core.hasError("phone_number",e.errors),placeholder:"+44 1632 960806",modelValue:e.form.phone_number,"onUpdate:modelValue":s[3]||(s[3]=n=>e.form.phone_number=n),name:"phone_number"},null,8,["error-message","error","modelValue"])])])]),r("div",ae,[t(x,{errors:e.errors,modelValue:e.form,"onUpdate:modelValue":s[4]||(s[4]=n=>e.form=n)},null,8,["errors","modelValue"])]),r("div",me,[r("div",de,[r("div",pe,[t(p,null,{default:l(()=>[m(i(o.$t("password")),1)]),_:1}),t(c,{modelValue:e.form.password,"onUpdate:modelValue":s[6]||(s[6]=n=>e.form.password=n),"error-message":o.$core.errorMessage("password",e.errors),error:o.$core.hasError("password",e.errors),type:e.isPwd1?"password":"text",name:"password"},{append:l(()=>[t(V,{name:e.isPwd1?"visibility_off":"visibility",class:"cursor-pointer",onClick:s[5]||(s[5]=n=>e.isPwd1=!e.isPwd1)},null,8,["name"])]),_:1},8,["modelValue","error-message","error","type"])]),r("div",ce,[t(p,null,{default:l(()=>[m(i(o.$t("confirmPassword")),1)]),_:1}),t(c,{modelValue:e.form.password_confirmation,"onUpdate:modelValue":s[8]||(s[8]=n=>e.form.password_confirmation=n),name:"password_confirmation","error-message":o.$core.errorMessage("password_confirmation",e.errors),error:o.$core.hasError("password_confirmation",e.errors),type:e.isPwd2?"password":"text"},{append:l(()=>[t(V,{name:e.isPwd2?"visibility_off":"visibility",class:"cursor-pointer",onClick:s[7]||(s[7]=n=>e.isPwd2=!e.isPwd2)},null,8,["name"])]),_:1},8,["modelValue","error-message","error","type"])])])]),r("div",ue,[t(T,{dense:"",title:o.$t("Select a plan"),"no-interval":"",modelValue:e.plan,"onUpdate:modelValue":s[9]||(s[9]=n=>e.plan=n),gutter:"md",col:"4",class:"plans-card"},null,8,["title","modelValue"])]),e.plan?(u(),g("div",he,[r("div",fe,[r("div",ge,i(o.$t("Your plan")),1),r("div",_e,i(e.plan.label)+" # "+i(e.plan.price_formated)+" "+i(a.intervalLabel),1),r("div",ve,[r("ul",be,[(u(!0),g(P,null,M(e.plan.feature_lines,(n,v)=>(u(),g("li",{key:v},[r("span",{innerHTML:n},null,8,ye)]))),128))])])])])):L("",!0),r("div",we,[t(C,{plan:e.plan,modelValue:e.form.promotion_code,"onUpdate:modelValue":s[10]||(s[10]=n=>e.form.promotion_code=n),amount:e.amount,"onUpdate:amount":s[11]||(s[11]=n=>e.amount=n),processing:e.disabled,"onUpdate:processing":s[12]||(s[12]=n=>e.disabled=n)},null,8,["plan","modelValue","amount","processing"])]),r("div",Ve,[r("div",Pe,[r("div",Me,[r("div",Ue,i(o.$t("paymentMethod")),1)]),(u(!0),g(P,null,M(o.paymentMethods,(n,v)=>(u(),g("div",{key:v,class:"col-xs-12 col-sm-6 col-md-4"},[t(q,N({selected:e.paymentMethod,"onUpdate:selected":s[13]||(s[13]=H=>e.paymentMethod=H),ref_for:!0},n,{"pay-mode":""}),null,16,["selected"])]))),128))])]),r("div",ke,[r("div",Se,[t(Q,{dense:"",size:"sm",modelValue:e.form.terms,"onUpdate:modelValue":s[16]||(s[16]=n=>e.form.terms=n)},{default:l(()=>[s[19]||(s[19]=m(" I have read and agree to the ")),t(_,{onClick:s[14]||(s[14]=U(n=>a.onTermsDialog("privacy"),["stop"])),size:"11px",type:"a",link:""},{default:l(()=>s[17]||(s[17]=[m(" privacy policy ")])),_:1}),s[20]||(s[20]=m(" and ")),t(_,{onClick:s[15]||(s[15]=U(n=>a.onTermsDialog("tos"),["stop"])),size:"11px",type:"a",link:""},{default:l(()=>s[18]||(s[18]=[m(" terms and conditions ")])),_:1})]),_:1},8,["modelValue"])])]),r("div",De,[t(_,{style:{width:"180px"},disabled:!e.form.terms&&!e.disabled,loading:e.processing,label:o.$t("confirmPayment"),type:"submit"},null,8,["disabled","loading","label"])])])]),_:1},8,["onSubmit"])])]),_:1})}var ze=S(W,[["render",xe],["__scopeId","data-v-5f03e290"]]);export{ze as default};
