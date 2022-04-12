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
                      <h2 class="page_heading mt-6 mb-5">Report</h2>
                    </v-col>
                    <v-col cols="12" sm="2" align="end">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            class="mt-6 mb-5 mr-4"
                            v-bind="attrs"
                            v-on="on"
                            color="black"
                            >mdi-download</v-icon
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
                              
                              >{{ item.title }}</v-list-item-title
                            >
                          </v-list-item>
                        </v-list>
                      </v-menu>
                      <span>
                        <v-icon class="mt-6 mb-5 mr-7" color="black"
                          >mdi-dots-vertical</v-icon
                        >
                      </span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" sm="3">
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
                                class="red--text"
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
                                @click="$refs.menu.save(dates)"
                              >
                                Save
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col :key="rerenderKey" cols="6" sm="1" align="end">
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
                    <v-col cols="6" sm="1" align="end">
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
                    <v-col cols="6" sm="1" align="end">
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
                    <!-- <v-col cols="6" sm="1" align="end">
                      <v-card outlined color="transparent">
                        <h3
                          class="number_heading nunito-font light3"
                          align="center"
                        >
                          1
                        </h3>
                        <h6 class="comment_heading" align="center">Offline</h6>
                      </v-card>
                    </v-col> -->
                  </v-row>
                  <br />
                  <br />
                  <v-row no-gutters>
                    <v-col cols="12" sm="6" v-for="n in 3" :key="n">
                      <v-expansion-panels accordion flat>
                        <v-expansion-panel>
                          <v-expansion-panel-header>
                            <div>
                              <v-row no-gutters>
                                <v-col cols="2" flex>
                                  <h4
                                    class="name_heading font-weight-light mt-2"
                                  >
                                    Shinu
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
                          <v-expansion-panel-content>
                            <GChart
                              type="ColumnChart"
                              :data="chartData"
                              :options="chartOptions"
                            />
                            <v-row no-gutters>
                              <v-col cols="6" sm="3" align="center">
                                <v-card
                                  outlined
                                  color="transparent"
                                  class="nunito-font"
                                >
                                  <h2 align="center" class="nunito-font light3">
                                    100
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
                                    90
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
                                    10
                                  </h2>
                                  <h6 class="comment_heading" align="center">
                                    Not Answered
                                  </h6>
                                </v-card>
                              </v-col>
                             <!--  <v-col cols="6" sm="3" align="center">
                                <v-card
                                  outlined
                                  color="transparent"
                                  class="nunito-font"
                                >
                                  <h2 align="center" class="nunito-font light3">
                                    02
                                  </h2>
                                  <h6 class="comment_heading" align="center">
                                    Offline
                                  </h6>
                                </v-card>
                              </v-col> -->
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
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
import { GChart } from "vue-google-charts";
export default {
  data: () => ({
    options: [
      { title: "Download as XML", color: "gray--text", url: "exportxml" },
      { title: "Download as PDF", color: "gtay--text", url: "send" },
    ],
	//  filters: [
    //   { title: "Download as XML", color: "gray--text", url: "edit" },
    //   { title: "Download as PDF", color: "gtay--text", url: "send" },
    // ],
    dates: ["2021-12-22", "2021-12-25"],

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
      'Answered': 0,
      'Missed': 0,
      'Total': 0
    },
    rerenderKey: 0,
    agentWiseReport: {},
    agentWiseClickCount: {},
    agentWiseDateWiseSummary: {},
  }),
  components: {
    GChart,
  },

  computed: {
    dateRangeText() {
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
    forceRerenderKey() {
      this.rerenderKey++;
    },
    getAllCalls() {

      let callSummary = {
        'Answered' : 0,
        'Missed' : 0,
        'Total' : 0
      };
      let agentWiseReport = {};
      // let agentWiseClickCount = {};
      // let agentWiseDateWiseSummary = {};


      db.collection("callLogs")
        .where("owneruid", "==", this.ownerUid)
        .where("callstatus", "in", ['Answered', 'Missed'])
        .orderBy("dateTime", "desc")
        .get()
        .then(async (snapshot) => {
          if (!snapshot.empty) {
            snapshot.docs.forEach((element) => {
              // console.log({
              //   id: element.id,
              //   agentDetails: element.data().agentDetails,
              //   BusyCalleesAccounts: element.data().BusyCalleesAccounts,
              //   agentstatus_nw: element.data().agentstatus_nw,
              //   billableduration: element.data().billableduration,
              //   callerNumber: element.data().callerNumber,
              //   Notes: element.data().Notes,
              //   ClickCount: element.data().ClickCount,
              //   callerid: element.data().callerid,
              //   callstatus: element.data().callstatus,
              //   connectedto: element.data().connectedto,
              //   conversationduration: element.data().conversationduration,
              //   date: element.data().date,
              //   dateTime: element.data().dateTime,
              //   logDate: element.data().logDate,
              //   name: element.data().name,
              //   recordingurl: element.data().recordingurl,
              //   ringduration: element.data().ringduration,
              //   source: element.data().source,
              //   totalduration: element.data().totalduration,
              //   uniqueid: element.data().uniqueid,
              //   userid: element.data().userid,
              //   virtualnumber: element.data().virtualnumber,
              // });
              // console.log(element.data().agentDetails)

              let call = element.data();

              if ("agentDetails" in call) {
                console.log('has agentDetails ', call.callstatus);


                if(call.callstatus == 'Missed') {

                  callSummary.Missed++;
                  callSummary.Total++;

                } else if(call.callstatus == 'Answered') {
                  
                  callSummary.Answered++;
                  callSummary.Total++;

                }

                //agent Summary
                call.agentDetails.forEach(async (doc) => {
                  console.log(doc);

                  // agentWiseDateWiseSummary
                  if( agentWiseReport.indexOf(doc.AgentUid) > -1) {
                    console.log('HAS INDEX');
                  } else {
                    console.log('DONT HAVE INDEX');
                  }
                  // this.$set(this.agentWiseDateWiseSummary[doc.AgentUid], "Missed", 1)
                })

              } else  if ("BusyCalleesAccounts" in call) {
                console.log('has BusyCalleesAccounts ', call.callstatus);
                call.agentDetails.forEach(async (doc) => {
                  console.log(doc);
                })
              } else {

                console.log('----->', call.callstatus);
              }

            });

            console.log('callSummary', callSummary);
            // console.log('this.agentWiseDateWiseSummary', this.agentWiseDateWiseSummary);
            this.callSummary = callSummary;

           //  this.$set(this.mapMatrix[i],g,
           //     {
           //         "view" : view,
           //         "available" : true,
           //         "active": false
           //   }
           // );
            this.forceRerenderKey();

          } else {
            console.log("snapshot empty");
          }
        });


    }
  }
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