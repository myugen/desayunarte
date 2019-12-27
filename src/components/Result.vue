<template>
  <div class="card" v-show="!!result.size">
    <div class="card-content">
      <p class="title">
        Resultados
      </p>
      <div class="content">
        <div
          class="panel"
          v-for="(turn, index) in Array.from(this.result.values())"
          :key="index"
        >
          <div class="panel-heading">
            Turno {{ index + 1 }} - {{ getTimeTurn(index) }}
            <i class="el-icon-time"></i>
          </div>
          <div class="panel-block" v-for="user in turn" :key="user.alias">
            <div style="width: 100%" class="level">
              <div class="level-left">
                <span class="level-item">
                  {{ user.name }}
                  <span v-if="user.default">
                    &nbsp;<i class="el-icon-lock"></i>
                  </span>
                </span>
              </div>
              <div class="level-right">
                <span class="level-item">
                  <el-tag>
                    <el-badge>
                      <i class="fas fa-at"></i>
                    </el-badge>
                    {{ user.alias }}
                  </el-tag>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer is-borderless">
      <div class="card-footer-item is-flex-start">
        <div class="is-padding-lefted">
          <el-button
            class="is-padding-lefted"
            type="success"
            @click="copy"
            round
            icon="el-icon-document-copy"
          >
            <span>Copiar</span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import eventBus from "@/eventBus";
import { User } from "@/models";
export default Vue.extend({
  name: "Result",
  mounted: function() {
    eventBus.$on("onDrawEvent", this.setResult);
  },
  destroyed: function() {
    eventBus.$off("onDrawEvent");
  },
  methods: {
    setResult(result: Map<number, User[]>) {
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
        case 3:
          return "11:00";
        default:
          return "N/A";
      }
    },
    copy() {
      this.$copyText(this.getTextToCopy()).then(
        this.onCopySuccess,
        this.onCopyError
      );
    },
    onCopySuccess(e: any) {
      this.$message({
        message: "Copia de los turnos realizada.",
        type: "success",
        showClose: true
      });
    },
    onCopyError(e: any) {
      this.$message({
        message: "Ups, ha habido un error en la copia de los turnos.",
        type: "error",
        showClose: true
      });
    },
    getTextToCopy() {
      const values = Array.from(this.result.values());

      return values
        .map(
          (turn, index) =>
            `Turno ${index + 1}: [${turn
              .map(user =>
                index != 0
                  ? user.name.concat(user.default ? "*" : "")
                  : user.name
                      .concat(" ( @")
                      .concat(user.alias)
                      .concat(" )")
                      .concat(user.default ? "*" : "")
              )
              .join(", ")}]`
        )
        .join("\n");
    }
  },
  data: () => ({
    result: new Map<number, User[]>()
  })
});
</script>
