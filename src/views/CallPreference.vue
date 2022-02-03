<template>
    <v-app >
        <div>
            <v-container  fluid>
                <v-layout >
                    <v-flex xs12 sm12 md12>
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <div class="ml-8">
                                        <v-row>
                                            <v-col cols="12" sm="10">
                                                <h2 class="page_title mt-6   ml-5">Call Preference</h2>
                                                <v-breadcrumbs class="breadcrumbs" :items="items">
                                                    <template class="breadcrumbs" v-slot:divider>
                                                        <v-icon>mdi-chevron-right</v-icon>
                                                    </template>
                                                </v-breadcrumbs>
                                            </v-col>
                                        </v-row>
                                            
                                        <v-card color="transparent" outlined class="mt-5" max-width="1069">
                                        <!-- <v-card color="transparent" outlined class="mt-5" max-width="1069" v-for="(item,i) in 2" :key="i"> -->
                                            <!-- <v-row>
                                                <v-col cols="12" sm='6'>
                                                    <div class="name_heading mt-1 ml-5">Name {{i+1}} </div>
                                                    <div class="number_heading mt-2 ml-5">+91 8891978085 </div>
                                                </v-col>
                                                <v-col cols="12" sm='6' align="end">
                                                    <v-icon v-bind="attrs" v-on="on" color="black" >mdi-dots-vertical</v-icon>
                                                </v-col>
                                                <v-col cols="12" sm='6'>
                                                    <div class="link_style mt-1 ml-5">Manage Agents </div>
                                                </v-col>
                                                <v-col cols="12" sm='6' align="end">
                                                    <v-icon v-bind="attrs" v-on="on" color="#EE1C25" >mdi-arrow-right</v-icon>
                                                </v-col>											
                                                <v-col cols="12" sm='6'>
                                                    <div class="link_style mt-1 ml-5 mb-5" @click="CallFlowSettings()">Call Flow Settings </div>
                                                </v-col>
                                                <v-col cols="12" sm='6' align="end">
                                                    <v-icon v-bind="attrs" v-on="on" color="#EE1C25" @click="CallFlowSettings()" >mdi-arrow-right</v-icon>
                                                </v-col>
                                            </v-row> -->
<!-- STEPPER -->
 <!-- <h1 class="mb-0">Vuetify Stepper with Validation</h1>
            <div class="overline mb-4">Colored status, error icons &amp; completion</div>
            <v-stepper v-model="curr" color="green">
                <v-stepper-header class="overflow-x-auto">
                    <v-stepper-step 
                        v-for="(step,n) in steps"
                        :key="n"
                        :complete="stepComplete(n+1)"
                        :step="n+1"
                        :rules="[value => !!step.valid]" 
                        vertical="true"
                        :color="stepStatus(n+1)">
                        {{ step.name }}
                    </v-stepper-step>
                </v-stepper-header>
                <v-stepper-content v-for="(step,n) in steps" :step="n+1" :key="n">
                    {{ step.name }}
                    <v-card color="grey lighten-1" class="mb-12" height="200px">
                        <v-card-text>
                            <v-form :ref="'stepForm'" v-model="step.valid" lazy-validation>
                                <v-text-field label="Enter something..." :rules="step.rules"></v-text-field>
                            </v-form>
                        </v-card-text>
                    </v-card>
                    <v-btn v-if="n+1 < lastStep" color="primary" @click="validate(n)" :disabled="!step.valid">Continue</v-btn>
                    <v-btn v-else color="success" @click="done()">Done</v-btn>
                    <v-btn text @click="curr = n">Back</v-btn>
                </v-stepper-content>
            </v-stepper> -->
<!-- STEPPER -->
<!-- STEPPER2 -->
                <v-layout >
                    <v-flex xs12 sm12 md12>
                        <v-row no-gutters>
                            <v-col cols="12">
                                <div class="ml-8">
                                    <v-row>
                                        <v-col cols="12" sm="4">
                                            <div class="heading mt-2 mb-1">Set up your call preferences</div>
                                            <div class="sub_heading mt-1 mb-5">In publishing and graphic design</div>
                                        </v-col>
                                        <v-col cols="12" sm="8" align="center">
                                            
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="3">
                                        </v-col>
                                            <v-col cols="12" sm="9" align="center">
                                                <v-row align="center">
                                                    <v-col cols="6" sm="1" align="end">
                                                    <!-- <v-card outlined color="transparent" class=""> -->
                                                        <v-btn fab class="tpred" dark x-small>1</v-btn>
                                                    <!-- </v-card> -->
                                                    </v-col>
                                                    <v-col cols="6" sm="2" align="end">
                                                        <div class="stepper_active">Manage User</div>
                                                    </v-col>
                                                    <v-col cols="6" sm="1" align="end">												
                                                        <div class="dashed_border"></div>
                                                    </v-col>
                                                    <v-col cols="6" sm="1" align="left">
                                                            <v-btn fab class="tpred--text"  x-small>1</v-btn>
                                                    </v-col>
                                                    <v-col cols="6" sm="3" align="left">
                                                        <div class="stepper_inactive">Call Routing Setting</div>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="2">
                                        </v-col>
                                            <v-col cols="12" sm="10" align="center">
                                                <v-row justify="space-between">
                                                    <v-col cols="6" sm="4" align="left">
                                                    <v-card outlined color="transparent" class="mb-3">
                                                        <div class="section_title">Manage Call Agents</div>
                                                        <div class="section_sub_title mt-2">Select which all Users (Call Agents) are linked to this number. Distributions will happen amongst them.</div>
                                                    </v-card>
                                                    </v-col>
                                                    <v-col cols="6" sm="4"  align="end">
                                                    <v-card outlined color="transparent" class="mb-3">
                                                        <div class="add_agent">+ Add New Users (Call Agents)</div>
                                                    </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                    </v-row>
                                     
                                    <v-row>
                                        <v-col cols="12" sm="2">
                                        </v-col>
                                        <v-col cols="12" sm="10" align="center">
                                            <v-row   justify="space-between">
                                                <v-col cols="6" sm="6"  align="left">
                                                <v-card outlined color="transparent" class="mb-3">
                                                    <div class="agent_name">Shinu</div>
                                                    <div class="agent_role">Agent</div>
                                                    <div class="agent_number">+91 989999 9900</div>
                                                </v-card>
                                                </v-col>
                                                <v-col cols="6" sm="2"  align="end">
                                                <!-- <v-card outlined color="transparent" class="mb-3"> -->
                                                        <v-switch justify-right v-model="isActive" color="red" value="isActive" ></v-switch>
                                                <!-- </v-card> -->
                                                </v-col>
                                            </v-row>
                                            <v-divider></v-divider>
                                        </v-col>
                                    </v-row>
                                    
                                    <v-row>
                                        <v-col cols="12" sm="2">
                                        </v-col>
                                        <v-col cols="12" sm="10" align="center">
                                            <v-row   justify="space-between">
                                                <v-col cols="6" sm="6"  align="left">
                                                <v-card outlined color="transparent" class="mb-3">
                                                    <div class="agent_name">Shinu</div>
                                                    <div class="agent_role">Agent</div>
                                                    <div class="agent_number">+91 989999 9900</div>
                                                </v-card>
                                                </v-col>
                                                <v-col cols="6" sm="2"  align="end">
                                                <!-- <v-card outlined color="transparent" class="mb-3"> -->
                                                        <v-switch justify-right v-model="isActive" color="red" value="isActive" ></v-switch>
                                                <!-- </v-card> -->
                                                </v-col>
                                            </v-row>
                                            <v-divider></v-divider>
                                        </v-col>
                                    </v-row>
                                    
                                    <v-row>
                                        <v-col cols="12" sm="2">
                                        </v-col>
                                        <v-col cols="12" sm="10" align="center">
                                            <v-row   justify="space-between">
                                                <v-col cols="6" sm="6"  align="left">
                                                <v-card outlined color="transparent" class="mb-3">
                                                    <div class="agent_name">Shinu</div>
                                                    <div class="agent_role">Agent</div>
                                                    <div class="agent_number">+91 989999 9900</div>
                                                </v-card>
                                                </v-col>
                                                <v-col cols="6" sm="2"  align="end">
                                                <!-- <v-card outlined color="transparent" class="mb-3"> -->
                                                        <v-switch justify-right v-model="isActive" color="red" value="isActive" ></v-switch>
                                                <!-- </v-card> -->
                                                </v-col>
                                            </v-row>
                                            <v-divider></v-divider>
                                        </v-col>
                                    </v-row>
                                    
                                    <v-row>
                                        <v-col cols="12" sm="2">
                                        </v-col>
                                        <v-col cols="12" sm="10" align="center">
                                            <v-row   justify="space-between">
                                                <v-col cols="6" sm="6"  align="left">
                                                <v-card outlined color="transparent" class="mb-3">
                                                    <div class="agent_name">Shinu</div>
                                                    <div class="agent_role">Agent</div>
                                                    <div class="agent_number">+91 989999 9900</div>
                                                </v-card>
                                                </v-col>
                                                <v-col cols="6" sm="2"  align="end">
                                                <!-- <v-card outlined color="transparent" class="mb-3"> -->
                                                        <v-switch justify-right v-model="isActive" color="red" value="isActive" ></v-switch>
                                                <!-- </v-card> -->
                                                </v-col>
                                            </v-row>
                                            
                                        </v-col>
                                    </v-row>
                                    
                                    <v-row>
                                        <v-col cols="12" sm="2">
                                        </v-col>
                                        <v-col cols="12" sm="10" align="center">
                                            <div class="text-center">
                                                <v-btn class="rlr_button text-capitalize elevation-4  ma-3">Skip</v-btn>
                                                <v-btn class="wlr_button text-capitalize elevation-4 ma-3">Next</v-btn>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-col>
                        </v-row>
                    </v-flex>
                </v-layout>
<!-- STEPPER2 -->
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
  export default {

        components: {
        },
        created() {

    },
    data: () => ({
    isActive: true,


    curr: 1,
        lastStep: 4,
        steps: [
            {name: "Manage User", rules: [v => !!v || "Required."], valid: true},
            {name: "Call Routing Setting", rules: [v=> !!v || "Required."], valid: true},
            // {name: "Step 3", rules: [v => (v && v.length >= 4) || "Enter at least 4 characters."], valid: true},
            // {name: "Complete"},
        ],
        valid: false,
        stepForm: [],


      items: [
        {
          text: 'More',
          disabled: true,
          href: 'breadcrumbs_dashboard',
          color: 'Black'
        },
        {
          text: 'Business Numbers',
          disabled: false,
          to: { name: 'BusinessNumber'},
        },
        {
          text: 'CallFlow Settings',
          disabled: false,
          to: { name: 'CallFlowSettings'},
        },
        {
          text: 'Call Preference',
          disabled: true,
          to: { name: 'CallPreference'},
        },
      ],
    }),

    methods: {
        CallFlowSettings() {
            this.$router.push("/CallFlowSettings")
        },
        stepComplete(step) {
            return this.curr > step
        },
        stepStatus(step) {
            return this.curr > step ? 'green' : 'blue'
        },
        validate(n) {
            this.steps[n].valid = false
            let v = this.$refs.stepForm[n].validate()
            if (v) {
                this.steps[n].valid = true
                    // continue to next
                this.curr = n + 2
            }
        },
        done() {
            this.curr = 5
        }
    }
  }
  </script>

<style type="text/css">
.page-title {
    text-align: left;
    /*font: normal normal bold 23px/28px Lato;*/
    /*font-weight: bold;*/
    font-size: 23px;
    line-height: 28px;
  letter-spacing: 0px;
  color: #3B3B3B;
    opacity: 1;
}
.breadcrumbs {
    /*font: normal normal bold 10px/12px Lato;*/
    /*font-weight: bold;*/
    font-size: 10px;
    line-height: 12px;
    text-align: left;
    letter-spacing: 0px;
    color: #3B3B3B;
    opacity: 1;
}

.heading {
    /*font-family: 'lato', Bold;*/
      text-align: left;
    /*font: normal normal bold 24px/29px Lato;*/
    font-size: 24px;
    line-height: 29px;
    font-weight: bold;
    font-family: Lato, !important;
    letter-spacing: 0px;
    color: #3B3B3B;
    opacity: 1;
}
.sub_heading {
    /*font-family: 'lato', Regular;*/
    font-size: 16px;
    line-height: 22px;
    font-family: Nunito, !important;
    letter-spacing: 0px;
    color: #3B3B3B;
    opacity: 1;	
}
.stepper_active {
    text-align: left;
    /* font: normal normal medium 14px/16px Ubuntu; */
    font-weight: medium;
    font-size: 14px;
    line-height: 16px;
    font-family: Ubuntu, !important;
    letter-spacing: 0px;
    color: #EE1C25;
    opacity: 1;
}
.stepper_inactive {
    text-align: left;
    /* font: normal normal normal 14px/16px Ubuntu; */
    font-family: Ubuntu, !important;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0px;
    color: #808080;
    opacity: 1;
}
.dashed_border {
    border: 1px dashed #EE1C25;
    opacity: 1;
}
.section_title {
    text-align: left;
    /* font: normal normal bold 16px/19px Lato; */
    font-family: Lato, !important;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0px;
    color: #3B3B3B;
    opacity: 1;
}
.section_sub_title {
     text-align: left;
    font-family: Nunito, !important;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0px;
    color: #808080;
    opacity: 1;
}
.add_agent {
    /* text-align: left; */
    text-decoration: underline;
    font-family: Nunito, !important;
    font-weight: 16px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #EE1C25;
    opacity: 1;
}
.agent_name {
    text-align: left;
    font-family: Nunito, !important;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #3B3B3B;
}
.agent_role {
    text-align: left;
    font-family: Nunito, !important;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #3B3B3B;
}
.agent_number {
    text-align: left;
    font-family: Nunito, !important;
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #3B3B3B;
}
.skip_button {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #EE1C25;
    border-radius: 34px;
    opacity: 1;
}
.next_button {
    background: #EE1C25 0% 0% no-repeat padding-box;
    border-radius: 34px;
    opacity: 1;
}
.number_heading {
    /*font-family: 'Nunito', bold;*/
    font-weight: bold;
  font-size: 16px; 	
  color: #3B3B3B;
}
.comment_heading {
    /*font-family: 'lato', Regular;*/
  font-size: 12px;
  color: #808080;
}
.link_style{
    /*font-family: 'lato', Regular;*/
  font-size: 16px;	
    color: #EE1C25;
}
.nunito-title {
    text-align: left;
    /*font: normal normal bold 16px/22px Nunito;*/
    /*font-weight: bold;*/
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0px;
    color: #3B3B3B;
    opacity: 1;
}

  /*red letter square button*/
  .red_letter_rnd_button { 
    width: 140px;
    height: 39px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #EE1C25;
    border-radius: 34px;
    opacity: 1;
    margin-left: 20px;
    margin-top: 20px;
    text-align: center;
    font-family: Nunito, !important;
    font-weight: 300;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0px;
    color: #EE1C25;
    opacity: 1;
 }

 /*white letter square button*/
  .white_letter_rnd_button { 
    width: 140px;
    height: 39px;
    background: #EE1C25 0% 0% no-repeat padding-box;
    border-radius: 34px;
    opacity: 1;
 }

 /*red letter round button*/
  .wlr_button { 
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 34px;
  color: #FFFFFF !important;
  background-color: #EE1C25 !important;
  opacity: 1;
  width: 140px;
    height: 39px;
 }

   /*red letter round button*/
  .rlr_button { 
  background: #EE1C25 0% 0% no-repeat padding-box;
  border-radius: 34px;
  color: #EE1C25 !important;
  background-color: #FFFFFF !important;
  opacity: 1;
  width: 140px;
    height: 39px;
 }

</style>