(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pricing_plan"],{"2c64":function(t,e,i){},"2dda":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{staticClass:"grey lighten-3"},[a("div",{staticClass:"grey lighten-3"},[a("v-container",{attrs:{fluid:""}},[a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{sm:"12",md:"4"}},[a("v-card",{staticClass:"mx-auto"},[a("v-row",{attrs:{"no-gutters":""}},[a("v-col",{attrs:{cols:"12"}},[a("div",{staticClass:"mt-3 ml-3"},[a("v-app-bar",{attrs:{color:"white",flat:""}},[a("img",{staticClass:"mt-2 ml-2",attrs:{src:i("f09f"),height:"35"}}),a("v-spacer"),a("v-btn",{attrs:{icon:""}},[a("v-icon",{attrs:{color:"red"}},[t._v("mdi-chat-outline")])],1),a("label",{staticClass:"red--text"},[t._v("support")])],1)],1),a("div",[a("div",[a("div",{staticClass:"text-center"},[a("div",{staticClass:"mt-6"},[t._v("Your new Business Number is")]),a("h3",{staticClass:"mt-2 mb-3 red--text"},[t._v(" "+t._s(t.virtualNumber)+" ")]),a("v-divider")],1),a("div",[a("h3",{staticClass:"mt-5 mb-5 text-center"},[t._v("Choose Pricing Plan")])]),a("v-divider"),a("v-radio-group",{staticClass:"ml-16 mt-5 mr-16"},[a("div",{staticClass:"mb-4"},[a("v-radio",[a("span",{staticClass:"black--text ml-3",attrs:{slot:"label"},slot:"label"},[t._v("Try for 1 month @ just ₹ 500 "),a("h3",{staticClass:"mt-3 text-center"},[t._v(" ₹ 500 + GST")])])])],1),a("v-divider"),a("div",{staticClass:"mt-5 mb-5"},[a("v-radio",[a("span",{staticClass:"black--text ml-3",attrs:{slot:"label"},slot:"label"},[t._v("Pay for 6 months & Save 10% "),a("h3",{staticClass:"text-center green--text mt-3"},[a("span",{staticClass:"text-decoration-line-through text-center black--text"},[t._v(" ₹ 3000")]),t._v(" ₹2500 + GST")])])])],1),a("v-divider"),a("div",{staticClass:"mt-5 mb-5"},[a("v-radio",[a("span",{staticClass:"black--text ml-3",attrs:{slot:"label"},slot:"label"},[t._v("Pay for 6 months & Save 20% "),a("h3",{staticClass:"text-center green--text mt-3"},[a("span",{staticClass:"text-decoration-line-through text-center black--text"},[t._v(" ₹ 6000")]),t._v(" ₹5000 + GST")])])])],1),a("v-divider")],1)],1),a("div",{staticClass:"ml-4 mr-4 mt-5 text-center"},[a("div",{staticClass:"text-center"},[a("v-btn",{staticClass:"mr-4 mb-6 mt-6 white--text text-center",attrs:{"max-width":"",color:"blue"},on:{click:function(e){return e.preventDefault(),t.nextPage()}}},[t._v(" Make Payment ")])],1)])]),a("div",{staticClass:"ml-9 mr-4 mb-8 mt-6"},[a("small",{staticClass:"font-weight-light"},[t._v("By proceeding, you agree to our our "),a("a",{staticClass:"text-blue",attrs:{href:"\n\t\t\t\t\t\t\t\t\thttps://www.tringpartner.com/terms",target:"_blank"}},[t._v("Terms & Conditions")]),t._v(", "),a("a",{staticClass:"text-blue",attrs:{href:"https://www.tringpartner.com/privacy",target:"_blank"}},[t._v("Privacy Policy. ")]),t._v(" & "),a("a",{staticClass:"text-blue",attrs:{href:"\n\t\t\t\t\t\t\t\t\thttps://www.tringpartner.com/terms#fup",target:"_blank"}},[t._v(" Fair Usage Policy. ")])])])])],1)],1)],1)],1)],1)],1)])},s=[],n=(i("fb6a"),i("159b"),i("252b")),o=i("56d7"),r={created:function(){var t=this;n["a"].auth().onAuthStateChanged((function(e){e&&(console.log("logged user details",e),t.uid=e.uid,t.phno=e.phoneNumber.slice(3),console.log("page pricing il user id",t.uid),console.log("page pricing il user number",t.phno),o["db"].collection("users").where("uid","==",t.uid).get().then((function(e){e.forEach((function(e){console.log(e.id," => ",e.data());var i=e.data();t.Udata=i,t.currentPage=t.Udata.currentPage,console.log(t.currentPage),"onboarding_listing"==t.currentPage?t.$router.push("/choose_no"):"onboarding_plan_details"==t.currentPage?t.$router.push("/pricing"):"onboarding_billing"==t.currentPage?t.$router.push("/billing"):"onboarding_success"==t.currentPage?t.$router.push("/emailVerification"):"onboarding_dashboard"==t.currentPage&&t.$router.push("/downloadApp")}))})).catch((function(t){console.log("Error getting documents: ",t)})),o["db"].collection("users").where("uid","==",t.uid).get().then((function(e){e.forEach((function(e){console.log(e.id," => ",e.data());var i=e.data();t.virtualNumber=i.virtualNumber[0],console.log(i.virtualNumber)}))})).catch((function(t){console.log("Error getting documents: ",t)})))}))},data:function(){return{selectedItem:1,uid:"",phno:"",virtualNumber:"",items:[{text:"1 Cloud Business Number"},{text:"1 User Login"},{text:"Unlimited Incoming Calls"},{text:"Automatic Calls Routing"},{text:"Unlimited Call Recording"},{text:"Unlimited Whatsapp Notifications"},{text:"Phone Email & chat Support"}]}},methods:{nextPage:function(){var t={url:"https://asia-south1-tringpartner-v2.cloudfunctions.net/tpv2/user/stage",method:"POST",data:{uid:this.uid,phoneNumber:this.phno,currentPage:"onboarding_billing"}};console.log(t),this.$axios(t).then((function(t){console.log(t)})).catch((function(t){console.error(t)})),this.$router.push("/billing")}}},l=r,u=(i("a0e2"),i("2877")),c=i("6544"),d=i.n(c),h=i("7496"),p=i("40dc"),v=i("8336"),m=i("b0af"),f=i("62ad"),g=i("a523"),b=i("ce7e"),C=i("132d"),x=i("67b6"),_=i("43a6"),y=i("0fd9"),w=i("2fa4"),S=Object(u["a"])(l,a,s,!1,null,"1e713dda",null);e["default"]=S.exports;d()(S,{VApp:h["a"],VAppBar:p["a"],VBtn:v["a"],VCard:m["a"],VCol:f["a"],VContainer:g["a"],VDivider:b["a"],VIcon:C["a"],VRadio:x["a"],VRadioGroup:_["a"],VRow:y["a"],VSpacer:w["a"]})},"3d86":function(t,e,i){},"43a6":function(t,e,i){"use strict";var a=i("5530"),s=(i("a9e3"),i("ec29"),i("3d86"),i("c37a")),n=i("604c"),o=i("8547"),r=i("58df"),l=Object(r["a"])(o["a"],n["a"],s["a"]);e["a"]=l.extend({name:"v-radio-group",provide:function(){return{radioGroup:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},name:String,row:Boolean,value:null},computed:{classes:function(){return Object(a["a"])(Object(a["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row})}},methods:{genDefaultSlot:function(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{id:this.id,role:"radiogroup","aria-labelledby":this.computedId}},s["a"].options.methods.genDefaultSlot.call(this))},genInputSlot:function(){var t=s["a"].options.methods.genInputSlot.call(this);return delete t.data.on.click,t},genLabel:function(){var t=s["a"].options.methods.genLabel.call(this);return t?(t.data.attrs.id=this.computedId,delete t.data.attrs.for,t.tag="legend",t):null},onClick:n["a"].options.methods.onClick}})},5311:function(t,e,i){"use strict";var a=i("5607"),s=i("2b0e");e["a"]=s["a"].extend({name:"rippleable",directives:{ripple:a["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}})},"67b6":function(t,e,i){"use strict";var a=i("15fd"),s=i("5530"),n=(i("b0c0"),i("2c64"),i("ba87")),o=i("9d26"),r=i("c37a"),l=i("7e2b"),u=i("a9ad"),c=i("4e82"),d=i("5311"),h=i("7560"),p=i("fe09"),v=i("80d2"),m=i("58df"),f=i("d9f7"),g=Object(m["a"])(l["a"],u["a"],d["a"],Object(c["a"])("radioGroup"),h["a"]);e["a"]=g.extend().extend({name:"v-radio",inheritAttrs:!1,props:{disabled:Boolean,id:String,label:String,name:String,offIcon:{type:String,default:"$radioOff"},onIcon:{type:String,default:"$radioOn"},readonly:Boolean,value:{default:null}},data:function(){return{isFocused:!1}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused},this.themeClasses),this.groupClasses)},computedColor:function(){return p["a"].options.computed.computedColor.call(this)},computedIcon:function(){return this.isActive?this.onIcon:this.offIcon},computedId:function(){return r["a"].options.computed.computedId.call(this)},hasLabel:r["a"].options.computed.hasLabel,hasState:function(){return(this.radioGroup||{}).hasState},isDisabled:function(){return this.disabled||!!this.radioGroup&&this.radioGroup.isDisabled},isReadonly:function(){return this.readonly||!!this.radioGroup&&this.radioGroup.isReadonly},computedName:function(){return this.name||!this.radioGroup?this.name:this.radioGroup.name||"radio-".concat(this.radioGroup._uid)},rippleState:function(){return p["a"].options.computed.rippleState.call(this)},validationState:function(){return(this.radioGroup||{}).validationState||this.computedColor}},methods:{genInput:function(t){return p["a"].options.methods.genInput.call(this,"radio",t)},genLabel:function(){return this.hasLabel?this.$createElement(n["a"],{on:{click:p["b"]},attrs:{for:this.computedId},props:{color:this.validationState,focused:this.hasState}},Object(v["r"])(this,"label")||this.label):null},genRadio:function(){var t=this.attrs$,e=(t.title,Object(a["a"])(t,["title"]));return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(o["a"],this.setTextColor(this.validationState,{props:{dense:this.radioGroup&&this.radioGroup.dense}}),this.computedIcon),this.genInput(Object(s["a"])({name:this.computedName,value:this.value},e)),this.genRipple(this.setTextColor(this.rippleState))])},onFocus:function(t){this.isFocused=!0,this.$emit("focus",t)},onBlur:function(t){this.isFocused=!1,this.$emit("blur",t)},onChange:function(){this.isDisabled||this.isReadonly||this.isActive||this.toggle()},onKeydown:function(){}},render:function(t){var e={staticClass:"v-radio",class:this.classes,on:Object(f["c"])({click:this.onChange},this.listeners$),attrs:{title:this.attrs$.title}};return t("div",e,[this.genRadio(),this.genLabel()])}})},8547:function(t,e,i){"use strict";var a=i("2b0e"),s=i("80d2");e["a"]=a["a"].extend({name:"comparable",props:{valueComparator:{type:Function,default:s["i"]}}})},"8ce9":function(t,e,i){},a0e2:function(t,e,i){"use strict";i("e308")},ce7e:function(t,e,i){"use strict";var a=i("5530"),s=(i("8ce9"),i("7560"));e["a"]=s["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:Object(a["a"])({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:Object(a["a"])({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})},e308:function(t,e,i){},ec29:function(t,e,i){},fe09:function(t,e,i){"use strict";i.d(e,"b",(function(){return r}));i("d3b7"),i("25f0"),i("4de4");var a=i("c37a"),s=i("5311"),n=i("8547"),o=i("58df");function r(t){t.preventDefault()}e["a"]=Object(o["a"])(a["a"],s["a"],n["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=a["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:r},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:r},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var a=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===a&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})}}]);
//# sourceMappingURL=pricing_plan.32cad6a0.js.map