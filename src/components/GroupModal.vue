<template>
  <div class="is-padding-lefted">
    <el-button
      type="primary"
      @click="dialog = true"
      round
      icon="el-icon-coffee-cup"
    >
      <span>Crear grupos</span>
    </el-button>

    <el-dialog title="Crear grupos" :visible.sync="dialog" width="30%">
      <span>
        <p style="word-break: break-word">
          Por favor, asegúrese que los participantes se han seleccionado
          correctamente antes de proceder con el sorteo.
        </p>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="info"
          plain
          round
          @click="onCancel"
          icon="el-icon-circle-close"
        >
          Cancelar
        </el-button>
        <el-button
          type="primary"
          @click="onDraw"
          round
          icon="el-icon-circle-check"
        >
          Continuar
        </el-button>
      </span>
    </el-dialog>
  </div>
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
      default: () => [],
      validator: users => users.every((user: User) => user.include)
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
      this.$scrollTo("nav");
    },
    onCancel(e: any) {
      this.dialog = false;
    }
  }
});
</script>
