<template>
  <v-container>
    <div class="d-flex flex-column">
      <div v-for="user in users" :key="user.alias">
        <v-switch
          hide-details
          v-model="user.goOut"
          :label="user.name"
        ></v-switch>
      </div>
    </div>
    <v-btn v-on:click="onDrawClick" color="primary">
      <v-icon small left>fas fa-random</v-icon>
      <span>Crear grupos</span>
    </v-btn>
    <v-btn
      color="success"
      v-clipboard:copy="JSON.stringify(users)"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
    >
      <v-icon small left>far fa-clipboard</v-icon>
      <span>Copiar</span>
    </v-btn>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { User } from "@/model";

export default Vue.extend({
  mounted: function() {
    this.users = this.loadedUsers;
  },
  data: () => ({
    users: [] as User[]
  }),
  methods: {
    onCopy: (e: any) => {
      console.log("Copied!", e.text);
    },
    onError: (e: any) => {
      console.error("An error occurs", e);
    },
    onDrawClick: (e: any) => console.log("Draw!")
  },
  computed: {
    loadedUsers: (): User[] => require("@/data/users.json").users as User[],
    defaultUsersNotJoinToLunch: (): string[] => [
      "rdiaada",
      "msansim",
      "njorcam",
      "mbragar",
      "amonfue",
      "iaimsal",
      "lgutmed",
      "kzunmen"
    ]
  }
});
</script>
