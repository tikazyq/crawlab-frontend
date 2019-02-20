<template>
  <div class="app-container">
    <!--filter-->
    <div class="filter">
      <el-input prefix-icon="el-icon-search"
                placeholder="Search"
                class="filter-search"
                v-model="filter.keyword"
                @change="onSearch">
      </el-input>
      <div class="right">
        <el-button type="success"
                   icon="el-icon-refresh"
                   class="refresh"
                   @click="onRefresh">
          Search
        </el-button>
      </div>
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
            <el-tag type="success" v-if="scope.row.status === 'SUCCESS'">Success</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status === 'FAILURE'">Failure</el-tag>
            <el-tag type="info" v-else>{{scope.row.status}}</el-tag>
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
      <el-table-column label="Action" align="center" width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="onView(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="onRemove(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'TaskList',
  data () {
    // let tableData = []
    // for (let i = 0; i < 50; i++) {
    //   tableData.push({
    //     task_name: `Task ${Math.floor(Math.random() * 100)}`,
    //     task_ip: '127.0.0.1:8888',
    //     'task_description': `The ID of the task is ${Math.random().toString().replace('0.', '')}`,
    //     status: Math.floor(Math.random() * 100) % 2
    //   })
    // }
    return {
      isEditMode: false,
      dialogVisible: false,
      filter: {
        keyword: ''
      },
      // tableData,
      columns: [
        { name: 'create_ts', label: 'Create Date', width: '150' },
        { name: 'finish_ts', label: 'Finish Date', width: '150' },
        { name: 'spider_name', label: 'Spider', width: '160' },
        { name: 'hostname', label: 'Node', width: 'auto' },
        { name: 'status', label: 'Status', width: '160', sortable: true }
      ]
    }
  },
  computed: {
    ...mapState('task', [
      'taskList',
      'taskForm'
    ]),
    filteredTableData () {
      return this.taskList.filter(d => {
        if (!this.filter.keyword) return true
        for (let i = 0; i < this.columns.length; i++) {
          const colName = this.columns[i].name
          if (d[colName] && d[colName].toLowerCase().indexOf(this.filter.keyword.toLowerCase()) > -1) {
            return true
          }
        }
        return false
      }).map(d => {
        // debugger
        d.create_ts = dayjs(d.create_ts.$date).format('YYYY-MM-DD HH:mm:ss')
        d.finish_ts = dayjs(d.finish_ts.$date).format('YYYY-MM-DD HH:mm:ss')

        try {
          d.spider_id = d.spider_id.$oid
        } catch (e) {
          if (d.spider_id) d.spider_id = d.spider_id.toString()
        }
        return d
      }).sort((a, b) => a.create_ts < b.create_ts ? 1 : -1)
    }
  },
  methods: {
    onSearch (value) {
      console.log(value)
    },
    onAdd () {
      this.$store.commit('task/SET_TASK_FORM', {})
      this.isEditMode = false
      this.dialogVisible = true
    },
    onRefresh () {
      this.$store.dispatch('task/getTaskList')
    },
    onEdit (row) {
      console.log(row)
      this.isEditMode = true
      this.$store.commit('task/SET_TASK_FORM', row)
      this.dialogVisible = true
    },
    onRemove (row) {
      this.$confirm('Are you sure to delete this task?', 'Notification', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('task/deleteTask', row._id.$oid)
          .then(() => {
            this.$message({
              type: 'success',
              message: 'Deleted successfully'
            })
          })
      })
    },
    onDeploy (row) {
      this.$store.dispatch('task/deployTask', row._id.$oid)
    },
    onCrawl (row) {
      this.$store.dispatch('task/crawlTask', row._id.$oid)
    },
    onView (row) {
      this.$router.push(`/tasks/${row._id.$oid}`)
    }
  },
  created () {
    this.$store.dispatch('task/getTaskList')
  }
}
</script>

<style scoped lang="scss">
  .el-dialog {
    .el-select {
      width: 100%;
    }
  }

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

    .el-button {
      padding: 7px;
    }
  }

  .delete-confirm {
    background-color: red;
  }
</style>
