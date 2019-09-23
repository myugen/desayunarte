<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
      <v-btn @click="dialog = true" color="primary">
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
        <v-btn text @click="onCancel">
          Cancelar
        </v-btn>
        <v-btn color="success" text @click="onDraw">
          Continuar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import { User } from "@/model";
import eventBus from "@/eventBus";

export default Vue.extend({
  props: {
    users: {
      type: Array as () => User[],
      required: true,
      default: () => []
    }
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    onDraw(e: any) {
      const result: Map<string, User[]> = new Map<string, User[]>();
      result.set("first", this.users.slice(0, 7));
      result.set("second", this.users.slice(7, 14));
      result.set("third", this.users.slice(14, 20));
      eventBus.$emit("onDrawEvent", result);
      this.dialog = false;
    },
    onCancel(e: any) {
      this.dialog = false;
    }
  }
});
</script>
