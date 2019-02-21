<template>
  <el-row>
    <el-col :span="11" :offset="1">
      <!--last tasks-->
      <el-row>
        <h5 class="title">Latest Tasks</h5>
        <el-table border height="240px">
          <el-table-column property="node" label="Node" align="center">
          </el-table-column>
          <el-table-column property="status" label="Status" align="center">
          </el-table-column>
          <el-table-column property="Create" label="Create Time" align="center">
          </el-table-column>
        </el-table>
      </el-row>

      <!--last deploys-->
      <el-row>
        <h5 class="title">Latest Deploys</h5>
        <el-table border height="240px">
        </el-table>
      </el-row>
    </el-col>

    <el-col :span="12">
      <!--basic info-->
      <el-row>
        <el-form label-width="150px"
                 :model="nodeForm"
                 ref="spiderForm"
                 class="spider-form"
                 label-position="right">
          <el-form-item label="Node Name">
            <el-input v-model="nodeForm.name" disabled placeholder="Node Name"></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input type="textarea" v-model="nodeForm.description" placeholder="Description"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row class="button-container">
        <!--<el-button type="warning">Run</el-button>-->
        <el-button type="primary" @click="onDeploy">Deploy</el-button>
        <el-button type="success" @click="onSave">Save</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'SpiderOverview',
  data () {
    return {
      // spiderForm: {}
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    ...mapState('node', [
      'nodeForm'
    ])
  },
  methods: {
    onDeploy () {
    },
    onSave () {
      this.$store.dispatch('node/editNode')
        .then(() => {
          this.$message.success('Node has been saved successfully')
        })
    }
  },
  created () {
  }
}
</script>

<style scoped>
  .title {
    margin: 10px 0 3px 0;
  }

  .spider-form {
    padding: 10px;
  }

  .button-container {
    padding: 0 10px;
    width: 100%;
    text-align: right;
  }
</style>
