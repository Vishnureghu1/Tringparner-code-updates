(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["addons"],{"7e58":function(e,t,o){},8224:function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-app",[o("div",[o("v-container",{attrs:{fluid:""}},[o("v-layout",{attrs:{"align-center":"","justify-center":""}},[o("v-flex",{attrs:{xs12:"",sm12:"",md10:""}},[o("v-card",{staticClass:"mx-auto"},[o("v-row",{attrs:{"no-gutters":""}},[o("v-col",{attrs:{cols:"12"}},[o("div"),e.main?o("div",{staticClass:"text-center"},[o("div",{staticClass:"ml-4 mr-4"},[o("h3",{staticClass:"mt-6 ml-5 mb-5 text-center"},[e._v("Addons")])]),o("v-btn",{staticClass:"mr-4 white--text mb-3",attrs:{color:"light-blue darken-1"},on:{click:function(t){return e.prorate_U(1)}}},[e._v(" Add User @ "+e._s(e.user_amount))]),o("v-btn",{staticClass:"mr-4 mb-3 white--text",attrs:{color:"light-blue darken-1\n\t\t\t\t\t\t\t\t\t"},on:{click:function(t){return e.prorate_BN(1)}}},[e._v(" Add Virtual Number @ "+e._s(e.number_amount))]),o("h4",{staticClass:"mt-6 ml-3 text-left"},[e._v("Active Addon Plans")]),e.showAddonDetails?o("p",{staticClass:"text-left mt-2 ml-3"},[e._v(" No Active addons ")]):e._e(),e._l(e.addon_array,(function(t){return o("div",{key:t.text},[o("p",{staticClass:"mt-2 ml-3 text-left"},[e._v(" Plan : "+e._s(t.type))]),"BUSINESS_NUMBER"==t.type?o("p",{staticClass:"mt-2 ml-3 text-left"},[e._v(" Virtual Number : "+e._s(t.virtual_number))]):e._e(),o("p",{staticClass:"mt-1 ml-3 text-left"},[e._v(" Purchase Date : "+e._s(t.date))]),"BUSINESS_NUMBER"==t.type?o("v-btn",{staticClass:"mb-2",attrs:{text:"",color:"red"},on:{click:function(o){return o.preventDefault(),e.delete_addons(t.type,t.virtual_number)}}},[e._v(" Remove Addon ")]):o("v-btn",{staticClass:"mb-2",attrs:{text:"",color:"red"},on:{click:function(o){return o.preventDefault(),e.delete_addons(t.type)}}},[e._v(" Remove Addon ")]),o("v-divider")],1)}))],2):e._e(),o("v-dialog",{attrs:{persistent:"","max-width":"400px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[o("v-card",[o("v-card-title",[o("h4",{staticClass:"font-weight-bold"},[e._v("Prorate breakdown")])]),o("v-card-body",[o("h4",{staticClass:"mb-3 mt-3 text-center"},[e._v("Remining days to next recharge "+e._s(e.remaining)+" day(s)")]),o("h4",{staticClass:"text-center mb-3"},[e._v("Payable amount Rs "+e._s(e.amount))])]),o("v-card-actions",[o("v-btn",{attrs:{color:"red",text:""},on:{click:function(t){e.dialog=!1}}},[e._v(" Cancel ")]),"user"==e.show?o("v-btn",{attrs:{color:"green",text:""},on:{click:function(t){return e.processed_to_buy()}}},[e._v(" Processed to Buy ")]):e._e(),"number"==e.show?o("v-btn",{attrs:{color:"green",text:""},on:{click:function(t){return e.processed_to_buy()}}},[e._v(" Show Numbers ")]):e._e()],1)],1)],1),e.showNumbers?o("div",[o("h4",{staticClass:"mt-6 text-center"},[e._v("Choose your business number")]),o("p",{staticClass:"mt-6 text-center"},[e._v("Time Remaining : "+e._s(Math.floor(e.timerCount/60))+" mins "+e._s(e.timerCount%60)+" sec")]),o("div",{staticClass:"ml-5 mr-5"},[o("v-progress-linear",{attrs:{color:"deep-orange",height:"14",value:e.value,striped:""}})],1),o("v-btn-toggle",{model:{value:e.toggle_none,callback:function(t){e.toggle_none=t},expression:"toggle_none"}},[o("div",{staticClass:"ml-3 mt-5 text-center"},e._l(e.V_numbers,(function(t){return o("v-btn",{key:t,staticClass:"ml-1 mr-4 mb-5 red--text",attrs:{outlined:"",color:"white",width:"44%"}},[e._v(e._s(t))])})),1)]),o("div",{staticClass:"text-center"},[null!=e.toggle_none?o("v-btn",{staticClass:"mr-4 mb-6 white--text text-center",attrs:{width:"40%",color:"light-blue darken-1"},on:{click:function(t){return t.preventDefault(),e.reserveNumber()}}},[e._v(" Next ")]):e._e()],1)],1):e._e(),e.showReserved?o("div",[o("h4",{staticClass:"mt-6 text-center"},[e._v("Selected business number")]),o("p",{staticClass:"mt-6 text-center"},[e._v(" "+e._s(e.reservedNumber))]),o("p",{staticClass:"mt-6 text-center"},[e._v("This number is Valid for the next 24 hrs.")]),o("div",{staticClass:"text-center"},[o("v-btn",{staticClass:"mr-4 mb-6 white--text text-center",attrs:{width:"40%",color:"light-blue darken-1"},on:{click:function(t){return t.preventDefault(),e.makePayment()}}},[e._v(" Buy ")])],1)]):e._e()],1)],1)],1)],1)],1)],1)],1)])},a=[],s=o("ade3"),r=(o("fb6a"),o("159b"),o("b0c0"),o("b680"),o("252b")),i=o("56d7"),l=o("c1df"),c=o.n(l),d={created:function(){var e=this;r["a"].auth().onAuthStateChanged((function(t){t&&(console.log("logged user details",t),e.uid=t.uid,e.phno=t.phoneNumber.slice(3),i["db"].collection("users").where("uid","==",e.uid).get().then((function(t){t.forEach((function(t){console.log(t.id," => ",t.data());var o=t.data();e.virtual_number=o.virtualNumber,e.name=o.FirstName,e.state=o.State,e.gst=o.Gstin,e.email=o.Email,e.planId=o.PlanId,e.lastRecharge=o.LastRecharge,e.renewalDay=o.RenewalDay,console.log(o.role)}))})).catch((function(e){console.log("Error getting documents: ",e)})),i["db"].collection("UserAddonDetails").where("Uid","==",e.uid).orderBy("PurchaseDate","desc").onSnapshot((function(t){e.addon_array=[],t.empty?e.showAddonDetails=!0:t.forEach((function(t){console.log(t.id," => ",t.data());var o=t.data(),n=c.a.unix(o.PurchaseDate).format("DD/MM hh:mm a"),a=Object.assign({},e.details,{date:n,uid:o.Uid,type:o.Type,virtual_number:o.VirtualNumber});e.showAddonDetails=!1,e.addon_array.push(a)}))})),e.prorate_U(0),e.prorate_BN(0))}))},data:function(){var e;return e={uid:"",phno:"",email:"",gstin:"",state:"",main:!0,addon_array:[],showNumbers:!1,timerCount:180,value:100,V_numbers:[],listingId:"",toggle_none:null,overlay:!0,remaining:"",amount:"",dialog:!1,bm:!1,u:!1},Object(s["a"])(e,"listingId",""),Object(s["a"])(e,"showReserved",!1),Object(s["a"])(e,"show",""),Object(s["a"])(e,"reservedNumber",""),Object(s["a"])(e,"showAddonDetails",!1),Object(s["a"])(e,"number_amount",""),Object(s["a"])(e,"user_amount",""),Object(s["a"])(e,"planId",""),Object(s["a"])(e,"lastRecharge",""),Object(s["a"])(e,"renewalDay",""),e},methods:{delete_addons:function(e,t){if(confirm("Do you want to delete this addon. Click Ok to confirm"))if(console.log("type ",e),console.log("virtual_number",t),"USER"==e){var o=localStorage.getItem("token"),n={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/addon/delete",method:"POST",data:{owner_uid:this.uid,update_by:this.uid,type:e},headers:{token:o,"Content-Type":"application/json"}};console.log(n),this.$axios(n).then((function(e){console.log(e),alert(e.data.message)})).catch((function(e){console.error(e)}))}else if("BUSINESS_NUMBER"==e){o=localStorage.getItem("token");var a={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/addon/delete",method:"POST",data:{owner_uid:this.uid,update_by:this.uid,type:e,virtual_number:t},headers:{token:o,"Content-Type":"application/json"}};console.log(a),this.$axios(a).then((function(e){console.log(e),alert(e.data.message)})).catch((function(e){console.error(e)}))}},prorate_U:function(e){var t=this;this.u=!0,this.bm=!1;var o=localStorage.getItem("token"),n={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/addon/prorate",method:"POST",data:{owner_uid:this.uid,type:"USER"},headers:{token:o,"Content-Type":"application/json"}};console.log(n),this.$axios(n).then((function(o){console.log(o),e&&(t.show="user",t.dialog=!0,t.remaining=o.data.reminingdays),t.planId,t.amount=o.data.amount,t.user_amount=t.amount.toFixed(2)})).catch((function(e){console.error(e)}))},prorate_BN:function(e){var t=this;this.u=!1,this.bm=!0;var o=localStorage.getItem("token"),n={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/addon/prorate",method:"POST",headers:{token:o,"Content-Type":"application/json"},data:{owner_uid:this.uid,type:"BUSINESS_NUMBER"}};console.log(n),this.$axios(n).then((function(o){console.log(o),e&&(t.show="number",t.dialog=!0,t.remaining=o.data.reminingdays),t.planId,t.amount=o.data.amount,t.number_amount=t.amount.toFixed(2)})).catch((function(e){console.error(e)}))},processed_to_buy:function(){var e=this;this.u?(this.dialog=!1,this.add_user()):this.bm&&i["db"].collection("uservirtualNumber").where("Uid","==",this.uid).where("IsPurchased","==",!1).get().then((function(t){t.empty?(console.log("empty"),e.dialog=!1,e.add_virtual()):t.forEach((function(t){console.log(t.id," => ",t.data());var o=t.data();e.reservedNumber=o.VirtualNumber,e.dialog=!1,e.main=!1,e.showNumbers=!1,e.showReserved=!0}))})).catch((function(e){console.log("Error getting documents: ",e)}))},add_user:function(){var e=this,t=localStorage.getItem("token"),o={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/addon/payment",method:"POST",headers:{token:t,"Content-Type":"application/json"},data:{owner_uid:this.uid,type:"USER"}};console.log(o),this.$axios(o).then((function(t){console.log(t),console.log("order_id",t),console.log(t.data.order_id),e.order_id=t.data.order_id;var o={key:"rzp_test_ThdwdEPh3QCHbo",order_id:e.order_id,name:e.name,currency:"INR",description:"Purchase Description",handler:function(e){console.log(e),alert("User add successfully. You can configure new user in manage users.")},modal:{ondismiss:function(){e.showNumbers=!1,e.showReserved=!1,e.main=!0,alert("payment cancelled"),console.log("Checkout form closed")}},prefill:{name:e.name,email:e.email,contact:e.phno},notes:{address:e.address},theme:{color:"#3399cc"}};console.log(o);var n=new Razorpay(o);n.on("payment.failed",(function(e){alert("payment failed"),this.showNumbers=!1,this.showReserved=!1,this.main=!0})),n.open()})).catch((function(e){console.error(e)}))},add_virtual:function(){var e=this;this.showNumbers=!0,this.main=!1;var t={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/virtualNumber/list",method:"POST",data:{uid:this.uid,phoneNumber:this.phno}};console.log(t),this.$axios(t).then((function(t){e.overlay=!1,e.V_numbers=t.data.numbers,e.timerCount=t.data.Seconds,e.listingId=t.data.listing_id,e.value=100-.55*(180-e.timerCount),console.log(e.value),console.log(t),console.log(t.data.numbers),console.log(t.data.Seconds),e.progressbarTimer(e.value),0===e.V_numbers.length&&(alert("Numbers not available , please try later!!"),e.overlay=!0,e.value=0,e.timerCount=0,e.showNumbers=!1,e.showReserved=!1,e.main=!0)})).catch((function(e){console.error(e)}))},makePayment:function(){var e=this,t=localStorage.getItem("token"),o={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/addon/payment",method:"POST",headers:{token:t,"Content-Type":"application/json"},data:{owner_uid:this.uid,type:"BUSINESS_NUMBER"}};console.log(o),this.$axios(o).then((function(t){console.log(t),console.log("order_id",t),console.log(t.data.order_id),e.order_id=t.data.order_id;var o={key:"rzp_test_ThdwdEPh3QCHbo",order_id:e.order_id,name:e.name,currency:"INR",description:"Purchase Description",handler:function(t){console.log(t),e.showNumbers=!1,e.showReserved=!1,e.main=!0,alert("Virtual Number Added. You can configure routing for this number in Call Distribution")},modal:{ondismiss:function(){e.showNumbers=!1,e.showReserved=!1,e.main=!0,alert("payment cancelled"),console.log("Checkout form closed")}},prefill:{name:e.name,email:e.email,contact:e.phno},notes:{address:e.address},theme:{color:"#3399cc"}};console.log(o);var n=new Razorpay(o);n.on("payment.failed",(function(e){alert("payment failed"),this.showNumbers=!1,this.showReserved=!1,this.main=!0})),n.open()})).catch((function(e){console.error(e)}))},reserveNumber:function(){var e=this,t=localStorage.getItem("token"),o=this.V_numbers[this.toggle_none];console.log(o);var n={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/addon/reservenumber",method:"POST",data:{uid:this.uid,phoneNumber:this.phno,virtualNumber:o,listingId:this.listingId},headers:{token:t,"Content-Type":"application/json"}};console.log(n),this.$axios(n).then((function(e){console.log(e)})).catch((function(e){console.error(e)}));t=localStorage.getItem("token");var a={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/addon/payment",method:"POST",headers:{token:t,"Content-Type":"application/json"},data:{owner_uid:this.uid,type:"BUSINESS_NUMBER"}};console.log(a),this.$axios(a).then((function(t){console.log(t),console.log("order_id",t),console.log(t.data.order_id),e.order_id=t.data.order_id;var o={key:"rzp_test_ThdwdEPh3QCHbo",order_id:e.order_id,name:e.name,currency:"INR",description:"Purchase Description",handler:function(t){console.log(t),e.showNumbers=!1,e.main=!0,alert("Virtual Number Added. You can configure routing for this number in Call Distribution")},modal:{ondismiss:function(){e.showNumbers=!1,e.showReserved=!1,e.main=!0,alert("payment cancelled"),console.log("Checkout form closed")}},prefill:{name:e.name,email:e.email,contact:e.phno},notes:{address:e.address},theme:{color:"#3399cc"}};console.log(o);var n=new Razorpay(o);n.on("payment.failed",(function(e){alert("payment failed"),this.showNumbers=!1,this.showReserved=!1,this.main=!0})),n.open()})).catch((function(e){console.error(e)}))},progressbarTimer:function(e){var t=this;if(e>0)var o=setInterval((function(){t.value>0?(t.value=t.value-.55,t.timerCount--):(t.value=0,t.timerCount=0)}),1e3);else clearInterval(o),this.value=0,this.timerCount=0}}},u=d,h=o("2877"),m=o("6544"),v=o.n(m),g=o("7496"),p=o("8336"),b=o("a609"),f=o("b0af"),_=o("99d9"),y=o("62ad"),w=o("a523"),C=o("169a"),x=o("ce7e"),N=o("0e8f"),k=o("a722"),S=o("8e36"),R=o("0fd9"),I=Object(h["a"])(u,n,a,!1,null,null,null);t["default"]=I.exports;v()(I,{VApp:g["a"],VBtn:p["a"],VBtnToggle:b["a"],VCard:f["a"],VCardActions:_["a"],VCardTitle:_["c"],VCol:y["a"],VContainer:w["a"],VDialog:C["a"],VDivider:x["a"],VFlex:N["a"],VLayout:k["a"],VProgressLinear:S["a"],VRow:R["a"]})},"8ce9":function(e,t,o){},a609:function(e,t,o){"use strict";var n=o("5530"),a=(o("7e58"),o("604c")),s=a["a"].extend({name:"button-group",provide:function(){return{btnToggle:this}},computed:{classes:function(){return a["a"].options.computed.classes.call(this)}},methods:{genData:a["a"].options.methods.genData}}),r=o("a9ad"),i=o("58df");t["a"]=Object(i["a"])(s,r["a"]).extend({name:"v-btn-toggle",props:{backgroundColor:String,borderless:Boolean,dense:Boolean,group:Boolean,rounded:Boolean,shaped:Boolean,tile:Boolean},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},s.options.computed.classes.call(this)),{},{"v-btn-toggle":!0,"v-btn-toggle--borderless":this.borderless,"v-btn-toggle--dense":this.dense,"v-btn-toggle--group":this.group,"v-btn-toggle--rounded":this.rounded,"v-btn-toggle--shaped":this.shaped,"v-btn-toggle--tile":this.tile},this.themeClasses)}},methods:{genData:function(){var e=this.setTextColor(this.color,Object(n["a"])({},s.options.methods.genData.call(this)));return this.group?e:this.setBackgroundColor(this.backgroundColor,e)}}})},a722:function(e,t,o){"use strict";o("20f6");var n=o("e8f2");t["a"]=Object(n["a"])("layout")},ce7e:function(e,t,o){"use strict";var n=o("5530"),a=(o("8ce9"),o("7560"));t["a"]=a["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(e){var t;return this.$attrs.role&&"separator"!==this.$attrs.role||(t=this.vertical?"vertical":"horizontal"),e("hr",{class:Object(n["a"])({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:Object(n["a"])({role:"separator","aria-orientation":t},this.$attrs),on:this.$listeners})}})}}]);
//# sourceMappingURL=addons.447d18ea.js.map