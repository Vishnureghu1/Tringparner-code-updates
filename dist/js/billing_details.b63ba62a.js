(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["billing_details"],{"25bb":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",[a("v-card",{staticClass:"mx-auto overflow-hidden",attrs:{width:"800",height:"800"}},[a("v-app-bar",{attrs:{color:"light blue",dark:"",prominent:"",height:"75"}},[a("v-app-bar-nav-icon",{staticClass:"mt-2 hidden-md-and-up",on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),a("v-toolbar-title",{staticClass:"mt-3 ml-2"},[t._v("Tring Partner")]),a("v-spacer"),a("v-btn",{attrs:{icon:""}},[a("v-icon",{staticClass:"mt-3"},[t._v("mdi-chat-outline")])],1),a("label",{staticClass:"white--text mt-3"},[t._v("support")])],1),a("v-navigation-drawer",{attrs:{absolute:"",left:"",permanent:t.$vuetify.breakpoint.mdAndUp},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-list",{attrs:{nav:"",dense:""}},[a("v-list-item-group",{attrs:{"active-class":"deep-purple--text text--accent-4"},model:{value:t.group,callback:function(e){t.group=e},expression:"group"}},t._l(t.links,(function(e){return a("v-list-item",{key:e.text,attrs:{router:"",to:e.route}},[a("v-list-item-title",[t._v(" "+t._s(e.text))])],1)})),1)],1)],1),a("router-view")],1)],1)},n=[],r=(a("fb6a"),a("159b"),a("2591")),i=a("56d7"),o={created:function(){var t=this;r["a"].auth().onAuthStateChanged((function(e){e&&(console.log("logged user details",e),t.uid=e.uid,t.phno=e.phoneNumber.slice(3),console.log("page pricing il user id",t.uid),console.log("page pricing il user number",t.phno),i["db"].collection("users").where("uid","==",t.uid).get().then((function(t){t.forEach((function(t){console.log(t.id," => ",t.data())}))})).catch((function(t){console.log("Error getting documents: ",t)})))}))},data:function(){return{drawer:!1,group:null,links:[{icon:"dashboard",text:"Call Logs",route:"/call_logs"},{icon:"folder",text:"Analytics",route:"/analytics"},{icon:"person",text:"Manage User",route:"/manageUser"},{icon:"dashboard",text:"Greeting Message",route:"/greeting"},{icon:"dashboard",text:"Whatsapp",route:"/whatsapp"},{icon:"dashboard",text:"Billing",route:"/billing_details"},{icon:"dashboard",text:"Export",route:"/export"}]}},watch:{group:function(){this.drawer=!1}}},l=o,d=a("2877"),c=a("6544"),u=a.n(c),m=a("40dc"),h=a("5bc1"),v=a("8336"),p=a("b0af"),f=a("132d"),g=a("8860"),b=a("da13"),_=a("1baa"),y=a("5d23"),x=a("f774"),w=a("2fa4"),C=a("2a7f"),D=Object(d["a"])(l,s,n,!1,null,null,null);e["default"]=D.exports;u()(D,{VAppBar:m["a"],VAppBarNavIcon:h["a"],VBtn:v["a"],VCard:p["a"],VIcon:f["a"],VList:g["a"],VListItem:b["a"],VListItemGroup:_["a"],VListItemTitle:y["b"],VNavigationDrawer:x["a"],VSpacer:w["a"],VToolbarTitle:C["a"]})},"2a7f":function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));var s=a("71d9"),n=a("80d2");const r=Object(n["h"])("v-toolbar__title"),i=Object(n["h"])("v-toolbar__items");s["a"]},"8ce9":function(t,e,a){},a4b7:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"mx-auto overflow-hidden",attrs:{height:"800",width:"850"}},[a("v-app-bar",{attrs:{color:"deep-purple",dark:"",clipped:"",width:"850","align-center":""}},[a("v-app-bar-nav-icon",{on:{click:function(e){t.drawer=!0}}}),a("v-toolbar-title",[t._v("Title")])],1),a("v-navigation-drawer",{attrs:{absolute:"",permanent:"","clipped-left":""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-list",{attrs:{nav:"",dense:""}},[a("v-list-item-group",{attrs:{"active-class":"deep-purple--text text--accent-4"},model:{value:t.group,callback:function(e){t.group=e},expression:"group"}},[a("v-list-item",{on:{click:function(e){return t.calllogs()}}},[a("v-list-item-icon",[a("v-icon",[t._v("mdi-home")])],1),a("v-list-item-title",[t._v("Home")])],1),a("v-list-item",[a("v-list-item-icon",[a("v-icon",[t._v("mdi-account")])],1),a("v-list-item-title",[t._v("Account")])],1)],1)],1)],1)],1)},n=[],r={data:function(){return{drawer:!1,group:null}},methods:{calllogs:function(){}}},i=r,o=a("2877"),l=a("6544"),d=a.n(l),c=a("40dc"),u=a("5bc1"),m=a("b0af"),h=a("132d"),v=a("8860"),p=a("da13"),f=a("1baa"),g=a("34c3"),b=a("5d23"),_=a("f774"),y=a("2a7f"),x=Object(o["a"])(i,s,n,!1,null,null,null);e["default"]=x.exports;d()(x,{VAppBar:c["a"],VAppBarNavIcon:u["a"],VCard:m["a"],VIcon:h["a"],VList:v["a"],VListItem:p["a"],VListItemGroup:f["a"],VListItemIcon:g["a"],VListItemTitle:b["b"],VNavigationDrawer:_["a"],VToolbarTitle:y["a"]})},ce7e:function(t,e,a){"use strict";a("8ce9");var s=a("7560");e["a"]=s["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render(t){let e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:{"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical,...this.themeClasses},attrs:{role:"separator","aria-orientation":e,...this.$attrs},on:this.$listeners})}})},f2dc:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-container",{attrs:{fluid:""}},[a("v-layout",{attrs:{"align-center":"","justify-center":""}},[a("v-flex",{attrs:{xs12:"",sm8:"",md8:""}},[a("v-card",{staticClass:"mx-auto"},[a("v-row",{attrs:{"no-gutters":""}},[a("v-col",{attrs:{cols:"12"}},[a("div",[a("div",{staticClass:"ml-4 mr-4"},[a("h3",{staticClass:"mt-6 ml-5 text-center"},[t._v("Billing Overview")])])]),a("v-card",{staticClass:"ml-4 mr-4 mt-4"},[a("div",{staticClass:"ml-4 mr-4 mt-4 pt-4"},[a("v-card-text",[a("h3",{staticClass:"mb-4"},[t._v("Credit Information ")]),a("h4",[t._v(" Last recharge")]),a("h4",{staticClass:"font-weight-regular"},[t._v(" "+t._s(t.lastRecharge))]),a("h4",{staticClass:"font-weight-bold blue--text mt-4"},[t._v(" Next Bill Cycle ")]),a("h4",{staticClass:"font-weight-bold green--text mt-1"},[t._v(" "+t._s(t.lastDay)+" ")]),a("h4",{staticClass:"font-weight-bold blue--text mt-4"},[t._v(" Recharge on or before ")]),a("h4",{staticClass:"font-weight-bold green--text mt-1"},[t._v(" "+t._s(t.renewalDay)+" ")]),a("h4",{staticClass:"font-weight-bold black--text mt-2"},[t._v(" Total amount to Pay : Rs "+t._s(t.total_pay)+" ")]),a("h4",{staticClass:"font-weight-bold black--text mt-2"},[t._v(" Number of Virtual numbers added via addons : "+t._s(t.virtual_number_count)+" ")]),a("h4",{staticClass:"font-weight-bold black--text mt-2"},[t._v(" Number of Users added via addons : "+t._s(t.users_count)+" ")]),a("h4",{staticClass:"mt-6 ml-3 text-left"},[t._v("Active Addon Plans")]),t.showAddonDetails?a("p",{staticClass:"text-left mt-2 ml-3"},[t._v(" No Active addons ")]):t._e(),t._l(t.addon_array,(function(e){return a("div",{key:e.text},[a("p",{staticClass:"mt-2 ml-3 text-left"},[t._v(" Plan : "+t._s(e.type))]),"BUSINESS_NUMBER"==e.type?a("p",{staticClass:"mt-2 ml-3 text-left"},[t._v(" Virtual Number : "+t._s(e.virtual_number))]):t._e(),a("p",{staticClass:"mt-1 ml-3 text-left"},[t._v(" Purchase Date : "+t._s(e.date))]),a("v-btn",{staticClass:"mb-2",attrs:{text:"",color:"red"},on:{click:function(e){return e.preventDefault(),t.delete_addons()}}},[t._v(" Remove Addons ")]),a("v-divider")],1)})),a("v-btn",{staticClass:"mr-4 mt-6 white--text text-center",attrs:{rounded:"",color:"red"},on:{click:function(e){return e.preventDefault(),t.recharge()}}},[t._v(" + RECHARGE ")])],2)],1)]),a("v-card",{staticClass:"ml-4 mr-4 mt-4"},[a("div",{staticClass:"ml-4 mr-4 mt-4 pt-4"},[a("v-card-text",[a("h3",{staticClass:"mb-4"},[t._v("Billing Address ")]),a("v-form",{ref:"form",staticClass:"mt-3 ml-8 mr-4",attrs:{"lazy-validation":""},on:{submit:function(t){t.preventDefault()}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[a("v-checkbox",{attrs:{label:"Are you registered for GST"},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}}),a("v-row",[a("v-col",[t.selected?a("v-text-field",{attrs:{label:"GST Number",rules:t.gstRules},on:{keyup:t.uppercase},model:{value:t.gst,callback:function(e){t.gst=e},expression:"gst"}}):t._e(),t.selected?a("v-text-field",{attrs:{label:"Business Name",rules:t.businessNameRules,required:""},model:{value:t.businessName,callback:function(e){t.businessName=e},expression:"businessName"}}):t._e(),t.selected?a("v-text-field",{attrs:{rules:t.emailRules,label:"Business E-mail",required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}):t._e(),a("v-text-field",{attrs:{label:"Name",rules:t.nameRules,required:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),a("v-text-field",{attrs:{label:"Your Number",prefix:"+91",readonly:""},model:{value:t.phno,callback:function(e){t.phno=e},expression:"phno"}}),t.selected?t._e():a("v-text-field",{attrs:{rules:t.emailRules,label:"Your E-mail",required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),a("v-text-field",{attrs:{label:"Address",rules:t.addressRules,required:""},model:{value:t.address,callback:function(e){t.address=e},expression:"address"}}),a("v-text-field",{attrs:{label:"Pincode",rules:t.pincodeRules,required:""},on:{change:function(e){return t.searchPincode()}},model:{value:t.pincode,callback:function(e){t.pincode=e},expression:"pincode"}}),a("v-text-field",{attrs:{label:"City",required:""},model:{value:t.city,callback:function(e){t.city=e},expression:"city"}}),a("v-text-field",{attrs:{label:"State",required:""},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}}),a("v-btn",{staticClass:"mr-4 mb-6 mt-6 white--text text-center",attrs:{type:"submit",width:"40%",color:"light-blue"},on:{click:t.validate}},[t._v(" Update ")])],1)],1)],1)],1)],1)])],1)],1)],1)],1)],1)],1)],1)},n=[],r=(a("fb6a"),a("159b"),a("b0c0"),a("4de4"),a("2591")),i=a("56d7"),o=a("c1df"),l=a.n(o),d=a("fb5f"),c={created:function(){var t=this;r["a"].auth().onAuthStateChanged((function(e){if(e){console.log("logged user details",e),t.uid=e.uid,t.phno=e.phoneNumber.slice(3);var a={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/bill",method:"POST",data:{uid:t.uid}};console.log(a),t.$axios(a).then((function(e){console.log(e),t.virtual_number_count=e.data.number,t.users_count=e.data.user,t.total_pay=e.data.total_amount})).catch((function(t){console.error(t)})),i["db"].collection("users").where("uid","==",t.uid).get().then((function(e){e.forEach((function(e){console.log(e.id," => ",e.data());var a=e.data();t.Udata=a,t.name=t.Udata.FirstName,t.businessName=t.Udata.CompanyName,t.number=t.Udata.phoneNumber,t.email=t.Udata.Email,t.city=t.Udata.City,t.state=t.Udata.State,t.pincode=t.Udata.PinCode,t.address=t.Udata.Address,t.gst=t.Udata.Gstin,t.lastRecharge=t.Udata.LastRecharge,t.renewalDay=t.Udata.RenewalDay,t.lastDay=t.Udata.LastDay;var s=t.Udata.GSTAvailable;"N"==s&&(t.selected=!1),console.log(l()(t.lastRecharge).format("dddd MMMM Do YYYY")),t.lastRecharge=l()(t.lastRecharge).format("dddd MMMM Do YYYY"),t.renewalDay=l()(t.renewalDay).format("dddd MMMM Do YYYY"),t.lastDay=l()(t.lastDay).format("dddd MMMM Do YYYY"),console.log(t.lastDay);var n=1621326268528,r=new Date(n);console.log("hello",r.getTime()),console.log("hii",r),console.log(l()(r).format("MM/DD/YYYY hh:mm"))}))})).catch((function(t){console.log("Error getting documents: ",t)})),i["db"].collection("UserAddonDetails").where("Uid","==",t.uid).orderBy("PurchaseDate","desc").onSnapshot((function(e){t.addon_array=[],e.empty?t.showAddonDetails=!0:e.forEach((function(e){console.log(e.id," => ",e.data());var a=e.data(),s=l.a.unix(a.PurchaseDate).format("DD/MM hh:mm a"),n=Object.assign({},t.details,{date:s,uid:a.Uid,type:a.Type,virtual_number:a.VirtualNumber});t.showAddonDetails=!1,t.addon_array.push(n)}))}))}}))},data:function(){return{selected:!0,valid:!0,gst:"",phno:"",name:"",email:"",businessName:"",city:"",address:"",pincode:"",state:"",rzp:"",detail:{},Udata:[],realdata:[],addon_array:[],razorpay_order_id:"",razorpay_payment_id:"",razorpay_signature:"",lastRecharge:"",lastDay:"",renewalDay:"",pincodeDb:d,showAddonDetails:!1,virtual_number_count:"",users_count:"",total_pay:"",emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(t)||"E-mail must be valid"}],nameRules:[function(t){return!!t||"Your Name is required"},function(t){return t&&t.length<50||"Too many characters.Please try again !!"},function(t){return/^[a-zA-Z][a-zA-Z ]+$/.test(t)||"Name should not contain symbols or digits. Please try again."}],gstRules:[function(t){return!!t||"GST Number is required"},function(t){return t&&15==t.length||"GST must contain 15 characters"},function(t){return/^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[a-zA-Z][0-9a-zA-Z]{1}$/.test(t)||"GST must be valid"}],businessNameRules:[function(t){return!!t||"Your Business name is required"},function(t){return t&&t.length<100||"Too many characters.Please try again !!"},function(t){return/[a-zA-Z][a-zA-Z ]*/.test(t)||"Business Name should not contain symbols or digits. Please try again."}],addressRules:[function(t){return!!t||"Your Address is required"},function(t){return t&&t.length<100||"Too many characters.Please try again !!"}],pincodeRules:[function(t){return!!t||"Your Pincode is required"},function(t){return t&&6==t.length||"Pincode must contain 6 digits. Invalid Pincode !!"},function(t){return/^[0-9]*$/.test(t)||"Pincode must contain 6 digits"}]}},methods:{searchPincode:function(){var t=this;console.log(this.pincodeDb),console.log(this.pincode);var e=this.pincodeDb;console.log("before checking",this.pincodeInvalid);e.filter((function(e){e.id==t.pincode?(t.city=e.name.city,t.state=e.name.state,console.log(e.name.city),console.log(e.name.state),t.pincodeInvalid=!1,console.log("false",t.pincodeInvalid)):t.pincodeInvalid=!0}))},uppercase:function(){this.gst=this.gst.toUpperCase()},validate:function(){this.$refs.form.validate();var t=this.$refs.form.validate();t&&this.updateData()},delete_addons:function(){confirm("Do you want to delete this addon. Click Ok to confirm")&&alert("hii")},updateData:function(){var t=this,e={url:"",method:"POST",data:{uid:this.uid,phoneNumber:this.phno,virtual_number:"9731176095",FirstName:this.name,Email:this.email,Address:this.address,City:this.city,State:this.state,Gstin:this.gst,CompanyName:this.businessName,Pincode:this.pincode}};console.log(e),this.$axios(e).then((function(e){console.log("order_id",e),console.log(e.data.OrderId),t.order_id=e.data.OrderId})).catch((function(t){console.error(t)}))},recharge:function(){var t=this,e={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/user/owner",method:"POST",data:{uid:this.uid,phoneNumber:this.phno,virtual_number:"9731176095",FirstName:this.name,Email:this.email,Address:this.address,City:this.city,State:this.state,Gstin:this.gst,CompanyName:this.businessName,Pincode:this.pincode}};console.log(e),this.$axios(e).then((function(e){console.log("order_id",e),console.log(e.data.OrderId),t.order_id=e.data.OrderId;var a={key:"rzp_test_ThdwdEPh3QCHbo",order_id:t.order_id,name:t.name,currency:"INR",description:"Purchase Description",handler:function(e){console.log(e);var a={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/user/paymentVerification",method:"POST",data:{uid:t.uid,phoneNumber:t.phno,State:t.state,Gstin:t.gst,razorpay_order_id:e.razorpay_order_id,razorpay_payment_id:e.razorpay_payment_id,razorpay_signature:e.razorpay_signature}};console.log(a),t.$axios(a).then((function(e){console.log("confirm",e),i["db"].collection("users").where("uid","==",t.uid).get().then((function(e){e.forEach((function(e){console.log(e.id," => ",e.data());e.data();t.lastRecharge=t.Udata.LastRecharge,t.renewalDay=t.Udata.RenewalDay,t.lastDay=t.Udata.LastDay,console.log(l()(t.lastRecharge).format("dddd MMMM Do YYYY")),t.lastRecharge=l()(t.lastRecharge).format("dddd MMMM Do YYYY"),t.renewalDay=l()(t.renewalDay).format("dddd MMMM Do YYYY"),t.lastDay=l()(t.lastDay).format("dddd MMMM Do YYYY"),console.log(t.lastDay)}))})).catch((function(t){console.log("Error getting documents: ",t)}))})).catch((function(t){console.error(t)}))},prefill:{name:t.name,email:t.email,contact:t.phno},notes:{address:t.address},theme:{color:"#3399cc"}};console.log(a);var s=new Razorpay(a);s.open()})).catch((function(t){console.error(t)}))}}},u=c,m=a("2877"),h=a("6544"),v=a.n(h),p=a("8336"),f=a("b0af"),g=a("99d9"),b=a("ac7c"),_=a("62ad"),y=a("a523"),x=a("ce7e"),w=a("0e8f"),C=a("4bd4"),D=a("a722"),N=a("0fd9"),Y=a("8654"),k=Object(m["a"])(u,s,n,!1,null,null,null);e["default"]=k.exports;v()(k,{VBtn:p["a"],VCard:f["a"],VCardText:g["b"],VCheckbox:b["a"],VCol:_["a"],VContainer:y["a"],VDivider:x["a"],VFlex:w["a"],VForm:C["a"],VLayout:D["a"],VRow:N["a"],VTextField:Y["a"]})}}]);
//# sourceMappingURL=billing_details.b63ba62a.js.map