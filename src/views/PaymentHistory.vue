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
      Payment History
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="paymentHistory"
      :search="search"
    ></v-data-table>
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
export default {
  components: {},
  data: () => ({
       search: '',
        headers: [
          {
            text: 'Date',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Amount', value: 'amount' },
          { text: 'Invoices', value: 'invoice' },

        ],
        paymentHistory: [
          {
            name: '10/04/2022',
            amount:'1500 INR',
            invoice:'Pending'
          },
             {
            name: '10/03/2022',
            amount:'1500 INR',
            invoice:'Paid'
          },
             {
            name: '10/02/2022',
            amount:'1500 INR',
            invoice:'Paid'
          },
             {
            name: '10/01/2022',
            amount:'500 INR',
            invoice:'Paid'
          },
         
        ],
    
        sublist: [
      {
        item: "Charges",
        qty: "Quantity",
        amount: "Price",
        class: "Bold",
      },
    
      {
        name: "Tringpartner_6M_3000",
        qty: 1,
        amount: 3000.00,
        class: "light3",
      },  
      {
        name: "Business Numbers",
        qty:2,
        amount: 3600.00,
        class: "light3",
      },  
      {
        name: "Users",
        qty: 4,
        amount: 2400.00,
        class: "light3",
      },
    ],
  items: [
        {
          text: "More",
          disabled: false,
          href: "Dashbaord",
        },
			{
          text: " Billing Information",
          disabled: false,
          to: { name: "BillingInformation" },
        },
        {
          text: "Payment History",
          disabled: true,
          to: { name: "PaymentHistory" },
        },
	
      ],
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
  async created() {
    await this.getBill();
    //  this.getOrderIdforPayment()
  },

  methods: {
    getBill() {
      var token = localStorage.getItem("token");
      var tpu = localStorage.getItem("tpu");
      var Id = JSON.parse(tpu);

      console.log(Id.uid + "-----------" + Id.PlanId);
      console.log(Id);
      const details = {
        // https://asia-south1-test-tpv2.cloudfunctions.net/tpv2
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/bill/",
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
    // 			url: 'https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/bill',
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
