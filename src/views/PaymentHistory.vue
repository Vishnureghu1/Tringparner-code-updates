<template>
  <v-app>
    <v-container fluid>
      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-row no-gutters>
            <v-col cols="12">
              <div class="ml-8">
                <v-row>
                  <v-col cols="12" sm="10">
                    <h2 class="page_title mt-6 ml-5">
                      <v-icon class="mr-2" color="black" @click="goBack()"
                        >mdi-arrow-left</v-icon
                      >
                      Payment History
                    </h2>

                    <v-breadcrumbs class="breadcrumbs" :items="items">
                      <template class="breadcrumbs" v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                      </template>
                    </v-breadcrumbs>
                  </v-col>
                </v-row>
                <v-row>
                  <v-flex xs12 sm12 md12>
                    <v-row no-gutters >
                       <v-card class="pl-5" elevation="0">
    <v-card-title>
      <!-- <v-row justify="center" v-if="showExport"> -->
          <v-dialog v-model="dialog" max-width="332px">
      <v-card class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          <h3 class="center">{{title}}</h3>
        </v-card-title>
       
        <v-card-actions>
          <!-- <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="close()"
          >
            Cancel
          </v-btn> -->
           <a v-bind:href="exportUrl" class="red--text a-red" target="_blank" download>click to download </a>
          <!-- <v-btn
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
            @click="add_user1()"
          >
            Submit
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
      <!-- <v-dialog v-model="dialog" persistent max-width="500px"> -->
        <!-- <v-card class="popup-layout">
          <v-card-title class="justify-center">
            <span class="popup-title">Export</span>
          </v-card-title>
          <v-card-text>
            <h3 v-if="showWait" class="popup-subtitle">Exporting please wait</h3> -->
            <!-- <div v-if="showDownload" class="popup-subtitle">
              <a v-bind:href="exportUrl" class="red--text a-red" target="_blank">click to download </a>
            </div> -->
          <!-- </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn class="red--text popup-red-button" text @click="dialog = false"> Cancel </v-btn>
          </v-card-actions>
        </v-card> -->
      <!-- </v-dialog> -->
    <!-- </v-row> -->
       <!-- <div v-if="showDownload" class="popup-subtitle">
              <a v-bind:href="exportUrl" class="red--text a-red" target="_blank">click to download </a>
            </div> -->
      <!-- <v-btn 
   class="ma-2" 
   :disabled="disabled" 
   ref="submitBtn"
   href="http://www.africau.edu/images/default/sample.pdf"
   download>
    
</v-btn> -->
<!-- <button type="button" ref="submitBtn" @click="submit">Submit</button> -->
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="paymentHistory"
       :hide-default-footer="true"
      :search="search"
    >

 <template v-slot:item.invoice="{ item }">
            <v-icon class="mt-6 mb-5 mr-7" color="black"  @click="getDownloadData(item.invoice)"> mdi-download</v-icon>
        </template> 
        
        </v-data-table>
  </v-card>
                     
                    </v-row>
                  </v-flex>

                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js" integrity="sha256-S1J4GVHHDMiirir9qsXWc8ZWw74PHHafpsHp5PXtjTs=" crossorigin="anonymous"></script>
         <script>
         
         import { db } from "@/main.js";
         import axios from "axios";
export default {
  components: {},
  created(){
     let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
    this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
     db.collection("paymentTransaction").where("Uid","==",owneruid).where("Status","==",true).get().then(async(snap) =>{
       if(snap){
         snap.docs.forEach(element => {this.paymentHistory.push({
            name: new Date(element.data().HookDate.seconds *1000).toLocaleString(),
            amount:element.data().InvoiceAmount,
            payment: element.data().Type,
            invoice:element.data().Invoice,
            indexKey:this.indexKey++
           })});
         }else{
             this.noblock ="No Blocked Numbers"
         }
		}).catch((err)=>{
			console.log(err.message)
		})
  },
  data: () => ({
    dialog:false,
    submitBtn:"",
    showDownload:false,
    exportUrl:"",
    indexKey:0,
       search: '',
        headers: [
          {
            text: 'Date',
            align: 'start',
            value: 'name',
          },
          { text: 'Amount', value: 'amount' },
          { text: 'Payment', value: 'payment' },
          { text: 'Invoices', value: 'invoice' },
        ],
    paymentHistory: [],
    facebook_info: false,
    instagram_info: false,
    paymentOptions: false,
    paymentOptionsInsta: false,
    userEmail: "",
    userRole: "",
    agentName: "",
  }),
  computed: {
    computedPrice() {
      return this.discount ? this.price * this.discountedPrice : this.price;
    },
  },
  // async created() {
  //   await this.getBill();
  //   //  this.getOrderIdforPayment()
  // },

  methods: {

    getDownloadData(data){
     
      //  this.$refs.submitBtn.click();
console.log(data);
// axios.get('https://vetriweddingshoot.s3.ap-south-1.amazonaws.com/111.pdf', { responseType: 'blob' })
//       .then(response => {
//         const blob = new Blob([response.data], { type: 'application/pdf' })
//         const link = document.createElement('a')
//         link.href = URL.createObjectURL(blob)
//         link.download = "label"
//         link.click()
//         URL.revokeObjectURL(link.href)
//       }).catch(console.error)



// axios({
//           url: 'http://www.africau.edu/images/default/sample.pdf', // download file link goes here
//           method: 'GET',
//           headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//           // responseType: 'blob',
//         }).then((res) => {
//           var FILE = window.URL.createObjectURL(new Blob([res.data]));
//           var docUrl = document.createElement('x');
//           docUrl.href = FILE;
//           docUrl.setAttribute('download', 'sample.pdf');
//           document.body.appendChild(docUrl);
//           docUrl.click();
//         });
                  // "https://storage.googleapis.com/adminstorage-gou6m/csvFile.pdf?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=firebase-adminsdk-n8mtz%40tringpartner-v2.iam.gserviceaccount.com%2F20220511%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20220511T163506Z&X-Goog-Expires=86401&X-Goog-SignedHeaders=host&X-Goog-Signature=2e28e95b623d8842752cb8f7832048678e0d5fed76af607c2703506cab146758a89bcf3c8f8d8e30dde1c7cc951c76d374ba0102ce5621b4e2170f0ed7b7a545aed6f10b323842038c3dc23e472f07959d0c511e2056fc1b5cd74599630fe37f4b3fd399bfe87443ffd8aa75e143ebd5f3ade7069bd6eaf92325114a047659dcf7bbbc126e1b50ede4be2349b56765c94ef117412a766ad9264bef480f2a1040d884c76d6ea7dd8224c75bbb83dbd1342ddb4c787ffff7113c10c926f566578211e19e26abde41901e66a06e081a6d356540a9eb3c59e22ec4b2efd91730eed6508858c41a0b0d1b525340ea0aa9548998a75081c3513f0d15f61d14f9b330f2";                 
          //        axios({
          //         //  url:"https://tringpartner.s3.ap-south-1.amazonaws.com/1647144077.18265.mp3",
          //          url:"http://www.africau.edu/images/default/sample.pdf",
          //           // url: 'https://storage.googleapis.com/adminstorage-gou6/csvFile.pdf?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=firebase-adminsdk-ix6ch%40test-tpv2.iam.gserviceaccount.com%2F20220511%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20220511T180349Z&X-Goog-Expires=86401&X-Goog-SignedHeaders=host&X-Goog-Signature=0aa02d239d7607411bda4a3fcf56caa72ca705be7d0a81f2c7c69bedbb25225a700b38c82daa3a3a5ed73cedaf4f049261cb279154970cdb5cb2d9e05314fa3a6ede8a268b507d50f62e9a42ad67866120777a1f732cf68019c14c15093dc91936763f406dbfcc7a3faae7224fe052fce759fbd19c6d6f0dc51482faaefbc7e6afa43449a539e88fd94fa9cc4dd81af8242f0fbfd6c400c66ca0d2bd98d841c55fade87f72c0434a233f2bc0c2d9803db1ca8139484299f79b8c41092d2240094a8fcc4f795c60db82325b344cccd71bf6d3f9d020e12e594c92f8c8181750128991c8efa869f4f7c2ed231b48feaa48c184078e8195bee5deab49c3b9139d77',
          //           method: 'GET',
          //           // responseType: 'arraybuffer',
          //           headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          //           responseType: 'blob'
          //           // "Content-Disposition": "attachment;filename=report.pdf",
          //           // "Content-Type": 'application/octet-stream',
          //       }).then((res) => {
          //         // response.header("Access-Control-Allow-Origin", "true");
          //         console.log(res)
          //          var FILE = window.URL.createObjectURL(new Blob([res.data]));
          // var docUrl = document.createElement('x');
          // docUrl.href = FILE;
          // docUrl.setAttribute('download', 'sample.pdf');
          // document.body.appendChild(docUrl);
          // docUrl.click();
          //       });
const details = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/web/invoice/"+parseInt(data),
        method: "POST",
        headers: { token: localStorage.getItem("token") },
      };
      axios(details).then(async (response) => {
         console.log("res",response.data.url[0])
          this.dialog = true,
      this.showDownload = true;     
        this.exportUrl = response.data.url[0];
        // console.log("res",response.data.url[0])
      })
    },
    // getBill() {
    
    // },

    // getOrderIdforPayment(){
    // var token = localStorage.getItem("token");
    //   var tpu = localStorage.getItem("tpu");
    //   var Id = JSON.parse(tpu);
    //   console.log(Id);
    // 		const details = {
    // 			url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/web/bill',
    // 			method: 'POST',
    // 			data: {
    // 				uid: this.uid,
    //         PlanId:Id.PlanId

    // 			},
    //       headers: {
    //     token: token,
    //     "Content-Type": "application/json",
    //   },
    // 		}

    // 		this.$axios(details)
    // 			.then((response) => {
    // 				console.log(response)

    // 			})
    // 			.catch((error) => {
    // 				console.error(error);
    // 			})

    // 	},
  },
};
</script>
