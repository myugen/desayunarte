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
                ><h4>Turno {{ index }}</h4></v-card-title
              >
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item v-for="user in turn" :key="user.alias">
                  <v-list-item-content>{{ user.name }}</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    user.alias
                  }}</v-list-item-content>
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
      console.log(this.result);
    },
    onCopySuccess: (e: any) => {
      console.log("Copied!", e.text);
    },
    onCopyError: (e: any) => {
      console.error("An error occurs", e);
    },
    getTextToCopy() {
      return JSON.stringify(this.result);
    }
  },
  data: () => ({
    result: new Map<string, User[]>()
  })
});
</script>
