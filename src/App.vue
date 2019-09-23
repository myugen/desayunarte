<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>DESAYUNARTE</span>
        <span class="font-weight-light">{{ version }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-img
        :src="require('@/assets/logo.png')"
        class="my-3"
        contain
        position="right"
        height="50"
      ></v-img>
    </v-app-bar>

    <v-content>
      <Selection />
      <Result />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Selection from "./components/Selection.vue";
import Result from "./components/Result.vue";

export default Vue.extend({
  name: "App",
  components: {
    Selection,
    Result
  },
  mounted() {
    this.version = process.env.VERSION;
  },
  data: () => ({
    version: 0
  })
});
</script>
