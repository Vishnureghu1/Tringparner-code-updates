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
                      <h2 class="page_title mt-6 mb-0">Dashboard</h2>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6" c>
                      <v-row class="heading mt-0 mb-2 pl-4" align="center">
                        <Icon
                          class="mr-0"
                          :inline="true"
                          color="red"
                          icon="mdi:call-missed"
                          width="24"
                          height="24"
                        >
                        </Icon>

                        <div class="mx-2">Today's Missed Open Calls</div>
                      </v-row>
                      <h4 class="heading mt-0 mb-2"></h4>
                      <v-row v-if="!missedCallPanel.length">
                        <v-col cols="12" align="left" class="pl-15">
                          No Calls to Show
                        </v-col>
                      </v-row>

                      <v-expansion-panels
                        accordion
                        flat
                        v-model="missedCallPanel"
                      >
                        <v-expansion-panel
                          v-for="(agentId, key, index) in missedCalls"
                          :key="index"
                        >
                          <v-expansion-panel-header
                            v-if="getAgentNameAndCalls(agentId) != ''"
                          >
                            <div>
                              <v-row no-gutters>
                                <v-col cols="12" flex>
                                  <h4
                                    class="name_heading background font-weight-light mt-2"
                                  >
                                    <span>

                                      {{
                                        getAgentNameAndCalls(
                                          agentId,
                                        "missed_calls"
                                      )
                                    }}
                                        </span>
                                  </h4>
                                 
                                </v-col>
                           
                              </v-row>
                            </div>
                          </v-expansion-panel-header>

                          <v-expansion-panel-content
                            v-for="(calls, innerIndex) in getCallDetails(
                              agentId
                            )"
                            :key="innerIndex"
                            :class="innerIndex <= 5 ? 'show' : 'hide'"
                          >
                            <v-row v-if="innerIndex <= 4">
                              <v-col cols="12" sm="10">
                                <h3 class="number_heading font-weight-light">
                                  {{ calls.callerNumber }}
                                </h3>
                                <h6 class="comment_heading font-weight-light">
                                  {{ calls.callTime }}
                                </h6>
                              </v-col>

                              <v-col cols="12" sm="12" v-if="innerIndex == 4">
                                <div
                                  class="link_style mt-1 ml-0 center"
                                  align="center"
                                  @click="viewMissedCalls()"
                                >
                                  Show All Missed Calls
                                  <v-icon
                                    v-bind="attrs"
                                    v-on="on"
                                    color="#EE1C25"
                                    >mdi-arrow-right</v-icon
                                  >
                                </div>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>

                      <h4 class="heading mb-2 mt-5">
                        <v-icon color="black" class="mr-2"
                          >mdi-call-split</v-icon
                        >
                        Today's Skipped Calls
                      </h4>
                      <v-row v-if="!skippedCallPanel.length">
                        <v-col cols="12" align="left" class="pl-15">
                          No Calls to Show
                        </v-col>
                      </v-row>
                      <v-expansion-panels
                        accordion
                        flat
                        v-model="skippedCallPanel"
                      >
                        <v-expansion-panel
                          v-for="(agentId, index) in skippedCalls"
                          :key="index"
                        >
                          <v-expansion-panel-header>
                            <div>
                              <v-row no-gutters>
                                <v-col cols="2" flex>
                                  <h4
                                    class="name_heading background font-weight-light mt-2"
                                  >
                                   <span>

                                     {{
                                       getAgentNameAndCalls(
                                         agentId,
                                        "skipped_calls"
                                      )
                                    }}
                                        </span>
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
                          <v-expansion-panel-content
                            v-for="(calls, innerIndex) in getCallDetailsSkipped(
                              agentId
                            )"
                            :key="innerIndex"
                          >
                            <v-row>
                              <v-col cols="12" sm="10">
                                <h3 class="number_heading font-weight-light">
                                  {{ calls.callerNumber }}
                                </h3>
                                <h6 class="comment_heading font-weight-light">
                                  {{ calls.callTime }}, {{ calls.agentName }}
                                </h6>
                                <br />
                              </v-col>
                              <v-spacer></v-spacer>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-col>

                    <v-col cols="6" align="center">
                      <h4 class="heading">
                        <v-icon class="mt-3 mb-2 mr-3 pl-10" color="black"
                          >mdi-alarm</v-icon
                        >
                        Today's Reminders
                      </h4>

                      <v-row v-if="!reminderCalls.length">
                        <v-col cols="12" align="left" class="pl-15">
                          <div class="mb-3 mt-0 pl-5 ml-5">
                            No Reminders to Show
                          </div>
                        </v-col>
                      </v-row>

                      <v-expansion-panels
                        accordion
                        flat
                        v-model="remiderCallsPanel"
                      >
                        <v-expansion-panel
                          v-for="(agentId, index) in reminderCalls"
                          :key="index"
                        >
                          <v-expansion-panel-header
                            v-if="getAgentNameAndReminders(agentId) != ''"
                          >
                            <div>
                              <v-row no-gutters>
                                <v-col cols="12" flex>
                                  <h4
                                    class="
                                      name_heading background
                                      font-weight-light
                                      mt-2
                                      ml-15
                                    "
                                  ><span>

                                    {{
                                      getAgentNameAndReminders(
                                        agentId,
                                        "reminder_calls"
                                      )
                                    }}
                                        </span>
                                  </h4>
                                </v-col>
                              
                               
                              </v-row>
                            </div>
                          </v-expansion-panel-header>

                          <v-expansion-panel-content
                            v-for="(reminder, index) in getCallDetailsReminder(
                              agentId
                            )"
                            :key="index"
                            class="mb-3 mt-5 mt-2 pl-10 ml-5"
                          >
                            <h4
                              class="number_heading font-weight-light mr-15"
                              align="left"
                            >
                              {{ reminder.CustomerNumber }}
                            </h4>
                            <div class="mr-16">
                              <h5
                                align="left"
                                class="
                                  comment_heading
                                  font-weight-light
                                  mr-16
                                  mt-1
                                "
                              >
                                {{ reminder.Message }}<br />at
                                {{ reminder.ReminderAt }}
                              </h5>
                            </div>
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
import firebase from "firebase";
import { Icon } from "@iconify/vue2";
import { db } from "@/main.js";
import moment from "moment";

export default {
  components: {
    Icon,
  },
  data: () => ({
    agentPanel: [],
    nextTodoId: 1,
    userEmail: "",
    userRole: "",
    agentName: "",
    missedCallPanel: [],
    skippedCallPanel: [],
    remiderCallsPanel: [],
    remiderCalls: [],
    agentNames: {},
    agentReminderNames: {},
    callCount: 0,
    c: 1,
    today: new Date().toISOString().substr(0, 10),
    // today: new Date().getTime(),
    reminderCalls: [],
  }),

  async created() {
    this.GetMissedCall();
    this.GetSkippedCall();
    this.GetRemiders();
  },
  computed: {
    missedCalls() {
      const missedCalls = new Set();
      this.missedCallPanel.forEach((missed) => missedCalls.add(missed.agentId));
      return Array.from(missedCalls);
    },

    skippedCalls() {
      const skippedCalls = new Set();
      this.skippedCallPanel.forEach((skipped) =>
        skippedCalls.add(skipped.agentId)
      );
      return Array.from(skippedCalls);
    },
    getAgentNameAndCalls() {
      // var valObj = this.agentNames[agentId];
      // return `${valObj.name} (${valObj.missed_calls} )`;

      return (agentId, type) =>
        `${this.agentNames[agentId]["name"]} (${this.agentNames[agentId][type]})`;
    },
    getAgentNameAndReminders() {
      return (agentId, type) =>
        `${this.agentReminderNames[agentId]["name"]} (${this.agentReminderNames[agentId][type]})`;
    },
  },
  methods: {
    getCount() {
      return this.c++;
    },
    isToday(timestampInMilliseconds) {
      var todayDate = new Date().toLocaleString().split(",")[0];
      var reminderDate = new Date(parseInt(timestampInMilliseconds))
        .toLocaleString()
        .split(",")[0];
      if (todayDate == reminderDate) {
        return true;
      } else {
        return false;
      }
    },
    getCallDetails(agentId) {
      return this.missedCallPanel.filter(
        (missed) => missed.agentId === agentId
      );
    },
    viewMissedCalls() {
      this.$router.push("/missed_calls").catch(() => {});
    },
    // skipped
    getCallDetailsSkipped(agentId) {
      return this.skippedCallPanel.filter(
        (skipped) => skipped.agentId === agentId
      );
    },
    getCallDetailsReminder(agentId) {
      return this.remiderCallsPanel.filter(
        (reminder) => reminder.AgentUid === agentId
      );
    },
    //get agent name
    // getAgentNameAndCalls(agentId) {
    //   var valObj = this.agentNames[agentId];
    //   return `${valObj.name} (${valObj.missed_calls} )`;
    // },

    async GetMissedCall() {
      let localStorageUserObj = localStorage.getItem("tpu");

      if (localStorageUserObj) {
        let parsedUser = JSON.parse(localStorageUserObj);
        this.ownerUid =
          parsedUser.role == "OWNER" ? parsedUser.uid : parsedUser.OwnerUid;
        this.userEmail = parsedUser.Email;
        this.userRole = parsedUser.role;
        this.userId = parsedUser.uid;
        console.log("this.today", this.today);

        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.uid = user.uid;
            let calllogsDb = db
              .collection("callLogs")
              .where("callstatus", "==", "Missed");
            if (this.userRole !== "AGENT") {
              calllogsDb = calllogsDb.where("owneruid", "==", this.ownerUid);
              console.log("this.userRole", this.userRole);
            } else {
              calllogsDb = calllogsDb.where(
                "userid",
                "array-contains",
                this.userId
              );
            }
            calllogsDb = calllogsDb
              .where("date", ">=", new Date(this.today))
              .orderBy("date", "desc");
            // .get()
            // .then((querySnapshot) => {
            calllogsDb
              .onSnapshot((querySnapshot) => {
                console.log(
                  "GetMissedCall querySnapshot.size",
                  querySnapshot.size
                );

                querySnapshot.docs.forEach((logs) => {
                  console.log(
                    "logs.data().agentDetails",
                    logs.data().agentDetails
                  );
                  var agentData = logs.data().agentDetails;
                  agentData.forEach((agentData) => {
                    var agentID = agentData.AgentUid;
                    var agentName = agentData.Name;
                    var callerNumber =
                      "+91 " +
                      logs.data().callerNumber.slice(0, 5) +
                      " " +
                      logs.data().callerNumber.slice(5, 7) +
                      " " +
                      logs.data().callerNumber.slice(7, 11);
                    // console.log(callerNumber);

                    var timestamp = logs.data().dateTime;
                    var date = new Date(timestamp);
                    var call_time = moment(date).format("hh:mm a");
                    call_time = moment(date).fromNow();

                    //
                    if (agentName != "") {
                      this.missedCallPanel.push({
                        id: this.nextTodoId++,
                        callTime: call_time,
                        callerNumber: callerNumber,
                        ringduration: "00:" + logs.data().ringduration,
                        agentId: agentID,
                        agentName: agentName,
                        callCount: this.callCount++,
                      });
                    }

                    if (!([agentID] in this.agentNames)) {
                      this.$set(this.agentNames, agentID, {
                        name: agentName,
                        missed_calls: 1,
                        skipped_calls: 0,
                      });
                    } else {
                      let incrCnt = this.agentNames[agentID].missed_calls + 1;
                      console.log("incrCnt", incrCnt);
                      this.$set(this.agentNames, agentID, {
                        name: agentName,
                        missed_calls: incrCnt,
                        skipped_calls: 0,
                      });
                    }
                  });
                });
              })
              .catch((error) => {
                console.log("Error getting logs: ", error);
              });
          }
        });
      }
    },

    async GetSkippedCall() {
      let localStorageUserObj = localStorage.getItem("tpu");

      if (localStorageUserObj) {
        let parsedUser = JSON.parse(localStorageUserObj);

        this.ownerUid =
          parsedUser.role == "OWNER" ? parsedUser.uid : parsedUser.OwnerUid;
        this.userEmail = parsedUser.Email;
        this.userRole = parsedUser.role;
        this.userId = parsedUser.uid;

        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.uid = user.uid;
            let calllogsDb = db
              .collection("callLogs")
              .where("callstatus", "==", "Answered");
            if (this.userRole !== "AGENT") {
              calllogsDb = calllogsDb.where("owneruid", "==", this.ownerUid);
            } else {
              calllogsDb = calllogsDb.where(
                "userid",
                "array-contains",
                this.userId
              );
            }
            calllogsDb = calllogsDb
              .where("date", ">=", new Date(this.today))
              .orderBy("date", "asc");
            // .get()
            // .then((querySnapshot) => {
            calllogsDb
              .onSnapshot((querySnapshot) => {
                console.log(
                  "GetSkippedCall querySnapshot.size",
                  querySnapshot.size
                );

                querySnapshot.docs.forEach((logs) => {
                  // var agentData = logs.data().agentDetails;
                  //skipped calls needs to check BusyCalleesAccounts
                  var agentData = logs.data().BusyCalleesAccounts;
                  agentData.forEach((agentData) => {
                    var agentID = agentData.AgentUid;
                    var agentName = agentData.Name;
                    var callerNumber =
                      "+91 " +
                      logs.data().callerNumber.slice(0, 5) +
                      " " +
                      logs.data().callerNumber.slice(5, 7) +
                      " " +
                      logs.data().callerNumber.slice(7, 11);
                    // console.log(callerNumber);
                    var timestamp = logs.data().dateTime;
                    var date = new Date(timestamp);
                    var call_time = moment(date).format("hh:mm a");
                    call_time = moment(date).fromNow();

                    this.skippedCallPanel.push({
                      callTime: call_time,
                      callerNumber: callerNumber,
                      ringduration: "00:" + logs.data().ringduration,
                      agentId: agentID,
                      agentName: agentName,
                    });

                    if (!([agentID] in this.agentNames)) {
                      this.$set(this.agentNames, agentID, {
                        name: agentName,
                        missed_calls: 0,
                        skipped_calls: 1,
                      });
                    } else {
                      let mc = this.agentNames[agentID].missed_calls;
                      let incrCnt = this.agentNames[agentID].skipped_calls + 1;
                      this.$set(this.agentNames, agentID, {
                        name: agentName,
                        missed_calls: mc,
                        skipped_calls: incrCnt,
                      });
                    }
                  });
                });
              })
              .catch((error) => {
                console.log("Error getting logs: ", error);
              });
          }
        });
      }
    },

    async GetRemiders() {
      let localStorageUserObj = localStorage.getItem("tpu");

      if (localStorageUserObj) {
        let parsedUser = JSON.parse(localStorageUserObj);

        this.ownerUid =
          parsedUser.role == "OWNER" ? parsedUser.uid : parsedUser.OwnerUid;

        this.userEmail = parsedUser.Email;

        this.userRole = parsedUser.role;

        firebase.auth().onAuthStateChanged((user) => {
          if (user && this.userRole != "AGENT") {
            this.uid = user.uid;

            db.collection("Reminders")
              .where("OwnerUid", "==", this.ownerUid)
              .orderBy("ReminderAt", "desc")
              // .get()
              // .then((querySnapshot) => {
              .onSnapshot((querySnapshot) => {
                console.log("reminder querySnapshot.size", querySnapshot.size);

                this.remiderCallsPanel = [];
                this.remiderCalls = [];

                querySnapshot.docs.forEach((logs) => {
                  if (this.isToday(parseInt(logs.data().ReminderAt))) {
                    // let callerNumber = logs.data().Number?.toString();
                    let CallerNo = logs.data().Number?.toString();

                    var callerNumber =
                      "+91 " +
                      CallerNo.slice(0, 5) +
                      " " +
                      CallerNo.slice(5, 7) +
                      " " +
                      CallerNo.slice(7, 11);

                    let CustomerNo = logs.data().CustomerNumber
                      ? logs.data().CustomerNumber?.toString()
                      : logs.data().Number?.toString();
                    var CustomerNumber =
                      "+91 " +
                      CustomerNo.slice(0, 5) +
                      " " +
                      CustomerNo.slice(5, 7) +
                      " " +
                      CustomerNo.slice(7, 11);

                    var timestamp = logs.data().ReminderAt;
                    var date = new Date(parseInt(timestamp));
                    var call_time = moment(date).format("DD-MM-YYYY hh:mm a");
                    console.log("CallId", logs.data().CallId);

                    this.remiderCallsPanel.push({
                      ReminderAt: call_time,
                      callerNumber: callerNumber,
                      CustomerNumber: CustomerNumber,
                      AgentName: logs.data().Name,
                      AgentUid: logs.data().AgentUid,
                      Message: logs.data().Message,
                      Type: logs.data().Type,
                    });

                    //set agent reminder count
                    let AgentUid = logs.data().AgentUid;
                    if (!([AgentUid] in this.agentReminderNames)) {
                      this.reminderCalls.push(AgentUid);
                      this.$set(this.agentReminderNames, AgentUid, {
                        name: logs.data().Name,
                        reminder_calls: 1,
                      });
                    } else {
                      let incrCnt =
                        this.agentReminderNames[AgentUid].reminder_calls + 1;
                      console.log("incrCnt", incrCnt);
                      this.$set(this.agentReminderNames, AgentUid, {
                        name: logs.data().Name,
                        reminder_calls: incrCnt,
                      });
                    }
                    //set agent reminder count
                  }
                });
              });
            // .catch((error) => {
            //   console.log("Error getting logs: ", error);
            // });
          } else {
            this.uid = user.uid;
            db.collection("Reminders")
              .where("AgentUid", "==", this.uid)
              // .where('ReminderAt',"==", new Date().getTime())
              .orderBy("ReminderAt", "desc")
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((logs) => {
                  // console.log(logs.data());

                  if (this.isToday(parseInt(logs.data().ReminderAt))) {
                    let CallerNo = logs.data().Number?.toString();
                    var callerNumber =
                      "+91 " +
                      CallerNo.slice(0, 5) +
                      " " +
                      CallerNo.slice(5, 7) +
                      " " +
                      CallerNo.slice(7, 11);

                    let CustomerNo = logs.data().CustomerNumber
                      ? logs.data().CustomerNumber?.toString()
                      : logs.data().Number?.toString();
                    var CustomerNumber =
                      "+91 " +
                      CustomerNo.slice(0, 5) +
                      " " +
                      CustomerNo.slice(5, 7) +
                      " " +
                      CustomerNo.slice(7, 11);

                    var timestamp = logs.data().ReminderAt;
                    var date = new Date(timestamp);
                    var call_time = moment(date).format("hh:mm a");
                    call_time = moment(date).fromNow();

                    this.remiderCallsPanel.push({
                      ReminderAt: call_time,
                      callerNumber: callerNumber,
                      CustomerNumber: CustomerNumber,
                      AgentName: logs.data().Name,
                      AgentUid: logs.data().AgentUid,
                      Message: logs.data().Message,
                      Type: logs.data().Type,
                    });
                  }

                  let AgentUid = logs.data().AgentUid;
                  if (!([AgentUid] in this.agentReminderNames)) {
                    this.reminderCalls.push(AgentUid);
                    this.$set(this.agentReminderNames, AgentUid, {
                      name: logs.data().Name,
                      reminder_calls: 1,
                    });
                  } else {
                    let incrCnt =
                      this.agentReminderNames[AgentUid].reminder_calls + 1;
                    console.log("incrCnt", incrCnt);
                    this.$set(this.agentReminderNames, AgentUid, {
                      name: logs.data().Name,
                      reminder_calls: incrCnt,
                    });
                  }
                });
              })
              .catch((error) => {
                console.log("Error getting logs: ", error);
              });
          }
        });
      }
    },
  },
};
</script>

