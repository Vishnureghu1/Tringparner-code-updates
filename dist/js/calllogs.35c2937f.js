(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["calllogs"],{"1da1":function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n("d3b7");function a(t,e,n,a,o,r,l){try{var i=t[r](l),c=i.value}catch(s){return void n(s)}i.done?e(c):Promise.resolve(c).then(a,o)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(o,r){var l=t.apply(e,n);function i(t){a(l,o,r,i,c,"next",t)}function c(t){a(l,o,r,i,c,"throw",t)}i(void 0)}))}}},"96cf":function(t,e,n){var a=function(t){"use strict";var e,n=Object.prototype,a=n.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},r=o.iterator||"@@iterator",l=o.asyncIterator||"@@asyncIterator",i=o.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(P){c=function(t,e,n){return t[e]=n}}function s(t,e,n,a){var o=e&&e.prototype instanceof g?e:g,r=Object.create(o.prototype),l=new T(a||[]);return r._invoke=C(t,n,l),r}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(P){return{type:"throw",arg:P}}}t.wrap=s;var d="suspendedStart",h="suspendedYield",f="executing",m="completed",p={};function g(){}function v(){}function y(){}var _={};_[r]=function(){return this};var w=Object.getPrototypeOf,b=w&&w(w(j([])));b&&b!==n&&a.call(b,r)&&(_=b);var k=y.prototype=g.prototype=Object.create(_);function x(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function N(t,e){function n(o,r,l,i){var c=u(t[o],t,r);if("throw"!==c.type){var s=c.arg,d=s.value;return d&&"object"===typeof d&&a.call(d,"__await")?e.resolve(d.__await).then((function(t){n("next",t,l,i)}),(function(t){n("throw",t,l,i)})):e.resolve(d).then((function(t){s.value=t,l(s)}),(function(t){return n("throw",t,l,i)}))}i(c.arg)}var o;function r(t,a){function r(){return new e((function(e,o){n(t,a,e,o)}))}return o=o?o.then(r,r):r()}this._invoke=r}function C(t,e,n){var a=d;return function(o,r){if(a===f)throw new Error("Generator is already running");if(a===m){if("throw"===o)throw r;return S()}n.method=o,n.arg=r;while(1){var l=n.delegate;if(l){var i=E(l,n);if(i){if(i===p)continue;return i}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(a===d)throw a=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);a=f;var c=u(t,e,n);if("normal"===c.type){if(a=n.done?m:h,c.arg===p)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(a=m,n.method="throw",n.arg=c.arg)}}}function E(t,n){var a=t.iterator[n.method];if(a===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,E(t,n),"throw"===n.method))return p;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var o=u(a,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,p;var r=o.arg;return r?r.done?(n[t.resultName]=r.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,p):r:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,p)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function j(t){if(t){var n=t[r];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,l=function n(){while(++o<t.length)if(a.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return l.next=l}}return{next:S}}function S(){return{value:e,done:!0}}return v.prototype=k.constructor=y,y.constructor=v,v.displayName=c(y,i,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,c(t,i,"GeneratorFunction")),t.prototype=Object.create(k),t},t.awrap=function(t){return{__await:t}},x(N.prototype),N.prototype[l]=function(){return this},t.AsyncIterator=N,t.async=function(e,n,a,o,r){void 0===r&&(r=Promise);var l=new N(s(e,n,a,o),r);return t.isGeneratorFunction(n)?l:l.next().then((function(t){return t.done?t.value:l.next()}))},x(k),c(k,i,"Generator"),k[r]=function(){return this},k.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var a=e.pop();if(a in t)return n.value=a,n.done=!1,n}return n.done=!0,n}},t.values=j,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var n in this)"t"===n.charAt(0)&&a.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function o(a,o){return i.type="throw",i.arg=t,n.next=a,o&&(n.method="next",n.arg=e),!!o}for(var r=this.tryEntries.length-1;r>=0;--r){var l=this.tryEntries[r],i=l.completion;if("root"===l.tryLoc)return o("end");if(l.tryLoc<=this.prev){var c=a.call(l,"catchLoc"),s=a.call(l,"finallyLoc");if(c&&s){if(this.prev<l.catchLoc)return o(l.catchLoc,!0);if(this.prev<l.finallyLoc)return o(l.finallyLoc)}else if(c){if(this.prev<l.catchLoc)return o(l.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<l.finallyLoc)return o(l.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&a.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var r=o;break}}r&&("break"===t||"continue"===t)&&r.tryLoc<=e&&e<=r.finallyLoc&&(r=null);var l=r?r.completion:{};return l.type=t,l.arg=e,r?(this.method="next",this.next=r.finallyLoc,p):this.complete(l)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),O(n),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var a=n.completion;if("throw"===a.type){var o=a.arg;O(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,a){return this.delegate={iterator:j(t),resultName:n,nextLoc:a},"next"===this.method&&(this.arg=e),p}},t}(t.exports);try{regeneratorRuntime=a}catch(o){Function("r","regeneratorRuntime = r")(a)}},d801:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-container",{attrs:{fluid:""}},[n("v-layout",{attrs:{"align-center":"","justify-center":""}},[n("v-flex",{attrs:{xs12:"",sm8:"",md8:""}},[n("v-card",{staticClass:"mx-auto"},[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"12"}},[n("div",[n("div",{staticClass:"mr-4"},[n("h3",{staticClass:"mt-6 text-center"},[t._v("Call Logs")])])]),n("v-tabs",[n("v-tab",{attrs:{href:"#one"}},[t._v(" ALL ")]),n("v-tab-item",{key:"one",attrs:{id:"one"}},[n("v-card",{staticClass:"mx-auto"},[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"lg-12"}},[n("v-expansion-panels",t._l(t.realdata,(function(e){return n("v-expansion-panel",{key:e.text},[n("v-expansion-panel-header",[n("div",[t._v(" "+t._s(e.callerNumber)+" "),"Answered"==e.callstatus?n("span",{staticClass:"mdi mdi-phone-incoming ml-2 green--text"}):n("span",{staticClass:"mdi mdi-phone-missed ml-2 red--text"}),t._l(e.Note,(function(e){return n("span",{key:e.text},[""!=e.Note?n("span",{staticClass:"mdi mdi-note ml-2 blue--text"}):t._e()])})),n("br"),n("span",{staticClass:"mt-1"},[t._v(t._s(e.dateTime))])],2)]),n("v-expansion-panel-content",[e.count>0?n("div",[n("h5",{staticClass:"font-weight-regular"},[t._v(" callback attempted : "+t._s(e.count)+" time(s)")]),n("h5",{staticClass:"font-weight-regular mb-3"},[t._v(" Callback attempted by : "+t._s(e.called_name)+" ")])]):n("h5",{staticClass:"font-weight-regular mb-3"},[t._v(" No callback attempted")]),t._l(e.Note,(function(a){return n("div",{key:a.text},[n("v-text-field",{attrs:{"append-outer-icon":a.Note?"mdi-send":"","clear-icon":"mdi-close-circle",clearable:"",label:"Add notes",rules:t.rules,counter:"",maxlength:"75",type:"text"},on:{"click:append-outer":function(n){return t.sendMessage(e.uniqueid,a.Note)},"click:clear":function(n){return t.clearMessage(e.uniqueid,a.Note)}},model:{value:a.Note,callback:function(e){t.$set(a,"Note",e)},expression:"getNotes.Note"}})],1)}))],2)],1)})),1)],1)],1)],1)],1),n("v-tab",{attrs:{href:"#two"}},[t._v(" MISSED ")]),n("v-tab-item",{key:"two",attrs:{id:"two"}},[n("v-card",{staticClass:"mx-auto"},[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"lg-12"}},[n("v-expansion-panels",t._l(t.realdata,(function(e){return n("v-expansion-panel",{key:e.text},["Missed"==e.callstatus?n("div",[n("v-expansion-panel-header",[n("div",{staticClass:"red--text"},[t._v(" "+t._s(e.callerNumber)+" "),n("span",{staticClass:"mdi mdi-phone-missed ml-2"}),t._l(e.Note,(function(e){return n("span",{key:e.text},[""!=e.Note?n("span",{staticClass:"mdi mdi-note ml-2 blue--text"}):t._e()])})),n("br"),n("span",{staticClass:"mt-2 black--text"},[t._v(t._s(e.dateTime))])],2)]),n("v-expansion-panel-content",[e.count>0?n("div",[n("h5",{staticClass:"font-weight-regular"},[t._v(" callback attempted : "+t._s(e.count)+" time(s)")]),n("h5",{staticClass:"font-weight-regular mb-3"},[t._v(" Callback attempted by : "+t._s(e.called_name)+" ")])]):n("h5",{staticClass:"font-weight-regular mb-3"},[t._v(" No callback attempted")]),t._l(e.Note,(function(a){return n("div",{key:a.text},[n("v-text-field",{attrs:{"append-outer-icon":a.Note?"mdi-send":"","clear-icon":"mdi-close-circle",clearable:"",label:"Add notes",rules:t.rules,counter:"",maxlength:"75",type:"text"},on:{"click:append-outer":function(n){return t.sendMessage(e.uniqueid,a.Note)},"click:clear":function(n){return t.clearMessage(e.uniqueid,a.Note)}},model:{value:a.Note,callback:function(e){t.$set(a,"Note",e)},expression:"getNotes.Note"}})],1)}))],2)],1):t._e()])})),1)],1)],1)],1)],1),n("v-tab",{attrs:{href:"#three"}},[t._v(" FILTERS ")]),n("v-tab-item",{key:"three",attrs:{id:"three"}})],1)],1)],1)],1)],1)],1)],1)],1)},o=[],r=n("1da1"),l=(n("96cf"),n("fb6a"),n("159b"),n("b0c0"),n("252b")),i=n("56d7"),c=n("c1df"),s=n.n(c),u={created:function(){var t=this;l["a"].auth().onAuthStateChanged((function(e){e&&(console.log("logged user details",e),t.uid=e.uid,t.phno=e.phoneNumber.slice(3),console.log("page call logs il user id",t.uid),console.log("page call logs il user number",t.phno),i["db"].collection("users").where("uid","==",t.uid).get().then((function(e){e.forEach((function(e){console.log(e.id," => ",e.data());var n=e.data();console.log(n.role),"OWNER"==n.role||"ADMIN"==n.role?("ADMIN"==n.role&&(t.uid=n.OwnerUid),i["db"].collection("callLogs").where("owneruid","==",t.uid).orderBy("dateTime","desc").onSnapshot((function(e){t.realdata=[],e.empty?alert("no calls"):e.forEach(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(n){var a,o,r,l,c,u,d,h,f;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(console.log(n.id," => ",n.data()),a=n.data(),t.calldetails=a,o=t.calldetails.dateTime,r=new Date(o),console.log("full time",r),l=s()(r).format("hh:mm a"),l=s()(r).fromNow(),console.log("converted time",l),c="",u="",d="",h="",f="",t.calldetails.Notes?c=t.calldetails.Notes:(console.log("no note"),c=[{Note:""}]),!t.calldetails.ClickCount){e.next=33;break}if(u=t.calldetails.ClickCount.Count,d=t.calldetails.ClickCount.Uid,h=t.calldetails.name,f=t.calldetails.owneruid,console.log("user id ",t.click_details.user_name),d!=f||"Missed"!=t.calldetails.callstatus){e.next=25;break}t.called_name="You",e.next=31;break;case 25:if(d!=f||"Answered"!=t.calldetails.callstatus){e.next=29;break}t.called_name=h,e.next=31;break;case 29:return e.next=31,i["db"].collection("users").where("uid","==",d).get().then((function(e){e.forEach((function(e){console.log(e.id," => ",e.data());var n=e.data();console.log(n.Name),t.called_name=n.Name}))}));case 31:e.next=39;break;case 33:console.log("no callback"),u=0,d="",h="",f="",t.called_name="";case 39:t.detail=Object.assign({},t.detail,{callstatus:t.calldetails.callstatus,name:t.calldetails.name,dateTime:l,conversationduration:t.calldetails.conversationduration,callerNumber:t.calldetails.callerNumber,uniqueid:t.calldetails.uniqueid,Note:c,count:u,called_name:t.called_name}),t.realdata.push(t.detail),console.log("snap calllog ",t.realdata);case 42:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}))):"AGENT"==n.role&&(console.log("its agent"),i["db"].collection("callLogs").where("userid","array-contains",t.uid).onSnapshot((function(e){t.realdata=[],e.empty?alert("no calls"):e.forEach((function(e){console.log(e.id," => ",e.data());var n=e.data();t.calldetails=n;var a=t.calldetails.dateTime,o=new Date(a);console.log("full time",o);var r=s()(o).format("hh:mm a");r=s()(o).fromNow(),console.log("converted time",r);var l="";t.calldetails.Notes?l=t.calldetails.Notes:(console.log("no note"),l=[{Note:""}]),t.detail=Object.assign({},t.detail,{callstatus:t.calldetails.callstatus,name:t.calldetails.name,dateTime:r,conversationduration:t.calldetails.conversationduration,callerNumber:t.calldetails.callerNumber,uniqueid:t.calldetails.uniqueid,Note:l}),t.realdata.push(t.detail),console.log("snap calllog ",t.realdata),t.calldetails.ClickCount&&(t.click_details=Object.assign({},t.click_details,{count:t.calldetails.ClickCount.Count,uid:t.calldetails.ClickCount.Uid,user_name:t.calldetails.name,owneruid:t.calldetails.owneruid}),t.clicked_array.push(t.click_details),console.log("clicked",t.click_details),console.log("user id ",t.click_details.user_name),t.click_details.uid==t.click_details.owneruid?t.called_name=t.click_details.user_name:i["db"].collection("users").where("uid","==",t.click_details.uid).get().then((function(e){e.forEach((function(e){console.log(e.id," => ",e.data());var n=e.data();console.log(n.Name),t.called_name=n.Name}))})))}))})))}))})).catch((function(t){console.log("Error getting documents: ",t)})))}))},data:function(){return{uid:"",phno:"",called_name:"",role:"",headings:["ALL","MISSED","FILTERS"],detail:{},calldetails:[],realdata:[],click_details:{},clicked_array:[],selected:!1,note:[],show_notes:!1,dialog:!1,dialog2:!1,add_note:!0,callback_uid:"",rules:[function(t){return t.length<=75||"Max 75 characters"}],password:"Password",show:!1,marker:!0}},methods:{clickCount:function(t){var e=this;this.clicked_array=[],i["db"].collection("callLogs").where("uniqueid","==",t).get().then((function(n){n.forEach((function(n){console.log(n.id," => ",n.data());var a=n.data();e.calldetails=a,console.log(e.callback_uid),e.calldetails.ClickCount?(e.click_details=Object.assign({},e.click_details,{count:e.calldetails.ClickCount.Count,uid:e.calldetails.ClickCount.Uid,user_name:e.calldetails.name,userid:e.calldetails.userid}),e.clicked_array.push(e.click_details),console.log("clicked",e.click_details),e.dialog2=!0,console.log("user id ",e.click_details.user_name),e.click_details.uid==e.click_details.userid?e.called_name=e.click_details.user_name:i["db"].collection("users").where("uid","==",e.click_details.uid).get().then((function(t){t.forEach((function(t){console.log(t.id," => ",t.data());var n=t.data();console.log(n.Name),e.called_name=n.Name}))}))):(e.dialog2=!1,e.callBack(t))}))})).catch((function(t){console.log("Error getting documents: ",t)}))},sendMessage:function(t,e){var n={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/note",method:"POST",data:{uid:this.uid,unique_id:t,note:e}};console.log(n),this.$axios(n).then((function(t){console.log(t)})).catch((function(t){console.log("Error getting documents: ",t)}))},clearMessage:function(t,e){e="";var n={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/note",method:"POST",data:{uid:this.uid,unique_id:t,note:e}};console.log(n),this.$axios(n).then((function(t){console.log(t)})).catch((function(t){console.log("Error getting documents: ",t)}))}}},d=u,h=n("2877"),f=n("6544"),m=n.n(f),p=n("b0af"),g=n("62ad"),v=n("a523"),y=n("cd55"),_=n("49e2"),w=n("c865"),b=n("0393"),k=n("0e8f"),x=n("a722"),N=n("0fd9"),C=n("71a3"),E=n("c671"),L=n("fe57"),O=n("8654"),T=Object(h["a"])(d,a,o,!1,null,null,null);e["default"]=T.exports;m()(T,{VCard:p["a"],VCol:g["a"],VContainer:v["a"],VExpansionPanel:y["a"],VExpansionPanelContent:_["a"],VExpansionPanelHeader:w["a"],VExpansionPanels:b["a"],VFlex:k["a"],VLayout:x["a"],VRow:N["a"],VTab:C["a"],VTabItem:E["a"],VTabs:L["a"],VTextField:O["a"]})}}]);
//# sourceMappingURL=calllogs.35c2937f.js.map