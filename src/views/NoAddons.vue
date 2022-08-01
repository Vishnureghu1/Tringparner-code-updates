<template>
  <v-app>
    <div>
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
                        Not allowed for addind Add-Ons
                      </h2>

                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </v-breadcrumbs>
                    </v-col>
                  </v-row>

                    <v-card
                    color="transparent"
                    outlined
                    class="mt-5 pl-5"
                    max-width="1069"
                  >
                    <v-layout>
                                <v-flex xs12 sm12 md12 v-if="Stage=='TRIAL'">
                        <v-row no-gutters>
                          <v-col cols="12" >
                               <v-alert dense outlined  type="error">
                <h4 class="f16">Sorry!</h4>
                <p class="mb-0 pb-0 black--text" color="black">
                 Addons not available for Trial Plans
                </p>
              </v-alert>
                            </v-col>

                            
                        </v-row>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import { db } from '@/main.js';
// import axios from "axios";
export default {
  components: {},
  created() {
     let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
       this.isHide = (localStorageUserObj.role == "OWNER")?true:false;
    window.scrollTo(0, 0); //scroll to top
  },
  data: () => ({
    isHide:false,
    uid:"",
    owneruid:"",
    AccountId:"",
    items: [
      {
        text: "More",
        disabled: false,
        href: "Dashboard",
      },

      {
        text: "Add-Ons",
        disabled: true,
      },
    ],
  }),

  methods: {
    buyaddon(){
       let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
       this.isHide = (localStorageUserObj.role == "OWNER")?true:false;
    this.owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
    this.AccountId=  (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
       db.collection("uservirtualNumber").where("Uid","==",this.owneruid).where("IsPurchased","==",false).get().then(async(snap) =>{
      if(snap.empty){
          this.$router.push("/buyNewNumber");
      }else{
            this.$router.push("/reserveNumber");
          // this.VirtualNumber = snap.docs[0].data().VirtualNumber;
          // this.prorate()
      }
		}).catch((err)=>{
			console.log(err.message)
		})
        // this.$router.push("/buyNewNumber");
    },
    goBack() {
      this.$router.push("/BusinessNumber");
    },
    callPauseNumber() {
      this.$router.push("/PauseNumber");
    },
    callRouting() {
      const getNumber = Object.keys(this.$route.query)[0];
      this.$router.push("/CallRouting?" + getNumber);
    },
    MissedCallRouting() {
      const getNumber = Object.keys(this.$route.query)[0];
      this.$router.push("/MissedCallDistribution?" + getNumber);
    },
  },
};
</script>

<style scoped>
.v-application a {
  text-decoration: none;
}
</style>