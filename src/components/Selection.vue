<template>
  <v-container>
    <v-card>
      <v-card-title>
        Selecciona los participantes al sorteo de los turnos de desayuno
      </v-card-title>
      <v-card-text>
        <v-list dense>
          <v-list-item v-for="user in users" :key="user.alias">
            <v-list-item-content>
              <v-switch
                hide-details
                color="success"
                v-model="user.include"
                :label="user.name"
              ></v-switch>
            </v-list-item-content>
            <v-list-item-action>
              <div>
                <v-btn-toggle v-model="user.default">
                  <v-btn text x-small value="first">
                    Primer turno
                  </v-btn>
                  <v-btn text x-small value="last">
                    Segundo turno
                  </v-btn>
                </v-btn-toggle>
                <v-btn text x-small @click="user.default = undefined">
                  <v-icon x-small>fas fa-times</v-icon>
                </v-btn>
              </div>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <GroupModal :users="getIncludedUser()" />
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import GroupModal from "@/components/GroupModal.vue";
import { User } from "@/model";

export default Vue.extend({
  name: "Selection",
  components: {
    GroupModal
  },
  mounted: function() {
    this.users = this.loadedUsers;
  },
  data: () => ({
    users: [] as User[]
  }),
  methods: {
    getIncludedUser() {
      return this.users.filter(user => user.include);
    }
  },
  computed: {
    loadedUsers: (): User[] => require("@/data/users.json").users as User[]
  }
});
</script>
