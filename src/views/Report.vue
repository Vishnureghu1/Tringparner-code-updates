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
                                  input-value="true"
                                  value
                                  class="mb-0 pb-0"
                                  label="All Calls"
                                ></v-checkbox>

                                <v-checkbox
                                  value
                                  label="Answered Calls"
                                ></v-checkbox>

                                <v-checkbox
                                  value
                                  label="Missed Calls"
                                ></v-checkbox>

                                <v-checkbox
                                  value
                                  label="Offline Calls"
                                ></v-checkbox>
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
                                </v-menu>
                                <v-text-field
                                  label="Enter e-mail ID"
                                  prepend-inner-icon="mdi-email-outline"
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
                   
                     <v-col cols="12" sm="3">
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
                    <v-row>

                      <v-col cols="12" sm="4" align="end">
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
                    <v-col cols="12" sm="4" align="end">
                      <v-card outlined color="transparent">
                        <h3
                          class="number_heading nunito-font light3"
                          align="center"
                        >
                          {{ callSummary.Answered }}
                        </h3>
                        <h6 class="comment_heading" align="center">Answered</h6>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="4" align="end">
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
                      </v-row>


                  
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
                              <v-col cols="12" sm="12">
                                <div class="chart d-block text-center">
                                  <VueSlickCarousel v-bind="settings">
                                    <div
                                      v-for="(
                                        item, index
                                      ) in item.custom_chart_data"
                                      :key="index"
                                    >
                                      <v-menu open-on-hover offset-y>
                                        <template
                                          v-slot:activator="{ on, attrs }"
                                        >
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
                                              {{ item.all }}
                                            </div>

                                            <div
                                              class="bar missed"
                                              v-bind:style="{
                                                height:
                                                  getHeight(
                                                    item.missed,
                                                    item.all
                                                  ) + '%',
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
                                              {{ item.day }}
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
                                                  Missed Calls ({{
                                                    item.missed
                                                  }})
                                                </li>
                                                <li
                                                  class="gray--text nunito-font"
                                                >
                                                  {{ item.day }}
                                                </li>
                                              </ul>
                                            </v-list-item-title>
                                          </v-list-item>
                                        </v-list>
                                      </v-menu>
                                    </div>
                                  </VueSlickCarousel>
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
                                          {{ item.all }}
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
                                sm="4"
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
                              <v-col cols="6" sm="4" align="center">
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
                              <v-col cols="6" sm="4" align="center">
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

import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
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
      new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 6)
        .toISOString()
        .substr(0, 10),
      new Date().toISOString().substr(0, 10),
    ],
    customChartData: [
      { all: 30, missed: 20, answered: 10 },
      { all: 1, missed: 0, answered: 1 },
      { all: 11, missed: 1, answered: 10 },
      { all: 33, missed: 20, answered: 13 },
      { all: 12, missed: 2, answered: 10 },
      { all: 30, missed: 20, answered: 10 },
      { all: 0, missed: 0, answered: 0 },
      { all: 0, missed: 0, answered: 0 },
      { all: 30, missed: 20, answered: 10 },
      { all: 20, missed: 5, answered: 15 },
      { all: 30, missed: 20, answered: 10 },
    ],
    chartData: [
      [
        "Date",
        "No Calls",
        { role: "style" },
        "Answered Calls",
        { role: "style" },
        "Missed Calls",
        { role: "style" },
      ],
      ["01", 0, "#E0E0E0", 0, "#E0E0E0", 0, "#E0E0E0"],
      ["02", 0, "#FAB4B7", 0, "#FAB4B7", 10, "#FAB4B7"],
      ["03", 0, "#E0E0E0", 0, "#E0E0E0", 0, "#E0E0E0"],
      ["04", 0, "#E0E0E0", 0, "#E0E0E0", 0, "#E0E0E0"],
      ["05", 0, "#FAB4B7", 0, "#FAB4B7", 10, "#FAB4B7"],
      ["06", 0, "#E0E0E0", 0, "#E0E0E0", 0, "#E0E0E0"],
      ["07", 0, "#E0E0E0", 1, "#13B9A8", 7, "#FAB4B7"],
      ["08", 0, "#E0E0E0", 0, "#E0E0E0", 0, "#E0E0E0"],
      ["09", 0, "#E0E0E0", 0, "#E0E0E0", 0, "#E0E0E0"],
      ["10", 0, "#E0E0E0", 0, "#E0E0E0", 0, "#E0E0E0"],
    ],

    chartOptions: {
      // isStacked: true,
      //  isStacked: 'relative',
      isStacked: "percent",
      width: 600,
      height: 400,
      bar: { groupWidth: "85%", groupHeight: "100%" },
      legend: { position: "none" },

      title: "Reports",
    },
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
    noCalls: false,
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
    VueSlickCarousel,
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
  },
  created() {
    let localStorageUserObj = JSON.parse(localStorage.getItem("tpu"));
    this.ownerUid =
      localStorageUserObj.role == "OWNER"
        ? localStorageUserObj.uid
        : localStorageUserObj.OwnerUid;
    this.AccountId = localStorageUserObj.AccountId;

    this.getAllCalls();
  },
  methods: {
    getHeight(value, total) {
      var height = (value / total) * 100;
      return height;
    },
    filterCalls(dates) {
      this.$refs.menu.save(dates);
      console.log("Filtering calls");
      this.getAllCalls();
    },
    forceRerenderKey() {
      this.rerenderKey++;
    },
    handleApplyFilter() {
      this.isUpdating = true;
      // this.filterMongo();
    },
    getAllCalls() {
      let callSummary = {
        Answered: 0,
        Missed: 0,
        Total: 0,
      };
      let agentWiseReport = {};
      let agentsObj = {};
      // let agentWiseClickCount = {};
      // let agentWiseDateWiseSummary = {};

      console.log(`GETTING CALLS with ${this.fromDate} ${this.toDate}`);

      db.collection("callLogs")
        .where("owneruid", "==", this.ownerUid)
        .where("date", ">=", new Date(this.fromDate))
        .where("date", "<=", new Date(this.toDate))
        .where("callstatus", "in", ["Answered", "Missed"])
        .orderBy("date", "desc")
        .get()
        .then(async (snapshot) => {
          if (!snapshot.empty) {
            this.noCalls = false;

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
                      agentWiseReport[doc.AgentUid]["agent_report"][[callDay]] =
                        {
                          Total: 0,
                          Missed: 0,
                          Answered: 0,
                        };
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
                      agentWiseReport[doc.AgentUid]["agent_report"][callDay] = {
                        Total: 0,
                        Missed: 0,
                        Answered: 0,
                      };
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