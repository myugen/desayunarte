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
import { User } from "@/models";
import eventBus from "@/eventBus";

export default Vue.extend({
  name: "GroupModal",
  props: {
    users: {
      type: Array as () => User[],
      required: true,
      default: () => []
    }
  },
  inject: ["shuffleService"],
  data: () => ({
    dialog: false
  }),
  methods: {
    onDraw(e: any) {
      // injected elements can't be inferred due to "TypeScript-Vue Extends" API.
      // More info: https://stackoverflow.com/questions/55183220/vue-js-typescript-component-cannot-find-inject-instance-properties
      const result = (this as any).shuffleService.shuffle(this.users);
      eventBus.$emit("onDrawEvent", result);
      this.dialog = false;
    },
    onCancel(e: any) {
      this.dialog = false;
    }
  }
});
</script>
