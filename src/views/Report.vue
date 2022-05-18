<template>
  <v-app>
    <div>
      <v-container :key="rerenderKey" fluid>
        <v-layout>
          <v-progress-linear
            :active="isUpdating"
            :indeterminate="isUpdating"
            absolute
            bottom
            color="deep-purple accent-4"
          ></v-progress-linear>
          <v-flex xs12 sm12 md12>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="ml-8">
                  <v-row>
                    <v-col cols="12" sm="10">
                      <h2 class="page_heading mt-6 mb-5">Report</h2>
                    </v-col>
                    <v-col cols="12" sm="2" align="end">
                      <v-menu
                        v-model="exportMenu"
                        :close-on-content-click="false"
                        :nudge-width="200"
                        offset-x
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <span>
                            <v-icon
                              class="mt-6 mb-5 mr-7"
                              color="black"
                              v-bind="attrs"
                              v-on="on"
                              >mdi-download</v-icon
                            >
                          </span>
                        </template>

                        <v-card min-width="378">
                          <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card-title class="black--text white darken-1">
                              Export Call Data
                              <v-spacer></v-spacer>

                              <span fab small @click="exportMenu = false">
                                <v-icon>mdi-close</v-icon>
                              </span>
                            </v-card-title>
                            <v-card>
                              <v-list class="pl-5">
                                <v-checkbox
                                  :input-value="AllCallsSelected"
                                  value
                                  class="mb-0 pb-0"
                                  label="All Calls"
                                  @change="handleAllCallsChange"
                                ></v-checkbox>

                                <v-checkbox
                                  value
                                  :input-value="AnsweredCallsSelected"
                                  label="Answered Calls"
                                  @change="handleAnsweredCallsChange"
                                ></v-checkbox>

                                <v-checkbox
                                  value
                                  :input-value="MissedCallsSelected"
                                  label="Missed Calls"
                                  @change="handleMissedCallsChange"
                                ></v-checkbox>

                                <v-checkbox
                                  value
                                  :input-value="OfflineCallsSelected"
                                  label="Offline Calls"
                                  @change="handleOfflineCallsChange"
                                ></v-checkbox>
                                <v-menu
                                  ref="exportDateMenu"
                                  v-model="exportDateMenu"
                                  :close-on-content-click="false"
                                  :return-value.sync="exportDates"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="auto"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      prepend-inner-icon="mdi-calendar"
                                      v-model="exportDateRangeText"
                                      label="Date filter"
                                      readonly
                                      outlined
                                      v-bind="attrs"
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="exportDates"
                                    no-title
                                    range
                                    show-adjacent-months
                                    :allowed-dates="disablePastDates"
                                    scrollable
                                    color="red"
                                  >
                                    <v-row no-gutters>
                                      <v-col cols="12" sm="6">
                                        <v-btn
                                          color="white"
                                          class="primary--text"
                                          width="100%"
                                          rounded
                                          @click="exportDateMenu = false"
                                        >
                                          Cancel
                                        </v-btn>
                                      </v-col>
                                      <v-col cols="12" sm="6">
                                        <v-btn
                                          class="white--text"
                                          width="100%"
                                          color="red"
                                          rounded
                                           @click="filterCallsReport(exportDates)"
                                        >
                                          Save
                                        </v-btn>
                                      </v-col>
                                    </v-row>
                                  </v-date-picker>
                                </v-menu>
                                <v-text-field
                                  label="Enter e-mail ID"
                                  prepend-inner-icon="mdi-email-outline"
                                  @input="handleEmailChange"
                                  v-model="EmailSelected"
                                  :rules="dispatchEmailRules"
                                ></v-text-field>
                              </v-list>
                              <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                  color="white"
                                  width="100%"
                                  text
                                  class="mr-0 flex red_button rounded-pill"
                                  :loading="isUpdating"
                                  depressed
                                  @click="handleApplyFilter"
                                >
                                  Export & Send
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-form>
                        </v-card>
                      </v-menu>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="dates"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            prepend-inner-icon="mdi-calendar"
                            v-model="dateRangeText"
                            label="Date filter"
                            readonly
                            outlined
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="dates"
                          no-title
                          range
                          show-adjacent-months
                          :allowed-dates="disablePastDates"
                          scrollable
                          color="red"
                        >
                          <v-row no-gutters>
                            <v-col cols="12" sm="6">
                              <v-btn
                                color="white"
                                class="primary--text"
                                width="100%"
                                rounded
                                @click="menu = false"
                              >
                                Cancel
                              </v-btn>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-btn
                                class="white--text"
                                width="100%"
                                color="red"
                                rounded
                                @click="filterCalls(dates)"
                              >
                                Save
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" sm="8">
                      <v-row>
                        <v-col cols="12" sm="4" align="end" class="mt-0 pt-0">
                          <v-card outlined color="transparent" class="">
                            <h3
                              class="number_heading nunito-font light3"
                              align="center"
                            >
                              {{ callSummary.Total }}
                            </h3>
                            <h6 class="comment_heading" align="center">
                              Total Calls
                            </h6>
                          </v-card>
                        </v-col>
                        <v-col cols="12" sm="4" align="end" class="mt-0 pt-0">
                          <v-card outlined color="transparent">
                            <h3
                              class="number_heading nunito-font light3"
                              align="center"
                            >
                              {{ callSummary.Answered }}
                            </h3>
                            <h6 class="comment_heading" align="center">
                              Answered
                            </h6>
                          </v-card>
                        </v-col>
                        <v-col cols="12" sm="4" align="end" class="mt-0 pt-0">
                          <v-card outlined color="transparent">
                            <h3
                              class="number_heading nunito-font light3"
                              align="center"
                            >
                              {{ callSummary.Missed }}
                            </h3>
                            <h6 class="comment_heading" align="center">
                              Not Answered
                            </h6>
                          </v-card>
                        </v-col>

                        <!-- <v-col cols="12" sm="3" align="end" class="mt-0 pt-0">
                      <v-card outlined color="transparent">
                        <h3
                          class="number_heading nunito-font light3"
                          align="center"
                        >
                         {{ callSummary.ClickCount }}
                        </h3>
                        <h6 class="comment_heading" align="center">
                          Call Attempted
                        </h6>
                      </v-card>
                    </v-col> -->
                      </v-row>
                    </v-col>
                  </v-row>
                  <br />
                  <br />
                  <v-row no-gutters>
                    <!-- <v-col cols="12" sm="6" v-for="n in 3" :key="n"> -->
                    <v-col
                      cols="12"
                      sm="6"
                      v-for="(item, index) in agentWiseReport[1]"
                      :key="index"
                    >
                      <v-expansion-panels accordion flat>
                        <v-expansion-panel>
                          <v-expansion-panel-header>
                            <div>
                              <v-row no-gutters>
                                <v-col cols="2" flex>
                                  <h4
                                    class="name_heading font-weight-light mt-2"
                                  >
                                    <!-- Shinu -->
                                    {{ item.agent_name }}
                                  </h4>
                                  <br />
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="10" flex>
                                  <v-divider class="mt-4"></v-divider>
                                </v-col>
                              </v-row>
                            </div>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content class="block">
                            <v-row no-gutters>
                              <v-col cols="12" sm="12" id="container">
                                <div
                                  class="chart d-block text-center"
                                  id="container2"
                                >
                                  <v-menu
                                    open-on-hover
                                    offset-y
                                    v-for="(
                                      item, index
                                    ) in item.custom_chart_data"
                                    :key="index"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <div
                                        class="bar-container"
                                        v-bind="attrs"
                                        v-on="on"
                                      >
                                        <div
                                          class="
                                            top_text
                                            text-center
                                            grey--text
                                          "
                                        >
                                          <!-- {{ item.all }} -->
                                        </div>

                                        <div
                                          class="bar missed"
                                          v-bind:style="{
                                            height:
                                              getHeight(item.missed, item.all) +
                                              '%',
                                          }"
                                        ></div>
                                        <div
                                          class="bar"
                                          v-if="item.all == 0"
                                          v-bind:style="{ height: '100%' }"
                                        ></div>
                                        <div
                                          class="bar answered"
                                          v-bind:style="{
                                            height:
                                              getHeight(
                                                item.answered,
                                                item.all
                                              ) + '%',
                                          }"
                                        ></div>
                                        <div
                                          class="
                                            bottom_text
                                            text-center
                                            grey--text
                                          "
                                        >
                                          {{ item.day.split("*")[1] }}
                                        </div>
                                      </div>
                                    </template>

                                    <v-list class="rounded-tl-0">
                                      <v-list-item>
                                        <v-list-item-title>
                                          <ul class="over_el">
                                            <li>
                                              <span class="nunito-font"
                                                ><v-icon color="#13B9A8"
                                                  >mdi-card</v-icon
                                                ></span
                                              >
                                              Answered Calls ({{
                                                item.answered
                                              }})
                                            </li>
                                            <li>
                                              <span class="nunito-font"
                                                ><v-icon color="#FAB4B7"
                                                  >mdi-card</v-icon
                                                ></span
                                              >
                                              Missed Calls ({{ item.missed }})
                                            </li>
                                            <li class="gray--text nunito-font">
                                              {{
                                                item.day.split("*").join(" ")
                                              }}
                                            </li>
                                          </ul>
                                        </v-list-item-title>
                                      </v-list-item>
                                    </v-list>
                                  </v-menu>
                                </div>
                              </v-col>
                              <v-spacer></v-spacer>

                              <v-col
                                cols="6"
                                sm="3"
                                align="center"
                                class="d-block"
                              >
                                <v-card
                                  outlined
                                  color="transparent"
                                  class="nunito-font d-block"
                                >
                                  <h2 align="center" class="nunito-font light3">
                                    {{ item.summary.Total }}
                                  </h2>
                                  <h6 class="comment_heading" align="center">
                                    Total Calls
                                  </h6>
                                </v-card>
                              </v-col>
                              <v-col cols="6" sm="3" align="center">
                                <v-card
                                  outlined
                                  color="transparent"
                                  class="nunito-font"
                                >
                                  <h2 align="center" class="nunito-font light3">
                                    {{ item.summary.Answered }}
                                  </h2>
                                  <h6 class="comment_heading" align="center">
                                    Answered
                                  </h6>
                                </v-card>
                              </v-col>
                              <v-col cols="6" sm="3" align="center">
                                <v-card
                                  outlined
                                  color="transparent"
                                  class="nunito-font"
                                >
                                  <h2 align="center" class="nunito-font light3">
                                    {{ item.summary.Missed }}
                                  </h2>
                                  <h6 class="comment_heading" align="center">
                                    Not Answered
                                  </h6>
                                </v-card>
                              </v-col>
                              <v-col cols="6" sm="3" align="center">
                                <v-card
                                  outlined
                                  color="transparent"
                                  class="nunito-font"
                                >
                                  <h2 align="center" class="nunito-font light3">
                                    {{ item.summary.ClickCount }}
                                  </h2>
                                  <h6 class="comment_heading" align="center">
                                    Call Attempted
                                  </h6>
                                </v-card>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-col>
                    <v-col v-if="noCalls">
                      <div class="text-center">
                        <h3
                          class="number_heading nunito-font light3"
                          align="center"
                        >
                          No Calls
                        </h3>
                      </div>
                    </v-col>
                  </v-row>
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
import { db } from "@/main.js";

// import VueSlickCarousel from "vue-slick-carousel";
// import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
// import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
// import { GChart } from "vue-google-charts";
export default {
  data: () => ({
    exportMenu: false,
    isUpdating: false,
    settings: {
      centerMode: true,
      centerPadding: "4px",
      focusOnSelect: true,
      infinite: true,
      slidesToShow: 11,
      speed: 500,
      adaptiveHeight: true,
    },
    options: [
      { title: "Download as XML", color: "gray--text", url: "exportxml" },
      { title: "Download as PDF", color: "gtay--text", url: "send" },
    ],
    //  filters: [
    //   { title: "Download as XML", color: "gray--text", url: "edit" },
    //   { title: "Download as PDF", color: "gtay--text", url: "send" },
    // ],
    // dates: ["2021-12-22", "2021-12-25"],
    dates: [
      new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 7)
        .toISOString()
        .substr(0, 10),
      new Date().toISOString().substr(0, 10),
    ],
    exportDates: [
      new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 7)
        .toISOString()
        .substr(0, 10),
      new Date().toISOString().substr(0, 10),
    ],

    callSummary: {
      Answered: 0,
      Missed: 0,
      Total: 0,
    },
    rerenderKey: 0,
    agentWiseReport: {},
    agentWiseClickCount: {},
    agentWiseDateWiseSummary: {},
    agentsObj: {},
    fromDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 6)
      .toISOString()
      .substr(0, 10),
    toDate: new Date().toISOString().substr(0, 10),
    exportFromDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 6)
      .toISOString()
      .substr(0, 10),
    exportToDate: new Date().toISOString().substr(0, 10),
    noCalls: false,
    AllCallsSelected: true,
    AnsweredCallsSelected: false,
    MissedCallsSelected: false,
    OfflineCallsSelected: false,
    EmailSelected: "",
    IsValidEmailSelected: false,
    dispatchEmailRules: [
      (v) =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    ],
    exportDateMenu: false,
    menu: false,
    valid: false,
  }),
  watch: {
    dates: function (val) {
      console.log("val", val);
      this.fromDate = val[0];
      this.toDate = val[1];
    },
  },
  components: {
    // GChart,
    // VueSlickCarousel,
  },

  computed: {
    dateRangeText() {
      console.log("this.dates", this.dates);
      if (this.dates.includes(",")) {
        return this.dates.join(" ~ To ~ ");
      } else {
        return this.dates.join(" -- ");
      }
    },
    exportDateRangeText() {
      console.log("this.exportDates", this.exportDates);
      if (this.exportDates.includes(",")) {
        return this.exportDates.join(" ~ To ~ ");
      } else {
        return this.exportDates.join(" -- ");
      }
    },
  },
  created() {
    let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
    this.ownerUid =
      localStorageUserObj.role == "OWNER"
        ? localStorageUserObj.uid
        : localStorageUserObj.OwnerUid;
    this.EmailSelected =
      localStorageUserObj.role == "OWNER" ? localStorageUserObj.Email : "";
    this.IsValidEmailSelected = true;
    this.AccountId = localStorageUserObj.AccountId;
    this.userId = localStorageUserObj.uid;
    this.userRole = localStorageUserObj.role;

    this.getAllCalls();
  },
  methods: {
      disablePastDates(val) {
       return val <= new Date().toISOString().substr(0, 10)
    },
    getDaysArray(start, end) {
      for (
        var arr = {}, dt = new Date(start);
        dt <= new Date(end);
        dt.setDate(dt.getDate() + 1)
      ) {
        let callDayObj = new Date(dt);
        let call_month = callDayObj.toLocaleString("default", {
          month: "short",
        });
        let call_day = callDayObj.toLocaleString("default", {
          day: "numeric",
        });
        let call_year = callDayObj.toLocaleString("default", {
          year: "numeric",
        });

        // arr.push(`${call_month}*${call_day}*${call_year}`);
        arr[`${call_month}*${call_day}*${call_year}`] = {
          Total: 0,
          Missed: 0,
          Answered: 0,
        };
      }
      return arr;
    },
    getHeight(value, total) {
      var height = (value / total) * 100;
      return height;
    },
    filterCalls(dates) {
      this.$refs.menu.save(dates);
      console.log("Filtering calls");
      this.getAllCalls();
    },

        filterCallsReport(dates) {
      this.$refs.exportDateMenu.save(dates);
      console.log("Filtering calls");
      // this.getAllCalls();
    },
    forceRerenderKey() {
      this.rerenderKey++;
    },
    handleAllCallsChange(opn) {
      console.log("handleAllCallsChange", opn);
      this.AllCallsSelected = opn;

      if (opn) {
        this.AnsweredCallsSelected = false;
        this.MissedCallsSelected = false;
        this.OfflineCallsSelected = false;
      } else {
        this.AnsweredCallsSelected = true;
        this.MissedCallsSelected = true;
        this.OfflineCallsSelected = true;
      }
    },
    handleAnsweredCallsChange(opn) {
      console.log("handleAnsweredCallsChange", opn);
      this.AnsweredCallsSelected = opn;
      if (opn) {
        this.AllCallsSelected = false;
      }
      if (
        !this.OfflineCallsSelected &&
        !this.MissedCallsSelected &&
        !this.AnsweredCallsSelected
      ) {
        this.AllCallsSelected = true;
      }
    },
    handleMissedCallsChange(opn) {
      console.log("handleMissedCallsChange", opn);
      this.MissedCallsSelected = opn;
      if (opn) {
        this.AllCallsSelected = false;
      }
      if (
        !this.OfflineCallsSelected &&
        !this.MissedCallsSelected &&
        !this.AnsweredCallsSelected
      ) {
        this.AllCallsSelected = true;
      }
    },
    handleOfflineCallsChange(opn) {
      console.log("handleOfflineCallsChange", opn);
      this.OfflineCallsSelected = opn;
      if (opn) {
        this.AllCallsSelected = false;
      }
      if (
        !this.OfflineCallsSelected &&
        !this.MissedCallsSelected &&
        !this.AnsweredCallsSelected
      ) {
        this.AllCallsSelected = true;
      }
    },
    handleEmailChange(opn) {
      console.log("handleEmailChange", opn);
      this.EmailSelected = opn;
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(opn)) {
        console.log("Valid Email");
        this.IsValidEmailSelected = true;
      } else {
        console.log("InValid Email");
        this.IsValidEmailSelected = false;
      }
    },
    handleApplyFilter() {
      if (this.IsValidEmailSelected) {
        this.isUpdating = true;
        // this.filterMongo();

        let payload = {
          uid: this.ownerUid,
          email: this.EmailSelected,
          startdate: new Date(this.exportFromDate).getTime(),
          enddate: new Date(this.exportToDate).getTime(),
          // startdate: 1652338880000,
          // enddate: 1652338880000,
          type: [],
          AccountId: this.AccountId,
          updated_by: this.ownerUid,
        };

        if (this.AllCallsSelected) {
          payload.type.push("All");
        }
        if (this.AnsweredCallsSelected) {
          payload.type.push("Answered");
        }
        if (this.MissedCallsSelected) {
          payload.type.push("Missed");
        }
        if (this.OfflineCallsSelected) {
          payload.type.push("Offline");
        }
        console.log(payload);

        const options = {
          url: this.$cloudfareApi + "/export",
          method: "POST",
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: payload,
        };
        console.log(options);
        this.$axios(options)
          .then((response) => {
            console.log(response.data);

            this.$root.vtoast.show({
              message: "Call Data Dispatched to Email",
              color: "green",
              timer: 2000,
            });

            this.isUpdating = false;
            this.exportMenu = false;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.$root.vtoast.show({
          message: "Please Provide a Valid Email!",
          color: "red",
          timer: 2000,
        });
      }
    },
    getAllCalls() {
      let callSummary = {
        Answered: 0,
        Missed: 0,
        Total: 0,
        ClickCount: 0,
      };
      let agentWiseReport = {};
      let agentsObj = {};
      // let agentWiseClickCount = {};
      // let agentWiseDateWiseSummary = {};

      console.log(`GETTING CALLS with ${this.fromDate} ${this.toDate}`);

      let calllogsDb = db.collection("callLogs");

        if(this.userRole != "AGENT") {
          calllogsDb = calllogsDb.where("owneruid", "==", this.ownerUid);
          console.log("getAllCalls owneruid ==", this.ownerUid);
        } else {
          calllogsDb = calllogsDb.where("userid", 'array-contains', this.userId);
        }

        calllogsDb = calllogsDb.where("date", ">=", new Date(this.fromDate));
        calllogsDb = calllogsDb.where("date", "<=", new Date(new Date(this.toDate).getTime() + ((18*60+30)*60000)) );
        // calllogsDb = calllogsDb.where("date", "<=", new Date(this.toDate));
        // console.log("getAllCalls this.toDate ==", this.toDate);
        // console.log("getAllCalls this.toDate ==", new Date(this.toDate));
        // console.log("getAllCalls this.toDate ==", new Date(new Date(this.toDate).getTime() + ((18*60+30)*60000)));

        calllogsDb = calllogsDb.where("callstatus", "in", ["Answered", "Missed"])
        .orderBy("date", "desc");
        
        // calllogsDb
        // .get()
        // .then(async (snapshot) => {
        calllogsDb
        .onSnapshot((snapshot) => {

          console.log("getAllCalls snapshot.size", snapshot.size);
          

          if (!snapshot.empty) {
            this.noCalls = false;

            let chartPlaceholder = this.getDaysArray(
              new Date(this.fromDate),
              new Date(this.toDate)
            );

            console.log("Reports snapshot.size", snapshot.size);

            snapshot.docs.forEach((element) => {
              // console.log({
              //   id: element.id,
              //   agentDetails: element.data().agentDetails,
              //   BusyCalleesAccounts: element.data().BusyCalleesAccounts,
              //   ClickCount: element.data().ClickCount,
              //   callstatus: element.data().callstatus,
              //   date: element.data().date,
              //   dateTime: element.data().dateTime,
              //   logDate: element.data().logDate,
              //   name: element.data().name,
              //   uniqueid: element.data().uniqueid,
              //   userid: element.data().userid,
              // });
              // console.log(element.data().agentDetails)

              let call = element.data();

              if ("agentDetails" in call) {
                // console.log('has agentDetails ', call.callstatus);

                if (call.callstatus == "Missed") {
                  callSummary.Missed++;
                  callSummary.Total++;
                } else if (call.callstatus == "Answered") {
                  callSummary.Answered++;
                  callSummary.Total++;
                }

                //agent Summary
                call.agentDetails.forEach(async (doc) => {
                  // console.log(doc);

                  // agentWiseDateWiseSummary
                  if (!([doc.AgentUid] in agentWiseReport)) {
                    // console.log(doc);
                    // let agents = doc.AgentUid;

                    this.$set(agentWiseReport, [doc.AgentUid], {
                      agent_name: doc.Name,
                      agent_uid: doc.AgentUid,
                      agent_number: doc.Number,
                      summary: {
                        Total: 0,
                        Missed: 0,
                        Answered: 0,
                        ClickCount: 0,
                      },
                      agent_report: [],
                    });

                    if (call.callstatus == "Missed") {
                      agentWiseReport[doc.AgentUid]["summary"].Total++;
                      agentWiseReport[doc.AgentUid]["summary"].Missed++;
                    } else if (call.callstatus == "Answered") {
                      agentWiseReport[doc.AgentUid]["summary"].Answered++;
                      agentWiseReport[doc.AgentUid]["summary"].Total++;
                    }

                    if ("ClickCount" in call) {
                      console.log("ClickCount", call.ClickCount);
                      callSummary.ClickCount++;
                      agentWiseReport[call.ClickCount.Uid]["summary"]
                        .ClickCount++;
                    }

                    if ([doc.AgentUid] in agentsObj) {
                      console.log(`agentsObj has ${doc.AgentUid} related data`);
                    } else {
                      this.$set(agentsObj, doc.AgentUid, doc);
                    }

                    let callDayObj = new Date(element.data().logDate);
                    let call_month = callDayObj.toLocaleString("default", {
                      month: "short",
                    });
                    let call_day = callDayObj.toLocaleString("default", {
                      day: "numeric",
                    });
                    let call_year = callDayObj.toLocaleString("default", {
                      year: "numeric",
                    });

                    let callDay = `${call_month}*${call_day}*${call_year}`;

                    console.log("callDay", callDay);
                    // let callDay = element.data().logDate;

                    // console.log('logDate', element.data().logDate);
                    // console.log('logDate', callDay);

                    // element.data().logDate
                    if (
                      !(
                        [element.data().logDate] in
                        agentWiseReport[doc.AgentUid]["agent_report"]
                      )
                    ) {
                      // agentWiseReport[doc.AgentUid]["agent_report"][[callDay]] =
                      //   {
                      //     Total: 0,
                      //     Missed: 0,
                      //     Answered: 0,
                      //   };
                      agentWiseReport[doc.AgentUid]["agent_report"] =
                        chartPlaceholder;
                      // console.log('setting',agentWiseReport[doc.AgentUid]["agent_report"]);
                    }

                    agentWiseReport[doc.AgentUid]["agent_report"][callDay]
                      .Total++;

                    if (call.callstatus == "Missed") {
                      agentWiseReport[doc.AgentUid]["agent_report"][callDay]
                        .Missed++;
                    } else if (call.callstatus == "Answered") {
                      agentWiseReport[doc.AgentUid]["agent_report"][callDay]
                        .Answered++;
                    }

                    // agentWiseReport[doc.AgentUid]["agent_report"][element.data().logDate].push({
                    // // agentWiseReport[doc.AgentUid]["agent_report"].push({
                    //   // id: element.id,
                    //   // agentDetails: element.data().agentDetails,
                    //   // BusyCalleesAccounts: element.data().BusyCalleesAccounts,
                    //   // ClickCount: element.data().ClickCount,
                    //   callstatus: element.data().callstatus,
                    //   date: element.data().date,
                    //   dateTime: element.data().dateTime,
                    //   logDate: element.data().logDate,
                    //   // name: element.data().name,
                    //   // uniqueid: element.data().uniqueid,
                    //   // userid: element.data().userid,
                    // })

                    // console.log('SETTING INDEX');
                  } else {
                    if (call.callstatus == "Missed") {
                      agentWiseReport[doc.AgentUid]["summary"].Total++;
                      agentWiseReport[doc.AgentUid]["summary"].Missed++;
                    } else if (call.callstatus == "Answered") {
                      agentWiseReport[doc.AgentUid]["summary"].Total++;
                      agentWiseReport[doc.AgentUid]["summary"].Answered++;
                    }

                    if ("ClickCount" in call) {
                      console.log("ClickCount", call.ClickCount);
                      callSummary.ClickCount++;
                      agentWiseReport[call.ClickCount.Uid]["summary"]
                        .ClickCount++;
                    }

                    let callDayObj = new Date(element.data().logDate);
                    let call_month = callDayObj.toLocaleString("default", {
                      month: "short",
                    });
                    let call_day = callDayObj.toLocaleString("default", {
                      day: "numeric",
                    });
                    let call_year = callDayObj.toLocaleString("default", {
                      year: "numeric",
                    });

                    let callDay = `${call_month}*${call_day}*${call_year}`;

                    console.log("callDay", callDay);

                    // let callDay = element.data().logDate;

                    if (
                      !(
                        [callDay] in
                        agentWiseReport[doc.AgentUid]["agent_report"]
                      )
                    ) {
                      // agentWiseReport[doc.AgentUid]["agent_report"][callDay] = {
                      //   Total: 0,
                      //   Missed: 0,
                      //   Answered: 0,
                      // };
                      agentWiseReport[doc.AgentUid]["agent_report"] =
                        chartPlaceholder;
                    }

                    agentWiseReport[doc.AgentUid]["agent_report"][callDay]
                      .Total++;

                    if (call.callstatus == "Missed") {
                      agentWiseReport[doc.AgentUid]["agent_report"][callDay]
                        .Missed++;
                    } else if (call.callstatus == "Answered") {
                      agentWiseReport[doc.AgentUid]["agent_report"][callDay]
                        .Answered++;
                    }

                    // agentWiseReport[doc.AgentUid]["agent_report"][element.data().logDate].push({
                    // // agentWiseReport[doc.AgentUid]["agent_report"].push({
                    //   id: element.id,
                    //   agentDetails: element.data().agentDetails,
                    //   // BusyCalleesAccounts: element.data().BusyCalleesAccounts,
                    //   ClickCount: element.data().ClickCount,
                    //   callstatus: element.data().callstatus,
                    //   date: element.data().date,
                    //   dateTime: element.data().dateTime,
                    //   logDate: element.data().logDate,
                    //   // name: element.data().name,
                    //   // uniqueid: element.data().uniqueid,
                    //   // userid: element.data().userid,
                    // })

                    // console.log(' HAVE INDEX');
                  }
                  // console.log(`agentWiseReport -->  ${doc.AgentUid} --> `, JSON.stringify(agentWiseReport[doc.AgentUid]));
                });
              } else if ("BusyCalleesAccounts" in call) {
                console.log("has BusyCalleesAccounts ", call.callstatus);
                call.agentDetails.forEach(async (doc) => {
                  console.log(doc);
                });
              }
              // else {

              // console.log('----->', call.callstatus);
              // console.log('----->', call.callstatus);
              // }
            });

            // console.log('callSummary', callSummary);
            // console.log('this.agentWiseDateWiseSummary', this.agentWiseDateWiseSummary);
            // console.log(agentsObj);

            this.callSummary = callSummary;
            this.agentsObj = agentsObj;

            // console.log(agentWiseReport);

            this.$set(this.agentWiseReport, 1, agentWiseReport);

            var listOfProps = Object.getOwnPropertyNames(agentWiseReport);
            // console.log('listOfProps', listOfProps);
            listOfProps.forEach((elementProp) => {
              // console.log(agentWiseReport[elementProp]['agent_report'])

              var listOfAgentProps = Object.getOwnPropertyNames(
                agentWiseReport[elementProp]
              );
              listOfAgentProps.forEach((ad) => {
                if (ad == "agent_report") {
                  console.log("ad", agentWiseReport[elementProp][ad]);
                  let chartData = [
                    // [ "Date", "No Calls", { role: "style" }, "Answered Calls", { role: "style" }, "Missed Calls", { role: "style" }]
                    [
                      "Date",
                      "Answered Calls",
                      { role: "style" },
                      "Missed Calls",
                      { role: "style" },
                    ],
                  ];
                  let customChartData = [];
                  var rProps = Object.getOwnPropertyNames(
                    agentWiseReport[elementProp][ad]
                  );

                  rProps.forEach((repObj) => {
                    if (repObj !== "length" && repObj !== "__ob__") {
                      // let Total = agentWiseReport[elementProp][ad][repObj].Total;
                      let Answered =
                        agentWiseReport[elementProp][ad][repObj].Answered;
                      let Missed =
                        agentWiseReport[elementProp][ad][repObj].Missed;
                      // chartData.push([parseInt(repObj), Total, "#E0E0E0", Answered, "#13B9A8", Missed, "#FAB4B7"]);
                      chartData.push([
                        parseInt(repObj),
                        Answered,
                        "#13B9A8",
                        Missed,
                        "#FAB4B7",
                      ]);

                      customChartData.push({
                        day: repObj,
                        all: Answered + Missed,
                        missed: Missed,
                        answered: Answered,
                      });
                    }
                  });

                  agentWiseReport[elementProp]["chart_data"] = chartData;

                  agentWiseReport[elementProp]["custom_chart_data"] =
                    customChartData;
                  console.log(
                    "custom_chart_data",
                    agentWiseReport[elementProp]["custom_chart_data"]
                  );

                  // console.log('chartData', agentWiseReport[elementProp]['chart_data']);
                }
              });
            });

            this.forceRerenderKey();
          } else {
            console.log("snapshot empty");
            this.noCalls = true;
            this.callSummary.Total = 0;
            this.callSummary.Answered = 0;
            this.callSummary.Missed = 0;
            this.agentWiseReport = [];
            this.forceRerenderKey();
          }
        });
    },
  },
};
</script>

<style scoped>
.page_title {
  font-family: "Lato", Bold;
  font-size: 23px;
}
.heading {
  font-family: "lato", Bold;
  font-size: 16px;
}
.name_heading {
  font-family: "Nunito", bold;
  font-size: 14px;
}
.number_heading {
  font-size: 37px;
  color: #3b3b3b;
}
.comment_heading {
  font-size: 10px;
  color: #3b3b3b;
}
</style>