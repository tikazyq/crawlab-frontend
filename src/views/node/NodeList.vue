<template>
  <div class="app-container">
    <!--add popup-->
    <el-dialog
      title="Add Node"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="onDialogClose">
      <el-form label-width="100px"
               :model="nodeForm"
               :rules="nodeFormRules"
               ref="nodeForm"
               label-position="right">
        <el-form-item label="Name">
          <el-input v-model="nodeForm.name" placeholder="Name"></el-input>
        </el-form-item>
        <el-form-item label="IP">
          <el-input v-model="nodeForm.ip" placeholder="IP"></el-input>
        </el-form-item>
        <el-form-item label="PORT">
          <el-input v-model="nodeForm.port" type="number" placeholder="PORT"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="nodeForm.description" placeholder="Description" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">Cancel</el-button>
        <el-button type="primary" @click="onAddSubmit">Submit</el-button>
      </span>
    </el-dialog>

    <!--filter-->
    <div class="filter">
      <el-input prefix-icon="el-icon-search"
                placeholder="Search"
                class="filter-search"
                v-model="filter.keyword"
                @change="onSearch">
      </el-input>
      <el-button type="primary"
                 icon="el-icon-plus"
                 class="add"
                 @click="onAdd">
        Add Node
      </el-button>
    </div>

    <!--table list-->
    <el-table :data="filteredTableData"
              class="table"
              height="500"
              :header-cell-style="{background:'rgb(48, 65, 86)',color:'white'}"
              border>
      <template v-for="col in columns">
        <el-table-column v-if="col.name === 'status'"
                         :key="col.name"
                         :label="col.label"
                         :sortable="col.sortable"
                         align="center"
                         :width="col.width">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status === 0">Offline</el-tag>
            <el-tag type="success" v-if="scope.row.status === 1">Online</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-else
                         :key="col.name"
                         :property="col.name"
                         :label="col.label"
                         :sortable="col.sortable"
                         align="center"
                         :width="col.width">
        </el-table-column>
      </template>
      <el-table-column label="Action" align="center" width="160">
        <template>
          <el-button type="warning" icon="el-icon-edit" size="mini">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'NodeList',
  data () {
    let tableData = []
    for (let i = 0; i < 50; i++) {
      tableData.push({
        node_name: `Node ${Math.floor(Math.random() * 100)}`,
        node_ip: '127.0.0.1:8888',
        'node_description': `The ID of the node is ${Math.random().toString().replace('0.', '')}`,
        status: Math.floor(Math.random() * 100) % 2
      })
    }
    return {
      activeForm: {},
      dialogVisible: false,
      filter: {
        keyword: ''
      },
      tableData,
      columns: [
        { name: 'node_name', label: 'Name', width: '160' },
        { name: 'node_ip', label: 'IP', width: '160' },
        { name: 'status', label: 'Status', width: '120', sortable: true },
        { name: 'node_description', label: 'Description', width: 'auto' }
      ],
      nodeFormRules: {
        name: [{ required: true, message: 'Required Field', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapState('node', [
      // 'nodeList',
      'nodeForm'
    ]),
    filteredTableData () {
      return this.tableData.filter(d => {
        if (!this.filter.keyword) return true
        for (let i = 0; i < this.columns.length; i++) {
          const colName = this.columns[i].name
          if (d[colName] && d[colName].toLowerCase().indexOf(this.filter.keyword.toLowerCase()) > -1) {
            return true
          }
        }
        return false
      })
    }
  },
  methods: {
    onSearch (value) {
      console.log(value)
    },
    onAdd () {
      this.dialogVisible = true
    },
    onAddSubmit () {
      const vm = this
      const formName = 'nodeForm'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.$store.dispatch('node/addNode')
          vm.dialogVisible = false
        } else {
          return false
        }
      })
    },
    onCancel () {
      this.$store.commit('node/SET_NODE_FORM', {})
      this.dialogVisible = false
    },
    onDialogClose () {
      this.$store.commit('node/SET_NODE_FORM', {})
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
  .filter {
    display: flex;
    justify-content: space-between;

    .filter-search {
      width: 240px;
    }

    .add {
    }
  }

  .table {
    margin-top: 20px;
    border-radius: 5px;
  }
</style>
