(function(e){function t(t){for(var a,o,i=t[0],l=t[1],c=t[2],u=0,d=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);m&&m(t);while(d.length)d.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],a=!0,o=1;o<n.length;o++){var i=n[o];0!==r[i]&&(a=!1)}a&&(s.splice(t--,1),e=l(l.s=n[0]))}return e}var a={},o={app:0},r={app:0},s=[];function i(e){return l.p+"js/"+({missed_call:"missed_call"}[e]||e)+"."+{missed_call:"bb356d2f"}[e]+".js"}function l(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n={missed_call:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var a="css/"+({missed_call:"missed_call"}[e]||e)+"."+{missed_call:"17f662e4"}[e]+".css",r=l.p+a,s=document.getElementsByTagName("link"),i=0;i<s.length;i++){var c=s[i],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===a||u===r))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){c=d[i],u=c.getAttribute("data-href");if(u===a||u===r)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var a=t&&t.target&&t.target.src||r,s=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=a,delete o[e],m.parentNode.removeChild(m),n(s)},m.href=r;var f=document.getElementsByTagName("head")[0];f.appendChild(m)})).then((function(){o[e]=0})));var a=r[e];if(0!==a)if(a)t.push(a[2]);else{var s=new Promise((function(t,n){a=r[e]=[t,n]}));t.push(a[2]=s);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=i(e);var d=new Error;c=function(t){u.onerror=u.onload=null,clearTimeout(m);var n=r[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+o+")",d.name="ChunkLoadError",d.type=a,d.request=o,n[1](d)}r[e]=void 0}};var m=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(t)},l.m=e,l.c=a,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)l.d(n,a,function(t){return e[t]}.bind(null,a));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/",l.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var m=u;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},"12d4":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-snackbar",{attrs:{color:e.color,timeout:e.timer},model:{value:e.showSnackbar,callback:function(t){e.showSnackbar=t},expression:"showSnackbar"}},[n("v-icon",{attrs:{left:""}},[e._v(e._s(e.icon))]),e._v(e._s(e.message)+" ")],1)},o=[],r={name:"vtoast",props:[],watch:{},created:function(){},data:function(){return{showSnackbar:!1,message:"",color:"success",icon:"mdi-check",timer:3e3}},methods:{show:function(e){this.message=e.message||'missing "message".',this.color=e.color||"success",this.timer=e.timer||3e3,this.icon=e.icon||"mdi-check",this.showSnackbar=!0}}},s=r,i=n("2877"),l=n("6544"),c=n.n(l),u=n("132d"),d=n("2db4"),m=Object(i["a"])(s,a,o,!1,null,null,null);t["a"]=m.exports;c()(m,{VIcon:u["a"],VSnackbar:d["a"]})},"34bd":function(e,t,n){e.exports=n.p+"img/tring-logo.eef6ae2b.png"},4656:function(e,t,n){"use strict";n("8118")},4678:function(e,t,n){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function o(e){var t=r(e);return n(t)}function r(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}o.keys=function(){return Object.keys(a)},o.resolve=r,e.exports=o,o.id="4678"},"56d7":function(e,t,n){"use strict";n.r(t),n.d(t,"bus",(function(){return Oe})),n.d(t,"db",(function(){return je}));n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{app:""}},[n("Navbar",{attrs:{isLoggedIn:e.isLoggedIn}}),n("v-main",{staticClass:"ma-4"}),n("vtoast",{ref:"vtoast"})],1)},r=[],s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[0!=["login","Login"].indexOf(this.$route.name)&&0!=["ChooseNumbers","ChooseNumbers"].indexOf(this.$route.name)&&0!=["SelectPlan","SelectPlan"].indexOf(this.$route.name)&&0!=["Billing","Billing"].indexOf(this.$route.name)&&0!=["Review","Review"].indexOf(this.$route.name)?a("v-navigation-drawer",{staticClass:"white",attrs:{clipped:"",app:"",width:"280px",permanent:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[a("v-list",{attrs:{flat:""}},e._l(e.links[e.userRole],(function(t,n){return a("div",{key:n},[t.subLinks?a("v-list-group",{key:t.text,staticClass:"grey--text ubuntu-font medium",attrs:{"no-action":"","prepend-icon":t.icon,value:!1,"active-class":"grey--text ubuntu-font "},scopedSlots:e._u([{key:"activator",fn:function(){return[a("v-list-item-title",{staticClass:"menu-text grey--text ubuntu-font",attrs:{"active-class":"tpprimary--text ubuntu-font medium"}},[e._v(e._s(t.text))])]},proxy:!0}],null,!0)},e._l(t.subLinks,(function(t){return a("v-list-item",{key:t.text,staticClass:"grey--text ubuntu-font",attrs:{to:t.to,"active-class":"tpprimary--text ubuntu-font"}},[a("v-list-item-title",{staticClass:"menu-text ml-2"},[e._v(e._s(t.text))]),a("v-list-item-icon",{staticClass:"grey--text ubuntu-font"},[a("v-icon",[e._v(e._s(t.icon))])],1)],1)})),1):a("v-list-item",{staticClass:"grey--text ubuntu-font medium",attrs:{to:t.to,"active-class":"tpprimary--text medium",avatar:""}},[a("v-list-item-icon",[a("v-icon",[e._v(e._s(t.icon))])],1),a("v-list-item-title",{staticClass:"menu-text",domProps:{textContent:e._s(t.text)}})],1)],1)})),0)],1):e._e(),a("v-app-bar",{key:e.rerenderKey,staticClass:"white",attrs:{app:"","clipped-left":""}},[a("v-app-bar",{attrs:{color:"white",flat:""}},[a("img",{staticClass:"mt-2 ml-2",attrs:{src:n("34bd"),height:"35"}}),a("v-spacer"),e.isLoggedIn?a("div",[a("v-menu",{attrs:{bottom:"",width:"378px",height:"504px",rounded:"","offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[a("v-btn",e._g({attrs:{icon:""}},n),[0==e.notificationunread.length?a("v-badge",{attrs:{color:"red",content:"0",overlap:""}},[a("v-icon",{attrs:{color:"black"}},[e._v("mdi-bell-outline")])],1):e._e(),0!=e.notificationunread.length?a("v-badge",{attrs:{color:"red",content:e.notificationunread.length,overlap:""}},[a("v-icon",{attrs:{color:"black"}},[e._v("mdi-bell-outline")])],1):e._e()],1)]}}],null,!1,2145707187)},[a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"500"}},[a("v-card-title",{staticClass:"black--text white darken-4"},[e._v(" Notification Center "),a("v-spacer"),a("router-link",{attrs:{to:{name:"notifications"}}},[a("div",{staticClass:"notif-mark",attrs:{align:"center"}},[e._v("View all")])]),a("span",{attrs:{fab:"",small:""}},[a("v-icon",[e._v("mdi-close")])],1)],1),a("v-divider"),0==e.notificationunread.length?a("v-container",{attrs:{"fill-height":"",fluid:""}},[a("v-row",{staticStyle:{"padding-top":"50%",position:"absolute",left:"35%"},attrs:{align:"center",justify:"center"}},[a("p",{staticClass:"red--text"},[e._v("No notification found!")])])],1):e._e(),a("v-virtual-scroll",{attrs:{items:e.notificationunread,"item-height":90,height:"300",width:"500"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.item;return[a("v-list-item",[a("v-row",[a("v-col",{attrs:{cols:"12"},on:{click:function(t){return e.redirectpage(n.type)}}},[a("div",{staticClass:"notif-type"},[e._v(e._s(n.type))]),a("div",{staticClass:"notif-content"},[e._v(e._s(n.content))]),a("div",{staticClass:"notif-time mb-2"},[e._v(e._s(n.time))])])],1)],1),a("v-divider")]}}],null,!1,3691040976)}),0!=e.notificationunread.length?a("v-card-text",{staticClass:"pt-4 text-center"},[a("v-row",[a("v-col",{staticClass:"notif-mark",attrs:{cols:"12",align:"center"},on:{click:function(t){return e.read_notification()}}},[e._v(" Mark all as read("+e._s(e.notificationunread.length)+") ")])],1)],1):e._e()],1)],1),a("v-menu",{attrs:{bottom:"","max-width":"247px","min-height":"218px",rounded:"","offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[a("v-avatar",e._g({staticClass:"ml-5",attrs:{size:"40"}},n),[a("v-img",{attrs:{src:"/img1.png"}})],1)]}}],null,!1,640756062)},[a("v-card",[a("v-list-item-content",{staticClass:"align-left"},[a("v-list-item",[a("v-list-item-avatar",[a("img",{attrs:{src:"/img1.png",alt:"Admin"}})]),a("v-list-item-content",[a("v-list-item-title",[e._v(e._s(e.userFirstName))]),a("v-list-item-subtitle",[e._v("+91 "+e._s(e.userPhoneNumber))])],1)],1),a("v-list-item-content",[a("span",{staticClass:"avatar-menu-item"},[e._v("FAQ")])]),a("v-list-item-content",[a("span",{staticClass:"avatar-menu-item"},[e._v("Contact Us")])]),a("v-list-item-content",[a("span",{staticClass:"avatar-menu-item",on:{click:e.logout}},[e._v("Log Out")])])],1)],1)],1)],1):e._e()],1)],1),a("v-main",[a("v-row",{attrs:{align:"center"}},[a("v-col",{attrs:{cols:"12"}},[a("router-view")],1)],1)],1)],1)},i=[],l=n("1da1"),c=(n("d3b7"),n("159b"),n("96cf"),n("2591")),u=n("c1df"),d=n.n(u),m=n("bc3a"),f=n.n(m),h={created:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=localStorage.getItem("tpu"),e.notification_data(),n&&(a=JSON.parse(n),e.userEmail=a.Email,console.log("Navbar-user-FirstName",a.FirstName),console.log("Navbar-user-Email",a.Email),console.log(a),e.userRole=a.role,e.isLoggedIn=!0,e.userFirstName=a.FirstName,e.userPhoneNumber=a.PhoneNumber,e.forceRerenderKey());case 3:case"end":return t.stop()}}),t)})))()},data:function(){return{unreadids:[],drawer:!1,isLoggedIn:!1,userRole:"",userFirstName:"",userPhoneNumber:"",rerenderKey:0,group:null,role:"",notificationunread:[],links:{OWNER:[{to:"/dashboard",icon:"mdi-radar",text:"Dashboard"},{icon:"mdi-phone",text:"Call Logs",subLinks:[{text:"All Calls",to:"/all_calls",icon:""},{text:"Missed Calls",to:"/missed_calls",icon:""},{text:"Answered Calls",to:"/answered_call",icon:""}]},{to:"/report",icon:"mdi-chart-bar",text:"Report"},{icon:"mdi-dots-horizontal",text:"More",subLinks:[{icon:"",text:"Business Number",to:"/BusinessNumber"},{icon:"",text:"Manage Users",to:"/ManageUsers"},{icon:"",text:"Add-Ons",to:"/Addons"},{icon:"",text:"Billing Information",to:"/BillingInformation"},{icon:"",text:"Account Info",to:"/AccountInformation"},{icon:"",text:"FAQs",to:"/FAQs"},{icon:"",text:"Get Support",to:"/GetSupport"}]}],ADMIN:[{to:"/dashboard",icon:"mdi-radar",text:"Dashboard"},{icon:"mdi-phone",text:"Call Logs",subLinks:[{text:"All Calls",to:"/all_calls",icon:""},{text:"Missed Calls",to:"/missed_calls",icon:""},{text:"Answered Calls",to:"/answered_call",icon:""}]},{to:"/report",icon:"mdi-chart-bar",text:"Report"},{icon:"mdi-dots-horizontal",text:"More",subLinks:[{icon:"",text:"Business Number",to:"/BusinessNumber"},{icon:"",text:"Manage Users",to:"/ManageUsers"},{icon:"",text:"Add-Ons",to:"/Addons"},{icon:"",text:"Account Info",to:"/AccountInformation"},{icon:"",text:"FAQs",to:"/FAQs"},{icon:"",text:"Get Support",to:"/GetSupport"}]}],AGENT:[{to:"/dashboard",icon:"mdi-radar",text:"Dashboard"},{icon:"mdi-phone",text:"Call Logs",subLinks:[{text:"All Calls",to:"/all_calls",icon:""},{text:"Missed Calls",to:"/missed_calls",icon:""},{text:"Answered Calls",to:"/answered_call",icon:""}]},{to:"/report",icon:"mdi-chart-bar",text:"Report"},{icon:"mdi-dots-horizontal",text:"More",subLinks:[{icon:"",text:"Account Info",to:"/AccountInformation"},{icon:"",text:"FAQs",to:"/FAQs"},{icon:"",text:"Get Support",to:"/GetSupport"}]}]}}},watch:{group:function(){this.drawer=!1},isLoggedIn:function(){console.log("forceRerenderKey watch"),this.forceRerenderKey()}},methods:{redirectpage:function(e){"AddOn User"!=e&&"Addon User"!=e||this.$router.push("/manageAddonUsers"),"AddOn Number"==e&&this.$router.push("/manageAddonNumbers"),"Call Notification"==e&&this.$router.push("/all_calls"),"Yesterday Activity Of All Agents"==e&&this.$router.push("/report")},forceRerenderKey:function(){this.rerenderKey+=1},logout:function(){console.log("clicked logout"),c["a"].auth().signOut(),localStorage.removeItem("tpu"),this.rerenderKey+=1,this.LoggedIn=!1,this.$router.push("login").catch((function(){}))},dashboard:function(){this.$router.push("/dashboard").catch((function(){}))},report:function(){this.$router.push("/report").catch((function(){}))},notification_data:function(){var e=this;this.notificationread=[],this.notificationunread=[];var t=JSON.parse(localStorage.getItem("tpu")),n="OWNER"==t.role?t.uid:t.OwnerUid;this.AccountId="OWNER"==t.role?t.AccountId:t.OwnerAccountId,this.owneruid=n,this.uid=t.uid,je.collection("NotificationCenter").where("Uid","==",this.uid).where("IsRead","==",!1).get().then(function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n.docs.forEach((function(t){console.log("1"),0==t.data().IsRead&&(e.unreadids.push(t.id),e.notificationunread.push({id:t.id,content:t.data().Message,type:t.data().Type,time:d()(new Date(t.data().FormDate)).format("D MMM Y hh:mm a")}))}));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(e){console.log(e.message)}))},read_notification:function(){var e=this,t=localStorage.getItem("token"),n={url:this.$cloudfareApi+"/notification/read",method:"POST",data:{owner_uid:this.owneruid,updated_by:this.uid,uid:this.uid,notification_id:this.unreadids},headers:{token:t,"Content-Type":"application/json"}};f()(n).then((function(){e.notification_data()})).catch((function(e){console.error(e)}))}}},p=h,b=n("2877"),g=n("6544"),v=n.n(g),N=n("7496"),A=n("40dc"),_=n("8212"),w=n("4ca6"),R=n("8336"),O=n("b0af"),j=n("99d9"),y=n("62ad"),E=n("a523"),I=n("ce7e"),x=n("132d"),C=n("adda"),k=n("8860"),W=n("56b0"),M=n("da13"),D=n("8270"),S=n("5d23"),P=n("34c3"),V=n("f6c4"),q=n("e449"),L=n("f774"),T=n("0fd9"),$=n("2fa4"),F=n("0de5"),B=Object(b["a"])(p,s,i,!1,null,null,null),z=B.exports;v()(B,{VApp:N["a"],VAppBar:A["a"],VAvatar:_["a"],VBadge:w["a"],VBtn:R["a"],VCard:O["a"],VCardText:j["b"],VCardTitle:j["c"],VCol:y["a"],VContainer:E["a"],VDivider:I["a"],VIcon:x["a"],VImg:C["a"],VList:k["a"],VListGroup:W["a"],VListItem:M["a"],VListItemAvatar:D["a"],VListItemContent:S["a"],VListItemIcon:P["a"],VListItemSubtitle:S["b"],VListItemTitle:S["c"],VMain:V["a"],VMenu:q["a"],VNavigationDrawer:L["a"],VRow:T["a"],VSpacer:$["a"],VVirtualScroll:F["a"]});var G=n("12d4"),U=new a["a"],X=U,Q={props:["isLoggedIn"],name:"App",components:{Navbar:z,vtoast:G["a"]},data:function(){return{loggedIn:!1}},computed:{isLoggedIn:function(){return localStorage.getItem("loggedIn")?"true"===localStorage.getItem("loggedIn"):this.loggedIn}},created:function(){var e=this;X.$on("OnLogin",(function(t){e.loggedIn=t}))},mounted:function(){this.$root.vtoast=this.$refs.vtoast}},J=Q,K=Object(b["a"])(J,o,r,!1,null,null,null),H=K.exports;v()(K,{VApp:N["a"],VMain:V["a"]});n("d1e78");var Y=n("f309");a["a"].use(Y["a"]);var Z=new Y["a"]({icons:{iconfont:"md"},theme:{themes:{light:{primary:"#ee1c25",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107",tpwhite:"#FFFFFF",tplightgrey:"#E0E0E0",tpgrey:"#808080",tpblack:"#3B3B3B",tpteal:"#13B9A8",tpgreen:"#07C421",tppink:"#FAB4B7",tpred:"#EE1C25"}}}}),ee=(n("3ca3"),n("ddb0"),n("caad"),n("2532"),n("8c4f")),te=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-container",{attrs:{fluid:""}},[n("v-layout",[n("v-flex",{attrs:{xs12:"",sm12:"",md12:""}},[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"12",align:"center"}},[n("v-overlay",{attrs:{value:e.overlay}},[n("v-progress-circular",{attrs:{indeterminate:"",color:"red",size:"40",width:3}})],1),n("v-card",{attrs:{color:"transparent",outlined:"","max-width":"280"}},[n("h2",{staticClass:"page_title mt-16 mb-13"},[e._v("Welcome to Tring Partner")]),n("h2",{staticClass:"sub_title mt-8 mb-13"},[e._v("Use your mobile number to get started with Tring Partner")]),n("div",[e.getNumber?n("div",{staticClass:"mt-1 ml-2"},[n("h4",{staticClass:"name_heading mt-4 ml-2",attrs:{align:"start"}},[e._v("Login or Sign Up")]),n("v-form",{on:{submit:function(t){return t.preventDefault(),e.submit.apply(null,arguments)}}},[n("v-text-field",{staticClass:"mt-4",attrs:{outlined:"",prefix:"+91",color:"grey darken-4",label:"Mobile Number",type:"text",rules:e.numberRules,required:""},model:{value:e.phNo,callback:function(t){e.phNo=t},expression:"phNo"}}),n("v-btn",{staticClass:"btn_text mt-15 white--text text-capitalize",attrs:{width:"70%",rounded:"",color:"#EE1C25\n\t\t\t\t\t\t\t\t\t\t\t\t"},on:{click:function(t){return t.preventDefault(),e.sendOtp()}}},[e._v(" Next ")])],1)],1):e._e(),e.getOtp?n("div",{staticClass:"mt-1 ml-2"},[n("h4",{staticClass:"name_heading mt-4",attrs:{align:"start"}},[e._v("Enter OTP")]),n("v-otp-input",{attrs:{length:"6"},model:{value:e.otp,callback:function(t){e.otp=t},expression:"otp"}}),n("div",{staticClass:"mt-4"},[n("a",{staticClass:"link_style text-decoration-underline",on:{click:function(t){return t.preventDefault(),e.sendOtp()}}},[e._v(" Resend OTP ")]),n("br"),n("br"),n("a",{staticClass:"link_style text-decoration-underline",on:{click:function(t){return e.changeLoginNumber()}}},[e._v(" Change Number ")])]),n("v-btn",{staticClass:"btn_text mt-15 white--text text-capitalize",attrs:{width:"70%",rounded:"",color:"#EE1C25\n\t\t\t\t\t\t\t\t\t\t\t\t"},on:{click:function(t){return t.preventDefault(),e.verifyOtp()}}},[e._v(" Submit ")])],1):e._e()])]),n("div",{attrs:{id:"recaptcha-container"}})],1)],1)],1)],1)],1)],1)},ne=[],ae=(n("ac1f"),n("00b4"),n("fb6a"),n("e9c4"),{data:function(){return{otp:"XXXXXX",getNumber:!0,getOtp:!1,numberRules:[function(e){return/^[0-9]*$/.test(e)||"No characters Allowed"}],phNo:"",uid:"",currentPage:"",dialog:!1,errorMessage:"",role:"",overlay:!1}},components:{},created:function(){var e=this;this.initReCaptcha(),c["a"].auth().onAuthStateChanged((function(t){t&&(e.uid=t.uid,e.phno=t.phoneNumber.slice(3),je.collection("users").where("uid","==",e.uid).get().then((function(t){t.forEach((function(t){console.log(t.id," => ",t.data()),console.log("<-------------------LOGGING USER DETAILS-----------------------\x3e"),localStorage.setItem("tpu",JSON.stringify(t.data()));var n=t.data();e.Udata=n,e.currentPage=e.Udata.currentPage,e.role=e.Udata.role,"ADMIN"==e.role||"AGENT"==e.role?e.$router.push("/all_calls"):"onboarding_listing"==e.currentPage?e.$router.push("/ChooseNumbers"):"onboarding_plan_details"==e.currentPage?e.$router.push("/SelectPlan"):"onboarding_billing"==e.currentPage?e.$router.push("/Billing"):"onboarding_review"==e.currentPage?e.$router.push("/Review"):"onboarding_dashboard"!=e.currentPage&&"onboarding_success"!=e.currentPage||e.$router.push("/all_calls")}))})).catch((function(e){console.log("Error getting documents: ",e)})))}))},methods:{sendOtp:function(){var e=this;if(this.otp="XXXXXX",10!=this.phNo.length)alert("Invalid Phone Number Format !");else{this.getNumber=!1,this.getOtp=!0;var t="+91",n=t+this.phNo,a=this.appVerifier;c["a"].auth().signInWithPhoneNumber(n,a).then((function(e){window.confirmationResult=e})).catch((function(t){e.errorMessage=t.message,console.log(e.errorMessage)})),this.$root.vtoast.show({message:"otp send successfully",color:"green",timer:5e3})}},changeLoginNumber:function(){this.getNumber=!0,this.getOtp=!1},verifyOtp:function(){var e=this;if(6!=this.otp.length)alert("Invalid OTP Format !");else{var t="",n=this.otp;window.confirmationResult.confirm(n).then((function(e){t=e.user.uid})).then((function(){e.uid=t,e.overlay=!0,console.log("ID",e.uid),console.log("phno",e.phNo);var n={url:e.$cloudfareApi+"/login",method:"POST",data:{uid:e.uid,phoneNumber:e.phNo}};console.log(n),e.$axios(n).then((function(t){console.log(t.data),console.log(e.uid),localStorage.setItem("token",t.data.token),je.collection("users").where("uid","==",e.uid).get().then((function(t){t.forEach((function(t){console.log(t.id," => ",t.data()),console.log("<-------------------VERIFY OTP LOGGING USER DETAILS-----------------------\x3e"),localStorage.setItem("tpu",JSON.stringify(t.data()));var n=t.data();if(e.Udata=n,e.currentPage=e.Udata.currentPage,e.role=e.Udata.role,console.log(e.currentPage),console.log(e.role),"ADMIN"==e.role||"AGENT"==e.role)e.overlay=!1,e.$router.push("/all_calls").catch((function(){}));else if("onboarding_listing"==e.currentPage)e.overlay=!1,e.$router.push("/ChooseNumbers").catch((function(e){console.log(e)}));else if("onboarding_plan_details"==e.currentPage)e.overlay=!1,e.$router.push("/SelectPlan").catch((function(){}));else if("onboarding_billing"==e.currentPage)e.overlay=!1,e.$router.push("/Billing").catch((function(){}));else if("onboarding_review"==e.currentPage)e.overlay=!1,e.$router.push("/Review").catch((function(){}));else if("onboarding_dashboard"==e.currentPage||"onboarding_success"==e.currentPage)e.overlay=!1,e.$router.push("/all_calls").catch((function(){}));else{var a={url:e.$cloudfareApi+"/user/stage",method:"POST",data:{uid:e.uid,phoneNumber:e.phno,currentPage:"onboarding_listing"}};console.log(a),e.$axios(a).then((function(t){console.log(t),e.overlay=!1,e.$router.push("/ChooseNumbers").catch((function(){}))})).catch((function(e){console.error(e)}))}}))})).catch((function(e){console.log("Error getting documents: ",e)}))})).catch((function(e){console.error(e)}))})).catch((function(t){console.log("error details",t),e.$root.vtoast.show({message:"invalid otp",color:"red",timer:5e3})}))}},initReCaptcha:function(){var e=this;setTimeout((function(){var t=e;console.log("render on create",t),window.recaptchaVerifier=new c["a"].auth.RecaptchaVerifier("recaptcha-container",{size:"invisible",callback:function(e){console.log("reCAPTCHA",e)},"expired-callback":function(){}}),e.appVerifier=window.recaptchaVerifier}),1e3)}}}),oe=ae,re=(n("4656"),n("0e8f")),se=n("4bd4"),ie=n("a722"),le=n("1514"),ce=n("a797"),ue=n("490a"),de=n("8654"),me=Object(b["a"])(oe,te,ne,!1,null,"d1feef2e",null),fe=me.exports;v()(me,{VApp:N["a"],VBtn:R["a"],VCard:O["a"],VCol:y["a"],VContainer:E["a"],VFlex:re["a"],VForm:se["a"],VLayout:ie["a"],VOtpInput:le["a"],VOverlay:ce["a"],VProgressCircular:ue["a"],VRow:T["a"],VTextField:de["a"]});var he=n("260b");n("ea7b");a["a"].use(ee["a"]),console.log(he);var pe=[{path:"*",redirect:"/login"},{path:"/",redirect:"/login"},{path:"/login",name:"login",component:fe},{path:"/answered_call",name:"answered_call",component:function(){return n.e("missed_call").then(n.bind(null,"ef77"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN","AGENT"]}},{path:"/notifications",name:"notifications",component:function(){return n.e("missed_call").then(n.bind(null,"ac9d"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN","AGENT"]}},{path:"/missed_calls",name:"missed_calls",component:function(){return n.e("missed_call").then(n.bind(null,"b299"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN","AGENT"]}},{path:"/all_calls",name:"all_calls",component:function(){return n.e("missed_call").then(n.bind(null,"fffe"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN","AGENT"]}},{path:"/dashboard",name:"dashboard",component:function(){return n.e("missed_call").then(n.bind(null,"7277"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN","AGENT"]}},{path:"/report",name:"report",component:function(){return n.e("missed_call").then(n.bind(null,"762c"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN","AGENT"]}},{path:"/Addons",name:"Addons",component:function(){return n.e("missed_call").then(n.bind(null,"01be"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/manageAddonNumbers",name:"manageAddonNumbers",component:function(){return n.e("missed_call").then(n.bind(null,"8fb6"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/manageAddonUsers",name:"manageAddonUsers",component:function(){return n.e("missed_call").then(n.bind(null,"879e"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/buyNewNumber",name:"buyNewNumber",component:function(){return n.e("missed_call").then(n.bind(null,"d1f27"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/reserveNumber",name:"reserveNumber",component:function(){return n.e("missed_call").then(n.bind(null,"f8f6"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/buyNewAddOnUser",name:"buyNewAddOnUser",component:function(){return n.e("missed_call").then(n.bind(null,"2e30"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/fancyNumberPurchase",name:"fancyNumberPurchase",component:function(){return n.e("missed_call").then(n.bind(null,"ca1c"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/BillingInformation",name:"BillingInformation",component:function(){return n.e("missed_call").then(n.bind(null,"535c"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/BillingAddress",name:"BillingAddress",component:function(){return n.e("missed_call").then(n.bind(null,"3d17"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/PaymentHistory",name:"PaymentHistory",component:function(){return n.e("missed_call").then(n.bind(null,"1bd2"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/BusinessNumber",name:"BusinessNumber",component:function(){return n.e("missed_call").then(n.bind(null,"5460"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/ManageUsers",name:"ManageUsers",component:function(){return n.e("missed_call").then(n.bind(null,"016f"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/FAQs",name:"FAQs",component:function(){return n.e("missed_call").then(n.bind(null,"9880"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/AccountInformation",name:"AccountInformation",component:function(){return n.e("missed_call").then(n.bind(null,"6ad1"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN","AGENT"]}},{path:"/BasicInformation",name:"BasicInformation",component:function(){return n.e("missed_call").then(n.bind(null,"754d"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/BusinessInformation",name:"BusinessInformation",component:function(){return n.e("missed_call").then(n.bind(null,"5aeaf"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/ChangeLoginNumber",name:"ChangeLoginNumber",component:function(){return n.e("missed_call").then(n.bind(null,"d67a"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/GetSupport",name:"GetSupport",component:function(){return n.e("missed_call").then(n.bind(null,"12b4"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/ChooseNumbers",name:"ChooseNumbers",component:function(){return n.e("missed_call").then(n.bind(null,"75ae"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/SelectPlan",name:"SelectPlan",component:function(){return n.e("missed_call").then(n.bind(null,"299e"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/Billing",name:"Billing",component:function(){return n.e("missed_call").then(n.bind(null,"2942"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/Review",name:"Review",component:function(){return n.e("missed_call").then(n.bind(null,"bb44"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/CallFlowSettings",name:"CallFlowSettings",component:function(){return n.e("missed_call").then(n.bind(null,"4632"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/ManageAgents",name:"ManageAgents",component:function(){return n.e("missed_call").then(n.bind(null,"2115"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/PauseNumber",name:"PauseNumber",component:function(){return n.e("missed_call").then(n.bind(null,"b317"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/CallPreference",name:"CallPreference",component:function(){return n.e("missed_call").then(n.bind(null,"c391"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/CallRouting",name:"CallRouting",component:function(){return n.e("missed_call").then(n.bind(null,"a0c8"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/PrioritizeConfiguration",name:"PrioritizeConfiguration",component:function(){return n.e("missed_call").then(n.bind(null,"ec10"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/NotificationSettings",name:"NotificationSettings",component:function(){return n.e("missed_call").then(n.bind(null,"cb77"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/MissedCallDistribution",name:"MissedCallDistribution",component:function(){return n.e("missed_call").then(n.bind(null,"b6c7"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/SelectSpecificAgent",name:"SelectSpecificAgent",component:function(){return n.e("missed_call").then(n.bind(null,"d5ca"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/BlockedNumbers",name:"BlockedNumbers",component:function(){return n.e("missed_call").then(n.bind(null,"f60d"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/GreetingMessage",name:"GreetingMessage",component:function(){return n.e("missed_call").then(n.bind(null,"2103"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/CallerTune",name:"CallerTune",component:function(){return n.e("missed_call").then(n.bind(null,"4665"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/WorkingHours",name:"WorkingHours",component:function(){return n.e("missed_call").then(n.bind(null,"b1b3"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}},{path:"/CallerID",name:"CallerID",component:function(){return n.e("missed_call").then(n.bind(null,"04ff"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN","AGENT"]}},{path:"/OfflineMesssage",name:"OfflineMesssage",component:function(){return n.e("missed_call").then(n.bind(null,"d136"))},meta:{requiresAuth:!0,role:"OWNER",allowedRoles:["OWNER","ADMIN"]}}],be=new ee["a"]({mode:"history",base:"/",routes:pe});function ge(){return new Promise((function(e,t){try{var n=localStorage.getItem("tpu");if(n){var a=JSON.parse(n);Object.prototype.hasOwnProperty.call(a,"uid")&&Object.prototype.hasOwnProperty.call(a,"role")&&he["default"].auth().currentUser.getIdTokenResult().then((function(t){var n=t.claims.user_id,o=a["uid"],r=a["role"];e(n==o?r:"Guest")})).catch((function(e){console.log(e),t(e)}))}else e("Guest")}catch(o){e("Guest")}}))}function ve(){return new Promise((function(e,t){try{he["default"].auth().onAuthStateChanged((function(t){e(t)}))}catch(n){t("api failed")}}))}be.beforeEach(function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t,n,a){var o,r,s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,ve();case 2:return o=e.sent,r=t.matched.some((function(e){return e.meta.requiresAuth})),s=t.meta.role,e.next=7,ge();case 7:i=e.sent,console.log("router.beforeEach currentUserRole",i),r&&!o?a({path:"/login",query:{redirect:t.fullPath}}):r&&o?t.meta.allowedRoles.includes(i)?(console.log("metaRole",s),a()):("OWNER"==i||"ADMIN"==i||"AGENT"==i)&&a({path:"/login",query:{redirect:t.fullPath}}):a();case 10:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}());var Ne=be,Ae=(n("e71f"),n("130e")),_e=n("049c"),we=n.n(_e),Re=n("cb43");n("5aea");a["a"].prototype.$http=we.a,a["a"].config.productionTip=!1,a["a"].use(Re["default"]),a["a"].use(Ae["a"],f.a),a["a"].use(we.a);var Oe=new a["a"];he["default"].initializeApp({apiKey:"AIzaSyBXibeZC-vEjCOetmvBhwFS3mYz3VcyzRU",authDomain:"test-tpv2.firebaseapp.com",databaseURL:"https://test-tpv2-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"test-tpv2",storageBucket:"test-tpv2.appspot.com",messagingSenderId:"915926362222",appId:"1:915926362222:web:b3f914ef56f454161c5e7f",measurementId:"G-7429HVQX2D"});var je=he["default"].firestore();new a["a"]({router:Ne,vuetify:Z,render:function(e){return e(H)}}).$mount("#app"),a["a"].prototype.$mongoApi="http://35.244.46.144:5000",a["a"].prototype.$headerKeyMongo="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMwNmQ1NjY1YzZmNGU4NTk4MDBkNGMiLCJpYXQiOjE2NDAwMDQ2OTN9.7VPtc5_xb6_4Feds3zdAZw9VZdOeq0rvwp425m0efE0",a["a"].prototype.$cloudfareApi="https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/web"},"5aea":function(e,t,n){},8118:function(e,t,n){}});
//# sourceMappingURL=app.10dbb5c9.js.map