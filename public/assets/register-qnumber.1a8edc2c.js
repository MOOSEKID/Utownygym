import{_ as c,c7 as m,c8 as b,o as h,e as f,S as g,p as B,w as s,q as S,ar as k,ad as V,g as v,c9 as _}from"./index.ec7eb99e.js";import{Q as x}from"./QField.ad3f8f9a.js";const y={props:{modelValue:[String,Number],placeholder:{type:String,default:"0.00"},options:{type:Object,default:()=>({precision:2,minimumFractionDigits:2})},label:String,stackLabel:Boolean,hint:String,hideHint:Boolean,prefix:String,suffix:String,labelColor:String,color:String,bgColor:String,filled:Boolean,outlined:Boolean,borderless:Boolean,standout:[Boolean,String],square:Boolean,loading:Boolean,labelSlot:Boolean,bottomSlots:Boolean,hideBottomSpace:Boolean,rounded:Boolean,dense:Boolean,clearable:Boolean,clearIcon:String,disable:Boolean,readonly:Boolean,autofocus:Boolean,masked:Boolean},data(){return{canEmit:!1,maskedValue:this.modelValue,unmaskedValue:null}},emits:["update:model-value"],methods:{onInput(l,a){const{target:e}=l;this.maskedValue=e.value,this.unmaskedValue=e.unmasked,this.canEmit=!0},onChange(l,a){a(this.emittedValue)},onBlur(l,a){this.canEmit&&this.emittedValue!==this.modelValue&&a(this.emittedValue)},number(){return new m(this.options)}},computed:{scopedSlots(){return Object.keys(this.$slots)},emittedValue(){return this.masked?this.maskedValue:this.unmaskedValue}},watch:{modelValue:{deep:!0,handler(l){const a=this.number().format(l);a!==this.maskedValue&&(this.maskedValue=a)}}}},C=["id","value","placeholder","onInput","onChange","onBlur","readonly","disabled"];function I(l,a,e,w,r,n){const u=b("number");return h(),f(x,{class:"q-number","model-value":r.maskedValue,"onUpdate:modelValue":a[0]||(a[0]=t=>l.$emit("update:model-value",t)),label:e.label,"stack-label":e.stackLabel,hint:e.hint,"hide-hint":e.hideHint,prefix:e.prefix,suffix:e.suffix,"label-color":e.labelColor,color:e.color,"bg-color":e.bgColor,filled:e.filled,outlined:e.outlined,borderless:e.borderless,standout:e.standout,square:e.square,loading:e.loading,"label-slot":e.labelSlot,"bottom-slots":e.bottomSlots,"hide-bottom-space":e.hideBottomSpace,rounded:e.rounded,dense:e.dense,clearable:e.clearable,clearIcon:e.clearIcon,disable:e.disable,readonly:e.readonly,autofocus:e.autofocus},g({control:s(({id:t,modelValue:d,emitValue:i})=>[V(v("input",{id:t,type:"text",autocomplete:"off",class:"q-field__input",value:d,placeholder:e.placeholder,onInput:o=>n.onInput(o,i),onChange:o=>n.onChange(o,i),onBlur:o=>n.onBlur(o,i),readonly:e.readonly,disabled:e.disable},null,40,C),[[u,e.options]])]),_:2},[B(n.scopedSlots,t=>({name:t,fn:s(d=>[S(l.$slots,t,k(d,{props:d}))])}))]),1032,["model-value","label","stack-label","hint","hide-hint","prefix","suffix","label-color","color","bg-color","filled","outlined","borderless","standout","square","loading","label-slot","bottom-slots","hide-bottom-space","rounded","dense","clearable","clearIcon","disable","readonly","autofocus"])}var q=c(y,[["render",I]]),D=({app:l})=>{l.use(_),l.component("QNumber",q)};export{D as default};
