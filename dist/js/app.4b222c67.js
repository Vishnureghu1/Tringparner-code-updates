(function(t){function e(e){for(var a,n,i=e[0],l=e[1],c=e[2],u=0,d=[];u<i.length;u++)n=i[u],Object.prototype.hasOwnProperty.call(o,n)&&o[n]&&d.push(o[n][0]),o[n]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);p&&p(e);while(d.length)d.shift()();return s.push.apply(s,c||[]),r()}function r(){for(var t,e=0;e<s.length;e++){for(var r=s[e],a=!0,n=1;n<r.length;n++){var i=r[n];0!==o[i]&&(a=!1)}a&&(s.splice(e--,1),t=l(l.s=r[0]))}return t}var a={},n={app:0},o={app:0},s=[];function i(t){return l.p+"js/"+({missed_call:"missed_call"}[t]||t)+"."+{missed_call:"047c5609"}[t]+".js"}function l(e){if(a[e])return a[e].exports;var r=a[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.e=function(t){var e=[],r={missed_call:1};n[t]?e.push(n[t]):0!==n[t]&&r[t]&&e.push(n[t]=new Promise((function(e,r){for(var a="css/"+({missed_call:"missed_call"}[t]||t)+"."+{missed_call:"20fd65a7"}[t]+".css",o=l.p+a,s=document.getElementsByTagName("link"),i=0;i<s.length;i++){var c=s[i],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===a||u===o))return e()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){c=d[i],u=c.getAttribute("data-href");if(u===a||u===o)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var a=e&&e.target&&e.target.src||o,s=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=a,delete n[t],p.parentNode.removeChild(p),r(s)},p.href=o;var v=document.getElementsByTagName("head")[0];v.appendChild(p)})).then((function(){n[t]=0})));var a=o[t];if(0!==a)if(a)e.push(a[2]);else{var s=new Promise((function(e,r){a=o[t]=[e,r]}));e.push(a[2]=s);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=i(t);var d=new Error;c=function(e){u.onerror=u.onload=null,clearTimeout(p);var r=o[t];if(0!==r){if(r){var a=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+a+": "+n+")",d.name="ChunkLoadError",d.type=a,d.request=n,r[1](d)}o[t]=void 0}};var p=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(e)},l.m=t,l.c=a,l.d=function(t,e,r){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)l.d(r,a,function(e){return t[e]}.bind(null,a));return r},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/",l.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var d=0;d<c.length;d++)e(c[d]);var p=u;s.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},1:function(t,e){},"56d7":function(t,e,r){"use strict";r.r(e),r.d(e,"eventBus",(function(){return X})),r.d(e,"db",(function(){return tt}));r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",{attrs:{app:""}},[r("Navbar",[r("v-main",{staticClass:"ma-4"})],1)],1)},o=[],s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",[r("v-navigation-drawer",{staticClass:"white",attrs:{clipped:"",app:"",width:"280px",permanent:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[r("v-list",{attrs:{flat:""}},[r("v-list-item",{attrs:{"active-class":"red--text"}},[r("v-list-item-content",[r("v-list-item-title",{staticClass:"grey--text"},[r("v-icon",{staticClass:"mr-3",attrs:{color:"grey"}},[t._v("mdi-radar")]),t._v(" Dashboard")],1)],1)],1),r("v-list-group",{attrs:{"no-action":""},scopedSlots:t._u([{key:"activator",fn:function(){return[r("v-list-item-content",[r("v-list-item-title",{staticClass:"grey--text"},[r("v-icon",{staticClass:"mr-3",attrs:{color:"grey"}},[t._v("mdi-phone")]),t._v(" Call Logs")],1)],1)]},proxy:!0}])},t._l(t.subMenu,(function(e){return r("v-list-item",{key:e.text,attrs:{router:"",to:e.route,link:""}},[r("v-list-item-title",{staticClass:"grey--text",domProps:{textContent:t._s(e.text)}})],1)})),1),r("v-list-item",{attrs:{"active-class":"red--text"}},[r("v-list-item-content",[r("v-list-item-title",{staticClass:"grey--text"},[r("v-icon",{staticClass:"mr-3",attrs:{color:"grey"}},[t._v("mdi-chart-bar")]),t._v(" Reports ")],1)],1)],1),r("v-list-group",{attrs:{"no-action":""},scopedSlots:t._u([{key:"activator",fn:function(){return[r("v-list-item-content",[r("v-list-item-title",{staticClass:"grey--text"},[r("v-icon",{staticClass:"mr-3",attrs:{color:"grey"}},[t._v("mdi-dots-horizontal")]),t._v(" More")],1)],1)]},proxy:!0}])},t._l(t.more,(function(e){return r("v-list-item",{key:e.text,attrs:{router:"",to:e.route,link:""}},[r("v-list-item-title",{staticClass:"grey--text",domProps:{textContent:t._s(e.text)}})],1)})),1)],1)],1),r("v-app-bar",{staticClass:"white",attrs:{app:"","clipped-left":""}},[r("v-app-bar",{attrs:{color:"white",flat:""}},[r("v-spacer"),r("v-btn",{attrs:{icon:""}},[r("v-icon",{attrs:{color:"black"}},[t._v("mdi-bell-outline")])],1),r("v-avatar",{staticClass:"ml-5",attrs:{size:"40"}},[r("v-img",{attrs:{src:"/img1.png"}})],1)],1)],1),r("v-content",[r("v-row",{attrs:{align:"center"}},[r("v-col",{attrs:{cols:"12"}},[r("router-view")],1)],1)],1)],1)},i=[],l={created:function(){},data:function(){return{drawer:!1,group:null,role:"",subMenu:[{icon:"dashboard",text:"All Calls",route:"/active_call"},{icon:"dashboard",text:"Missed Calls",route:"/missed_call"},{icon:"dashboard",text:"Answered Calls",route:"/greeting"}],more:[{icon:"dashboard",text:"Business Number",route:"/active_call"},{icon:"dashboard",text:"Manage Users",route:"/missed_call"},{icon:"dashboard",text:"Add-Ons",route:"/greeting"},{icon:"dashboard",text:"Billing Information",route:"/greeting"},{icon:"dashboard",text:"Account Info",route:"/greeting"},{icon:"dashboard",text:"FAQs",route:"/greeting"},{icon:"dashboard",text:"Get Support",route:"/greeting"}]}},watch:{group:function(){this.drawer=!1}},methods:{}},c=l,u=r("2877"),d=r("6544"),p=r.n(d),v=r("7496"),m=r("40dc"),f=r("8212"),g=r("8336"),h=r("62ad"),b=r("a75b"),y=r("132d"),_=r("adda"),w=r("8860"),x=r("56b0"),C=r("da13"),A=r("5d23"),V=r("f774"),k=r("0fd9"),O=r("2fa4"),j=Object(u["a"])(c,s,i,!1,null,null,null),I=j.exports;p()(j,{VApp:v["a"],VAppBar:m["a"],VAvatar:f["a"],VBtn:g["a"],VCol:h["a"],VContent:b["a"],VIcon:y["a"],VImg:_["a"],VList:w["a"],VListGroup:x["a"],VListItem:C["a"],VListItemContent:A["a"],VListItemTitle:A["b"],VNavigationDrawer:V["a"],VRow:k["a"],VSpacer:O["a"]});var S={name:"App",components:{Navbar:I}},P=S,L=r("f6c4"),E=Object(u["a"])(P,n,o,!1,null,null,null),M=E.exports;p()(E,{VApp:v["a"],VMain:L["a"]});r("d3b7"),r("3ca3"),r("ddb0");var T,B,N=r("8c4f"),D={},z=Object(u["a"])(D,T,B,!1,null,null,null),U=z.exports,$=r("c733");r("e809");a["a"].use(N["a"]);var q=[{path:"/",name:"Home",component:U},{path:"/answered_call",name:"answered_call",component:function(){return r.e("missed_call").then(r.bind(null,"ef77"))},meta:{requiresAuth:!0}}],G=new N["a"]({mode:"history",base:"/",routes:q}),H=G,J=r("f309");a["a"].use(J["a"]);new J["a"]({}),r("5a92");var K=r("bc3a"),R=r.n(K),F=r("2106"),Y=r.n(F),Q=r("049c"),W=r.n(Q);r("b014");a["a"].config.productionTip=!1,a["a"].config.productionTip=!1,a["a"].use(Y.a,R.a),a["a"].use(W.a);var X=new a["a"];$["a"].initializeApp({apiKey:"AIzaSyAbKeIOiuumM2AYsvPgJuyytH0CvIwxhsU",authDomain:"tringpartner-v2.firebaseapp.com",databaseURL:"https://tringpartner-v2-default-rtdb.firebaseio.com",projectId:"tringpartner-v2",storageBucket:"tringpartner-v2.appspot.com",messagingSenderId:"448716065880",appId:"1:448716065880:web:fa9c09fe22e88d873b4e2d",measurementId:"G-Y2513C98CT"}),$["a"].analytics(),a["a"].prototype.$analytics=$["a"].analytics();var Z,tt=$["a"].firestore();console.log("app",Z),new a["a"]({router:H,render:function(t){return t(M)}}).$mount("#app")}});
//# sourceMappingURL=app.4b222c67.js.map