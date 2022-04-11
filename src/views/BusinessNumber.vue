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
                        Business Numbers
                      </h2>

                      <v-breadcrumbs class="breadcrumbs" :items="items">
                        <template class="breadcrumbs" v-slot:divider>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </v-breadcrumbs>
                    </v-col>
                  </v-row>
                  <div class="comment_heading mt-6 ml-5">
                    Configure your business number according to your needs
                  </div>
                  <v-card
                    color="transparent"
                    outlined
                    class="mt-5"
                    max-width="1069"
                    v-for="item in virtualnumber"
                    :key="item"
                  >
                    <v-row>
                      <v-col cols="12" sm="6">
                        <div class="name_heading mt-1 ml-5">
                          {{ item.Source }}
                        </div>
                        <div class="number_heading mt-2 ml-5">
                          {{ item.VirtualNumber }}
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6" align="end">
                        <v-menu offset-y>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on" color="black"
                              >mdi-dots-vertical</v-icon
                            >
                          </template>
                          <v-list>
                            <v-list-item
                              v-for="(item, index) in options"
                              :key="index"
                              active-class="pink--text"
                            >
                              <v-list-item-title
                                :class="item.color"
                                @click="blockCall()"
                                >{{ item.title }}</v-list-item-title
                              >
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div
                          class="link_style mt-1 ml-5"
                          @click="ManageAgents(item.VirtualNumber,'active')"
                        >
                          Manage Agents
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6" align="end">
                        <v-icon
                          v-bind="attrs"
                          v-on="on"
                          color="#EE1C25"
                          @click="ManageAgents(item.VirtualNumber,'active')"
                          >mdi-arrow-right</v-icon
                        >
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div
                          class="link_style mt-1 ml-5 mb-5"
                          @click="CallFlowSettings(item.VirtualNumber,'expired')"
                        >
                          Call Flow Settings
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6" align="end">
                        <v-icon
                          v-bind="attrs"
                          v-on="on"
                          color="#EE1C25"
                          @click="CallFlowSettings(item.VirtualNumber,'expired')"
                          >mdi-arrow-right</v-icon
                        >
                      </v-col>
                    </v-row>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <v-dialog v-model="dialog2" max-width="332px">
      <v-card class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          <h3 class="center">Change Title</h3>
        </v-card-title>
        <v-card-text class="pt-0">
          <p align="center" class="pb-10">Name 1</p>
          <v-text-field label="New Source Title" outlined></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="dialog2 = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <vtoast ref="vtoast" />
  </v-app>
</template>

<script>
// import firebase from "firebase";
import { db } from "@/main.js";
import vtoast from "@/components/snackbar.vue";
export default {
  components: {
    vtoast,
  },
  mounted() {
    this.$root.vtoast = this.$refs.vtoast;
  },
  data: () => ({
    options: [{ title: "Edit Title", color: "black--text", url: "add_note" }],
    virtualnumber: [],
    items: [
      {
        text: "More",
        disabled: false,
        href: "Dashbaord",
        color: "Black",
      },
      {
        text: "Business Numbers",
        disabled: false,
        to: { name: "BusinessNumber" },
        color: "red",
      },
    ],
  }),
  created() {
    
    let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
    const owneruid =
      localStorageUserObj.role == "OWNER"
        ? localStorageUserObj.uid
        : localStorageUserObj.OwnerUid;
    // console.log("vetri",owneruid)

    db.collection("uservirtualNumber")
      .where("Uid", "==", owneruid)
      .get()
      .then(async (snap) => {
        // console.log("test.........",snap.docs.data());
        snap.docs.forEach((element) => {
          // console.log(element.data())
          this.virtualnumber.push(element.data());
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  methods: {
    // console.log(this.uid)
    goBack() {
      this.$router.push("/Dashboard");
    },
    CallFlowSettings(vn,status) {
       if(status=='expired'){
          this.$root.vtoast.show({message: 'Hello there! Your plan has been expired! Please recharge to proceed!', color: 'red', timer: 5000})
      }else{
      this.$router.push("/CallFlowSettings?bn=" + vn);
      }
    },
    ManageAgents(vn,status) {

      if(status=='expired'){
          this.$root.vtoast.show({message: 'Hello there!', color: 'red', timer: 5000})
      }else{

        this.$router.push("/CallPreference?bn=" + vn);
      }
      
    },
  },
};
</script>

