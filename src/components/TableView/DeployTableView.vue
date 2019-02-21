<template>
  <div class="deploy-table-view">
    <h5 class="title">{{title}}</h5>
    <el-table border height="240px" :data="deployList">
      <el-table-column property="version" label="Ver" width="40" align="center"></el-table-column>
      <el-table-column property="node" label="Node" width="220" align="center">
        <template slot-scope="scope">
          <a class="a-tag" @click="onClickNode(scope.row)">{{scope.row.node_id}}</a>
        </template>
      </el-table-column>
      <el-table-column property="spider_name" label="Spider" width="80" align="center">
        <template slot-scope="scope">
          <a class="a-tag" @click="onClickSpider(scope.row)">{{scope.row.spider_name}}</a>
        </template>
      </el-table-column>
      <el-table-column property="finish_ts" label="Finish Time" width="auto" align="center"></el-table-column>
    </el-table>
  </div>

</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'DeployTableView',
  props: {
    title: String
  },
  computed: {
    ...mapState('deploy', [
      'deployList'
    ])
  },
  methods: {
    onClickSpider (row) {
      this.$router.push(`/spiders/${row.spider_id.$oid}`)
    },
    onClickNode (row) {
      this.$router.push(`/nodes/${row.node_id}`)
    }
  }
}
</script>

<style scoped>
  .el-table .a-tag {
    text-decoration: underline;
  }

  .title {
    margin: 10px 0 3px 0;
  }
</style>
