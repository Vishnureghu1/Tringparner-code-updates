<template>
  <v-app>
    <v-container fluid>
      <!-- <v-snackbar :timeout="timeout" v-model="notes_added" :bottom="bottom" :right="right" color="green" text>
                Notes
                added successfully!</v-snackbar>
            <v-snackbar :timeout="timeout" v-model="notes_removed" :bottom="bottom" :right="right" color="red" text>
                Notes
                removed successfully!</v-snackbar>

            <v-snackbar :timeout="timeout" v-model="reminder_added" :bottom="bottom" :right="right" color="green" text>
                Reminder added successfully!</v-snackbar>

            <v-snackbar :timeout="timeout" v-model="blocked_number" :bottom="bottom" :right="right" color="red" text>
                Number
                blocked successfully!</v-snackbar>

            <v-snackbar :timeout="timeout" v-model="unblocked_number" :bottom="bottom" :right="right" color="green"
                text>
                Number unblocked successfully!</v-snackbar> -->
      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-row no-gutters>
            <v-col cols="12">
              <div class="ml-3">
                <v-row>
                  <v-col cols="12" sm="5">
                    <h2 class="mt-0 mb-5">Contacts</h2>
                  </v-col>
                  <v-col cols="12" sm="7" align="end" class="pt-6">
                    <v-text-field
                      v-show="!hidden"
                      absolute
                      transition="slide-y-reverse-transition"
                      append-icon="mdi-magnify"
                      class="searchForm"
                      label="Search"
                      style="right: 153px"
                      v-model="searchTerm"
                      @input="updateSearchTerm"
                      single-line
                    ></v-text-field>
                    <v-icon
                      class="mt-0 mb-5 mr-4"
                      color="black"
                      @click="hidden = !hidden"
                    >
                      mdi-magnify</v-icon
                    >
                    <v-menu
                      v-model="filtermenu"
                      :close-on-content-click="false"
                      :nudge-width="200"
                      offset-x
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <span class="pr-7">
                          <v-icon
                            class="mt-0 mb-5 mr-4"
                            color="black"
                            :disabled="dialog"
                            @click="threeDotAction('add_contact', '')"
                            :loading="dialog"
                            >mdi-plus</v-icon
                          >
                          <v-badge v-if="showBadge == true" dot overlap>
                            <v-icon
                              class="mt-0 mb-5 mr-0"
                              color="black"
                              v-bind="attrs"
                              v-on="on"
                              >mdi-filter-variant
                            </v-icon>
                          </v-badge>
                          <span v-if="showBadge == false" overlap>
                            <v-icon
                              class="mt-0 mb-5 mr-0"
                              color="black"
                              v-bind="attrs"
                              v-on="on"
                              >mdi-filter-variant
                            </v-icon>
                          </span>
                        </span>
                      </template>
                    </v-menu>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
          <div id="layoutCallLog">
            <v-expansion-panels accordion flat>
              <v-alert dense outlined type="error">
                <h4 class="f16">No contacts found!</h4>
                <p class="mb-0 pb-0 black--text" color="black">
                  There are no saved contacts. Please
                  <a href="#">Sync your phone contacts </a>or
                  <a href="#"> add a new contact.</a>
                </p>
              </v-alert>
              <v-expansion-panel>
                <v-expansion-panel-header expand-icon="">
                  <v-row
                    class="d-flex align-center justify-center"
                    align-content="center"
                    justify="center"
                  >
                    <v-col cols="12" sm="10">
                      <h3 class="f16 nunito-font regular">
                        <div
                          class="pa-2 #FFEDEE rounded-circle name-ico d-inline-block mr-5"
                        >
                          A
                        </div>
                        Alpha
                      </h3>
                    </v-col>
                    <v-col cols="12" sm="2" align="right">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" color="black"
                            >mdi-dots-vertical
                          </v-icon>
                        </template>

                        <v-list>
                          <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            active-class="pink--text"
                          >
                            <v-list-item-title
                              :class="item.color"
                              @click="threeDotAction(item.url, '')"
                            >
                              {{ item.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="row">
                    <div class="col-12 pl-15">
                      <h6 class="font-weight-thin">Caller Number</h6>

                      <h5 class="font-weight-light">+91 80000 00 089</h5>
                    </div>
                  </div>
                </v-expansion-panel-content>
                <div class="row">
                  <div class="col-12 pl-80 pr-45">
                    <v-divider></v-divider>
                  </div>
                </div>
              </v-expansion-panel>
                            <v-expansion-panel>
                <v-expansion-panel-header expand-icon="">
                  <v-row
                    class="d-flex align-center justify-center"
                    align-content="center"
                    justify="center"
                  >
                    <v-col cols="12" sm="10">
                      <h3 class="f16 nunito-font regular">
                        <div
                          class="pa-2 #FFEDEE rounded-circle name-ico d-inline-block mr-5"
                        >
                          S
                        </div>
                        Stone
                      </h3>
                    </v-col>
                    <v-col cols="12" sm="2" align="right">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" color="black"
                            >mdi-dots-vertical
                          </v-icon>
                        </template>

                        <v-list>
                          <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            active-class="pink--text"
                          >
                            <v-list-item-title
                              :class="item.color"
                              @click="threeDotAction(item.url, '')"
                            >
                              {{ item.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="row">
                    <div class="col-12 pl-15">
                      <h6 class="font-weight-thin">Caller Number</h6>

                      <h5 class="font-weight-light">+91 80000 00 089</h5>
                    </div>
                  </div>
                </v-expansion-panel-content>
                <div class="row">
                  <div class="col-12 pl-80 pr-45">
                    <v-divider></v-divider>
                  </div>
                </div>
              </v-expansion-panel>
                            <v-expansion-panel>
                <v-expansion-panel-header expand-icon="">
                  <v-row
                    class="d-flex align-center justify-center"
                    align-content="center"
                    justify="center"
                  >
                    <v-col cols="12" sm="10">
                      <h3 class="f16 nunito-font regular">
                        <div
                          class="pa-2 #FFEDEE rounded-circle name-ico d-inline-block mr-5"
                        >
                          P
                        </div>
                       Priya
                      </h3>
                    </v-col>
                    <v-col cols="12" sm="2" align="right">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" color="black"
                            >mdi-dots-vertical
                          </v-icon>
                        </template>

                        <v-list>
                          <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            active-class="pink--text"
                          >
                            <v-list-item-title
                              :class="item.color"
                              @click="threeDotAction(item.url, '')"
                            >
                              {{ item.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="row">
                    <div class="col-12 pl-15">
                      <h6 class="font-weight-thin">Caller Number</h6>

                      <h5 class="font-weight-light">+91 80000 00 089</h5>
                    </div>
                  </div>
                </v-expansion-panel-content>
                <div class="row">
                  <div class="col-12 pl-80 pr-45">
                    <v-divider></v-divider>
                  </div>
                </div>
              </v-expansion-panel>
                            <v-expansion-panel>
                <v-expansion-panel-header expand-icon="">
                  <v-row
                    class="d-flex align-center justify-center"
                    align-content="center"
                    justify="center"
                  >
                    <v-col cols="12" sm="10">
                      <h3 class="f16 nunito-font regular">
                        <div
                          class="pa-2 #FFEDEE rounded-circle name-ico d-inline-block mr-5"
                        >
                          N
                        </div>
                        Nguta
                      </h3>
                    </v-col>
                    <v-col cols="12" sm="2" align="right">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" color="black"
                            >mdi-dots-vertical
                          </v-icon>
                        </template>

                        <v-list>
                          <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            active-class="pink--text"
                          >
                            <v-list-item-title
                              :class="item.color"
                              @click="threeDotAction(item.url, '')"
                            >
                              {{ item.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="row">
                    <div class="col-12 pl-15">
                      <h6 class="font-weight-thin">Caller Number</h6>

                      <h5 class="font-weight-light">+91 80000 00 089</h5>
                    </div>
                  </div>
                </v-expansion-panel-content>
                <div class="row">
                  <div class="col-12 pl-80 pr-45">
                    <v-divider></v-divider>
                  </div>
                </div>
              </v-expansion-panel>
                            <v-expansion-panel>
                <v-expansion-panel-header expand-icon="">
                  <v-row
                    class="d-flex align-center justify-center"
                    align-content="center"
                    justify="center"
                  >
                    <v-col cols="12" sm="10">
                      <h3 class="f16 nunito-font regular">
                        <div
                          class="pa-2 #FFEDEE rounded-circle name-ico d-inline-block mr-5"
                        >
                          S
                        </div>
                        Simoes
                      </h3>
                    </v-col>
                    <v-col cols="12" sm="2" align="right">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" color="black"
                            >mdi-dots-vertical
                          </v-icon>
                        </template>

                        <v-list>
                          <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            active-class="pink--text"
                          >
                            <v-list-item-title
                              :class="item.color"
                              @click="threeDotAction(item.url, '')"
                            >
                              {{ item.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="row">
                    <div class="col-12 pl-15">
                      <h6 class="font-weight-thin">Caller Number</h6>

                      <h5 class="font-weight-light">+91 80000 00 089</h5>
                    </div>
                  </div>
                </v-expansion-panel-content>
                <div class="row">
                  <div class="col-12 pl-80 pr-45">
                    <v-divider></v-divider>
                  </div>
                </div>
              </v-expansion-panel>
                            <v-expansion-panel>
                <v-expansion-panel-header expand-icon="">
                  <v-row
                    class="d-flex align-center justify-center"
                    align-content="center"
                    justify="center"
                  >
                    <v-col cols="12" sm="10">
                      <h3 class="f16 nunito-font regular">
                        <div
                          class="pa-2 #FFEDEE rounded-circle name-ico d-inline-block mr-5"
                        >
                         V
                        </div>
                        Virtue
                      </h3>
                    </v-col>
                    <v-col cols="12" sm="2" align="right">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" color="black"
                            >mdi-dots-vertical
                          </v-icon>
                        </template>

                        <v-list>
                          <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            active-class="pink--text"
                          >
                            <v-list-item-title
                              :class="item.color"
                              @click="threeDotAction(item.url, '')"
                            >
                              {{ item.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="row">
                    <div class="col-12 pl-15">
                      <h6 class="font-weight-thin">Caller Number</h6>

                      <h5 class="font-weight-light">+91 80000 00 089</h5>
                    </div>
                  </div>
                </v-expansion-panel-content>
                <div class="row">
                  <div class="col-12 pl-80 pr-45">
                    <v-divider></v-divider>
                  </div>
                </div>
              </v-expansion-panel>
                            <v-expansion-panel>
                <v-expansion-panel-header expand-icon="">
                  <v-row
                    class="d-flex align-center justify-center"
                    align-content="center"
                    justify="center"
                  >
                    <v-col cols="12" sm="10">
                      <h3 class="f16 nunito-font regular">
                        <div
                          class="pa-2 #FFEDEE rounded-circle name-ico d-inline-block mr-5"
                        >
                          M
                        </div>
                        Mia 
                      </h3>
                    </v-col>
                    <v-col cols="12" sm="2" align="right">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" color="black"
                            >mdi-dots-vertical
                          </v-icon>
                        </template>

                        <v-list>
                          <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            active-class="pink--text"
                          >
                            <v-list-item-title
                              :class="item.color"
                              @click="threeDotAction(item.url, '')"
                            >
                              {{ item.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="row">
                    <div class="col-12 pl-15">
                      <h6 class="font-weight-thin">Caller Number</h6>

                      <h5 class="font-weight-light">+91 80000 00 089</h5>
                    </div>
                  </div>
                </v-expansion-panel-content>
                <div class="row">
                  <div class="col-12 pl-80 pr-45">
                    <v-divider></v-divider>
                  </div>
                </div>
              </v-expansion-panel>
                            <v-expansion-panel>
                <v-expansion-panel-header expand-icon="">
                  <v-row
                    class="d-flex align-center justify-center"
                    align-content="center"
                    justify="center"
                  >
                    <v-col cols="12" sm="10">
                      <h3 class="f16 nunito-font regular">
                        <div
                          class="pa-2 #FFEDEE rounded-circle name-ico d-inline-block mr-5"
                        >
                          T
                        </div>
                        Trevor Virtue

                      </h3>
                    </v-col>
                    <v-col cols="12" sm="2" align="right">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" color="black"
                            >mdi-dots-vertical
                          </v-icon>
                        </template>

                        <v-list>
                          <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            active-class="pink--text"
                          >
                            <v-list-item-title
                              :class="item.color"
                              @click="threeDotAction(item.url, '')"
                            >
                              {{ item.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="row">
                    <div class="col-12 pl-15">
                      <h6 class="font-weight-thin">Caller Number</h6>

                      <h5 class="font-weight-light">+91 80000 00 089</h5>
                    </div>
                  </div>
                </v-expansion-panel-content>
                <div class="row">
                  <div class="col-12 pl-80 pr-45">
                    <v-divider></v-divider>
                  </div>
                </div>
              </v-expansion-panel>
                            <v-expansion-panel>
                <v-expansion-panel-header expand-icon="">
                  <v-row
                    class="d-flex align-center justify-center"
                    align-content="center"
                    justify="center"
                  >
                    <v-col cols="12" sm="10">
                      <h3 class="f16 nunito-font regular">
                        <div
                          class="pa-2 #FFEDEE rounded-circle name-ico d-inline-block mr-5"
                        >
                          R
                        </div>
                        Ruveni 
                      </h3>
                    </v-col>
                    <v-col cols="12" sm="2" align="right">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" color="black"
                            >mdi-dots-vertical
                          </v-icon>
                        </template>

                        <v-list>
                          <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            active-class="pink--text"
                          >
                            <v-list-item-title
                              :class="item.color"
                              @click="threeDotAction(item.url, '')"
                            >
                              {{ item.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="row">
                    <div class="col-12 pl-15">
                      <h6 class="font-weight-thin">Caller Number</h6>

                      <h5 class="font-weight-light">+91 80000 00 089</h5>
                    </div>
                  </div>
                </v-expansion-panel-content>
                <div class="row">
                  <div class="col-12 pl-80 pr-45">
                    <v-divider></v-divider>
                  </div>
                </div>
              </v-expansion-panel>
                            <v-expansion-panel>
                <v-expansion-panel-header expand-icon="">
                  <v-row
                    class="d-flex align-center justify-center"
                    align-content="center"
                    justify="center"
                  >
                    <v-col cols="12" sm="10">
                      <h3 class="f16 nunito-font regular">
                        <div
                          class="pa-2 #FFEDEE rounded-circle name-ico d-inline-block mr-5"
                        >
                          E
                        </div>
                        Ellawala
                      </h3>
                    </v-col>
                    <v-col cols="12" sm="2" align="right">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" color="black"
                            >mdi-dots-vertical
                          </v-icon>
                        </template>

                        <v-list>
                          <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            active-class="pink--text"
                          >
                            <v-list-item-title
                              :class="item.color"
                              @click="threeDotAction(item.url, '')"
                            >
                              {{ item.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="row">
                    <div class="col-12 pl-15">
                      <h6 class="font-weight-thin">Caller Number</h6>

                      <h5 class="font-weight-light">+91 80000 00 089</h5>
                    </div>
                  </div>
                </v-expansion-panel-content>
                <div class="row">
                  <div class="col-12 pl-80 pr-45">
                    <v-divider></v-divider>
                  </div>
                </div>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="dialog2" max-width="332px">
      <v-card class="rounded-lg pt-7 pb-7">
        <v-card-title class="d-flex justify-center">
          <h3 class="center">{{ contact_text }}</h3>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-text-field label="Name" outlined v-model="name"></v-text-field>

          <v-text-field label="Mobile Number*" outlined v-model="number"></v-text-field>
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
            outlined  @click="saveNow()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" persistent max-width="400px">
      <v-card>
        <v-card-title class="d-flex justify-center">
          <h3 class="center">Are you Sure!</h3>
        </v-card-title>
        <v-card-body>
          <h4 class="mb-3 mt-3 text-center">
            Do you want to delete this contact?
          </h4>
        </v-card-body>
        <v-card-actions>
          <v-btn
            color="red"
            text
            class="ma-2 text-capitalize rounded-pill p-3 red_button_outline"
            min-width="140px"
            @click="proceed(0)"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            class="text-capitalize ma-3 rounded-pill red_button"
            min-width="140px"
            color="white"
            outlined
            @click="proceed(1)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { db } from "@/main.js";
import axios from "axios";
export default {
  components: {},
  data: () => ({
    number:"",
    name:"",
    dialog: false,
    dialog2: false,
    dialogDelete: false,
    showBadge: false,
    removeReminder: false,
    searchForm: false,
    benched: 0,
    hidden: true,
    filtermenu: false,
    sendInviteLoader: false,
    changeEmailPopup: false,
    enterOtpModel: false,
    loadingMore: false,
    searchTerm: "",
    contact_text: "",
    items: [
      { title: "Edit Contact", color: "black--text", url: "edit_contact" },
      { title: "Delete Contact", color: "red--text", url: "delete_contact" },
    ],
  }),
    created() {
     let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
		const owneruid = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.uid : localStorageUserObj.OwnerUid;
    this.AccountId = (localStorageUserObj.role == "OWNER") ? localStorageUserObj.AccountId : localStorageUserObj.OwnerAccountId;
    // console.log(owneruid)
    this.owneruid = owneruid;
    this.uid = localStorageUserObj.uid;
      db.collection("users").where("uid","==",owneruid).get().then(async(snap) =>{
       this.current_number = snap.docs[0].data().PhoneNumber

    
		}).catch((err)=>{
			console.log(err.message)
		})
  },
  methods: {
    searchAction() {
      this.hidden = !this.hidden;
    },
    proceed(e) {
      if (e == 1) {
        console.log("proceed");
        this.dialogDelete = false;
      } else {
        console.log("cancel");
        this.dialogDelete = false;
      }
    },
    updateSearchTerm() {
      console.log(this.searchTerm);
      console.log("this.searchTerm.length", this.searchTerm.length);
      if (this.searchTerm !== "") {
        this.searchMongo();
      } else {
        console.log("searchTerm is empty");
        this.realdata = this.backuprealdata;
      }
    },
    threeDotAction(url, uniqueId) {
      if (url == "edit_contact") {
        this.dialog = false;
        this.dialogDelete = false;
        this.dialog2 = true;
        this.uniqueId = uniqueId;
        this.contact_text = "Edit Contact";
      }
      if (url == "add_contact") {
        this.dialog = false;
        this.dialogDelete = false;
        this.dialog2 = true;
        this.uniqueId = uniqueId;
        this.contact_text = "Add a New Contact";
      }
      if (url == "delete_contact") {
        this.dialog = false;
        this.dialog2 = false;
        this.dialogDelete = true;
      }
    },

          saveNow() {
      const details = {
        url: this.$cloudfareApi + "/contact/user",
        method: "POST",
        headers: { token: localStorage.getItem("token") },
        data: {
          Uid: this.owneruid,
          UpdatedBy: this.owneruid,
          Name: this.name,
          Number: this.number,
          SyncOrganisation: false,
        },
      };
      axios(details).then(async (responsevalue) => {
        console.log(responsevalue);
        // if (responsevalue.data.status == true) {
        
     
        // } else {
        //   console.log("wrong value");
        // }
      });
    },
  },
};
</script>
