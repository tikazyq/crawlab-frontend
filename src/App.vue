<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .el-table .cell {
    line-height: 18px;
    font-size: 12px;
  }

  .el-table .el-table__header th,
  .el-table .el-table__body td {
    padding: 3px 0;
  }

  .el-select {
    width: 100%;
  }
</style>
