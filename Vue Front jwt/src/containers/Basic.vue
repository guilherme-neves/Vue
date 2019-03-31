<template>
  <div class="app">
    <loading />
    <router-view></router-view>
  </div>
</template>

<script>
import nav from "../_nav";
import { Loading } from "../components/";

export default {
  name: "basic",
  components: {
    Loading
  }
};
</script>
