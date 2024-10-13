import{_ as R,cr as K,T as I,u as k,m as g,U as j,d,o as h,e as T,w as o,h as n,g as t,j as c,t as m,ad as y,ag as S,f as B,au as N,i as E,aq as $,p as F,N as P,W as w,Q as H,n as q,s as Q,ae as G,aX as Y,ar as J,F as W}from"./index.ec7eb99e.js";import{Q as O}from"./QExpansionItem.38c12bfd.js";import{Q as x}from"./QPage.b13c45b6.js";import{S as Z}from"./mixins.af528ab3.js";import{C as X}from"./StateSelect.d3ce42fc.js";import{S as aa}from"./SettingsPageHeader.b1719c9d.js";import"./QSlideTransition.d1b840b3.js";import"./CitySelect.367b922a.js";import"./BaseSectionSkeleton.971da8dd.js";import"./QSkeleton.73bc54f6.js";import"./page.e7247b54.js";import"./QMenu.76199ca9.js";import"./selection.571043d0.js";import"./SkeletonSinglePage.dba71dd3.js";import"./index.becf6c0c.js";const f=[{label:"(UTC-11:00) Midway Island",value:"Pacific/Midway"},{label:"(UTC-11:00) Samoa",value:"Pacific/Samoa"},{label:"(UTC-10:00) Hawaii",value:"Pacific/Honolulu"},{label:"(UTC-09:00) Alaska",value:"US/Alaska"},{label:"(UTC-08:00) Pacific Time (US & Canada)",value:"America/Los_Angeles"},{label:"(UTC-08:00) Tijuana",value:"America/Tijuana"},{label:"(UTC-07:00) Arizona",value:"US/Arizona"},{label:"(UTC-07:00) Chihuahua",value:"America/Chihuahua"},{label:"(UTC-07:00) Mazatlan",value:"America/Mazatlan"},{label:"(UTC-07:00) Mountain Time (US & Canada)",value:"US/Mountain"},{label:"(UTC-06:00) Central America",value:"America/Managua"},{label:"(UTC-06:00) Central Time (US & Canada)",value:"US/Central"},{label:"(UTC-06:00) Guadalajara",value:"America/Mexico_City"},{label:"(UTC-06:00) Mexico City",value:"America/Mexico_City"},{label:"(UTC-06:00) Monterrey",value:"America/Monterrey"},{label:"(UTC-06:00) Saskatchewan",value:"Canada/Saskatchewan"},{label:"(UTC-05:00) Bogota",value:"America/Bogota"},{label:"(UTC-05:00) Eastern Time (US & Canada)",value:"US/Eastern"},{label:"(UTC-05:00) Indiana (East)",value:"US/East-Indiana"},{label:"(UTC-05:00) Lima",value:"America/Lima"},{label:"(UTC-05:00) Quito",value:"America/Bogota"},{label:"(UTC-04:00) Atlantic Time (Canada)",value:"Canada/Atlantic"},{label:"(UTC-04:30) Caracas",value:"America/Caracas"},{label:"(UTC-04:00) La Paz",value:"America/La_Paz"},{label:"(UTC-04:00) Santiago",value:"America/Santiago"},{label:"(UTC-03:30) Newfoundland",value:"Canada/Newfoundland"},{label:"(UTC-03:00) Brasilia",value:"America/Sao_Paulo"},{label:"(UTC-03:00) Buenos Aires",value:"America/Argentina/Buenos_Aires"},{label:"(UTC-03:00) Greenland",value:"America/Godthab"},{label:"(UTC-02:00) Mid-Atlantic",value:"America/Noronha"},{label:"(UTC-01:00) Azores",value:"Atlantic/Azores"},{label:"(UTC-01:00) Cape Verde Is.",value:"Atlantic/Cape_Verde"},{label:"(UTC+00:00) Casablanca",value:"Africa/Casablanca"},{label:"(UTC+00:00) Edinburgh",value:"Europe/London"},{label:"(UTC+00:00) Greenwich Mean Time : Dublin",value:"Etc/Greenwich"},{label:"(UTC+00:00) Lisbon",value:"Europe/Lisbon"},{label:"(UTC+00:00) London",value:"Europe/London"},{label:"(UTC+00:00) Monrovia",value:"Africa/Monrovia"},{label:"(UTC+00:00) UTC",value:"UTC"},{label:"(UTC+01:00) Amsterdam",value:"Europe/Amsterdam"},{label:"(UTC+01:00) Belgrade",value:"Europe/Belgrade"},{label:"(UTC+01:00) Berlin",value:"Europe/Berlin"},{label:"(UTC+01:00) Bern",value:"Europe/Berlin"},{label:"(UTC+01:00) Bratislava",value:"Europe/Bratislava"},{label:"(UTC+01:00) Brussels",value:"Europe/Brussels"},{label:"(UTC+01:00) Budapest",value:"Europe/Budapest"},{label:"(UTC+01:00) Copenhagen",value:"Europe/Copenhagen"},{label:"(UTC+01:00) Ljubljana",value:"Europe/Ljubljana"},{label:"(UTC+01:00) Madrid",value:"Europe/Madrid"},{label:"(UTC+01:00) Paris",value:"Europe/Paris"},{label:"(UTC+01:00) Prague",value:"Europe/Prague"},{label:"(UTC+01:00) Rome",value:"Europe/Rome"},{label:"(UTC+01:00) Sarajevo",value:"Europe/Sarajevo"},{label:"(UTC+01:00) Skopje",value:"Europe/Skopje"},{label:"(UTC+01:00) Stockholm",value:"Europe/Stockholm"},{label:"(UTC+01:00) Vienna",value:"Europe/Vienna"},{label:"(UTC+01:00) Warsaw",value:"Europe/Warsaw"},{label:"(UTC+01:00) West Central Africa",value:"Africa/Lagos"},{label:"(UTC+01:00) Zagreb",value:"Europe/Zagreb"},{label:"(UTC+02:00) Athens",value:"Europe/Athens"},{label:"(UTC+02:00) Bucharest",value:"Europe/Bucharest"},{label:"(UTC+02:00) Cairo",value:"Africa/Cairo"},{label:"(UTC+02:00) Harare",value:"Africa/Harare"},{label:"(UTC+02:00) Helsinki",value:"Europe/Helsinki"},{label:"(UTC+02:00) Istanbul",value:"Europe/Istanbul"},{label:"(UTC+02:00) Jerusalem",value:"Asia/Jerusalem"},{label:"(UTC+02:00) Kyiv",value:"Europe/Helsinki"},{label:"(UTC+02:00) Pretoria",value:"Africa/Johannesburg"},{label:"(UTC+02:00) Riga",value:"Europe/Riga"},{label:"(UTC+02:00) Sofia",value:"Europe/Sofia"},{label:"(UTC+02:00) Tallinn",value:"Europe/Tallinn"},{label:"(UTC+02:00) Vilnius",value:"Europe/Vilnius"},{label:"(UTC+03:00) Baghdad",value:"Asia/Baghdad"},{label:"(UTC+03:00) Kuwait",value:"Asia/Kuwait"},{label:"(UTC+03:00) Minsk",value:"Europe/Minsk"},{label:"(UTC+03:00) Nairobi",value:"Africa/Nairobi"},{label:"(UTC+03:00) Riyadh",value:"Asia/Riyadh"},{label:"(UTC+03:00) Volgograd",value:"Europe/Volgograd"},{label:"(UTC+03:30) Tehran",value:"Asia/Tehran"},{label:"(UTC+04:00) Abu Dhabi",value:"Asia/Muscat"},{label:"(UTC+04:00) Baku",value:"Asia/Baku"},{label:"(UTC+04:00) Moscow",value:"Europe/Moscow"},{label:"(UTC+04:00) Muscat",value:"Asia/Muscat"},{label:"(UTC+04:00) Tbilisi",value:"Asia/Tbilisi"},{label:"(UTC+04:00) Yerevan",value:"Asia/Yerevan"},{label:"(UTC+04:30) Kabul",value:"Asia/Kabul"},{label:"(UTC+05:00) Islamabad",value:"Asia/Karachi"},{label:"(UTC+05:00) Karachi",value:"Asia/Karachi"},{label:"(UTC+05:00) Tashkent",value:"Asia/Tashkent"},{label:"(UTC+05:30) New Delhi",value:"Asia/Calcutta"},{label:"(UTC+05:45) Kathmandu",value:"Asia/Katmandu"},{label:"(UTC+06:00) Almaty",value:"Asia/Almaty"},{label:"(UTC+06:00) Astana",value:"Asia/Dhaka"},{label:"(UTC+06:00) Dhaka",value:"Asia/Dhaka"},{label:"(UTC+06:00) Ekaterinburg",value:"Asia/Yekaterinburg"},{label:"(UTC+06:30) Rangoon",value:"Asia/Rangoon"},{label:"(UTC+07:00) Bangkok",value:"Asia/Bangkok"},{label:"(UTC+07:00) Hanoi",value:"Asia/Bangkok"},{label:"(UTC+07:00) Jakarta",value:"Asia/Jakarta"},{label:"(UTC+07:00) Novosibirsk",value:"Asia/Novosibirsk"},{label:"(UTC+08:00) Beijing",value:"Asia/Hong_Kong"},{label:"(UTC+08:00) Chongqing",value:"Asia/Chongqing"},{label:"(UTC+08:00) Hong Kong",value:"Asia/Hong_Kong"},{label:"(UTC+08:00) Krasnoyarsk",value:"Asia/Krasnoyarsk"},{label:"(UTC+08:00) Kuala Lumpur",value:"Asia/Kuala_Lumpur"},{label:"(UTC+08:00) Perth",value:"Australia/Perth"},{label:"(UTC+08:00) Singapore",value:"Asia/Singapore"},{label:"(UTC+08:00) Taipei",value:"Asia/Taipei"},{label:"(UTC+08:00) Ulaan Bataar",value:"Asia/Ulan_Bator"},{label:"(UTC+08:00) Urumqi",value:"Asia/Urumqi"},{label:"(UTC+09:00) Irkutsk",value:"Asia/Irkutsk"},{label:"(UTC+09:00) Osaka",value:"Asia/Tokyo"},{label:"(UTC+09:00) Sapporo",value:"Asia/Tokyo"},{label:"(UTC+09:00) Seoul",value:"Asia/Seoul"},{label:"(UTC+09:00) Tokyo",value:"Asia/Tokyo"},{label:"(UTC+09:30) Adelaide",value:"Australia/Adelaide"},{label:"(UTC+09:30) Darwin",value:"Australia/Darwin"},{label:"(UTC+10:00) Brisbane",value:"Australia/Brisbane"},{label:"(UTC+10:00) Canberra",value:"Australia/Canberra"},{label:"(UTC+10:00) Guam",value:"Pacific/Guam"},{label:"(UTC+10:00) Hobart",value:"Australia/Hobart"},{label:"(UTC+10:00) Melbourne",value:"Australia/Melbourne"},{label:"(UTC+10:00) Port Moresby",value:"Pacific/Port_Moresby"},{label:"(UTC+10:00) Sydney",value:"Australia/Sydney"},{label:"(UTC+10:00) Yakutsk",value:"Asia/Yakutsk"},{label:"(UTC+11:00) Vladivostok",value:"Asia/Vladivostok"},{label:"(UTC+12:00) Auckland",value:"Pacific/Auckland"},{label:"(UTC+12:00) Fiji",value:"Pacific/Fiji"},{label:"(UTC+12:00) International Date Line West",value:"Pacific/Kwajalein"},{label:"(UTC+12:00) Kamchatka",value:"Asia/Kamchatka"},{label:"(UTC+12:00) Magadan",value:"Asia/Magadan"},{label:"(UTC+12:00) Marshall Is.",value:"Pacific/Fiji"},{label:"(UTC+12:00) New Caledonia",value:"Asia/Magadan"},{label:"(UTC+12:00) Solomon Is.",value:"Asia/Magadan"},{label:"(UTC+12:00) Wellington",value:"Pacific/Auckland"},{label:"(UTC+13:00) Nuku'alofa",value:"Pacific/Tongatapu"}],D={current_page:1,last_page:1},ea=({filter:a})=>new Promise((e,i)=>{try{if(a==="")e({data:f,meta:D});else{const s=a.toLowerCase(),r=f.filter(({label:u})=>u.toLowerCase().indexOf(s)>-1);e({data:r,meta:D})}}catch(s){i(s)}}),la=a=>{if(a!=null&&a.code){const e=a.code.toUpperCase();return`${a.name} (${e})`}return a.name},na=[{name:"US Dollar",code:"usd"},{name:"Canadian Dollar",code:"cad"},{name:"Euro",code:"eur"},{name:"United Arab Emirates Dirham",code:"aed"},{name:"Afghan Afghani",code:"afn"},{name:"Albanian Lek",code:"all"},{name:"Armenian Dram",code:"amd"},{name:"Argentine Peso",code:"ars"},{name:"Australian Dollar",code:"aud"},{name:"Azerbaijani Manat",code:"azn"},{name:"Bosnia-Herzegovina Convertible Mark",code:"bam"},{name:"Bangladeshi Taka",code:"bdt"},{name:"Bulgarian Lev",code:"bgn"},{name:"Bahraini Dinar",code:"bhd"},{name:"Burundian Franc",code:"bif"},{name:"Brunei Dollar",code:"bnd"},{name:"Bolivian Boliviano",code:"bob"},{name:"Brazilian Real",code:"brl"},{name:"Botswanan Pula",code:"bwp"},{name:"Belarusian Ruble",code:"byn"},{name:"Belize Dollar",code:"bzd"},{name:"Congolese Franc",code:"cdf"},{name:"Swiss Franc",code:"chf"},{name:"Chilean Peso",code:"clp"},{name:"Chinese Yuan",code:"cny"},{name:"Colombian Peso",code:"cop"},{name:"Costa Rican Col\xF3n",code:"crc"},{name:"Cape Verdean Escudo",code:"cve"},{name:"Czech Republic Koruna",code:"czk"},{name:"Djiboutian Franc",code:"djf"},{name:"Danish Krone",code:"dkk"},{name:"Dominican Peso",code:"dop"},{name:"Algerian Dinar",code:"dzd"},{name:"Estonian Kroon",code:"eek"},{name:"Egyptian Pound",code:"egp"},{name:"Eritrean Nakfa",code:"ern"},{name:"Ethiopian Birr",code:"etb"},{name:"British Pound Sterling",code:"gbp"},{name:"Georgian Lari",code:"gel"},{name:"Ghanaian Cedi",code:"ghs"},{name:"Guinean Franc",code:"gnf"},{name:"Guatemalan Quetzal",code:"gtq"},{name:"Hong Kong Dollar",code:"hkd"},{name:"Honduran Lempira",code:"hnl"},{name:"Croatian Kuna",code:"hrk"},{name:"Hungarian Forint",code:"huf"},{name:"Indonesian Rupiah",code:"idr"},{name:"Israeli New Sheqel",code:"ils"},{name:"Indian Rupee",code:"inr"},{name:"Iraqi Dinar",code:"iqd"},{name:"Iranian Rial",code:"irr"},{name:"Icelandic Kr\xF3na",code:"isk"},{name:"Jamaican Dollar",code:"jmd"},{name:"Jordanian Dinar",code:"jod"},{name:"Japanese Yen",code:"jpy"},{name:"Kenyan Shilling",code:"kes"},{name:"Cambodian Riel",code:"khr"},{name:"Comorian Franc",code:"kmf"},{name:"South Korean Won",code:"krw"},{name:"Kuwaiti Dinar",code:"kwd"},{name:"Kazakhstani Tenge",code:"kzt"},{name:"Lebanese Pound",code:"lbp"},{name:"Sri Lankan Rupee",code:"lkr"},{name:"Lithuanian Litas",code:"ltl"},{name:"Latvian Lats",code:"lvl"},{name:"Libyan Dinar",code:"lyd"},{name:"Moroccan Dirham",code:"mad"},{name:"Moldovan Leu",code:"mdl"},{name:"Malagasy Ariary",code:"mga"},{name:"Macedonian Denar",code:"mkd"},{name:"Myanma Kyat",code:"mmk"},{name:"Macanese Pataca",code:"mop"},{name:"Mauritian Rupee",code:"mur"},{name:"Mexican Peso",code:"mxn"},{name:"Malaysian Ringgit",code:"myr"},{name:"Mozambican Metical",code:"mzn"},{name:"Namibian Dollar",code:"nad"},{name:"Nigerian Naira",code:"ngn"},{name:"Nicaraguan C\xF3rdoba",code:"nio"},{name:"Norwegian Krone",code:"nok"},{name:"Nepalese Rupee",code:"npr"},{name:"New Zealand Dollar",code:"nzd"},{name:"Omani Rial",code:"omr"},{name:"Panamanian Balboa",code:"pab"},{name:"Peruvian Nuevo Sol",code:"pen"},{name:"Philippine Peso",code:"php"},{name:"Pakistani Rupee",code:"pkr"},{name:"Polish Zloty",code:"pln"},{name:"Paraguayan Guarani",code:"pyg"},{name:"Qatari Rial",code:"qar"},{name:"Romanian Leu",code:"ron"},{name:"Serbian Dinar",code:"rsd"},{name:"Russian Ruble",code:"rub"},{name:"Rwandan Franc",code:"rwf"},{name:"Saudi Riyal",code:"sar"},{name:"Sudanese Pound",code:"sdg"},{name:"Swedish Krona",code:"sek"},{name:"Singapore Dollar",code:"sgd"},{name:"Somali Shilling",code:"sos"},{name:"Syrian Pound",code:"syp"},{name:"Thai Baht",code:"thb"},{name:"Tunisian Dinar",code:"tnd"},{name:"Tongan Pa\u02BBanga",code:"top"},{name:"Turkish Lira",code:"try"},{name:"Trinidad and Tobago Dollar",code:"ttd"},{name:"New Taiwan Dollar",code:"twd"},{name:"Tanzanian Shilling",code:"tzs"},{name:"Ukrainian Hryvnia",code:"uah"},{name:"Ugandan Shilling",code:"ugx"},{name:"Uruguayan Peso",code:"uyu"},{name:"Uzbekistan Som",code:"uzs"},{name:"Venezuelan Bol\xEDvar",code:"vef"},{name:"Vietnamese Dong",code:"vnd"},{name:"CFA Franc BEAC",code:"xaf"},{name:"CFA Franc BCEAO",code:"xof"},{name:"Yemeni Rial",code:"yer"},{name:"South African Rand",code:"zar"},{name:"Zambian Kwacha",code:"zmk"},{name:"Zimbabwean Dollar",code:"zwl"}];const oa={mixins:[Z],components:{CountrySelect:X,FileSelector:K,SettingsPageHeader:aa},data(){return{options:{},defaultData:{},saving:{},changed:{},loaded:{},timezones:f,currencies:na,loading:!1,currentSetting:null}},methods:{onFilterTimezone:ea,...I(k,["getSettings","updateSettings","setIsDirt"]),onLoad(a){const{key:e,defaultValue:i}=a;if(this.currentSetting=e,e in this.loaded)return!1;this.loaded[e]=!1,this.getSettings(e).then(s=>{g.exports.isEmpty(s)&&(s=i),this.options[e]=s,this.defaultData[e]=g.exports.cloneDeep(s),this.loaded[e]=!0}).catch(s=>{this.$core.error(s,{title:this.$t("dialog.title.error")}),this.loaded[e]=!0})},onUpdate(a,e){console.func("pages/admins/SettingsPage:methods.onUpdate()",arguments);const{key:i}=e;this.options[i]=g.exports.cloneDeep(a),this.changed[i]=this.hasChanged(i),this.checkChangedAny()},onAdd(a){console.func("pages/admins/SettingsPage:methods.onAdd()",arguments);const{key:e,option:i}=a;this.changed[e]=!0,this.checkChangedAny(),this.options[e].push({...i,id:Date.now()})},onSave(a){console.func("pages/admins/SettingsPage:methods.onSave()",arguments);const{key:e}=a,i=this.options[e];this.saving[e]=!0,this.updateSettings({key:e,options:i}).then(({message:s})=>{this.$q.notify(s),this.loaded[e]=!1,this.$nextTick(()=>{this.saving[e]=!1,this.changed[e]=!1,this.loaded[e]=!0,this.checkChangedAny()})}).catch(s=>{this.saving[e]=!1,this.$core.error(s,{title:this.$t("dialog.title.error")})})},onUpdateConfig(){console.func("pages/admins/SettingsPage:methods.onUpdateConfig()",arguments),this.loading=!0,this.updateSettings({key:"config",options:this.config}).then(({message:a})=>{this.$q.notify(a),this.loading=!1}).catch(a=>{this.loading=!1,this.$core.error(a,{title:this.$t("dialog.title.error")})})},hasChanged(a){const e=i=>JSON.stringify(i);return e(this.options[a])!==e(this.defaultData[a])},checkChangedAny(){const a=()=>{for(const e in this.changed)if(this.changed[e]===!0)return!0;return!1};this.setIsDirt(a())},optionLabel:la},mounted(){const a={};this.settings.forEach(({key:e,defaultValue:i})=>{a[e]=i}),this.defaultData=g.exports.cloneDeep(a),this.options=g.exports.cloneDeep(a),this.onLoad(this.settings[0])},computed:{...j(k,["config"]),settings(){return[{label:this.$t("mailConfiguration"),key:"mail",icon:"fas fa-envelope",component:"mail-config",dataType:"object",defaultValue:{}},{label:this.$t("label.openingTimes"),key:"opening-times",icon:"fas fa-clock",component:"opening-times",dataType:"array",defaultValue:[]},{label:this.$t("companyTerms"),key:"terms",icon:"fas fa-clipboard-list-check",component:"terms-config",dataType:"object",defaultValue:{tos:"",privacy:""}},{label:this.$t("billingInformation"),key:"address",icon:"fad fa-address-book",component:"billing-information",dataType:"object",defaultValue:{}},{label:this.$t("label.menus"),key:"menus",icon:"fas fa-list-dropdown",component:"app-menus",dataType:"object",defaultValue:{}},{label:this.$t("socials"),key:"socials",icon:"fas fa-hashtag",component:"app-socials",dataType:"array",defaultValue:[]},{label:this.$t("theme"),key:"theme",icon:"fas fa-palette",component:"app-theme",dataType:"object",defaultValue:{}},{label:this.$t("pushWhatsappAlert"),key:"alert",icon:"fas fa-bell",component:"app-alert",dataType:"object",defaultValue:{}}]}}},ia={class:"q-gutter-y-md q-pt-md"},sa={class:"config"},ta={class:"row q-col-gutter-md"},ra={class:"col-xs-12 col-sm-3"},ua={class:"col-xs-12 col-sm-3"},da={class:"col-xs-12 col-sm-3"},ca={class:"col-xs-12 col-sm-3"},ma={class:"col-xs-12 col-sm-3"},ba={class:"col-xs-12 col-sm-3"},pa={class:"col-xs-12 col-sm-3"},ga={class:"col-xs-12 col-sm-12"},ha={class:"col-xs-12 col-sm-12"},va={class:"logo-selector"},Ca={class:"col-xs-12 col-sm-12 self-end flex"},Ta={class:"q-gutter-sm"},fa={class:"q-gutter-y-xs"};function Ua(a,e,i,s,r,u){const _=d("settings-page-header"),b=d("base-label"),v=d("base-input"),M=d("country-select"),C=d("base-select"),V=d("base-checkbox"),z=d("file-selector"),L=d("base-btn"),U=d("base-section");return h(),T(x,{padding:""},{default:o(()=>[n(_,{title:a.$t("appSettings"),hint:a.$t("appSettingsDesc")},null,8,["title","hint"]),t("div",ia,[n(U,{flat:"",bordered:"","no-row":"",title:"App details"},{default:o(()=>[t("div",sa,[t("div",ta,[t("div",ra,[n(b,null,{default:o(()=>[c(m(a.$t("label.companyName")),1)]),_:1}),n(v,{placeholder:"NitroFIT28",hint:a.$t("hint.appearsOnYourWebsite"),modelValue:a.config.name,"onUpdate:modelValue":e[0]||(e[0]=l=>a.config.name=l)},null,8,["hint","modelValue"])]),t("div",ua,[n(b,null,{default:o(()=>[c(m(a.$t("label.email")),1)]),_:1}),n(v,{placeholder:"info@company.com",hint:a.$t("hint.theEmailYourAppUsesToSendEmailsToYourMembers"),modelValue:a.config.email,"onUpdate:modelValue":e[1]||(e[1]=l=>a.config.email=l)},null,8,["hint","modelValue"])]),t("div",da,[n(b,null,{default:o(()=>[c(m(a.$t("label.phone")),1)]),_:1}),n(v,{placeholder:"+1123456789",modelValue:a.config.phone,"onUpdate:modelValue":e[2]||(e[2]=l=>a.config.phone=l)},null,8,["modelValue"])]),t("div",ca,[n(b,null,{default:o(()=>[c(m(a.$t("label.country")),1)]),_:1}),n(M,{modelValue:a.config.country,"onUpdate:modelValue":e[3]||(e[3]=l=>a.config.country=l)},null,8,["modelValue"])]),t("div",ma,[n(b,null,{default:o(()=>[c(m(a.$t("label.timezone")),1)]),_:1}),n(C,{options:r.timezones,"emit-value":"","map-options":"",outlined:"",dense:"","use-filter":"","filter-method":u.onFilterTimezone,modelValue:a.config.timezone,"onUpdate:modelValue":e[4]||(e[4]=l=>a.config.timezone=l)},null,8,["options","filter-method","modelValue"])]),t("div",ba,[n(b,null,{default:o(()=>[c(m(a.$t("lang")),1)]),_:1}),n(C,{options:[{label:"English",value:"en-US"},{label:"French",value:"fr"},{label:"Hindi (India)",value:"hi_IN"},{label:"Romanian (Romania)",value:"ro_RO"},{label:"Japanese",value:"ja"},{label:"Korean",value:"ko"},{label:"Russian (Russia)",value:"ru_RU"},{label:"Spanish",value:"es"},{label:"Chinese",value:"zh"},{label:"Arabic",value:"ar"},{label:"Portuguese",value:"pt"},{label:"Italian (Italy)",value:"it_IT"}],"map-options":"","emit-value":"","onUpdate:modelValue":[e[5]||(e[5]=l=>a.$i18n.locale=l),e[6]||(e[6]=l=>a.config.lang=l)],outlined:"",dense:"",modelValue:a.config.lang},null,8,["modelValue"])]),t("div",pa,[n(b,null,{default:o(()=>[c(m(a.$t("label.currency")),1)]),_:1}),n(C,{options:r.currencies,"option-label":u.optionLabel,"option-value":"code",outlined:"",dense:"","map-options":"","emit-value":"",modelValue:a.config.currency,"onUpdate:modelValue":e[7]||(e[7]=l=>a.config.currency=l)},null,8,["options","option-label","modelValue"])]),t("div",ga,[n(V,{modelValue:a.config.shop,"onUpdate:modelValue":e[8]||(e[8]=l=>a.config.shop=l),label:"Selling product online?"},null,8,["modelValue"])]),t("div",ha,[n(b,null,{default:o(()=>[c(m(a.$t("label.logo")),1)]),_:1}),t("div",va,[y(n(z,{mini:"",ref:"logo",accept:"image/*",icon:"fad fa-image","dialog-label":a.$t("uploadMedia"),hint:a.$t("hint.images",{type:"logo"}),"onUpdate:modelValue":e[9]||(e[9]=l=>a.config.logo=l==null?void 0:l.url),name:"logo","load-from-server":""},null,8,["dialog-label","hint"]),[[S,!a.config.logo]]),a.config.logo?(h(),B("div",{key:0,onClick:e[10]||(e[10]=l=>a.$refs.logo.onFileBrowse()),class:"logo-container"},[n(N,{src:a.config.logo},null,8,["src"])])):E("",!0)])]),t("div",Ca,[n($),t("div",Ta,[n(L,{color:"primary",icon:"fad fa-save",loading:r.loading,label:a.$t("save"),onClick:u.onUpdateConfig},null,8,["loading","label","onClick"])])])])])]),_:1}),n(U,{flat:"",bordered:"","no-row":"",title:"Application Configs",description:"Here you can configure your opening times, billing information and frontend."},{default:o(()=>[t("div",fa,[(h(!0),B(W,null,F(u.settings,(l,A)=>(h(),T(O,{class:"base-settings-item","header-class":"bg-grey-4 text-subtitle2 text-black","expand-icon-class":"text-black",key:A,icon:l.icon,label:l.label,onBeforeShow:p=>u.onLoad(l),"default-opened":A===0,group:"settings"},{header:o(({expanded:p})=>[n(P,{class:"header-label"},{default:o(()=>[n(w,{class:"flex items-center"},{default:o(()=>[n(H,{size:"19px",name:l.icon,class:"q-mr-sm"},null,8,["name"]),c(" "+m(l.label),1)]),_:2},1024)]),_:2},1024),n(P,{class:q({expanded:p,actions:!0}),side:""},{default:o(()=>[n(w,null,{default:o(()=>[y(n(Q,{color:"primary",onClick:G(Aa=>u.onAdd(l),["stop"]),icon:"fad fa-circle-plus",dense:"",round:"",flat:""},null,8,["onClick"]),[[S,l.add&&p]])]),_:2},1024)]),_:2},1032,["class"])]),default:o(()=>[r.currentSetting===l.key?(h(),T(Y(l.component),J({key:0,ref_for:!0},l,{options:r.options[l.key],"onUpdate:options":p=>r.options[l.key]=p,loaded:r.loaded[l.key],changed:r.changed[l.key],loading:l.saving,onUpdate:p=>u.onUpdate(p,l),onSave:p=>u.onSave(l)}),null,16,["options","onUpdate:options","loaded","changed","loading","onUpdate","onSave"])):E("",!0)]),_:2},1032,["icon","label","onBeforeShow","default-opened"]))),128))])]),_:1})])]),_:1})}var Ia=R(oa,[["render",Ua]]);export{Ia as default};
