import{F as l,i,a as d,b as c,c as u}from"./index.0df08025.js";import{T as m,_ as p,d as h,o as _,e as f}from"./index.ec7eb99e.js";import{u as C}from"./week-schedule.cb510407.js";const v={props:{moduleId:[String,Number]},components:{FullCalendar:l},data(){return{currentEvents:[]}},methods:{...m(C,["calendar"]),onLoad({start:e,end:t},s,r){console.func("components/FullCalendar:methods.onLoad",arguments),this.calendar({start:e,end:t}).then(n=>{s(n.map(a=>({...a,color:this.$core.stringToHslColor(a.class,25,55),textColor:"#000000"})))}).catch(n=>{r(n)})},onResize(e){console.func("components/FullCalendar:methods.onResize",arguments),this.$refs.element.calendar.changeView(this.$q.screen.lt.sm?"listWeek":"dayGridMonth")}},computed:{calendarOptions(){const e=this.$q.screen.lt.md;let t={left:"prev,next today",center:"title",right:"dayGridMonth,timeGridWeek,timeGridDay,listWeek"};return e&&(t={left:"title",center:"prev,next today",right:"timeGridDay,listWeek"}),{aspectRatio:e?.8:1.8,firstDay:"1",plugins:[i,d,c,u],headerToolbar:t,initialView:e?"listWeek":"dayGridMonth",initialEvents:[],selectable:!0,selectMirror:!0,dayMaxEvents:!0,weekends:!0,editable:!0,eventTimeFormat:{hour:"numeric",minute:"2-digit"},events:this.onLoad,windowResize:this.onResize}}}};function x(e,t,s,r,n,a){const o=h("FullCalendar");return _(),f(o,{ref:"element",class:"class-schedules-calendar",options:a.calendarOptions},null,8,["options"])}var k=p(v,[["render",x]]);export{k as C};
