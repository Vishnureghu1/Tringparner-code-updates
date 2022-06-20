<template>
    <v-app>
        <v-container fluid>
            <v-snackbar :timeout="timeout" v-model="notes_added" :bottom="bottom" :right="right" color="green" text>
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
                Number unblocked successfully!</v-snackbar>
            <v-layout>
                <v-flex xs12 sm12 md12>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <div class="ml-3">
                                <v-row>
                                    <v-col cols="12" sm="5">
                                        <h2 class="mt-6 mb-5">Call Log</h2>

                                        <v-progress-linear :active="isUpdating" :indeterminate="isUpdating" absolute
                                            bottom color="deep-purple accent-4"></v-progress-linear>
                                    </v-col>
                                    <v-col cols="12" sm="7" align="end" class="pt-6">
                                        <v-text-field v-show="!hidden" absolute transition="slide-y-reverse-transition"
                                            append-icon="mdi-magnify" class="searchForm" label="Search"
                                            v-model="searchTerm" @input="updateSearchTerm" single-line></v-text-field>

                                        <v-menu v-model="filtermenu" :close-on-content-click="false" :nudge-width="200"
                                            offset-x>
                                            <template v-slot:activator="{ on, attrs }">
                                                <span class="pr-7">
                                                    <v-icon class="mt-0 mb-5 mr-4" color="black"
                                                        @click="hidden = !hidden">mdi-magnify</v-icon>
                                                    <v-badge v-if="showBadge == true" dot overlap>
                                                        <v-icon class="mt-0 mb-5 mr-0" color="black" v-bind="attrs"
                                                            v-on="on">mdi-filter-variant
                                                        </v-icon>
                                                    </v-badge>
                                                    <span v-if="showBadge == false" overlap>
                                                        <v-icon class="mt-0 mb-5 mr-0" color="black" v-bind="attrs"
                                                            v-on="on">mdi-filter-variant
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
                            <v-expansion-panel>
                                <v-expansion-panel-header expand-icon="">
                                    <v-row class="d-flex  align-center justify-center" align-content="center"
                                        justify="center">
                                        <v-col cols="12" sm="1" class="pl-10">
                                            <h3 class="f16 nunito-font regular">
                                                <div class="pa-4 #FFEDEE rounded-circle name-ico d-inline-block">A</div>

                                            </h3>
                                        </v-col>
                                        <v-col cols="12" sm="9">
                                            <h3 class="f16 nunito-font regular">
                                                Alpha
                                            </h3>

                                        </v-col>
                                        <v-col cols="12" sm="2">
                                            <v-menu offset-y>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon v-bind="attrs" v-on="on" color="black">mdi-dots-vertical
                                                    </v-icon>
                                                </template>

                                                <v-list>

                                                    <v-list-item>
                                                        Edit Contact
                                                    </v-list-item>
                                                    <v-list-item class="red--text">
                                                        Dekete Contact
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </v-col>

                                    </v-row>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <div class="row">
                                        <div class="col-12">
                                            <h6 class="font-weight-thin">Caller Number</h6>

                                            <h5 class="font-weight-light">
                                                +91 80000 00 089
                                            </h5>
                                        </div>

                                    </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>

           <v-expansion-panel>
                                <v-expansion-panel-header expand-icon="">
                                    <v-row class="d-flex  align-center justify-center" align-content="center"
                                        justify="center">
                                        <v-col cols="12" sm="1" class="pl-10">
                                            <h3 class="f16 nunito-font regular">
                                                <div class="pa-4 #FFEDEE rounded-circle name-ico d-inline-block">A</div>

                                            </h3>
                                        </v-col>
                                        <v-col cols="12" sm="9">
                                            <h3 class="f16 nunito-font regular">
                                                Alpha
                                            </h3>

                                        </v-col>
                                        <v-col cols="12" sm="2">
                                            <v-menu offset-y>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon v-bind="attrs" v-on="on" color="black">mdi-dots-vertical
                                                    </v-icon>
                                                </template>

                                                <v-list>

                                                    <v-list-item>
                                                        Edit Contact
                                                    </v-list-item>
                                                    <v-list-item class="red--text">
                                                        Dekete Contact
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </v-col>

                                    </v-row>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <div class="row">
                                        <div class="col-12">
                                            <h6 class="font-weight-thin">Caller Number</h6>

                                            <h5 class="font-weight-light">
                                                +91 80000 00 089
                                            </h5>
                                        </div>

                                    </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                                       <v-expansion-panel>
                                <v-expansion-panel-header expand-icon="">
                                    <v-row class="d-flex  align-center justify-center" align-content="center"
                                        justify="center">
                                        <v-col cols="12" sm="1" class="pl-10">
                                            <h3 class="f16 nunito-font regular">
                                                <div class="pa-4 #FFEDEE rounded-circle name-ico d-inline-block">A</div>

                                            </h3>
                                        </v-col>
                                        <v-col cols="12" sm="9">
                                            <h3 class="f16 nunito-font regular">
                                                Alpha
                                            </h3>

                                        </v-col>
                                        <v-col cols="12" sm="2">
                                            <v-menu offset-y>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon v-bind="attrs" v-on="on" color="black">mdi-dots-vertical
                                                    </v-icon>
                                                </template>

                                                <v-list>

                                                    <v-list-item>
                                                        Edit Contact
                                                    </v-list-item>
                                                    <v-list-item class="red--text">
                                                        Dekete Contact
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </v-col>

                                    </v-row>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <div class="row">
                                        <div class="col-12">
                                            <h6 class="font-weight-thin">Caller Number</h6>

                                            <h5 class="font-weight-light">
                                                +91 80000 00 089
                                            </h5>
                                        </div>

                                    </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                                       <v-expansion-panel>
                                <v-expansion-panel-header expand-icon="">
                                    <v-row class="d-flex  align-center justify-center" align-content="center"
                                        justify="center">
                                        <v-col cols="12" sm="1" class="pl-10">
                                            <h3 class="f16 nunito-font regular">
                                                <div class="pa-4 #FFEDEE rounded-circle name-ico d-inline-block">A</div>

                                            </h3>
                                        </v-col>
                                        <v-col cols="12" sm="9">
                                            <h3 class="f16 nunito-font regular">
                                                Alpha
                                            </h3>

                                        </v-col>
                                        <v-col cols="12" sm="2">
                                            <v-menu offset-y>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon v-bind="attrs" v-on="on" color="black">mdi-dots-vertical
                                                    </v-icon>
                                                </template>

                                                <v-list>

                                                    <v-list-item>
                                                        Edit Contact
                                                    </v-list-item>
                                                    <v-list-item class="red--text">
                                                        Dekete Contact
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </v-col>

                                    </v-row>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <div class="row">
                                        <div class="col-12">
                                            <h6 class="font-weight-thin">Caller Number</h6>

                                            <h5 class="font-weight-light">
                                                +91 80000 00 089
                                            </h5>
                                        </div>

                                    </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                                       <v-expansion-panel>
                                <v-expansion-panel-header expand-icon="">
                                    <v-row class="d-flex  align-center justify-center" align-content="center"
                                        justify="center">
                                        <v-col cols="12" sm="1" class="pl-10">
                                            <h3 class="f16 nunito-font regular">
                                                <div class="pa-4 #FFEDEE rounded-circle name-ico d-inline-block">A</div>

                                            </h3>
                                        </v-col>
                                        <v-col cols="12" sm="9">
                                            <h3 class="f16 nunito-font regular">
                                                Alpha
                                            </h3>

                                        </v-col>
                                        <v-col cols="12" sm="2">
                                            <v-menu offset-y>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon v-bind="attrs" v-on="on" color="black">mdi-dots-vertical
                                                    </v-icon>
                                                </template>

                                                <v-list>

                                                    <v-list-item>
                                                        Edit Contact
                                                    </v-list-item>
                                                    <v-list-item class="red--text">
                                                        Dekete Contact
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </v-col>

                                    </v-row>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <div class="row">
                                        <div class="col-12">
                                            <h6 class="font-weight-thin">Caller Number</h6>

                                            <h5 class="font-weight-light">
                                                +91 80000 00 089
                                            </h5>
                                        </div>

                                    </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>

                        </v-expansion-panels>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>









    </v-app>
</template>



<script>



export default {
    components: {

    },
    data: () => ({
        removeReminder: false,
        searchForm: false,
        benched: 0,
        hidden: true,
    }),
    methods: {
        searchAction() {
            this.hidden = !this.hidden;
        },
    }

};
</script>

