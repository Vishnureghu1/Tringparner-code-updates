(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["test_number"],{"378a":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",{staticClass:"grey lighten-3"},[r("div",{staticClass:"grey lighten-3"},[r("v-container",{attrs:{fluid:""}},[r("v-row",{attrs:{justify:"center"}},[r("v-col",{attrs:{sm:"12",md:"4"}},[r("v-card",{staticClass:"mx-auto"},[r("v-row",{attrs:{"no-gutters":""}},[r("v-col",{attrs:{cols:"12"}},[r("div",{staticClass:"mt-3 ml-3"},[r("v-app-bar",{attrs:{color:"white",flat:""}},[r("img",{staticClass:"mt-2 ml-2",attrs:{src:a("f09f"),height:"35"}}),r("v-spacer"),r("v-btn",{attrs:{icon:""}},[r("v-icon",{attrs:{color:"red"}},[t._v("mdi-chat-outline")])],1),r("label",{staticClass:"red--text"},[t._v("support")])],1)],1),r("div",[r("div",{staticClass:"ml-4 mr-4"},[r("h3",{staticClass:"mt-6 ml-5 text-center"},[t._v("Email Verification")])]),r("v-form",{ref:"form",staticClass:"mt-3 ml-8 mr-4",attrs:{"lazy-validation":""},on:{submit:function(t){t.preventDefault()}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[r("v-row",[t.getOtp?r("v-col",[r("v-text-field",{attrs:{label:"Your Name",rules:t.nameRules,required:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),r("v-text-field",{attrs:{rules:t.emailRules,label:"Business E-mail",required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),r("v-text-field",{attrs:{label:"Source","append-icon":"mdi-pencil",hint:"For Example : Facebook, Linkedin etc","persistent-hint":""},model:{value:t.source,callback:function(e){t.source=e},expression:"source"}}),r("div",{staticClass:"text-center"},[r("v-btn",{staticClass:"mr-4 mb-6 mt-6 white--text text-center",attrs:{type:"submit",width:"40%",color:"light-green"},on:{click:function(e){return e.preventDefault(),t.requestOtp()}}},[t._v(" Request Otp ")])],1)],1):r("v-col",[r("v-text-field",{attrs:{label:"Enter otp",required:""},model:{value:t.otp,callback:function(e){t.otp=e},expression:"otp"}}),r("div",{staticClass:"text-center"},[r("v-btn",{staticClass:"mr-4 mb-6 mt-6 white--text text-center",attrs:{type:"submit",width:"40%",color:"light-green"},on:{click:function(e){return e.preventDefault(),t.checkOtp()}}},[t._v(" Confirm Otp ")])],1)],1)],1)],1)],1),r("div",{staticClass:"ml-9 mr-4 mb-8"},[r("small",{staticClass:"font-weight-light"},[t._v("By proceeding, you agree to our our "),r("a",{staticClass:"text-blue",attrs:{href:"\n\t\t\t\t\t\t\t\t\t\t\thttps://www.tringpartner.com/terms",target:"_blank"}},[t._v("Terms & Conditions")]),t._v(", "),r("a",{staticClass:"text-blue",attrs:{href:"https://www.tringpartner.com/privacy",target:"_blank"}},[t._v("Privacy Policy. ")]),t._v(" & "),r("a",{staticClass:"text-blue",attrs:{href:"\n\t\t\t\t\t\t\t\t\t\t\thttps://www.tringpartner.com/terms#fup",target:"_blank"}},[t._v(" Fair Usage Policy. ")])])])])],1)],1)],1)],1)],1)],1)])},n=[],i=(a("fb6a"),a("159b"),a("b0c0"),a("252b")),o=(a("fb5f"),a("56d7")),s={created:function(){var t=this;i["a"].auth().onAuthStateChanged((function(e){e&&(console.log("logged user details",e),t.uid=e.uid,t.phno=e.phoneNumber.slice(3),console.log("billing il user id",t.uid),console.log("billing il user number",t.phno),o["db"].collection("users").where("uid","==",t.uid).get().then((function(e){e.forEach((function(e){console.log(e.id," => ",e.data());var a=e.data();t.Udata=a,t.currentPage=t.Udata.currentPage,t.name=t.Udata.FirstName,t.email=t.Udata.Email,t.virtualnumber=t.Udata.virtualNumber[0],console.log(t.virtualnumber),"onboarding_listing"==t.currentPage?t.$router.push("/choose_no"):"onboarding_test_completed"==t.currentPage?t.$router.push("/test_number"):"onboarding_plan_details"==t.currentPage?t.$router.push("/pricing"):"onboarding_billing"==t.currentPage?t.$router.push("/billing"):"onboarding_success"==t.currentPage?t.$router.push("/emailVerification"):"onboarding_dashboard"==t.currentPage&&t.$router.push("/downloadApp")}))})).catch((function(t){console.log("Error getting documents: ",t)})))}))},data:function(){return{phno:"",name:"",email:"",virtualnumber:"",source:"General",getOtp:!0,otp:"",emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(t)||"E-mail must be valid"}],nameRules:[function(t){return!!t||"Your Name is required"},function(t){return t&&t.length<50||"Too many characters.Please try again !!"},function(t){return/^[a-zA-Z][a-zA-Z ]+$/.test(t)||"Name should not contain symbols or digits. Please try again."}]}},methods:{requestOtp:function(){var t=this,e={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/email/otp",method:"POST",data:{uid:this.uid,email:this.email,source:this.source}};console.log(e),this.$axios(e).then((function(e){console.log(e),t.getOtp=!1})).catch((function(t){console.error(t)}))},checkOtp:function(){var t=this,e={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/email/verification",method:"POST",data:{uid:this.uid,email:this.email,otp:this.otp}};console.log(e),this.$axios(e).then((function(e){console.log(e);var a={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/user/stage",method:"POST",data:{uid:t.uid,phoneNumber:t.phno,currentPage:"onboarding_dashboard"}};console.log(a),t.$axios(a).then((function(t){console.log(t)})).catch((function(t){console.error(t)})),t.$router.push("/downloadApp")})).catch((function(t){console.error(t)}))}}},l=s,c=a("2877"),u=a("6544"),d=a.n(u),m=a("7496"),p=a("40dc"),h=a("8336"),g=a("b0af"),v=a("62ad"),f=a("a523"),b=a("4bd4"),_=a("132d"),w=a("0fd9"),x=a("2fa4"),C=a("8654"),P=Object(c["a"])(l,r,n,!1,null,null,null);e["default"]=P.exports;d()(P,{VApp:m["a"],VAppBar:p["a"],VBtn:h["a"],VCard:g["a"],VCol:v["a"],VContainer:f["a"],VForm:b["a"],VIcon:_["a"],VRow:w["a"],VSpacer:x["a"],VTextField:C["a"]})}}]);
//# sourceMappingURL=test_number.35110444.js.map