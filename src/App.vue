<template>
  <div id="app">
    <nav
      class="navbar is-fixed-top is-light is-shadowed"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="https://arte.dev">
          <el-image
            :src="require('@/assets/logo.png')"
            fit="contain"
            lazy
            style="width: auto !important;"
          ></el-image>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item has-text-black">
            <span>DESAYUNARTE</span>
            <span>{{ version }}</span>
          </div>
        </div>
      </div>
    </nav>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <ShuffleProvider>
              <Selection />
            </ShuffleProvider>
          </div>
          <div class="column">
            <Result />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ShuffleProvider from "./providers/ShuffleProvider.vue";
import Selection from "./components/Selection.vue";
import Result from "./components/Result.vue";

export default Vue.extend({
  name: "App",
  components: {
    ShuffleProvider,
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
<style lang="sass"></style>
