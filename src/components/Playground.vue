<template>
  <div>
    <v-app-bar color="red" dense>
      <v-icon>mdi-vuetify</v-icon>
      <v-toolbar-title>Welcome to the Playground</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-btn-toggle rounded>
          <v-btn small disabled color="indigo darken-4">
            <v-icon color="white">{{getGenderIcone(userInfos)}}</v-icon>
          </v-btn>
          <v-btn
            small
            dark
            @click="dialog = true"
            :color="userInfos && userInfos.gender ? userInfos.gender === 'male' ? 'indigo darken-4' : 'pink darken-4' : 'grey darken-2'"
          >{{userInfos.name ? userInfos.name : '?'}}</v-btn>
        </v-btn-toggle>
      </div>
    </v-app-bar>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="message"
              :append-outer-icon="message ? 'mdi-send' : ''"
              filled
              clear-icon="mdi-close-circle"
              clearable
              label="Please enter your name"
              type="text"
              @click:append-outer="sendMessage(message)"
              @click:clear="clearMessage"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <p>{{userInfos}}</p>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>

        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>

          <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Resources from "@/services/resources";

const ResourcesService = new Resources();

export default {
  name: "playground",
  data: () => ({
    dialog: false,
    userInfos: {
      name: "",
      gender: ""
    },
    password: "Password",
    show: false,
    message: "",
    iconIndex: 0
  }),
  computed: {
    icon() {
      return this.icons[this.iconIndex];
    }
  },
  beforeCreate() {
    this.$nextTick(() => {});
  },
  methods: {
    getGenderIcone(userInfos) {
      return userInfos && userInfos.gender
        ? userInfos.gender === "male"
          ? "mdi-human-male"
          : "mdi-human-female"
        : "mdi-account-question";
    },
    sendMessage(name) {
      this.userInfos.name = name;
      ResourcesService.getGender(name).then(
        res => {
          console.log("this.unserInfos", this.userInfos);
          this.userInfos.gender = res.body.gender;
        },
        () => {}
      );
      this.resetIcon();
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    }
  }
};
</script>
<style>
</style>