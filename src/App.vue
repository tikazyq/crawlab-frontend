<template>
  <div id="app">
    <dialog-view/>
    <router-view/>
  </div>
</template>

<script>
import DialogView from './components/Common/DialogView'

export default {
  name: 'App',
  components: {
    DialogView
  }
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
