(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pricing_plan"],{"2dda":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{staticClass:"grey lighten-3"},[n("div",{staticClass:"grey lighten-3"},[n("v-container",{attrs:{fluid:""}},[n("v-row",{attrs:{justify:"center"}},[n("v-col",{attrs:{sm:"12",md:"4"}},[n("v-card",{staticClass:"mx-auto"},[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"12"}},[n("div",{staticClass:"mt-3 ml-3"},[n("v-app-bar",{attrs:{color:"white",flat:""}},[n("img",{staticClass:"mt-2 ml-2",attrs:{src:a("f09f"),height:"35"}}),n("v-spacer"),n("v-btn",{attrs:{icon:""}},[n("v-icon",{attrs:{color:"red"}},[t._v("mdi-chat-outline")])],1),n("label",{staticClass:"red--text"},[t._v("support")])],1)],1),n("div",[n("div",{staticClass:"ml-4 mr-4"},[n("h3",{staticClass:"mt-6 ml-5 text-center"},[t._v("Pricing Plan")])]),n("div",{staticClass:"mt-3 text-center"},[n("v-tabs",{attrs:{"center-active":""}},[n("v-tab",{attrs:{href:"#one"}},[n("h3",{staticClass:"mt-3 mb-2 ml-5 text-center"},[t._v("Monthly Plan")])]),n("v-tab-item",{key:"one",attrs:{id:"one"}},[n("v-card",{staticClass:"mx-auto",attrs:{"max-width":"300",tile:"",flat:""}},[n("h1",{staticClass:"green--text"},[n("span",{staticClass:"mr-1 green--text"},[t._v("₹")]),t._v("500 per month")]),t._l(t.items,(function(e,a){return n("v-list-item",{key:a},[n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(e.text)}})],1)],1)}))],2)],1),n("v-tab",{attrs:{href:"#two"}},[n("h3",{staticClass:"mt-3 mb-2 ml-5 text-center"},[t._v("Yearly Plan")])]),n("v-tab-item",{key:"two",attrs:{id:"two"}},[n("v-card",{staticClass:"mx-auto",attrs:{"max-width":"300",tile:"",flat:""}},[n("h1",{staticClass:"green--text"},[n("span",{staticClass:"mr-1 green--text"},[t._v("₹")]),t._v("5000 per Year")]),t._l(t.items,(function(e,a){return n("v-list-item",{key:a},[n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(e.text)}})],1)],1)}))],2)],1)],1)],1),n("div",{staticClass:"ml-4 mr-4 mt-5 text-center"},[n("div",{staticClass:"text-center"},[n("v-btn",{staticClass:"mr-4 mb-6 mt-6 white--text text-center",attrs:{width:"40%",color:"light-green"},on:{click:function(e){return e.preventDefault(),t.nextPage()}}},[t._v(" Make Payment ")])],1)])]),n("div",{staticClass:"ml-9 mr-4 mb-8 mt-6"},[n("small",{staticClass:"font-weight-light"},[t._v("By proceeding, you agree to our our "),n("a",{staticClass:"text-blue",attrs:{href:"\n\t\t\t\t\t\t\t\t\thttps://www.tringpartner.com/terms",target:"_blank"}},[t._v("Terms & Conditions")]),t._v(", "),n("a",{staticClass:"text-blue",attrs:{href:"https://www.tringpartner.com/privacy",target:"_blank"}},[t._v("Privacy Policy. ")]),t._v(" & "),n("a",{staticClass:"text-blue",attrs:{href:"\n\t\t\t\t\t\t\t\t\thttps://www.tringpartner.com/terms#fup",target:"_blank"}},[t._v(" Fair Usage Policy. ")])])])])],1)],1)],1)],1)],1)],1)])},s=[],r=(a("fb6a"),a("159b"),a("2591")),i=a("56d7"),o={created:function(){var t=this;r["a"].auth().onAuthStateChanged((function(e){e&&(console.log("logged user details",e),t.uid=e.uid,t.phno=e.phoneNumber.slice(3),console.log("page pricing il user id",t.uid),console.log("page pricing il user number",t.phno),i["db"].collection("users").where("uid","==",t.uid).get().then((function(e){e.forEach((function(e){console.log(e.id," => ",e.data());var a=e.data();t.Udata=a,t.currentPage=t.Udata.currentPage,console.log(t.currentPage),"onboarding_listing"==t.currentPage?t.$router.push("/choose_no"):"onboarding_test_completed"==t.currentPage?t.$router.push("/test_number"):"onboarding_plan_details"==t.currentPage?t.$router.push("/pricing"):"onboarding_billing"==t.currentPage?t.$router.push("/billing"):("onboarding_success"==t.currentPage||"onboarding_dashboard"==t.currentPage)&&t.$router.push("/manageUsers")}))})).catch((function(t){console.log("Error getting documents: ",t)})),i["db"].collection("users").where("uid","==",t.uid).get().then((function(t){t.forEach((function(t){console.log(t.id," => ",t.data());var e=t.data();console.log(e.role)}))})).catch((function(t){console.log("Error getting documents: ",t)})))}))},data:function(){return{selectedItem:1,uid:"",phno:"",items:[{text:"1 Cloud Business Number"},{text:"1 User Login"},{text:"Unlimited Incoming Calls"},{text:"Automatic Calls Routing"},{text:"Unlimited Call Recording"},{text:"Unlimited Whatsapp Notifications"},{text:"Phone Email & chat Support"}]}},methods:{nextPage:function(){var t={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/user/stage",method:"POST",data:{uid:this.uid,phoneNumber:this.phno,currentPage:"onboarding_billing"}};console.log(t),this.$axios(t).then((function(t){console.log(t)})).catch((function(t){console.error(t)})),this.$router.push("/billing")}}},l=o,c=a("2877"),u=a("6544"),d=a.n(u),g=a("7496"),m=a("40dc"),h=a("8336"),p=a("b0af"),v=a("62ad"),b=a("a523"),f=a("132d"),C=a("da13"),_=a("5d23"),x=a("0fd9"),w=a("2fa4"),P=a("71a3"),y=a("c671"),V=a("fe57"),k=Object(c["a"])(l,n,s,!1,null,null,null);e["default"]=k.exports;d()(k,{VApp:g["a"],VAppBar:m["a"],VBtn:h["a"],VCard:p["a"],VCol:v["a"],VContainer:b["a"],VIcon:f["a"],VListItem:C["a"],VListItemContent:_["a"],VListItemTitle:_["b"],VRow:x["a"],VSpacer:w["a"],VTab:P["a"],VTabItem:y["a"],VTabs:V["a"]})}}]);
//# sourceMappingURL=pricing_plan.061a5889.js.map