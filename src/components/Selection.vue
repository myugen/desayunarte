<template>
  <div class="card">
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
    <div class="card-footer">
      <div class="card-footer-item is-flex-start">
        <ShuffleProvider>
          <GroupModal :users="getIncludedUser()" />
        </ShuffleProvider>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import GroupModal from "@/components/GroupModal.vue";
import ShuffleProvider from "@/providers/ShuffleProvider.vue";
import { User } from "@/models";

export default Vue.extend({
  name: "Selection",
  components: {
    ShuffleProvider,
    GroupModal
  },
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
    getIncludedUser() {
      return this.users.filter(user => user.include);
    }
  },
  computed: {
    loadedUsers: (): User[] => require("@/data/users.json").users as User[]
  }
});
</script>
