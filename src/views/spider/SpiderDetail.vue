<template>
  <div class="app-container">
    <el-tabs v-model="activeTabName" @tab-click="onTabClick" type="card">
      <el-tab-pane label="Overview" name="overview">
        <spider-overview/>
      </el-tab-pane>
      <el-tab-pane label="Files" name="files">
        <file-list/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import FileList from '../../components/FileList/FileList'
import SpiderOverview from '../../components/Overview/SpiderOverview'

export default {
  name: 'NodeDetail',
  components: {
    FileList,
    SpiderOverview
  },
  data () {
    return {
      activeTabName: 'overview'
    }
  },
  computed: {
    ...mapState('spider', [
      'spiderData'
    ]),
    ...mapState('file', [
      'currentPath'
    ]),
    ...mapState('deploy', [
      'deployList'
    ])
  },
  methods: {
    onTabClick () {
    }
  },
  created () {
    this.$store.dispatch('spider/getSpiderData', this.$route.params.id)
      .then(() => {
        if (!this.spiderData.src) {
          this.$store.dispatch('file/getDefaultPath')
            .then(() => {
              this.$store.dispatch('file/getFileList', this.currentPath)
            })
        } else {
          this.$store.dispatch('file/getFileList', this.spiderData.src)
        }
      })
  }
}
</script>

<style scoped>

</style>
