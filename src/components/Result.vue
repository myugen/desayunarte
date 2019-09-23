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
            sm="12"
            md="12"
            lg="12"
            xl="4"
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
        <v-btn text color="success" @click="copy">
          <v-icon small left>far fa-clipboard</v-icon>
          <span>Copiar</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import eventBus from "@/eventBus";
import { User } from "@/model";
export default Vue.extend({
  name: "Result",
  mounted: function() {
    eventBus.$on("onDrawEvent", this.setResult);
  },
  destroyed: function() {
    eventBus.$off("onDrawEvent");
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
    copy() {
      this.$copyText(this.getTextToCopy()).then(
        this.onCopySuccess,
        this.onCopyError
      );
    },
    onCopySuccess: (e: any) => {
      console.log("Copied!", e.text);
    },
    onCopyError: (e: any) => {},
    getTextToCopy() {
      const values = Array.from(this.result.values());

      return values
        .map(
          (turn, index) =>
            `Turno ${index + 1}: [${turn
              .map(user =>
                index != 0
                  ? user.name
                  : user.name
                      .concat(" ( @")
                      .concat(user.alias)
                      .concat(" )")
              )
              .join(", ")}]`
        )
        .join("\n");
    }
  },
  data: () => ({
    result: new Map<string, User[]>()
  })
});
</script>
