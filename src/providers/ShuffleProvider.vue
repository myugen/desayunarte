<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UserShuffleService } from "@/services/shuffle";

export default Vue.extend({
  name: "ShuffleProvider",
  provide: () => ({
    shuffleService: new UserShuffleService()
  })
});
</script>
