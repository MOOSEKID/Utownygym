import{_ as u,T as c,u as w,d as f,o as h,f as b,g as t,t as a,h as o,w as n,Q as d,s as m}from"./index.ec7eb99e.js";import{Q as g}from"./QForm.74e427bf.js";const P={data(){return{form:{password:"",password_confirmation:"",guard:this.$route.meta.guard},errors:{},visible:!1,isPwd1:!0,isPwd2:!0}},methods:{...c(w,["resetPassword"]),onSubmit(){console.func("pages/auth/ResetPasswordPage:methods.onSubmit()",arguments),this.onReset(),this.resetPassword(this.form).then(e=>{this.visible=!1,this.$router.push({name:"Login"}),this.$core.success(e.message)}).catch(e=>{this.visible=!1,e.errors?this.errors=e.errors:this.$core.error(e.message)})},onReset(){this.errors={},this.visible=!0}},created(){this.form.token=this.$route.query.token,this.form.email=this.$route.query.email}},_={class:"reset-password-page"},v={class:"text-h6 text-center"},y={class:"text-center q-mb-lg"},V={class:"col"},k={class:"col q-mb-md"};function S(e,r,q,B,s,p){const l=f("base-input");return h(),b("div",_,[t("div",v,a(e.$t("resetPassword")),1),t("p",y,a(e.$t("resetPasswordDesc")),1),o(g,{ref:"restPasswordForm",onSubmit:p.onSubmit},{default:n(()=>[t("div",V,[o(l,{outlined:"",dense:"",placeholder:e.$t("placeholder.password"),modelValue:s.form.password,"onUpdate:modelValue":r[1]||(r[1]=i=>s.form.password=i),"error-message":"password"in s.errors?s.errors.password.join(", "):"",error:"password"in s.errors,type:s.isPwd1?"password":"text"},{append:n(()=>[o(d,{name:s.isPwd1?"visibility_off":"visibility",class:"cursor-pointer",onClick:r[0]||(r[0]=i=>s.isPwd1=!s.isPwd1)},null,8,["name"])]),_:1},8,["placeholder","modelValue","error-message","error","type"])]),t("div",k,[o(l,{outlined:"",dense:"",placeholder:e.$t("placeholder.passwordConfirm"),modelValue:s.form.password_confirmation,"onUpdate:modelValue":r[3]||(r[3]=i=>s.form.password_confirmation=i),"error-message":"password_confirmation"in s.errors?s.errors.password_confirmation.join(", "):"",error:"password_confirmation"in s.errors,type:s.isPwd2?"password":"text"},{append:n(()=>[o(d,{name:s.isPwd2?"visibility_off":"visibility",class:"cursor-pointer",onClick:r[2]||(r[2]=i=>s.isPwd2=!s.isPwd2)},null,8,["name"])]),_:1},8,["placeholder","modelValue","error-message","error","type"])]),o(m,{loading:s.visible,"no-caps":"",label:e.$t("submit"),class:"full-width",color:"primary",align:"center",type:"submit"},null,8,["loading","label"]),o(m,{"no-caps":"",label:e.$t("goBack"),class:"q-mt-sm full-width",color:"negative",align:"center",flat:"",to:{name:"Login"}},null,8,["label"])]),_:1},8,["onSubmit"])])}var R=u(P,[["render",S]]);export{R as default};
