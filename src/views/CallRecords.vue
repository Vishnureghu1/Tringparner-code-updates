<template>
  <v-app>
    <div>
      <h1>Call recoreds</h1>
      <v-col cols="12" sm="12" align="end" class="pt-6">
        <v-text-field
          v-show="true"
          absolute
          transition="slide-y-reverse-transition"
          append-icon="mdi-magnify"
          class="searchForm"
          label="Search"
          style="right: 153px"
          v-model="searchTearm"
          @input="inputTearm"
          single-line
        ></v-text-field>
      </v-col>
      <template>
        <div id="layoutCallLog" class="mt-10">
          <v-expansion-panels
            accordion
            flat
            v-if="paginatedData && paginatedData.length > 0"
            v-model="panel"
            multiple
          >
            <v-expansion-panel v-for="userContact in paginatedData" :key="userContact.Name">
              <v-expansion-panel-header expand-icon>
                <v-row
                  class="d-flex align-center justify-center"
                  align-content="center"
                  justify="center"
                >
                  <v-col cols="12" sm="10">
                    <h3 class="f16 nunito-font regular">
                      <div
                        class="pa-2 #FFEDEE rounded-circle name-ico d-inline-block mr-5 text-uppercase"
                        style="width: 30px; text-align: center"
                      >
                        <span v-html="userContact.initialContactName"></span>
                      </div>
                      <span v-html="userContact.name"></span>
                    </h3>
                  </v-col>
                  <v-col cols="12" sm="2" align="right">
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on" color="black">mdi-dots-vertical</v-icon>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(item, index) in items"
                          :key="index"
                          active-class="pink--text"
                        >
                          <v-list-item-title :class="item.color">{{ item.title }}</v-list-item-title>
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

                    <h5 class="font-weight-light">
                      <span v-html="userContact.callerNumber" />
                    </h5>
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
      </template>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "CallRecored",
  data() {
    return {
      show: false,
      panel: [],
      backupDataSearchData: [],
      searchTearm: "",
      page_number: 1,
      paginatedData: [],
      conData: [],
      newUserContactData: null,
      contactList: [],
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Nzk5NDUxMDA2NSwiQWNjb3VudElkIjo2LCJVaWQiOiJ5U0ZlVmRrVmJ2VDNVQks1ZkNlbEJIdnFIbDIyIiwicm9sZSI6Ik9XTkVSIiwiaWF0IjoxNjY5OTY4MTE3fQ.t582dwjYm8XRUZ6eUjxCECm7vWHBHqRIYaMuJnjznKY"
    };
  },
  mounted() {
    this.getCallRecord();
  },
  created() {
    this.scrollElement();
    window.addEventListener("scroll", e => {
      const bottom =
        e.target.scrollingElement.scrollHeight -
          e.target.scrollingElement.scrollTop ===
        e.target.scrollingElement.clientHeight;
      if (bottom) {
        this.$root.vtoast.show({
          message: "No more contacts",
          color: "red",
          timer: 2000
        });
      }
    });
  },
  methods: {
    getFirstLetter(conData) {
      return conData?.name
        ?.replace("<mark>", "")
        .replace("</mark>", "")
        .toUpperCase()[0];
    },
    inputTearm() {
      if (!this.searchTearm) {
        this.paginatedData = this.backupDataSearchData;
        this.panel = [];
        return;
      }

      let replacedCharData;

      this.paginatedData = this.backupDataSearchData;
      let filterdData = this.paginatedData
        .filter(con => {
          return (
            con?.name?.toLowerCase().includes(this.searchTearm.toLowerCase()) ||
            con?.callerNumber?.includes(this.searchTearm)
          );
        })
        .map(obj => ({
          ...obj,
          name: obj.name
            .toLowerCase()
            .replace(
              this.searchTearm.toLowerCase(),
              `<mark>${this.searchTearm}</mark>`
            ),
          callerNumber: obj.callerNumber.replace(
            this.searchTearm,
            `<mark>${this.searchTearm}</mark>`
          )
        }));

      replacedCharData = filterdData;
      this.paginatedData = replacedCharData;
      this.panel = Array.from(Array(replacedCharData.length + 1).keys());
    },
    scrollElement() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        console.log(">>>>>>>>>>>>>", bottomOfWindow);
        if (bottomOfWindow) {
          this.page_number++;
          this.getCallRecord();
        }
      };
    },
    async getCallRecord() {
      const token = this.token;
      const headers = {
        "Content-Type": "application/json",
        token: token
      };

      let data = {
        headers:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMwNmQ1NjY1YzZmNGU4NTk4MDBkNGMiLCJpYXQiOjE2NDAwMDQ2OTN9.7VPtc5_xb6_4Feds3zdAZw9VZdOeq0rvwp425m0efE0",
        url: "http://35.244.46.144:5000/api/calllogs/paginate",
        payload: {
          page_number: this.page_number,
          results_per_page: 20,
          conditions: {
            owneruid: "ySFeVdkVbvT3UBK5fCelBHvqHl22"
          },
          sort: {
            dateTime: -1
          }
        }
      };

      try {
        const result = await axios.post(
          "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/web/admin/mongo",
          data,
          { headers }
        );
        this.contactList.push(result.data.data);

        let contactData = JSON.stringify(this.contactList);

        localStorage.setItem("usersCallRecords", contactData);

        var jsonMyContacts = JSON.parse(
          localStorage.getItem("usersCallRecords")
        );
        var newObj = jsonMyContacts.reduce((a, b) => Object.assign(a, b), {});

        this.newUserContactData = newObj;
        let userContactNameAndNumber = this.newUserContactData.dataset.map(
          element => {
            return {
              ...element,
              name: element?.name[0],
              callerNumber: element?.callerNumber,
              initialContactName: element.name[0].charAt(0)
            };
          }
        );
        let removeEmptyData = userContactNameAndNumber.filter(
          item => item?.name && item.callerNumber
        );
        removeEmptyData.forEach(con => this.paginatedData.push(con));
        this.backupDataSearchData = this.paginatedData;
      } catch (error) {
        console.error("error >>", error);
      }
    }
  }
};
</script>

<style>
.firstname {
  margin-right: 96%;
}
.firstletter {
  background: darksalmon;
  border-radius: 100%;
  padding: 8px;
}
.number {
  text-align: left;
}
.expansion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>