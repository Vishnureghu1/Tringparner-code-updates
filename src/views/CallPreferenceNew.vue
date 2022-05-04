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
                                                            <v-btn fab class="tpprimary--text"  x-small>1</v-btn>
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
          to: { name: 'CallPreferenceNew'},
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

