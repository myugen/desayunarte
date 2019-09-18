<template>
  <v-container>
    <v-btn
      color="blue darken-4"
      title="Copiar"
      v-clipboard:copy="users"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
    ></v-btn>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { User } from "@/model";

export default Vue.extend({
  mounted: function() {
    console.log(this.users);
  },
  methods: {
    onCopy: (e: any) => {
      console.log("Copied!", e.text);
    },
    onError: (e: any) => {
      console.error("An error occurs", e);
    }
  },
  computed: {
    users: (): User[] => require("@/data/users.json").users as User[],
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
