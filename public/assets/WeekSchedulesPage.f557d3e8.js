import{Q as y,a as v}from"./QTabPanel.fe7180a4.js";import{_ as D,T as O,U as P,d as i,o as S,e as V,w as s,h as o,aj as q,ak as Q,j as c,t as d,f as T,i as B,s as h,ad as b,ag as C,ae as R,O as N,ct as U}from"./index.ec7eb99e.js";import{Q as A}from"./QPage.b13c45b6.js";import{u as w}from"./week-schedule.cb510407.js";import{C as Y}from"./ClassAt.7060de06.js";import{C as j}from"./ClassSchedulesCalendar.7740cc47.js";import"./touch.9135741d.js";import"./selection.571043d0.js";import"./class-list.c44a0226.js";import"./instructor.45275a2f.js";import"./index.0df08025.js";const{formatDate:M,subtractFromDate:z,getDayOfWeek:x}=U,E=(e=null)=>M(z(e,{days:x(e)-1}),"YYYY-MM-DD"),F={components:{ClassAt:Y,ClassSchedulesCalendar:j},data(){return{loading:!1,tab:"calendar",pagination:{sortBy:"day_index",otherSortBy:"start_at",descending:!1,startOfWeek:E(new Date),previousOfWeek:null,nextOfWeek:null,descending:!1,page:1,filter:"",active:null,deleted:!1,rowsPerPage:15,rowsNumber:15,loaded:!1,override:["startOfWeek"]},totalCost:null,useWeekScheduleStore:w()}},methods:{...O(w,["get","changeSignOff","listPdf"]),onRequest(e){console.func("pages/admins/week-schedules/WeekSchedulePage:methods.onRequest()",arguments);const{page:a,rowsPerPage:_,sortBy:W,descending:n,date:l,classlist:f,instructor:m}=e.pagination;this.pagination=e.pagination,this.loading=!0,typeof l=="object"&&l?(e.pagination.date_from=l.from,e.pagination.date_to=l.to):(delete e.pagination.date_from,delete e.pagination.date_to),this.get({...e.pagination,class:f?f.id:null,instructor:m?m.id:null,direction:n?"desc":"asc"}).then(({previousOfWeek:r,startOfWeek:u,nextOfWeek:g,meta:p,totalCost:k})=>{this.pagination.rowsNumber=p.total,this.totalCost=k,this.pagination.page=a,this.pagination.rowsPerPage=_,this.pagination.sortBy=W,this.pagination.descending=n,this.pagination.loaded=!0,this.pagination.previousOfWeek=r,this.pagination.startOfWeek=u,this.pagination.nextOfWeek=g,this.loading=!1}).catch(r=>{this.$core.error(r,{title:this.$t("dialog.title.error")})})},async actionClicked(e,a){console.func("pages/admins/week-schedules/WeekSchedulePage:methods.actionClicked()",arguments)},async toolbarClicked({action:e},a){console.func("pages/admins/week-schedules/WeekSchedulesPage:methods.toolbarClicked()",arguments)},async rowClicked(e,a){if(console.func("pages/admins/week-schedules/WeekSchedulesPage:methods.rowClicked()",arguments),a.disable)return!1;this.$router.push({name:"Week Schedule",params:{id:a.id},query:{action:"edit"}})},onChangeDate(e){console.func("pages/admins/week-schedules/WeekSchedulesPage:methods.onChangeDate()",arguments),this.onRequest({pagination:{...this.pagination,startOfWeek:e}})}},computed:{...P(w,["actions","rows","columns","module","toolbar","filters"]),permissions(){return[]}}},L={key:0};function G(e,a,_,W,n,l){const f=i("base-page-header"),m=i("class-schedules-calendar"),r=i("base-section"),u=i("base-tooltip"),g=i("base-btn"),p=i("class-at"),k=i("base-table");return S(),V(A,{padding:""},{default:s(()=>[o(f,{class:"q-mb-md",title:e.$t("menus.weekSchedules"),hint:e.$t("manageAdminClassSchedules"),tabs:["Calendar","List"],modelValue:n.tab,"onUpdate:modelValue":a[0]||(a[0]=t=>n.tab=t)},null,8,["title","hint","modelValue"]),o(v,{class:"base-tab-panels",modelValue:n.tab,"onUpdate:modelValue":a[6]||(a[6]=t=>n.tab=t)},{default:s(()=>[o(y,{name:"calendar"},{default:s(()=>[o(r,{flat:"",bordered:"","no-row":""},{default:s(()=>[o(m)]),_:1})]),_:1}),o(y,{name:"list"},{default:s(()=>[o(r,{flat:"",bordered:"","no-row":""},{default:s(()=>[o(q,{class:"q-pa-none"},{default:s(()=>[o(Q,{class:"text-body1 text-bold"},{default:s(()=>[c(" Week: "+d(e.$core.formatDate(n.pagination.startOfWeek))+" ",1),n.totalCost?(S(),T("span",L,"("+d(e.$core.money(n.totalCost))+")",1)):B("",!0)]),_:1}),o(h,{color:"primary",flat:"",round:"",dense:"",icon:"fas fa-angle-left",onClick:a[1]||(a[1]=t=>l.onChangeDate(n.pagination.previousOfWeek))},{default:s(()=>[o(u,null,{default:s(()=>[c(" Previous Week ("+d(e.$core.formatDate(n.pagination.previousOfWeek))+") ",1)]),_:1})]),_:1}),o(h,{color:"primary",flat:"",round:"",dense:"",icon:"fas fa-circle",onClick:a[2]||(a[2]=t=>l.onChangeDate(new Date))},{default:s(()=>[o(u,null,{default:s(()=>[c(" Current Week("+d(e.$core.formatDate(new Date))+") ",1)]),_:1})]),_:1}),o(h,{color:"primary",flat:"",round:"",dense:"",icon:"fas fa-angle-right",onClick:a[3]||(a[3]=t=>l.onChangeDate(n.pagination.nextOfWeek))},{default:s(()=>[o(u,null,{default:s(()=>[c(" Next Week ("+d(e.$core.formatDate(n.pagination.nextOfWeek))+") ",1)]),_:1})]),_:1})]),_:1}),o(k,{store:n.useWeekScheduleStore,module:e.module,columns:e.columns,rows:e.rows,actions:e.actions,toolbar:e.toolbar,filters:e.filters,loading:n.loading,pagination:n.pagination,"onUpdate:pagination":a[5]||(a[5]=t=>n.pagination=t),onRequest:l.onRequest,onActionClicked:l.actionClicked,onToolbarClicked:l.toolbarClicked,onRowClicked:l.rowClicked,"no-data-label":e.$t("registrations.noData"),"table-key":"registrations"},{"body-cell-day_index":s(t=>[b(o(g,{onClick:a[4]||(a[4]=R(()=>{},["stop"])),link:"",size:"12px",tag:"a",to:{name:"Week Schedule",params:{id:t.row.id},query:{action:"edit"}}},{default:s(()=>[c(d(t.value),1)]),_:2},1032,["to"]),[[C,!t.row.disable]])]),"body-cell-has_sign_off":s(t=>[b(o(N,{"onUpdate:modelValue":H=>e.changeSignOff(t.row),size:"sm",dense:"","model-value":t.row.has_sign_off,color:"green"},null,8,["onUpdate:modelValue","model-value"]),[[C,!t.row.disable]])]),"body-cell-at":s(t=>[b(o(p,{"has-sign-off":t.row.has_sign_off,value:t.value},null,8,["has-sign-off","value"]),[[C,!t.row.disable]])]),_:1},8,["store","module","columns","rows","actions","toolbar","filters","loading","pagination","onRequest","onActionClicked","onToolbarClicked","onRowClicked","no-data-label"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}var se=D(F,[["render",G]]);export{se as default};
