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
                 :model="spiderForm"
                 ref="spiderForm"
                 class="spider-form"
                 label-position="right">
          <el-form-item label="Spider ID">
            <el-input v-model="spiderForm._id.$oid" placeholder="Spider ID" disabled></el-input>
          </el-form-item>
          <el-form-item label="Spider Name">
            <el-input v-model="spiderForm.name" placeholder="Spider Name"></el-input>
          </el-form-item>
          <el-form-item label="Source Folder">
            <el-input v-model="spiderForm.src" placeholder="Source Folder"></el-input>
          </el-form-item>
          <el-form-item label="Execute Command">
            <el-input v-model="spiderForm.cmd" placeholder="Execute Command"></el-input>
          </el-form-item>
          <el-form-item label="Spider Type">
            <el-select v-model="spiderForm.type" placeholder="Select Spider Type">
              <el-option :value="1" label="Scrapy"></el-option>
              <el-option :value="2" label="PySpider"></el-option>
              <el-option :value="3" label="WebMagic"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Language">
            <el-select v-model="spiderForm.lang" placeholder="Select Language">
              <el-option :value="1" label="Python"></el-option>
              <el-option :value="2" label="Nodejs"></el-option>
              <el-option :value="3" label="Java"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row class="button-container">
        <el-button type="warning">Run</el-button>
        <el-button type="primary">Deploy</el-button>
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
    ...mapState('spider', [
      'spiderForm'
    ])
  },
  methods: {
    onSave () {
      this.$store.dispatch('spider/editSpider')
        .then(() => {
          this.$message.success('Spider info has been saved successfully')
        })
        .catch(error => {
          this.$message.error(error)
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
