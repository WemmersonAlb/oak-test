<script setup>
  import DataTable from "./components/DataTable.vue";
  import NavBar from "./components/NavBar.vue";
</script>

<template>
  <main>
    <NavBar />
    <DataTable class="table"/>
  </main>
</template>

<style scoped>
  main{
    width: 100%;
  }
  .table{
    width: 70%;
    margin: 40px auto;
  }
</style>
