(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["greetings"],{1148:function(e,t,i){"use strict";var n=i("a691"),l=i("1d80");e.exports=function(e){var t=String(l(this)),i="",s=n(e);if(s<0||s==1/0)throw RangeError("Wrong number of repetitions");for(;s>0;(s>>>=1)&&(t+=t))1&s&&(i+=t);return i}},2677:function(e,t,i){"use strict";var n=i("8654");t["a"]=n["a"]},"3e23":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-app",[i("div",[i("v-container",{attrs:{fluid:""}},[i("v-layout",{attrs:{"align-center":"","justify-center":""}},[i("v-flex",{attrs:{xs12:"",sm12:"",md10:""}},[i("v-card",{staticClass:"mx-auto"},[i("v-row",{attrs:{"no-gutters":""}},[i("v-col",{attrs:{cols:"12"}},[i("div",{staticClass:"ml-4 mr-4"},[i("div",{staticClass:"ml-4 mr-4"},[i("h3",{staticClass:"mt-6 ml-5 mb-5 text-center"},[e._v("Greeting Message")])]),i("div",[i("p",[e._v("Upload Greeting message")]),i("v-select",{attrs:{items:e.virtual_number_list,label:"Virtual number",required:""},model:{value:e.virtual_number,callback:function(t){e.virtual_number=t},expression:"virtual_number"}}),e.showFileInput?i("v-file-input",{ref:"fileInput",attrs:{type:"file",accept:"audio/wav"},on:{change:e.getAudio}}):e._e()],1),e.showProgress?i("p",[e._v("Uploading : "+e._s(e.uploadValue.toFixed()+"%")+" "),i("v-progress-linear",{attrs:{color:"deep-orange",height:"14",max:"100",striped:""},model:{value:e.progressValue,callback:function(t){e.progressValue=t},expression:"progressValue"}})],1):e._e(),e.showFileInput?i("v-btn",{attrs:{color:"primary"},on:{click:function(t){return e.onUpload()}}},[e._v(" save ")]):e._e()],1),e.successfully_uploaded?i("vuetify-audio",{attrs:{file:e.file,color:"primary"}}):e._e(),i("v-row",{staticClass:"mt-3",attrs:{justify:"center"}},[e.successfully_uploaded?i("v-btn",{staticClass:"mt-3",attrs:{color:"red"},on:{click:function(t){return e.deleteAudio()}}},[e._v(" delete ")]):e._e()],1)],1)],1),i("br"),i("br")],1)],1)],1)],1)],1)])},l=[],s=(i("d3b7"),i("3ca3"),i("ddb0"),i("159b"),i("b680"),i("2591")),a=i("56d7"),r=(i("2e66"),{components:{VuetifyAudio:function(){return i.e("chunk-618352f8").then(i.bind(null,"59bd"))}},created:function(){var e=this;s["a"].auth().onAuthStateChanged((function(t){if(t){console.log("logged user details",t),e.uid=t.uid,console.log("page Managers il user id",e.uid),a["db"].collection("users").where("uid","==",e.uid).get().then((function(t){t.forEach((function(t){console.log(t.id," => ",t.data());var i=t.data();e.ownerid=i.OwnerUid,e.uid=i.uid,e.virtual_number=i.virtualNumber,e.virtual_number_list.push(e.virtual_number),console.log(i.role)}))})).catch((function(e){console.log("Error getting documents: ",e)})),a["db"].collection("users").where("OwnerUid","==",e.uid).get().then((function(t){t.forEach((function(t){console.log(t.id," => ",t.data());var i=t.data();e.Udata=i,e.Udata=i,e.Udata.virtualNumber&&(e.virtual_number_list.push(e.Udata.virtualNumber),console.log("listing virtualNumber",e.virtual_number_list))}))})).catch((function(e){console.log("Error getting documents: ",e)}));var i=s["a"].storage(),n=i.ref(),l=n.child("9731175691");l.getDownloadURL().then((function(t){e.showProgress=!1,e.successfully_uploaded=!0,e.showFileInput=!1,e.audioUrl=t,e.file=e.audioUrl}))}}))},data:function(){return{uid:"",phno:"",name:"",virtual_number:"",virtual_number_list:[],role:"",detail:{},Udata:[],realdata:[],userUid:"",ownerid:"",radios1:null,radios2:null,selected:!1,file:"",audioData:null,uploadValue:0,audioUrl:null,successfully_uploaded:!1,showProgress:!1,showFileInput:!0,progressValue:0}},methods:{getAudio:function(e){console.log(e),this.uploadValue=0,this.audioUrl=null,this.audioData=e},onUpload:function(){var e=this;this.showProgress=!0,this.audioUrl=null;var t="9731175691",i=s["a"].storage().ref("".concat(t)).put(this.audioData);i.on("state_changed",(function(t){e.uploadValue=t.bytesTransferred/t.totalBytes*100,e.progressValue=e.uploadValue.toFixed()+"%"}),(function(e){console.log(e.message)}),(function(){e.uploadValue=100,i.snapshot.ref.getDownloadURL().then((function(t){e.showProgress=!1,e.successfully_uploaded=!0,e.showFileInput=!1,e.audioUrl=t,e.file=e.audioUrl,console.log(e.audioUrl)}))}))},deleteAudio:function(){var e=this,t=s["a"].storage(),i=t.ref(),n=i.child("9731175691");console.log(n),n.delete().then((function(){e.successfully_uploaded=!1,e.showFileInput=!0})).catch((function(e){console.log(e)}))}}}),o=r,u=i("2877"),c=i("6544"),h=i.n(c),d=i("7496"),p=i("8336"),f=i("b0af"),g=i("62ad"),v=i("a523"),m=(i("5803"),i("2677")),b=i("cc20"),y=i("80d2"),w=i("d9bd"),V=i("d9f7"),_=m["a"].extend({name:"v-file-input",model:{prop:"value",event:"change"},props:{chips:Boolean,clearable:{type:Boolean,default:!0},counterSizeString:{type:String,default:"$vuetify.fileInput.counterSize"},counterString:{type:String,default:"$vuetify.fileInput.counter"},hideInput:Boolean,placeholder:String,prependIcon:{type:String,default:"$file"},readonly:{type:Boolean,default:!1},showSize:{type:[Boolean,Number],default:!1,validator:e=>"boolean"===typeof e||[1e3,1024].includes(e)},smallChips:Boolean,truncateLength:{type:[Number,String],default:22},type:{type:String,default:"file"},value:{default:void 0,validator:e=>Object(y["F"])(e).every(e=>null!=e&&"object"===typeof e)}},computed:{classes(){return{...m["a"].options.computed.classes.call(this),"v-file-input":!0}},computedCounterValue(){const e=this.isMultiple&&this.lazyValue?this.lazyValue.length:this.lazyValue instanceof File?1:0;if(!this.showSize)return this.$vuetify.lang.t(this.counterString,e);const t=this.internalArrayValue.reduce((e,{size:t=0})=>e+t,0);return this.$vuetify.lang.t(this.counterSizeString,e,Object(y["v"])(t,1024===this.base))},internalArrayValue(){return Object(y["F"])(this.internalValue)},internalValue:{get(){return this.lazyValue},set(e){this.lazyValue=e,this.$emit("change",this.lazyValue)}},isDirty(){return this.internalArrayValue.length>0},isLabelActive(){return this.isDirty},isMultiple(){return this.$attrs.hasOwnProperty("multiple")},text(){return this.isDirty||!this.isFocused&&this.hasLabel?this.internalArrayValue.map(e=>{const{name:t="",size:i=0}=e,n=this.truncateText(t);return this.showSize?`${n} (${Object(y["v"])(i,1024===this.base)})`:n}):[this.placeholder]},base(){return"boolean"!==typeof this.showSize?this.showSize:void 0},hasChips(){return this.chips||this.smallChips}},watch:{readonly:{handler(e){!0===e&&Object(w["b"])("readonly is not supported on <v-file-input>",this)},immediate:!0},value(e){const t=this.isMultiple?e:e?[e]:[];Object(y["i"])(t,this.$refs.input.files)||(this.$refs.input.value="")}},methods:{clearableCallback(){this.internalValue=this.isMultiple?[]:null,this.$refs.input.value=""},genChips(){return this.isDirty?this.text.map((e,t)=>this.$createElement(b["a"],{props:{small:this.smallChips},on:{"click:close":()=>{const e=this.internalValue;e.splice(t,1),this.internalValue=e}}},[e])):[]},genControl(){const e=m["a"].options.methods.genControl.call(this);return this.hideInput&&(e.data.style=Object(V["d"])(e.data.style,{display:"none"})),e},genInput(){const e=m["a"].options.methods.genInput.call(this);return delete e.data.domProps.value,delete e.data.on.input,e.data.on.change=this.onInput,[this.genSelections(),e]},genPrependSlot(){if(!this.prependIcon)return null;const e=this.genIcon("prepend",()=>{this.$refs.input.click()});return this.genSlot("prepend","outer",[e])},genSelectionText(){const e=this.text.length;return e<2?this.text:this.showSize&&!this.counter?[this.computedCounterValue]:[this.$vuetify.lang.t(this.counterString,e)]},genSelections(){const e=[];return this.isDirty&&this.$scopedSlots.selection?this.internalArrayValue.forEach((t,i)=>{this.$scopedSlots.selection&&e.push(this.$scopedSlots.selection({text:this.text[i],file:t,index:i}))}):e.push(this.hasChips&&this.isDirty?this.genChips():this.genSelectionText()),this.$createElement("div",{staticClass:"v-file-input__text",class:{"v-file-input__text--placeholder":this.placeholder&&!this.isDirty,"v-file-input__text--chips":this.hasChips&&!this.$scopedSlots.selection}},e)},genTextFieldSlot(){const e=m["a"].options.methods.genTextFieldSlot.call(this);return e.data.on={...e.data.on||{},click:()=>this.$refs.input.click()},e},onInput(e){const t=[...e.target.files||[]];this.internalValue=this.isMultiple?t:t[0],this.initialValue=this.internalValue},onKeyDown(e){this.$emit("keydown",e)},truncateText(e){if(e.length<Number(this.truncateLength))return e;const t=Math.floor((Number(this.truncateLength)-1)/2);return`${e.slice(0,t)}…${e.slice(e.length-t)}`}}}),x=i("0e8f"),S=i("a722"),$=i("8e36"),C=i("0fd9"),F=i("b974"),U=Object(u["a"])(o,n,l,!1,null,null,null);t["default"]=U.exports;h()(U,{VApp:d["a"],VBtn:p["a"],VCard:f["a"],VCol:g["a"],VContainer:v["a"],VFileInput:_,VFlex:x["a"],VLayout:S["a"],VProgressLinear:$["a"],VRow:C["a"],VSelect:F["a"]})},"408a":function(e,t,i){var n=i("c6b6");e.exports=function(e){if("number"!=typeof e&&"Number"!=n(e))throw TypeError("Incorrect invocation");return+e}},5803:function(e,t,i){},b680:function(e,t,i){"use strict";var n=i("23e7"),l=i("a691"),s=i("408a"),a=i("1148"),r=i("d039"),o=1..toFixed,u=Math.floor,c=function(e,t,i){return 0===t?i:t%2===1?c(e,t-1,i*e):c(e*e,t/2,i)},h=function(e){var t=0,i=e;while(i>=4096)t+=12,i/=4096;while(i>=2)t+=1,i/=2;return t},d=function(e,t,i){var n=-1,l=i;while(++n<6)l+=t*e[n],e[n]=l%1e7,l=u(l/1e7)},p=function(e,t){var i=6,n=0;while(--i>=0)n+=e[i],e[i]=u(n/t),n=n%t*1e7},f=function(e){var t=6,i="";while(--t>=0)if(""!==i||0===t||0!==e[t]){var n=String(e[t]);i=""===i?n:i+a.call("0",7-n.length)+n}return i},g=o&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!r((function(){o.call({})}));n({target:"Number",proto:!0,forced:g},{toFixed:function(e){var t,i,n,r,o=s(this),u=l(e),g=[0,0,0,0,0,0],v="",m="0";if(u<0||u>20)throw RangeError("Incorrect fraction digits");if(o!=o)return"NaN";if(o<=-1e21||o>=1e21)return String(o);if(o<0&&(v="-",o=-o),o>1e-21)if(t=h(o*c(2,69,1))-69,i=t<0?o*c(2,-t,1):o/c(2,t,1),i*=4503599627370496,t=52-t,t>0){d(g,0,i),n=u;while(n>=7)d(g,1e7,0),n-=7;d(g,c(10,n,1),0),n=t-1;while(n>=23)p(g,1<<23),n-=23;p(g,1<<n),d(g,1,1),p(g,2),m=f(g)}else d(g,0,i),d(g,1<<-t,0),m=f(g)+a.call("0",u);return u>0?(r=m.length,m=v+(r<=u?"0."+a.call("0",u-r)+m:m.slice(0,r-u)+"."+m.slice(r-u))):m=v+m,m}})}}]);
//# sourceMappingURL=greetings.ca45b907.js.map