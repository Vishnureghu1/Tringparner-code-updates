(function(e){function t(t){for(var a,r,s=t[0],l=t[1],u=t[2],c=0,m=[];c<s.length;c++)r=s[c],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&m.push(o[r][0]),o[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);d&&d(t);while(m.length)m.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,r=1;r<n.length;r++){var s=n[r];0!==o[s]&&(a=!1)}a&&(i.splice(t--,1),e=l(l.s=n[0]))}return e}var a={},r={app:0},o={app:0},i=[];function s(e){return l.p+"js/"+({missed_call:"missed_call"}[e]||e)+"."+{missed_call:"f091bb00"}[e]+".js"}function l(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n={missed_call:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="css/"+({missed_call:"missed_call"}[e]||e)+"."+{missed_call:"c4c1fc95"}[e]+".css",o=l.p+a,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var u=i[s],c=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(c===a||c===o))return t()}var m=document.getElementsByTagName("style");for(s=0;s<m.length;s++){u=m[s],c=u.getAttribute("data-href");if(c===a||c===o)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var a=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete r[e],d.parentNode.removeChild(d),n(i)},d.href=o;var h=document.getElementsByTagName("head")[0];h.appendChild(d)})).then((function(){r[e]=0})));var a=o[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise((function(t,n){a=o[e]=[t,n]}));t.push(a[2]=i);var u,c=document.createElement("script");c.charset="utf-8",c.timeout=120,l.nc&&c.setAttribute("nonce",l.nc),c.src=s(e);var m=new Error;u=function(t){c.onerror=c.onload=null,clearTimeout(d);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;m.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",m.name="ChunkLoadError",m.type=a,m.request=r,n[1](m)}o[e]=void 0}};var d=setTimeout((function(){u({type:"timeout",target:c})}),12e4);c.onerror=c.onload=u,document.head.appendChild(c)}return Promise.all(t)},l.m=e,l.c=a,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)l.d(n,a,function(t){return e[t]}.bind(null,a));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/",l.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var m=0;m<u.length;m++)t(u[m]);var d=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"07e1":function(e,t,n){},1:function(e,t){},"12d4":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-snackbar",{attrs:{color:e.color,timeout:e.timer},model:{value:e.showSnackbar,callback:function(t){e.showSnackbar=t},expression:"showSnackbar"}},[n("v-icon",{attrs:{left:""}},[e._v(e._s(e.icon))]),e._v(e._s(e.message)+" ")],1)},r=[],o={name:"vtoast",props:[],watch:{},created:function(){},data:function(){return{showSnackbar:!1,message:"",color:"success",icon:"mdi-check",timer:3e3}},methods:{show:function(e){this.message=e.message||'missing "message".',this.color=e.color||"success",this.timer=e.timer||3e3,this.icon=e.icon||"mdi-check",this.showSnackbar=!0}}},i=o,s=n("2877"),l=n("6544"),u=n.n(l),c=n("132d"),m=n("2db4"),d=Object(s["a"])(i,a,r,!1,null,null,null);t["a"]=d.exports;u()(d,{VIcon:c["a"],VSnackbar:m["a"]})},"34bd":function(e,t,n){e.exports=n.p+"img/tring-logo.eef6ae2b.png"},"56d7":function(e,t,n){"use strict";n.r(t),n.d(t,"bus",(function(){return _e})),n.d(t,"db",(function(){return Ne}));n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{app:""}},[n("Navbar"),n("v-main",{staticClass:"ma-4"}),n("vtoast",{ref:"vtoast"})],1)},o=[],i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[0!=["login","Login"].indexOf(this.$route.name)&&0!=["ChooseNumbers","ChooseNumbers"].indexOf(this.$route.name)&&0!=["SelectPlan","SelectPlan"].indexOf(this.$route.name)&&0!=["Billing","Billing"].indexOf(this.$route.name)&&0!=["Review","Review"].indexOf(this.$route.name)?a("v-navigation-drawer",{staticClass:"white",attrs:{clipped:"",app:"",width:"280px",permanent:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[a("v-list",{attrs:{flat:""}},e._l(e.links[e.userRole],(function(t,n){return a("div",{key:n},[t.subLinks?a("v-list-group",{key:t.text,staticClass:"grey--text ubuntu-font medium",attrs:{"no-action":"","prepend-icon":t.icon,value:!1,"active-class":"grey--text ubuntu-font "},scopedSlots:e._u([{key:"activator",fn:function(){return[a("v-list-item-title",{staticClass:"menu-text grey--text ubuntu-font",attrs:{"active-class":"tpred--text ubuntu-font medium"}},[e._v(e._s(t.text))])]},proxy:!0}],null,!0)},e._l(t.subLinks,(function(t){return a("v-list-item",{key:t.text,staticClass:"grey--text ubuntu-font",attrs:{to:t.to,"active-class":"tpred--text ubuntu-font"}},[a("v-list-item-title",{staticClass:"menu-text ml-2"},[e._v(e._s(t.text))]),a("v-list-item-icon",{staticClass:"grey--text ubuntu-font"},[a("v-icon",[e._v(e._s(t.icon))])],1)],1)})),1):a("v-list-item",{staticClass:"grey--text ubuntu-font medium",attrs:{to:t.to,"active-class":"tpred--text medium",avatar:""}},[a("v-list-item-icon",[a("v-icon",[e._v(e._s(t.icon))])],1),a("v-list-item-title",{staticClass:"menu-text",domProps:{textContent:e._s(t.text)}})],1)],1)})),0)],1):e._e(),a("v-app-bar",{key:e.rerenderKey,staticClass:"white",attrs:{app:"","clipped-left":""}},[a("v-app-bar",{attrs:{color:"white",flat:""}},[a("img",{staticClass:"mt-2 ml-2",attrs:{src:n("34bd"),height:"35"}}),a("v-spacer"),e.isLoggedIn?a("div",[a("v-menu",{attrs:{bottom:"",width:"378px",height:"504px",rounded:"","offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[a("v-btn",e._g({attrs:{icon:""}},n),[a("v-icon",{attrs:{color:"black"}},[e._v("mdi-bell-outline")])],1)]}}],null,!1,3625554555)},[a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"500"}},[a("v-card-title",{staticClass:"black--text white darken-4"},[e._v(" Notification Center "),a("v-spacer"),a("router-link",{attrs:{to:{name:"notifications"}}},[a("div",{staticClass:"notif-mark",attrs:{align:"center"}},[e._v("View all")])]),a("span",{attrs:{fab:"",small:""}},[a("v-icon",[e._v("mdi-close")])],1)],1),a("v-divider"),a("v-virtual-scroll",{attrs:{items:e.notificationCenterItems,"item-height":90,height:"300",width:"500"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.item;return[a("v-list-item",[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("div",{staticClass:"notif-type"},[e._v("Call Notification")]),a("div",{staticClass:"notif-content"},[e._v(e._s(n.content))]),a("div",{staticClass:"notif-time mb-2"},[e._v("Today, 12:01pm")])])],1)],1),a("v-divider")]}}],null,!1,1473811317)}),a("v-card-text",{staticClass:"pt-4 text-center"},[a("v-row",[a("v-col",{staticClass:"notif-mark",attrs:{cols:"12",align:"center"}},[e._v(" Mark all as read(10) ")])],1)],1)],1)],1),a("v-menu",{attrs:{bottom:"","max-width":"247px","min-height":"218px",rounded:"","offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[a("v-avatar",e._g({staticClass:"ml-5",attrs:{size:"40"}},n),[a("v-img",{attrs:{src:"/img1.png"}})],1)]}}],null,!1,640756062)},[a("v-card",[a("v-list-item-content",{staticClass:"align-left"},[a("v-list-item",[a("v-list-item-avatar",[a("img",{attrs:{src:"/img1.png",alt:"Admin"}})]),a("v-list-item-content",[a("v-list-item-title",[e._v(e._s(e.userFirstName))]),a("v-list-item-subtitle",[e._v("+91 "+e._s(e.userPhoneNumber))])],1)],1),a("v-list-item-content",[a("span",{staticClass:"avatar-menu-item"},[e._v("FAQ")])]),a("v-list-item-content",[a("span",{staticClass:"avatar-menu-item"},[e._v("Contact Us")])]),a("v-list-item-content",[a("span",{staticClass:"avatar-menu-item",on:{click:e.logout}},[e._v("Log Out")])])],1)],1)],1)],1):e._e()],1)],1),a("v-main",[a("v-row",{attrs:{align:"center"}},[a("v-col",{attrs:{cols:"12"}},[a("router-view")],1)],1)],1)],1)},s=[],l=n("1da1"),u=(n("96cf"),n("2591")),c={created:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=localStorage.getItem("tpu"),n&&(a=JSON.parse(n),e.userEmail=a.Email,console.log("Navbar-user-FirstName",a.FirstName),console.log("Navbar-user-Email",a.Email),console.log(a),e.userRole=a.role,e.isLoggedIn=!0,e.userFirstName=a.FirstName,e.userPhoneNumber=a.PhoneNumber,e.forceRerenderKey());case 2:case"end":return t.stop()}}),t)})))()},data:function(){return{drawer:!1,isLoggedIn:!1,userRole:"",userFirstName:"",userPhoneNumber:"",rerenderKey:0,group:null,role:"",notificationCenterItems:[{id:1,type:"Call Notification",content:"You have a Missed Call From +91 988809991",time:"Today, 12:01pm"},{id:2,type:"Call Notification",content:"You have a Missed Call From +91 988809991",time:"Today, 12:01pm"},{id:3,type:"Call Notification",content:"You have a Missed Call From +91 988809991",time:"Today, 12:01pm"},{id:4,type:"Call Notification",content:"You have a Missed Call From +91 988809991",time:"Today, 12:01pm"},{id:5,type:"Call Notification",content:"You have a Missed Call From +91 988809991",time:"Today, 12:01pm"},{id:6,type:"Call Notification",content:"You have a Missed Call From +91 988809991",time:"Today, 12:01pm"},{id:7,type:"Call Notification",content:"You have a Missed Call From +91 988809991",time:"Today, 12:01pm"},{id:8,type:"Call Notification",content:"You have a Missed Call From +91 988809991",time:"Today, 12:01pm"},{id:9,type:"Call Notification",content:"You have a Missed Call From +91 988809991",time:"Today, 12:01pm"},{id:10,type:"Call Notification",content:"You have a Missed Call From +91 988809991",time:"Today, 12:01pm"}],links:{OWNER:[{to:"/dashboard",icon:"mdi-radar",text:"Dashboard"},{icon:"mdi-phone",text:"Call Logs",subLinks:[{text:"All Calls",to:"/all_calls",icon:""},{text:"Missed Calls",to:"/missed_calls",icon:""},{text:"Answered Calls",to:"/answered_call",icon:""}]},{to:"/report",icon:"mdi-chart-bar",text:"Report"},{icon:"mdi-dots-horizontal",text:"More",subLinks:[{icon:"",text:"Business Number",to:"/BusinessNumber"},{icon:"",text:"Manage Users",to:"/ManageUsers"},{icon:"",text:"Add-Ons",to:"/Addons"},{icon:"",text:"Billing Information",to:"/BillingInformation"},{icon:"",text:"Account Info",to:"/AccountInformation"},{icon:"",text:"FAQs",to:"/FAQs"},{icon:"",text:"Get Support",to:"/GetSupport"}]}],ADMIN:[{to:"/dashboard",icon:"mdi-radar",text:"Dashboard"}],AGENT:[]}}},watch:{group:function(){this.drawer=!1},isLoggedIn:function(){console.log("forceRerenderKey watch"),this.forceRerenderKey()}},methods:{forceRerenderKey:function(){this.rerenderKey+=1},logout:function(){console.log("clicked logout"),u["a"].auth().signOut(),localStorage.removeItem("tpu"),this.rerenderKey+=1,this.$router.push("login").catch((function(){}))},dashboard:function(){this.$router.push("/dashboard").catch((function(){}))},report:function(){this.$router.push("/report").catch((function(){}))}}},m=c,d=n("2877"),h=n("6544"),p=n.n(h),f=n("7496"),g=n("40dc"),v=n("8212"),b=n("8336"),_=n("b0af"),N=n("99d9"),y=n("62ad"),C=n("ce7e"),A=n("132d"),w=n("adda"),O=n("8860"),x=n("56b0"),E=n("da13"),R=n("8270"),P=n("5d23"),k=n("34c3"),S=n("f6c4"),I=n("e449"),V=n("f774"),q=n("0fd9"),W=n("2fa4"),F=n("0de5"),T=Object(d["a"])(m,i,s,!1,null,null,null),M=T.exports;p()(T,{VApp:f["a"],VAppBar:g["a"],VAvatar:v["a"],VBtn:b["a"],VCard:_["a"],VCardText:N["b"],VCardTitle:N["c"],VCol:y["a"],VDivider:C["a"],VIcon:A["a"],VImg:w["a"],VList:O["a"],VListGroup:x["a"],VListItem:E["a"],VListItemAvatar:R["a"],VListItemContent:P["a"],VListItemIcon:k["a"],VListItemSubtitle:P["b"],VListItemTitle:P["c"],VMain:S["a"],VMenu:I["a"],VNavigationDrawer:V["a"],VRow:q["a"],VSpacer:W["a"],VVirtualScroll:F["a"]});var B=n("12d4"),L={name:"App",components:{Navbar:M,vtoast:B["a"]},mounted:function(){this.$root.vtoast=this.$refs.vtoast}},$=L,D=Object(d["a"])($,r,o,!1,null,null,null),U=D.exports;p()(D,{VApp:f["a"],VMain:S["a"]});n("d1e78");var j=n("f309");a["a"].use(j["a"]);var G=new j["a"]({icons:{iconfont:"md"},theme:{themes:{light:{primary:"#ee1c25",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107",tpwhite:"#FFFFFF",tplightgrey:"#E0E0E0",tpgrey:"#808080",tpblack:"#3B3B3B",tpteal:"#13B9A8",tpgreen:"#07C421",tppink:"#FAB4B7",tpred:"#EE1C25"}}}}),X=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f")),z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-container",{attrs:{fluid:""}},[n("v-layout",[n("v-flex",{attrs:{xs12:"",sm12:"",md12:""}},[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"12",align:"center"}},[n("v-overlay",{attrs:{value:e.overlay}},[n("v-progress-circular",{attrs:{indeterminate:"",color:"red",size:"40",width:3}})],1),n("v-card",{attrs:{color:"transparent",outlined:"","max-width":"280"}},[n("h2",{staticClass:"page_title mt-16 mb-13"},[e._v("Welcome to Tring Partner")]),n("h2",{staticClass:"sub_title mt-8 mb-13"},[e._v("Use your mobile number to get started with Tring Partner")]),n("div",[e.getNumber?n("div",{staticClass:"mt-1 ml-2"},[n("h4",{staticClass:"name_heading mt-4 ml-2",attrs:{align:"start"}},[e._v("Login or Sign Up")]),n("v-form",{on:{submit:function(t){return t.preventDefault(),e.submit.apply(null,arguments)}}},[n("v-text-field",{staticClass:"mt-4",attrs:{outlined:"",prefix:"+91",color:"grey darken-4",label:"Mobile Number",type:"text",rules:e.numberRules,required:""},model:{value:e.phNo,callback:function(t){e.phNo=t},expression:"phNo"}}),n("v-btn",{staticClass:"btn_text mt-15 white--text text-capitalize",attrs:{width:"70%",rounded:"",color:"#EE1C25\n\t\t\t\t\t\t\t\t\t\t\t\t"},on:{click:function(t){return t.preventDefault(),e.sendOtp()}}},[e._v(" Next ")])],1)],1):e._e(),e.getOtp?n("div",{staticClass:"mt-1 ml-2"},[n("h4",{staticClass:"name_heading mt-4",attrs:{align:"start"}},[e._v("Enter OTP")]),n("v-otp-input",{attrs:{length:"6"},model:{value:e.otp,callback:function(t){e.otp=t},expression:"otp"}}),n("div",{staticClass:"mt-4"},[n("a",{staticClass:"link_style text-decoration-underline",on:{click:function(t){return t.preventDefault(),e.sendOtp()}}},[e._v(" Resend OTP ")]),n("br"),n("br"),n("a",{staticClass:"link_style text-decoration-underline",on:{click:function(t){return e.changeLoginNumber()}}},[e._v(" Change Number ")])]),n("v-btn",{staticClass:"btn_text mt-15 white--text text-capitalize",attrs:{width:"70%",rounded:"",color:"#EE1C25\n\t\t\t\t\t\t\t\t\t\t\t\t"},on:{click:function(t){return t.preventDefault(),e.verifyOtp()}}},[e._v(" Submit ")])],1):e._e()])]),n("div",{attrs:{id:"recaptcha-container"}})],1)],1)],1)],1)],1)],1)},Y=[],K=(n("ac1f"),n("00b4"),n("fb6a"),n("159b"),n("e9c4"),{data:function(){return{otp:"XXXXXX",getNumber:!0,getOtp:!1,numberRules:[function(e){return/^[0-9]*$/.test(e)||"No characters Allowed"}],phNo:"",uid:"",currentPage:"",dialog:!1,errorMessage:"",role:"",overlay:!1}},components:{},created:function(){var e=this;this.initReCaptcha(),u["a"].auth().onAuthStateChanged((function(t){t&&(e.uid=t.uid,e.phno=t.phoneNumber.slice(3),Ne.collection("users").where("uid","==",e.uid).get().then((function(t){t.forEach((function(t){console.log(t.id," => ",t.data()),console.log("<-------------------LOGGING USER DETAILS-----------------------\x3e"),localStorage.setItem("tpu",JSON.stringify(t.data()));var n=t.data();e.Udata=n,e.currentPage=e.Udata.currentPage,e.role=e.Udata.role,"ADMIN"==e.role||"AGENT"==e.role?e.$router.push("/Dashboard"):"onboarding_listing"==e.currentPage?e.$router.push("/ChooseNumbers"):"onboarding_plan_details"==e.currentPage?e.$router.push("/SelectPlan"):"onboarding_billing"==e.currentPage?e.$router.push("/Billing"):"onboarding_review"==e.currentPage?e.$router.push("/Review"):"onboarding_dashboard"!=e.currentPage&&"onboarding_success"!=e.currentPage||e.$router.push("/Dashboard")}))})).catch((function(e){console.log("Error getting documents: ",e)})))}))},methods:{sendOtp:function(){var e=this;if(this.otp="XXXXXX",10!=this.phNo.length)alert("Invalid Phone Number Format !");else{this.getNumber=!1,this.getOtp=!0;var t="+91",n=t+this.phNo,a=this.appVerifier;u["a"].auth().signInWithPhoneNumber(n,a).then((function(e){window.confirmationResult=e})).catch((function(t){e.errorMessage=t.message,console.log(e.errorMessage)}))}},changeLoginNumber:function(){this.phNo="",this.getNumber=!0,this.getOtp=!1},verifyOtp:function(){var e=this;if(6!=this.otp.length)alert("Invalid OTP Format !");else{this.overlay=!0;var t="",n=this.otp;window.confirmationResult.confirm(n).then((function(e){t=e.user.uid})).catch((function(e){console.log("error details",e)})).finally((function(){e.uid=t,console.log("ID",e.uid),console.log("phno",e.phNo);var n={url:"https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/login",method:"POST",data:{uid:e.uid,phoneNumber:e.phNo}};console.log(n),e.$axios(n).then((function(t){console.log(t.data),console.log(e.uid),localStorage.setItem("token",t.data.token),Ne.collection("users").where("uid","==",e.uid).get().then((function(t){t.forEach((function(t){console.log(t.id," => ",t.data()),console.log("<-------------------VERIFY OTP LOGGING USER DETAILS-----------------------\x3e"),localStorage.setItem("tpu",JSON.stringify(t.data()));var n=t.data();if(e.Udata=n,e.currentPage=e.Udata.currentPage,e.role=e.Udata.role,console.log(e.currentPage),console.log(e.role),"ADMIN"==e.role||"AGENT"==e.role)e.overlay=!1,e.$router.push("/Dashboard").catch((function(){}));else if("onboarding_listing"==e.currentPage)e.overlay=!1,e.$router.push("/ChooseNumbers").catch((function(e){console.log(e)}));else if("onboarding_plan_details"==e.currentPage)e.overlay=!1,e.$router.push("/SelectPlan").catch((function(){}));else if("onboarding_billing"==e.currentPage)e.overlay=!1,e.$router.push("/Billing").catch((function(){}));else if("onboarding_review"==e.currentPage)e.overlay=!1,e.$router.push("/Review").catch((function(){}));else if("onboarding_dashboard"==e.currentPage||"onboarding_success"==e.currentPage)e.overlay=!1,e.$router.push("/Dashboard").catch((function(){}));else{var a={url:"https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/user/stage",method:"POST",data:{uid:e.uid,phoneNumber:e.phno,currentPage:"onboarding_listing"}};console.log(a),e.$axios(a).then((function(t){console.log(t),e.overlay=!1,e.$router.push("/ChooseNumbers").catch((function(){}))})).catch((function(e){console.error(e)}))}}))})).catch((function(e){console.log("Error getting documents: ",e)}))})).catch((function(e){console.error(e)}))}))}},initReCaptcha:function(){var e=this;setTimeout((function(){var t=e;console.log("render on create",t),window.recaptchaVerifier=new u["a"].auth.RecaptchaVerifier("recaptcha-container",{size:"invisible",callback:function(e){console.log("reCAPTCHA",e)},"expired-callback":function(){}}),e.appVerifier=window.recaptchaVerifier}),1e3)}}}),H=K,J=(n("821f"),n("a523")),Q=n("0e8f"),Z=n("4bd4"),ee=n("a722"),te=n("1514"),ne=n("a797"),ae=n("490a"),re=n("8654"),oe=Object(d["a"])(H,z,Y,!1,null,"53085a09",null),ie=oe.exports;p()(oe,{VApp:f["a"],VBtn:b["a"],VCard:_["a"],VCol:y["a"],VContainer:J["a"],VFlex:Q["a"],VForm:Z["a"],VLayout:ee["a"],VOtpInput:te["a"],VOverlay:ne["a"],VProgressCircular:ae["a"],VRow:q["a"],VTextField:re["a"]});var se=n("260b");n("ea7b");a["a"].use(X["a"]),console.log(se);var le=[{path:"*",redirect:"/login"},{path:"/",redirect:"/login"},{path:"/login",name:"login",component:ie},{path:"/answered_call",name:"answered_call",component:function(){return n.e("missed_call").then(n.bind(null,"ef77"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/notifications",name:"notifications",component:function(){return n.e("missed_call").then(n.bind(null,"ac9d"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/missed_calls",name:"missed_calls",component:function(){return n.e("missed_call").then(n.bind(null,"b299"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/all_calls",name:"all_calls",component:function(){return n.e("missed_call").then(n.bind(null,"fffe"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/dashboard",name:"dashboard",component:function(){return n.e("missed_call").then(n.bind(null,"7277"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/report",name:"report",component:function(){return n.e("missed_call").then(n.bind(null,"762c"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/Addons",name:"Addons",component:function(){return n.e("missed_call").then(n.bind(null,"01be"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/manageAddonNumbers",name:"manageAddonNumbers",component:function(){return n.e("missed_call").then(n.bind(null,"8fb6"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/manageAddonUsers",name:"manageAddonUsers",component:function(){return n.e("missed_call").then(n.bind(null,"879e"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/buyNewNumber",name:"buyNewNumber",component:function(){return n.e("missed_call").then(n.bind(null,"d1f27"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/reserveNumber",name:"reserveNumber",component:function(){return n.e("missed_call").then(n.bind(null,"f8f6"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/buyNewAddOnUser",name:"buyNewAddOnUser",component:function(){return n.e("missed_call").then(n.bind(null,"2e30"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/fancyNumberPurchase",name:"fancyNumberPurchase",component:function(){return n.e("missed_call").then(n.bind(null,"ca1c"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/BillingInformation",name:"BillingInformation",component:function(){return n.e("missed_call").then(n.bind(null,"535c"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/BillingAddress",name:"BillingAddress",component:function(){return n.e("missed_call").then(n.bind(null,"3d17"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/PaymentHistory",name:"PaymentHistory",component:function(){return n.e("missed_call").then(n.bind(null,"1bd2"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/BusinessNumber",name:"BusinessNumber",component:function(){return n.e("missed_call").then(n.bind(null,"5460"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/ManageUsers",name:"ManageUsers",component:function(){return n.e("missed_call").then(n.bind(null,"016f"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/FAQs",name:"FAQs",component:function(){return n.e("missed_call").then(n.bind(null,"9880"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/AccountInformation",name:"AccountInformation",component:function(){return n.e("missed_call").then(n.bind(null,"6ad1"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/BasicInformation",name:"BasicInformation",component:function(){return n.e("missed_call").then(n.bind(null,"754d"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/BusinessInformation",name:"BusinessInformation",component:function(){return n.e("missed_call").then(n.bind(null,"5aeaf"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/ChangeLoginNumber",name:"ChangeLoginNumber",component:function(){return n.e("missed_call").then(n.bind(null,"d67a"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/GetSupport",name:"GetSupport",component:function(){return n.e("missed_call").then(n.bind(null,"12b4"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/ChooseNumbers",name:"ChooseNumbers",component:function(){return n.e("missed_call").then(n.bind(null,"75ae"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/SelectPlan",name:"SelectPlan",component:function(){return n.e("missed_call").then(n.bind(null,"299e"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/Billing",name:"Billing",component:function(){return n.e("missed_call").then(n.bind(null,"2942"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/Review",name:"Review",component:function(){return n.e("missed_call").then(n.bind(null,"bb44"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/CallFlowSettings",name:"CallFlowSettings",component:function(){return n.e("missed_call").then(n.bind(null,"4632"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/ManageAgents",name:"ManageAgents",component:function(){return n.e("missed_call").then(n.bind(null,"2115"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/PauseNumber",name:"PauseNumber",component:function(){return n.e("missed_call").then(n.bind(null,"b317"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/CallPreference",name:"CallPreference",component:function(){return n.e("missed_call").then(n.bind(null,"c391"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/CallRouting",name:"CallRouting",component:function(){return n.e("missed_call").then(n.bind(null,"a0c8"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/PrioritizeConfiguration",name:"PrioritizeConfiguration",component:function(){return n.e("missed_call").then(n.bind(null,"ec10"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/NotificationSettings",name:"NotificationSettings",component:function(){return n.e("missed_call").then(n.bind(null,"cb77"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/MissedCallDistribution",name:"MissedCallDistribution",component:function(){return n.e("missed_call").then(n.bind(null,"b6c7"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/SelectSpecificAgent",name:"SelectSpecificAgent",component:function(){return n.e("missed_call").then(n.bind(null,"d5ca"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/BlockedNumbers",name:"BlockedNumbers",component:function(){return n.e("missed_call").then(n.bind(null,"f60d"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/GreetingMessage",name:"GreetingMessage",component:function(){return n.e("missed_call").then(n.bind(null,"2103"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/CallerTune",name:"CallerTune",component:function(){return n.e("missed_call").then(n.bind(null,"4665"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/WorkingHours",name:"WorkingHours",component:function(){return n.e("missed_call").then(n.bind(null,"b1b3"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/CallerID",name:"CallerID",component:function(){return n.e("missed_call").then(n.bind(null,"04ff"))},meta:{requiresAuth:!0,role:"OWNER"}},{path:"/OfflineMesssage",name:"OfflineMesssage",component:function(){return n.e("missed_call").then(n.bind(null,"d136"))},meta:{requiresAuth:!0,role:"OWNER"}}],ue=new X["a"]({mode:"history",base:"/",routes:le});function ce(){return new Promise((function(e,t){try{var n=localStorage.getItem("tpu");if(n){var a=JSON.parse(n);Object.prototype.hasOwnProperty.call(a,"uid")&&Object.prototype.hasOwnProperty.call(a,"role")&&se["default"].auth().currentUser.getIdTokenResult().then((function(t){var n=t.claims.user_id,r=a["uid"],o=a["role"];e(n==r?o:"Guest")})).catch((function(e){console.log(e),t(e)}))}else e("Guest")}catch(r){e("Guest")}}))}function me(){return new Promise((function(e,t){try{se["default"].auth().onAuthStateChanged((function(t){e(t)}))}catch(n){t("api failed")}}))}ue.beforeEach(function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(t,n,a){var r,o,i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,me();case 2:return r=e.sent,o=t.matched.some((function(e){return e.meta.requiresAuth})),i=t.meta.role,e.next=7,ce();case 7:s=e.sent,console.log("router.beforeEach currentUserRole",s),o&&!r?a({path:"/login",query:{redirect:t.fullPath}}):o&&r?i==s?a():("OWNER"==s||"ADMIN"==s||"AGENT"==s)&&a({path:"/login",query:{redirect:t.fullPath}}):a();case 10:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}());var de=ue,he=(n("e71f"),n("bc3a")),pe=n.n(he),fe=n("130e"),ge=n("049c"),ve=n.n(ge),be=n("cb43");n("5aea");a["a"].prototype.$http=ve.a,a["a"].config.productionTip=!1,a["a"].use(be["default"]),a["a"].use(fe["a"],pe.a),a["a"].use(ve.a);var _e=new a["a"];se["default"].initializeApp({apiKey:"AIzaSyBXibeZC-vEjCOetmvBhwFS3mYz3VcyzRU",authDomain:"test-tpv2.firebaseapp.com",databaseURL:"https://test-tpv2-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"test-tpv2",storageBucket:"test-tpv2.appspot.com",messagingSenderId:"915926362222",appId:"1:915926362222:web:b3f914ef56f454161c5e7f",measurementId:"G-7429HVQX2D"});var Ne=se["default"].firestore();new a["a"]({router:de,vuetify:G,render:function(e){return e(U)}}).$mount("#app")},"5aea":function(e,t,n){},"821f":function(e,t,n){"use strict";n("07e1")}});
//# sourceMappingURL=app.34255bde.js.map