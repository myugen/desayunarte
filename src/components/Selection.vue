<template>
  <div class="card" id="selection">
    <div class="card-content">
      <p class="title">
        Selecciona los participantes al sorteo de los turnos de desayuno
      </p>
      <div class="content">
        <div class="columns" v-for="user in users" :key="user.alias">
          <div class="column">
            <el-switch v-model="user.include" :active-text="user.name">
            </el-switch>
          </div>
          <div class="column">
            <el-select
              v-model="user.default"
              clearable
              placeholder="Seleccione una preferencia"
            >
              <el-option
                v-for="preference in preferences"
                :key="preference.value"
                :label="preference.label"
                :value="preference.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer is-borderless">
      <div class="card-footer-item is-flex-start">
        <div class="is-padding-lefted">
          <el-button
            type="info"
            @click="onDraw"
            round
            icon="el-icon-coffee-cup"
          >
            <span>Crear grupos</span>
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
  name: "Selection",
  inject: ["shuffleService"],
  mounted: function() {
    this.users = this.loadedUsers;
  },
  data: () => ({
    users: [] as User[],
    preferences: [
      {
        value: "first",
        label: "Primer turno"
      },
      {
        value: "last",
        label: "Último turno"
      }
    ]
  }),
  methods: {
    onDraw(e: any) {
      // injected elements can't be inferred due to "TypeScript-Vue Extends" API.
      // More info: https://stackoverflow.com/questions/55183220/vue-js-typescript-component-cannot-find-inject-instance-properties
      const result = (this as any).shuffleService.shuffle(
        this.getIncludedUser()
      );
      eventBus.$emit("onDrawEvent", result);
      this.$scrollTo("#result");
    },
    getIncludedUser() {
      return this.users.filter(user => user.include);
    }
  },
  computed: {
    loadedUsers: (): User[] => require("@/data/users.json").users as User[]
  }
});
</script>
