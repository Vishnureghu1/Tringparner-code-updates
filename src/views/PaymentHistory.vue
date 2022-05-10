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
      <v-spacer></v-spacer>
    
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="paymentHistory"
      :search="search"
      :hide-default-footer="true"
    ><template slot="item.invoice" :slot-scope="invoice">
            <v-icon class="mt-6 mb-5 mr-7" color="black" @click="dat(invoice)">mdi-download</v-icon>
        </template></v-data-table>
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
         <script>
         import { db } from "@/main.js";
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
           paymentMode: element.data().Type,
           invoice: element.data().Invoice
           })});
         }else{
             this.noblock ="No Blocked Numbers"
         }
		}).catch((err)=>{
			console.log(err.message)
		})
  },
  data: () => ({
       search: '',
        headers: [
          {
            text: 'Date',
            align: 'start',
            value: 'name',
          },
          { text: 'Amount', value: 'amount' },
          { text: 'Payment Mode', value: 'paymentMode' },
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
    dat(id){
      console.log("vel",id)
    },
    getBill() {
      var token = localStorage.getItem("token");
      var tpu = localStorage.getItem("tpu");
      var Id = JSON.parse(tpu);

      console.log(Id.uid + "-----------" + Id.PlanId);
      console.log(Id);
      const details = {
        // https://asia-south1-test-tpv2.cloudfunctions.net/tpv2
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/web/bill/",
        method: "POST",
        data: {
          uid: Id.uid,
          PlanId: Id.PlanId,
        },
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      };

      this.$axios(details)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

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
