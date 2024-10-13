import{_ as f,T as _,u as c,U as v,d as a,o as b,f as g,g as i,t as n,h as r,w as l,j as m,Q as w,O as y,s as V,i as P}from"./index.ec7eb99e.js";import{Q as S}from"./QForm.74e427bf.js";const k={data(){return{form:{remember:!1},isPwd:!0,errors:{},visible:!1}},methods:{..._(c,["login"]),onSubmit(){this.errors={},this.visible=!0,console.func("pages/login/LoginPage:methods.onSubmit()",arguments),this.login(this.form).then(s=>{this.hasRedirect?this.$router.replace(this.redirectPath):this.$router.push({name:"Dashboard"}),this.visible=!1}).catch(s=>{this.visible=!1,s.errors?this.errors=s.errors:this.$core.error(s.message)})}},async mounted(){if(this.isAuthenticated)return this.$redirect({path:"/"})},computed:{...v(c,["guard","isAuthenticated"]),hasRedirect(){return this.$route.query.redirect&&this.$route.query.redirect.length>0},redirectPath(){return this.$route.query.redirect}}},q={class:"login-page"},A={class:"text-h6 text-center q-mb-xl"},Q={class:"col"},C={class:"col"},U={class:"q-mt-lg q-mb-sm col"},B={key:0,class:"q-mt-md text-center"};function N(s,o,$,j,e,h){const u=a("base-label"),d=a("base-input"),p=a("base-btn");return b(),g("div",q,[i("div",A,n(s.$t(s.$route.meta.title)),1),r(S,{ref:"loginForm",onSubmit:h.onSubmit},{default:l(()=>[i("div",Q,[r(u,null,{default:l(()=>[m(n(s.$t("email")),1)]),_:1}),r(d,{modelValue:e.form.email,"onUpdate:modelValue":o[0]||(o[0]=t=>e.form.email=t),outlined:"",dense:"",ref:"email","bottom-slots":"","error-message":"email"in e.errors?e.errors.email.join(", "):"",error:"email"in e.errors},null,8,["modelValue","error-message","error"])]),i("div",C,[r(u,null,{default:l(()=>[m(n(s.$t("password")),1)]),_:1}),r(d,{"bottom-slots":"",outlined:"",dense:"","error-message":"password"in e.errors?e.errors.password.join(", "):"",error:"password"in e.errors,modelValue:e.form.password,"onUpdate:modelValue":o[2]||(o[2]=t=>e.form.password=t),type:e.isPwd?"password":"text",class:"password"},{append:l(()=>[r(w,{name:e.isPwd?"visibility_off":"visibility",class:"cursor-pointer",onClick:o[1]||(o[1]=t=>e.isPwd=!e.isPwd)},null,8,["name"])]),counter:l(()=>[r(p,{size:"11px",color:"grey",to:{name:"Forget Password"},link:"",type:"a",label:s.$t("forgottenPassword")},null,8,["label"])]),_:1},8,["error-message","error","modelValue","type"])]),i("div",U,[r(y,{dense:"",modelValue:e.form.remember,"onUpdate:modelValue":o[3]||(o[3]=t=>e.form.remember=t),label:s.$t("rememberMe")},null,8,["modelValue","label"])]),r(V,{loading:e.visible,label:s.$t("login"),class:"full-width",color:"secondary",align:"center",type:"submit","no-caps":""},null,8,["loading","label"]),s.$route.meta.signup?(b(),g("div",B,[m(n(s.$t("donTHaveAnAccount"))+" ",1),r(p,{to:{name:"Sign up"},link:"",type:"a",label:s.$t("signUp")},null,8,["label"])])):P("",!0)]),_:1},8,["onSubmit"])])}var L=f(k,[["render",N]]);export{L as default};
