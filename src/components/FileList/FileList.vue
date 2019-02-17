<template>
  <div class="file-list-container">
    <div class="file-path-container">
      <div class="file-path" v-show="!isEdit">{{currentPath}}</div>
      <el-input class="file-path"
                v-show="isEdit"
                v-model="currentPath"
                @change="onChange"
                @keypress.enter.native="onChangeSubmit">
      </el-input>
      <i class="el-icon-edit" @click="onEdit"></i>
    </div>
    <ul class="file-list">
      <li v-for="(item, index) in fileList" :key="index" class="item">
        <span class="item-icon">
          <i class="fa" :class="getIcon(item.type)"></i>
        </span>
        <span class="item-name">
          {{item.path}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'FileList',
  data () {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState('fileList', [
      'fileList'
    ]),
    currentPath: {
      set (value) {
        this.$store.commit('fileList/SET_CURRENT_PATH', value)
      },
      get () {
        return this.$store.state.fileList.currentPath
      }
    }
  },
  methods: {
    getIcon (type) {
      if (type === 1) {
        return 'fa-file-o'
      } else if (type === 2) {
        return 'fa-folder'
      }
    },
    onEdit () {
      this.isEdit = true
    },
    onChange (path) {
      console.log(path)
      this.$store.commit('fileList/SET_CURRENT_PATH', path)
    },
    onChangeSubmit () {
      this.isEdit = false
      this.$store.dispatch('fileList/getFileList', this.currentPath)
    }
  }
}
</script>

<style scoped lang="scss">
  .file-list-container {
    height: 100%;

    .file-path-container {
      padding: 5px;
      margin: 0 10px;
      border-radius: 5px;
      border: 1px solid rgba(48, 65, 86, 0.4);
      display: flex;
      justify-content: space-between;

      .el-input {
        /*height: 22px;*/
        line-height: 10px;
      }

      .el-icon-edit {
        cursor: pointer;
      }
    }

    .file-list {
      padding: 0;
      margin: 0;
      list-style: none;

      .item {
        padding: 10px 20px;
        cursor: pointer;
        color: #303133;

        .item-icon {
          .fa-folder {
          }
        }
      }

      .item:hover {
        background-color: rgba(48, 65, 86, 0.1);
      }
    }
  }
</style>

<style scoped>
  .file-path >>> .el-input__inner {
    font-size: 14px;
    line-height: 18px;
    height: 18px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 2px solid #409EFF;
    border-radius: 0;
  }
</style>
