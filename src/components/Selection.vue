<template>
  <v-container>
    <v-card class="d-flex flex-column">
      <v-card-title>
        Selecciona con cuidado, te pueden sacar los ojos
      </v-card-title>
      <v-card-text>
        <div v-for="user in users" :key="user.alias">
          <v-switch
            hide-details
            v-model="user.include"
            :label="user.name"
          ></v-switch>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn v-on:click="onDrawClick" color="primary">
          <v-icon small left>fas fa-random</v-icon>
          <span>Crear grupos</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import EventBus from "@/eventBus";
import { User } from "@/model";

export default Vue.extend({
  mounted: function() {
    this.users = this.loadedUsers;
  },
  data: () => ({
    users: [] as User[]
  }),
  methods: {
    onDrawClick(e: any) {
      const result: Map<string, User[]> = new Map<string, User[]>();
      result.set("first", this.users.slice(0, 7));
      result.set("second", this.users.slice(7, 14));
      result.set("third", this.users.slice(14, 20));
      EventBus.$emit("onDrawEvent", result);
    }
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
