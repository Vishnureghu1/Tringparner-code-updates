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
            name: new Date(element.data().Date.seconds *1000).toLocaleString(),
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

const details = {
        url: this.$cloudfareApi+"/invoice/"+parseInt(data),
        method: "POST",
        headers: { token: localStorage.getItem("token") },
      };
      axios(details).then(async (response) => {
         console.log("res",response.data.url[0])
      //     this.dialog = true,
      // this.showDownload = true;     
      //   this.exportUrl = response.data.url[0];
        // console.log("res",response.data.url[0])

        // const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = response.data.url[0]
        link.setAttribute('target', '_blank') //or any other extension
        link.setAttribute('download', 'invoice.pdf') //or any other extension
        document.body.appendChild(link)
        link.click()
      })
    },
  },
};
</script>
