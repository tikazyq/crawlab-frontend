<template>
  <div class="app-container">
    <el-tabs v-model="activeTabName" @tab-click="onTabClick" type="card">
      <el-tab-pane label="Overview" name="overview">
        <node-overview></node-overview>
      </el-tab-pane>
      <el-tab-pane label="Deployed Spiders" name="spiders">
        Deployed Spiders
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import NodeOverview from '../../components/Overview/NodeOverview'

export default {
  name: 'NodeDetail',
  components: {
    NodeOverview
  },
  data () {
    return {
      activeTabName: 'overview'
    }
  },
  methods: {
    onTabClick () {
    }
  },
  created () {
    this.$store.dispatch('node/getNodeData', this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
