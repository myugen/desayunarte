<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>DESAYUNARTE</span>
        <span class="font-weight-light">2.0</span>
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
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Selection from "./components/Selection.vue";

export default Vue.extend({
  name: "App",
  components: {
    Selection
  },
  data: () => ({
    //
  })
});
</script>
