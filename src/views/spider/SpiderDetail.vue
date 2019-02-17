<template>
  <div class="app-container">
    <el-tabs v-model="activeTabName" @tab-click="onTabClick" type="card">
      <el-tab-pane label="Overview" name="overview">
        Overview
      </el-tab-pane>
      <el-tab-pane label="Files" name="files">
        <file-list/>
      </el-tab-pane>
      <el-tab-pane label="Deploys" name="deploys">
        Deploy
      </el-tab-pane>
      <el-tab-pane label="Monitor" name="monitor">
        Deploy
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import FileList from '../../components/FileList/FileList'

export default {
  name: 'NodeDetail',
  components: {
    FileList
  },
  data () {
    return {
      activeTabName: 'overview'
    }
  },
  computed: {
    ...mapState('file', [
      'currentPath'
    ])
  },
  methods: {
    onTabClick () {
    }
  },
  created () {
    this.$store.dispatch('file/getDefaultPath')
      .then(() => {
        this.$store.dispatch('file/getFileList', this.currentPath)
      })
  }
}
</script>

<style scoped>

</style>
