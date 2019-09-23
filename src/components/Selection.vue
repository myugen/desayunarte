<template>
  <v-container>
    <v-card class="d-flex flex-column">
      <v-card-title>
        Selecciona los participantes al sorteo de los turnos de desayuno
      </v-card-title>
      <v-card-text>
        <div v-for="user in users" :key="user.alias">
          <v-switch
            hide-details
            color="success"
            v-model="user.include"
            :label="user.name"
          ></v-switch>
          <v-btn-toggle v-model="user.default">
            <v-btn text>
              <v-icon>fas fa-times</v-icon>
            </v-btn>
            <v-btn text>
              Primer turno
            </v-btn>
            <v-btn text>
              Segundo turno
            </v-btn>
          </v-btn-toggle>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on }">
            <v-btn v-on:click="dialog = true" color="primary">
              <v-icon small left>fas fa-coffee</v-icon>
              <span>Crear grupos</span>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">Crear grupos</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="padding-top: 1rem;">
              Por favor, asegúrese que los participantes se han seleccionado
              correctamente antes de proceder con el sorteo.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn text @click="dialog = false">
                Cancelar
              </v-btn>
              <v-btn color="success" text @click="onDrawClick">
                Continuar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
    users: [] as User[],
    dialog: false
  }),
  methods: {
    onDrawClick(e: any) {
      const result: Map<string, User[]> = new Map<string, User[]>();
      result.set("first", this.users.slice(0, 7));
      result.set("second", this.users.slice(7, 14));
      result.set("third", this.users.slice(14, 20));
      EventBus.$emit("onDrawEvent", result);
      this.dialog = false;
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
