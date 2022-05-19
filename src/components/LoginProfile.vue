        <template>
  <v-app>
        <div>
          <!-- NOTIFICATION MENU -->
          <v-menu bottom width="378px" height="504px" rounded offset-y>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon>
                <v-badge
                  color="red"
                  content="0"
                  overlap
                  v-if="notificationunread.length == 0"
                >
                  <v-icon color="black">mdi-bell-outline</v-icon>
                </v-badge>
                <v-badge
                  color="red"
                  :content="notificationunread.length"
                  overlap
                  v-if="notificationunread.length != 0"
                >
                  <v-icon color="black">mdi-bell-outline</v-icon>
                </v-badge>
              </v-btn>
            </template>

            <v-card class="mx-auto" max-width="500">
              <v-card-title class="black--text white darken-4">
                Notification Center
                <v-spacer></v-spacer>
                <router-link :to="{ name: 'notifications' }">
                  <div align="center" class="notif-mark">View all</div>
                </router-link>
                <span fab small>
                  <v-icon>mdi-close</v-icon>
                </span>
              </v-card-title>
              <v-divider> </v-divider>
              <v-container
                fill-height
                fluid
                v-if="notificationunread.length == 0"
              >
                <v-row
                  align="center"
                  justify="center"
                  style="padding-top: 50%; position: absolute; left: 35%"
                >
                  <p class="red--text">No notification found!</p>
                </v-row>
              </v-container>
              <v-virtual-scroll
                :items="notificationunread"
                :item-height="90"
                height="300"
                width="500"
              >
                <template v-slot:default="{ item }">
                  <v-list-item>
                    <v-row>
                      <v-col cols="12" @click="redirectpage(item.type)">
                        <div class="notif-type">{{ item.type }}</div>
                        <div class="notif-content">{{ item.content }}</div>
                        <div class="notif-time mb-2">{{ item.time }}</div>
                      </v-col>
                    </v-row>
                  </v-list-item>
                  <v-divider></v-divider>
                </template>
              </v-virtual-scroll>
              <!-- </div> -->
              <v-card-text
                class="pt-4 text-center"
                v-if="notificationunread.length != 0"
              >
                <v-row>
                  <v-col
                    cols="12"
                    align="center"
                    class="notif-mark"
                    @click="read_notification()"
                  >
                    Mark all as read({{ notificationunread.length }})
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-menu>
          <!-- NOTIFICATION MENU -->
          <!-- DROP DOWM MENU FROM AVATAR   -->
          <v-menu bottom max-width="247px" min-height="218px" rounded offset-y>
            <template v-slot:activator="{ on }">
              <v-avatar v-on="on" class="ml-5" size="40">
                <v-img src="/img1.png"></v-img>
              </v-avatar>
            </template>
            <v-card>
              <v-list-item-content class="align-left">
                <v-list-item>
                  <v-list-item-avatar>
                    <img src="/img1.png" alt="Admin" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ userFirstName }}</v-list-item-title>
                    <v-list-item-subtitle
                      >+91 {{ userPhoneNumber }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item-content>
                  <span class="avatar-menu-item">FAQ</span>
                </v-list-item-content>
                <v-list-item-content>
                  <span class="avatar-menu-item">Contact Us</span>
                </v-list-item-content>
                <v-list-item-content>
                  <span class="avatar-menu-item" @click="logout">Log Out</span>
                </v-list-item-content>
              </v-list-item-content>
            </v-card>
          </v-menu>
          <!-- DROP DOWM MENU FROM AVATAR   -->
        </div>
        </v-app>
        </template>
        