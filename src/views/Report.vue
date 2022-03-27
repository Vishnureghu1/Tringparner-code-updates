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
                      <span
                        ><v-icon class="mt-6 mb-5 mr-4" color="black"
                          >mdi-download</v-icon
                        >
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
                    <v-col cols="6" sm="1" align="end">
                      <v-card outlined color="transparent" class="">
                        <h3 class="number_heading" align="start">100</h3>
                        <h6 class="comment_heading" align="start">
                          Total Calls
                        </h6>
                      </v-card>
                    </v-col>
                    <v-col cols="6" sm="1" align="end">
                      <v-card outlined color="transparent">
                        <h3 class="number_heading" align="start">90</h3>
                        <h6 class="comment_heading" align="start">Answered</h6>
                      </v-card>
                    </v-col>
                    <v-col cols="6" sm="1" align="end">
                      <v-card outlined color="transparent">
                        <h3 class="number_heading" align="start">10</h3>
                        <h6 class="comment_heading" align="start">
                          Not Answered
                        </h6>
                      </v-card>
                    </v-col>
                    <v-col cols="6" sm="1" align="end">
                      <v-card outlined color="transparent">
                        <h3 class="number_heading" align="start">1</h3>
                        <h6 class="comment_heading" align="start">Offline</h6>
                      </v-card>
                    </v-col>
                  </v-row>
                  <br />
                  <br />
                  <v-row no-gutters>
					  {{chartData}}
					  <GChart
    type="ColumnChart"
    :data="chartData"
    :options="chartOptions"
  />
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
import { GChart } from "vue-google-charts";
export default {
  data: () => ({
    dates: ["2021-12-22", "2021-12-25"],

  chartData: [
        ['Date', 'No Calls',{ role: "style" }, 'Answered Calls',{ role: "style" }, 'Missed Calls', { role: "style" }],
        ['01', 1,"#c8c8c8", 0,"#c8c8c8",  0, "#c8c8c8"],
        ['02', 1,"#ff9a9a",0, "#ff9a9a", 10, "#ff9a9a"],
        ['03', 1,"#c8c8c8", 0,"#c8c8c8",  0, "#c8c8c8"],
        ['04', 1,"#c8c8c8", 0,"#c8c8c8",  0, "#c8c8c8"],
        ['05', 0,"#ff9a9a", 0, "#ff9a9a", 10, "#ff9a9a"], 
        ['06', 1,"#c8c8c8", 0,"#c8c8c8",  0, "#c8c8c8"],
        ['07', 0, "#c8c8c8",1,"#1dca98",  7, "#ff9a9a"],
        ['08', 1,"#c8c8c8", 0,"#c8c8c8",  0, "#c8c8c8"],
        ['09', 1,"#c8c8c8", 0,"#c8c8c8",  0, "#c8c8c8"],
        ['10', 1,"#c8c8c8", 0,"#c8c8c8",  0, "#c8c8c8"],

      ],

      chartOptions: {
		 
width: 600,
        height: 400,
        legend: { position: 'top', maxLines: 3 },

        // isStacked: true,
		    //  isStacked: 'relative',
			  isStacked: 'percent',
			 width: 600,
        height: 400,
        bar: {groupWidth: "85%", groupHeight: "100%"},legend: { position: "none" },
       
          title: 'Reports',
         
       

      }
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
  font-family: "Nunito", light;
  font-size: 37px;
  color: #3b3b3b;
}
.comment_heading {
  font-family: "Nunito", Regular;
  font-size: 10px;
  color: #808080;
}
</style>