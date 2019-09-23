<template>
  <v-container>
    <v-card v-show="!!result.size">
      <v-card-title>Resultados</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="(turn, index) in Array.from(this.result.values())"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="4"
          >
            <v-card>
              <v-card-title
                ><h4>
                  Turno {{ index + 1 }} ({{ getTimeTurn(index) }})
                </h4></v-card-title
              >
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item v-for="user in turn" :key="user.alias">
                  <v-list-item-content>{{ user.name }}</v-list-item-content>
                  <v-list-item-content class="align-end">
                    <v-chip>
                      <v-avatar left>
                        <v-icon>fas fa-at</v-icon>
                      </v-avatar>
                      {{ user.alias }}
                    </v-chip>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="success"
          v-clipboard:copy="getTextToCopy()"
          v-clipboard:success="onCopySuccess"
          v-clipboard:error="onCopyError"
        >
          <v-icon small left>far fa-clipboard</v-icon>
          <span>Copiar</span>
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
    EventBus.$on("onDrawEvent", this.setResult);
  },
  destroyed: function() {
    EventBus.$off("onDrawEvent");
  },
  methods: {
    setResult(result: Map<string, User[]>) {
      this.result = result;
    },
    getTimeTurn(turnNumber: number) {
      switch (turnNumber) {
        case 0:
          return "10:15";
        case 1:
          return "10:30";
        case 2:
          return "10:45";
        default:
          return "";
      }
    },
    onCopySuccess: (e: any) => {},
    onCopyError: (e: any) => {},
    getTextToCopy() {
      return JSON.stringify(this.result);
    }
  },
  data: () => ({
    result: new Map<string, User[]>()
  })
});
</script>
