import{_ as l,cs as h,d as c,o as u,e as m,bt as p,T as g,U as f,u as y}from"./index.ec7eb99e.js";import{a as C}from"./index.becf6c0c.js";const S={props:{errorMessage:String,error:Boolean,borderless:Boolean,modelValue:String,placeholder:{type:String,default:"placeholder.select"}},emits:["complete","update:model-value"],methods:{get:h,onChange(e){if(console.func("components/CountrySelect:methods.onChange",arguments),e===this.modelValue)return!1;this.$emit("update:model-value",e)},onComplete(e){console.func("components/CountrySelect:methods.onComplete",arguments),this.$emit("complete",e)}}};function b(e,r,t,o,d,a){const s=c("base-select");return u(),m(s,{class:"country-select","error-message":t.errorMessage,error:t.error,"hide-bottom-space":!t.error,"model-value":t.modelValue||void 0,"onUpdate:modelValue":a.onChange,onComplete:a.onComplete,"emit-value":"",dense:"",outlined:!t.borderless,borderless:t.borderless,"use-input":"","option-label":"name","option-value":"name",placeholder:t.modelValue?"":"Select or type...",name:"country","input-debounc":"500","filter-method":a.get},null,8,["error-message","error","hide-bottom-space","model-value","onUpdate:modelValue","onComplete","outlined","borderless","placeholder","filter-method"])}var U=l(S,[["render",b]]);const n=C.create({baseURL:"https://api.coderstm.com"}),_=p("country",{state:()=>({country:null}),getters:{hasStates:e=>{var r;return((r=e.country)==null?void 0:r.states_count)>0}},actions:{get(e){return new Promise((r,t)=>{n.get("countries",{params:e}).then(({data:o})=>{r(o)}).catch(o=>{t(o)})})},states(e){return new Promise((r,t)=>{n.get("countries/states",{params:e}).then(({data:o})=>{r(o)}).catch(o=>{t(o)})})},cities(e){return new Promise((r,t)=>{n.get("countries/cities",{params:e}).then(({data:o})=>{r(o)}).catch(o=>{t(o)})})},find(e){return new Promise((r,t)=>{n.get("countries/find",{params:e}).then(({data:o})=>{r(o)}).catch(o=>{t(o)})})},setCountry(e){this.country=e}}}),V={props:{errorMessage:String,error:Boolean,hasCountryStates:Boolean,borderless:Boolean,countryCode:String,modelValue:String,optionValue:{type:String,default:"name"},placeholder:{type:String,default:"placeholder.select"}},methods:{...g(_,["states"]),onChange(e){if(console.func("components/StateSelect:methods.onChange",arguments),e===this.modelValue)return!1;this.$emit("update:model-value",e)},onComplete(e){console.func("components/StateSelect:methods.onComplete",arguments),this.$emit("complete",e)}},computed:{...f(y,["location"]),code(){return this.countryCode},cacheKey(){const e=this.$core.slug(this.code||"all");return"state-"+e}}};function v(e,r,t,o,d,a){const s=c("base-select");return u(),m(s,{class:"state-select","error-message":t.errorMessage,error:t.error,"hide-bottom-space":!t.error,"model-value":t.modelValue||void 0,"onUpdate:modelValue":a.onChange,onComplete:a.onComplete,"emit-value":"",dense:"",outlined:!t.borderless,borderless:t.borderless,"use-input":"","cache-key":a.cacheKey,"option-label":"name","option-value":t.optionValue,"auto-complete":"","no-auto-complete-emit":t.hasCountryStates,"filter-method":e.states,placeholder:t.modelValue?"":"Select or type...",name:"state","input-debounc":"500",query:i=>({filter:i,rowsPerPage:50,code:a.code}),"required-query-keys":["code"]},null,8,["error-message","error","hide-bottom-space","model-value","onUpdate:modelValue","onComplete","outlined","borderless","cache-key","option-value","no-auto-complete-emit","filter-method","placeholder","query"])}var k=l(V,[["render",v]]);export{U as C,k as S,_ as u};
