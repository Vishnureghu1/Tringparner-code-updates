(function(t){function e(e){for(var r,n,i=e[0],l=e[1],c=e[2],u=0,d=[];u<i.length;u++)n=i[u],Object.prototype.hasOwnProperty.call(o,n)&&o[n]&&d.push(o[n][0]),o[n]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);p&&p(e);while(d.length)d.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],r=!0,n=1;n<a.length;n++){var i=a[n];0!==o[i]&&(r=!1)}r&&(s.splice(e--,1),t=l(l.s=a[0]))}return t}var r={},n={app:0},o={app:0},s=[];function i(t){return l.p+"js/"+({missed_call:"missed_call"}[t]||t)+"."+{missed_call:"f2bd0100"}[t]+".js"}function l(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.e=function(t){var e=[],a={missed_call:1};n[t]?e.push(n[t]):0!==n[t]&&a[t]&&e.push(n[t]=new Promise((function(e,a){for(var r="css/"+({missed_call:"missed_call"}[t]||t)+"."+{missed_call:"b956099e"}[t]+".css",o=l.p+r,s=document.getElementsByTagName("link"),i=0;i<s.length;i++){var c=s[i],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===r||u===o))return e()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){c=d[i],u=c.getAttribute("data-href");if(u===r||u===o)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var r=e&&e.target&&e.target.src||o,s=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=r,delete n[t],p.parentNode.removeChild(p),a(s)},p.href=o;var m=document.getElementsByTagName("head")[0];m.appendChild(p)})).then((function(){n[t]=0})));var r=o[t];if(0!==r)if(r)e.push(r[2]);else{var s=new Promise((function(e,a){r=o[t]=[e,a]}));e.push(r[2]=s);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=i(t);var d=new Error;c=function(e){u.onerror=u.onload=null,clearTimeout(p);var a=o[t];if(0!==a){if(a){var r=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+r+": "+n+")",d.name="ChunkLoadError",d.type=r,d.request=n,a[1](d)}o[t]=void 0}};var p=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(e)},l.m=t,l.c=r,l.d=function(t,e,a){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)l.d(a,r,function(e){return t[e]}.bind(null,r));return a},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/",l.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var d=0;d<c.length;d++)e(c[d]);var p=u;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},1:function(t,e){},"34bd":function(t,e,a){t.exports=a.p+"img/tring-logo.eef6ae2b.png"},"56d7":function(t,e,a){"use strict";a.r(e),a.d(e,"bus",(function(){return W})),a.d(e,"db",(function(){return tt}));a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{app:""}},[a("Navbar"),a("v-main",{staticClass:"ma-4"})],1)},o=[],s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",[r("v-navigation-drawer",{staticClass:"white",attrs:{clipped:"",app:"",width:"280px",permanent:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[r("v-list",{attrs:{flat:""}},[r("v-list-item",{attrs:{"active-class":"red--text"}},[r("v-list-item-content",[r("v-list-item-title",{staticClass:"grey--text"},[r("v-icon",{staticClass:"mr-3",attrs:{color:"grey"}},[t._v("mdi-radar")]),t._v(" Dashboard")],1)],1)],1),r("v-list-group",{attrs:{"no-action":""},scopedSlots:t._u([{key:"activator",fn:function(){return[r("v-list-item-content",[r("v-list-item-title",{staticClass:"grey--text"},[r("v-icon",{staticClass:"mr-3",attrs:{color:"grey"}},[t._v("mdi-phone")]),t._v(" Call Logs")],1)],1)]},proxy:!0}])},t._l(t.subMenu,(function(e){return r("v-list-item",{key:e.text,attrs:{router:"",to:e.route,link:""}},[r("v-list-item-title",{staticClass:"grey--text",domProps:{textContent:t._s(e.text)}})],1)})),1),r("v-list-item",{attrs:{"active-class":"red--text"}},[r("v-list-item-content",[r("v-list-item-title",{staticClass:"grey--text"},[r("v-icon",{staticClass:"mr-3",attrs:{color:"grey"}},[t._v("mdi-chart-bar")]),t._v(" Reports ")],1)],1)],1),r("v-list-group",{attrs:{"no-action":""},scopedSlots:t._u([{key:"activator",fn:function(){return[r("v-list-item-content",[r("v-list-item-title",{staticClass:"grey--text"},[r("v-icon",{staticClass:"mr-3",attrs:{color:"grey"}},[t._v("mdi-dots-horizontal")]),t._v(" More")],1)],1)]},proxy:!0}])},t._l(t.more,(function(e){return r("v-list-item",{key:e.text,attrs:{router:"",to:e.route,link:""}},[r("v-list-item-title",{staticClass:"grey--text",domProps:{textContent:t._s(e.text)}})],1)})),1)],1)],1),r("v-app-bar",{staticClass:"white",attrs:{app:"","clipped-left":""}},[r("v-app-bar",{attrs:{color:"white",flat:""}},[r("img",{staticClass:"mt-2 ml-2",attrs:{src:a("34bd"),height:"35"}}),r("v-spacer"),r("v-btn",{attrs:{icon:""}},[r("v-icon",{attrs:{color:"black"}},[t._v("mdi-bell-outline")])],1),r("v-avatar",{staticClass:"ml-5",attrs:{size:"40"}},[r("v-img",{attrs:{src:"/img1.png"}})],1)],1)],1),r("v-content",[r("v-row",{attrs:{align:"center"}},[r("v-col",{attrs:{cols:"12"}},[r("router-view")],1)],1)],1)],1)},i=[],l={created:function(){},data:function(){return{drawer:!1,group:null,role:"",subMenu:[{icon:"dashboard",text:"All Calls",route:"/all_calls"},{icon:"dashboard",text:"Missed Calls",route:"/missed_calls"},{icon:"dashboard",text:"Answered Calls",route:"/answered_call"}],more:[{icon:"dashboard",text:"Business Number",route:"/active_call"},{icon:"dashboard",text:"Manage Users",route:"/missed_call"},{icon:"dashboard",text:"Add-Ons",route:"/greeting"},{icon:"dashboard",text:"Billing Information",route:"/greeting"},{icon:"dashboard",text:"Account Info",route:"/greeting"},{icon:"dashboard",text:"FAQs",route:"/greeting"},{icon:"dashboard",text:"Get Support",route:"/greeting"}]}},watch:{group:function(){this.drawer=!1}},methods:{}},c=l,u=a("2877"),d=a("6544"),p=a.n(d),m=a("7496"),f=a("40dc"),v=a("8212"),h=a("8336"),g=a("62ad"),b=a("a75b"),y=a("132d"),_=a("adda"),w=a("8860"),x=a("56b0"),C=a("da13"),V=a("5d23"),A=a("f774"),k=a("0fd9"),O=a("2fa4"),j=Object(u["a"])(c,s,i,!1,null,null,null),S=j.exports;p()(j,{VApp:m["a"],VAppBar:f["a"],VAvatar:v["a"],VBtn:h["a"],VCol:g["a"],VContent:b["a"],VIcon:y["a"],VImg:_["a"],VList:w["a"],VListGroup:x["a"],VListItem:C["a"],VListItemContent:V["a"],VListItemTitle:V["b"],VNavigationDrawer:A["a"],VRow:k["a"],VSpacer:O["a"]});var I={name:"App",components:{Navbar:S}},E=I,L=a("f6c4"),P=Object(u["a"])(E,n,o,!1,null,null,null),B=P.exports;p()(P,{VApp:m["a"],VMain:L["a"]});var M=a("f309");r["a"].use(M["a"]);var N,T,z=new M["a"]({}),D=(a("d3b7"),a("3ca3"),a("ddb0"),a("8c4f")),R={},U=Object(u["a"])(R,N,T,!1,null,null,null),$=U.exports,F=a("c733");a("e809");r["a"].use(D["a"]),console.log(F);var G=[{path:"/",name:"Home",component:$},{path:"/answered_call",name:"answered_call",component:function(){return a.e("missed_call").then(a.bind(null,"ef77"))}},{path:"/missed_calls",name:"missed_calls",component:function(){return a.e("missed_call").then(a.bind(null,"b299"))}},{path:"/all_calls",name:"all_calls",component:function(){return a.e("missed_call").then(a.bind(null,"fffe"))}}],H=new D["a"]({mode:"history",base:"/",routes:G}),q=H,J=(a("5a92"),a("bc3a")),K=a.n(J),Q=a("2106"),X=a.n(Q),Y=a("049c"),Z=a.n(Y);r["a"].prototype.$http=Z.a,r["a"].config.productionTip=!1,r["a"].use(X.a,K.a),r["a"].use(Z.a);var W=new r["a"];F["default"].initializeApp({apiKey:"AIzaSyBXibeZC-vEjCOetmvBhwFS3mYz3VcyzRU",authDomain:"test-tpv2.firebaseapp.com",databaseURL:"https://test-tpv2-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"test-tpv2",storageBucket:"test-tpv2.appspot.com",messagingSenderId:"915926362222",appId:"1:915926362222:web:b3f914ef56f454161c5e7f",measurementId:"G-7429HVQX2D"});var tt=F["default"].firestore();new r["a"]({router:q,vuetify:z,render:function(t){return t(B)}}).$mount("#app")}});
//# sourceMappingURL=app.36022a23.js.map