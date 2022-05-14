<template>
  <v-app>
    <div>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md10>
            <v-card class="mx-auto">
              <v-row no-gutters>
                <v-col cols="12">
                  <div>
                    <div class="ml-4 mr-4">
                      <h3 class="mt-6 ml-5 mb-5 text-center">Missed calls</h3>
                    </div>
                    <v-select
                      :items="virtual_number_list"
                      label="Virtual number"
                      v-model="selected_virtual_number"
                      v-on:change="changeview(selected_virtual_number)"
                      required
                    ></v-select>
                    <h3 class="mt-2 ml-3">Routing method - New caller</h3>
                    <v-radio-group v-model="radios1" mandatory class="ml-3">
                      <v-radio label="Assign to all" value="All"></v-radio>
                      <v-radio
                        label="Assign to Specific Agent(s)"
                        value="Specific-Agent"
                      ></v-radio>
                      <div no-action v-if="radios1 == 'Specific-Agent'">
                        <div
                          v-for="element in seleted_users"
                          :key="element.Name"
                        >
                          <v-checkbox
                            v-model="getMissed"
                            :value="element.Name"
                            :label="element.Name"
                          ></v-checkbox>
                        </div>
                      </div>
                      <v-radio
                        label="Assign in Round Robin"
                        value="Round-Robin"
                      ></v-radio>
                      <v-radio
                        label="Assign to last Attempted"
                        value="Last-Attempted"
                      ></v-radio>
                    </v-radio-group>

                    <h3 class="mt-2 ml-3">Routing method - Repeated caller</h3>
                    <v-checkbox
                      v-model="selected"
                      label="Sticky Agent"
                    ></v-checkbox>
                  </div>
                  <v-btn class="ml-4" color="primary" @click="applyRouting()"
                    >Apply Routing</v-btn
                  >
                </v-col>
              </v-row>
              <br />
              <br />
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-app>
</template>


<script>
// import Vue from 'vue'
// import axios from 'axios'
import firebase from "firebase";
import { db } from "@/main.js";
export default {
  data: () => ({
    uid: "",
    phno: "",
    name: "",
    virtual_number: "",
    virtual_number_list: [],
    selected_virtual_number: "",
    role: "",
    detail: {},
    participants: {},
    added_list_json: {},
    Udata: [],
    realdata: [],
    all_participants: [],
    user_listing: [],
    added_list: [],
    seleted_users: [],
    toggle_none: null,
    userUid: "",
    ownerid: "",
    radios1: null,
    radios2: null,
    selected: false,
    getMissed: [],
    checkboxes: [],
    selected2: [],
  }),
  methods: {
    changeview(virtualnumber) {
      db.collection("uservirtualNumber")
        .where("VirtualNumber", "==", virtualnumber)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            let user_details = doc.data();
            this.uid = user_details.Uid;
            this.virtual_number = user_details.VirtualNumber;
            this.virtual_number_list.push(this.virtual_number);
            this.Udata = user_details;
            var trying = this.Udata.Participants;
            this.radios1 = this.Udata.NewMissedCaller;
            this.radios2 = this.Udata.RepeatedMissedCaller;
            console.log("radio", this.radios1);
            if (this.radios2) {
              this.selected = false;
            }
            if (this.radios1 == null) {
              this.radios1 = "Round_Robin";
            }
            if (this.radios2 == "Sticky-Disable") {
              this.selected = false;
            }
            trying.forEach((items) => {
              console.log("loop items", items);
              this.added_list_json = Object.assign({}, this.added_list_json, {
                Number: items.Number,
                Name: items.Name,
                AgentUid: items.AgentUid,
              });
              this.added_list.push(this.added_list_json);
              this.seleted_users.push(this.added_list_json);
            });
            console.log("im getting", this.added_list);

            console.log("before data ", this.seleted_users);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      console.log("type of ", typeof this.virtual_number_list);
      this.selected_virtual_number = this.virtual_number_list[0];
      console.log(this.virtual_number_list[0]);

      db.collection("users")
        .where("OwnerUid", "==", this.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            let user_details = doc.data();
            this.Udata = user_details;
            this.Udata = user_details;
            if (this.Udata.virtualNumber) {
              this.virtual_number_list.push(this.Udata.virtualNumber);
              console.log("listing virtualNumber", this.virtual_number_list);
            }
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    applyRouting() {
      if (!this.selected) {
        this.radios2 = null;
      }
      console.log(this.getMissed);
      const user_data = {
        url: "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/web/callDistribution/missedcall",
        method: "POST",
        data: {
          owner_uid: this.uid,
          updated_by: this.uid,
          virtual_number: this.selected_virtual_number,
          source: "general",
          participants: this.seleted_users,
          new_missed_caller: this.radios1,
          repeated_missed_caller: "Sticky-Disable",
        },
      };
      console.log(user_data);
      this.$axios(user_data)
        .then((response) => {
          console.log(response);
          alert(response.data.message);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log("logged user details", user);
        this.uid = user.uid;
        await db
          .collection("users")
          .where("uid", "==", this.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
              console.log(doc.id, " => ", doc.data());
              let user_details = doc.data();
              console.log(user_details.role);
              if (
                user_details.role == "OWNER" ||
                user_details.role == "ADMIN"
              ) {
                if (user_details.role == "ADMIN") {
                  this.uid = user_details.OwnerUid;
                  console.log(this.uid);
                }
              }
              await db
                .collection("uservirtualNumber")
                .where("Uid", "==", this.uid)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach(async (doc) => {
                    console.log(doc.id, " => ", doc.data());
                    let user_details = doc.data();
                    this.uid = user_details.Uid;
                    this.virtual_number = user_details.VirtualNumber;
                    this.virtual_number_list.push(this.virtual_number);
                  });
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
              console.log("type of ", typeof this.virtual_number_list);
              this.selected_virtual_number = this.virtual_number_list[0];
              console.log(this.virtual_number_list[0]);

              await db
                .collection("uservirtualNumber")
                .where("VirtualNumber", "==", this.selected_virtual_number)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    let user_details = doc.data();
                    this.uid = user_details.Uid;
                    this.Udata = user_details;
                    var trying = this.Udata.Participants;
                    this.radios1 = this.Udata.NewMissedCaller;
                    this.radios2 = this.Udata.RepeatedMissedCaller;
                    if (this.radios2) {
                      this.selected = true;
                    }
                    console.log("radio", this.radios1);
                    if (this.radios2) {
                      this.selected = true;
                    }
                    if (this.radios1 == null) {
                      this.radios1 = "Round_Robin";
                    }
                    if (this.radios2 == "Sticky-Disable") {
                      this.selected = false;
                    }
                    trying.forEach((items) => {
                      console.log("loop items", items);
                      this.added_list_json = Object.assign(
                        {},
                        this.added_list_json,
                        {
                          Number: items.Number,
                          Name: items.Name,
                          AgentUid: items.AgentUid,
                        }
                      );
                      this.added_list.push(this.added_list_json);
                      this.seleted_users.push(this.added_list_json);
                    });
                    console.log("im getting", this.added_list);

                    console.log("before data ", this.seleted_users);
                  });
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });

              db.collection("users")
                .where("OwnerUid", "==", this.uid)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    let user_details = doc.data();
                    this.Udata = user_details;
                    this.Udata = user_details;
                    if (this.Udata.virtualNumber) {
                      this.virtual_number_list.push(this.Udata.virtualNumber);
                      console.log(
                        "listing virtualNumber",
                        this.virtual_number_list
                      );
                    }
                  });
                })
                .catch((error) => {
                  console.log("Error getting documents: ", error);
                });
            });
          });
      }
    });
  },
};
</script>