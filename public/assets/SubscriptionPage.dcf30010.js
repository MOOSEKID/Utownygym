import{Q as $}from"./QPage.b13c45b6.js";import{T as M,u as v,U as b,_ as S,d as a,o as r,e as y,w as V,g as l,f as p,i as f,h as m,F as w,j as L,t as T,p as q,ar as B,q as H}from"./index.ec7eb99e.js";import{u as P}from"./PlanCard.3180e3c1.js";import{C as N,P as j}from"./PlansCard.4391c04e.js";import{P as D}from"./PaymentMethodCard.b5da68e2.js";import{P as x}from"./BaseSectionSkeleton.971da8dd.js";import"./QSkeleton.73bc54f6.js";const A=e=>["create","change"].includes(e),F={components:{CouponCard:N},props:{plan:{},mode:{type:String,validator:A},paymentMethod:{type:Object,default:()=>({})}},data(){return{visible:!0,processing:!1,promotion_code:null,amount:0}},emits:["processing"],methods:{...M(P,["loadSubscription","subscribe"]),...M(v,["currentUser"]),onConfirm(){var e,t;console.func("components/ManageSubscription:methods.onConfirm()",arguments),this.processing=!0,this.subscribe({plan:(e=this.plan)==null?void 0:e.id,promotion_code:this.promotion_code,payment_method:(t=this.paymentMethod)==null?void 0:t.id}).then(async o=>{this.processing=!0;const{message:_,payment:n}=o;n?this.$redirect(n):(this.$core.success(_,{title:this.$t("dialog.title.success")}),await this.loadSubscription(),this.$router.push({name:"Billing"}),this.processing=!1)}).catch(o=>{this.processing=!1,this.$core.error(o,{title:this.$t("dialog.title.error")})})}},computed:{...b(P,["currentPlan"]),interval(){return this.$core.priceToInterval(this.plan)},create(){return this.mode==="create"},change(){return this.mode==="change"},label(){return this.$t("proceedPayment")},color(){return"positive"},isDisable(){var e;return!((e=this.paymentMethod)!=null&&e.id)||this.processing}}},I={class:"plan-details"},O=["innerHTML"],Q=["innerHTML"],E={class:"payment-btn"},z={class:"q-mt-xs text-small"};function G(e,t,o,_,n,s){const u=a("coupon-card"),h=a("base-btn"),g=a("base-section");return r(),y(g,{flat:"",bordered:"",title:e.$t("paymentSummary"),dense:"","no-row":"",class:"subscription-manage"},{default:V(()=>{var d,i,C,U,k;return[l("div",I,[s.create?(r(),p("span",{key:0,innerHTML:e.$t("plan.create",{plan:(d=o.plan)==null?void 0:d.label,amount:(i=o.plan)==null?void 0:i.price_formated,interval:s.interval})},null,8,O)):s.change?(r(),p("span",{key:1,class:"text-body",innerHTML:e.$t("plan.change",{currentPlan:(C=e.currentPlan)==null?void 0:C.label,plan:(U=o.plan)==null?void 0:U.label,amount:(k=o.plan)==null?void 0:k.price_formated,interval:s.interval})},null,8,Q)):f("",!0)]),m(u,{plan:o.plan,modelValue:n.promotion_code,"onUpdate:modelValue":t[0]||(t[0]=c=>n.promotion_code=c),amount:n.amount,"onUpdate:amount":t[1]||(t[1]=c=>n.amount=c),processing:n.processing,"onUpdate:processing":[t[2]||(t[2]=c=>n.processing=c),t[3]||(t[3]=c=>e.$emit("processing",c))]},null,8,["plan","modelValue","amount","processing"]),l("div",E,[m(h,{loading:n.processing,disabled:s.isDisable,color:s.color,label:s.label,onClick:s.onConfirm,style:{"min-width":"150px"},padding:"10px"},null,8,["loading","disabled","color","label","onClick"]),l("div",z,[s.change?(r(),p(w,{key:0},[L("*"+T(e.$t("hint.priceChange")),1)],64)):f("",!0)])])]}),_:1},8,["title"])}var J=S(F,[["render",G]]);const K={components:{PaymentMethodCard:D,PaymentMethodPlaceholder:x},props:{modelValue:{type:Object,default:()=>({})},title:{type:String,default:"Payment Methods"}},emits:["update:model-value"],computed:{...b(v,["paymentMethods","noPaymentMethods"])}},R={class:"row q-col-gutter-sm"},W={key:0,class:"col-xs-12 col-sm-4"};function X(e,t,o,_,n,s){const u=a("payment-method-card"),h=a("payment-method-placeholder"),g=a("base-section");return r(),y(g,{flat:"",bordered:"",title:o.title,dense:"",class:"payment-methods","no-row":""},{default:V(()=>[l("div",R,[(r(!0),p(w,null,q(e.paymentMethods,d=>(r(),p("div",{key:d.id,class:"col-xs-12 col-sm-4"},[m(u,B({ref_for:!0},d,{selected:o.modelValue,"onUpdate:selected":i=>e.$emit("update:model-value",d)}),null,16,["selected","onUpdate:selected"])]))),128)),e.noPaymentMethods?(r(),p("div",W,[m(h,{animation:"none"})])):f("",!0)]),H(e.$slots,"default")]),_:3},8,["title"])}var Y=S(K,[["render",X]]);const Z={components:{PaymentMethods:Y,ManageSubscription:J,PlansCard:j},data(){return{mode:"create",plan:null,paymentMethod:null,processing:!1}},methods:{...M(P,["setUser"]),onProcessing(e){console.func("pages/SubscriptionPage:methods.onProcessing()",arguments),this.processing=e}},computed:{...b(v,["user"]),...b(P,["plans","upcomingInvoice","currentPlan","defaultPaymentMethod","defaultPlan","subscribed","isLoadingSubscription"]),title(){return this.subscribed?this.$t("changePlan"):this.$t("selectPlan")},processPayment(){var e,t;return!this.subscribed&&this.plan?!0:((e=this.currentPlan)==null?void 0:e.id)!=((t=this.plan)==null?void 0:t.id)}},async mounted(){var e;await this.setUser(this.user),this.plan=(e=this.currentPlan)!=null&&e.id?this.currentPlan:this.defaultPlan},watch:{defaultPaymentMethod(e){e!=null&&e.id&&(this.paymentMethod={...e})},currentPlan(e){this.plan=e},defaultPlan(e){this.plan||(this.plan=e)}}},ee={class:"row q-col-gutter-lg"},te={class:"col-xs-12 col-sm-12"},ne={class:"col-xs-12 col-sm-6"},se={class:"col-xs-12 col-sm-6"},oe={class:"q-gutter-y-lg"};function ae(e,t,o,_,n,s){const u=a("base-page-header"),h=a("plans-card"),g=a("payment-methods"),d=a("manage-subscription");return r(),y($,{padding:""},{default:V(()=>[l("div",ee,[l("div",te,[m(u,{title:e.$t("subscription"),hint:e.$t("hint.subscription"),"no-tabs":""},null,8,["title","hint"])]),l("div",ne,[m(h,{title:s.title,disable:n.processing,loading:e.isLoadingSubscription,mode:n.mode,"onUpdate:mode":t[0]||(t[0]=i=>n.mode=i),"no-interval":"",modelValue:n.plan,"onUpdate:modelValue":t[1]||(t[1]=i=>n.plan=i)},null,8,["title","disable","loading","mode","modelValue"])]),l("div",se,[l("div",oe,[m(g,{modelValue:n.paymentMethod,"onUpdate:modelValue":t[2]||(t[2]=i=>n.paymentMethod=i),"pay-mode":"",title:e.$t("paymentMethods"),user:e.user},null,8,["modelValue","title","user"]),s.processPayment?(r(),y(d,{key:0,plan:n.plan,mode:n.mode,"payment-method":n.paymentMethod,onProcessing:s.onProcessing},null,8,["plan","mode","payment-method","onProcessing"])):f("",!0)])])])]),_:1})}var ue=S(Z,[["render",ae]]);export{ue as default};
