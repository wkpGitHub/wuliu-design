<script lang="jsx">
import { reactive, onUnmounted } from 'vue'
import { CaretBottom } from '@element-plus/icons-vue'
import request from '@/request'
import DialogForm from '@/components/dialog-form'
import store from '@/store'

export default {
  setup() {
    const popperOptions = {
      modifiers: [
        {
          name: 'offset',
          options: { offset: [0, 8] }
        }
      ]
    }

    const setFormFieldList = [
      { label: '弹窗风格', prop: 'dialog-theme', type: 'select', options: [{label: '弹窗', value: 'dialog'}, {label: '抽屉', value: 'drawer'}]},
      { label: '默认分页条数', prop: 'pageSize', type: 'select', options: [10,20,50,100].map(value => ({label: `${value}条/页`, value})) }
    ]

    const state = reactive({
      setDialog: {
        isShow: false,
        form: {...store.globalSetting}
      },
      contextmenu: {
        isShow: false,
        x: 0,
        y: 0,
        list: []
      }
    })


    function handleCommand(command) {
      if (command === 'set') {
        state.setDialog.isShow = true
        state.setDialog.form = {...store.globalSetting}
      } else if (command === 'logout') {
        console.log('退出')
      }
    }

    function onContextmenu(e) {
      e.preventDefault()
      state.contextmenu = {
        isShow: true,
        x: e.x + 10,
        y: e.y,
        list: []
      }
    }

    function hideContextmenu() { state.contextmenu.isShow = false }
    window.addEventListener('click', hideContextmenu)
    onUnmounted(() => {
      window.removeEventListener('click', hideContextmenu)
    })

    async function saveSetDialog({form}) {
      debugger
      store.setGlobalSetting(form)
    }

    return () => {
      const { contextmenu, setDialog } = state
      return <div class="layout__header">
        <div class="tags-view">
          <div class="slick-list">
            <div class="slick-item" onContextmenu={onContextmenu}>
              <span class="tag"> 发货计划 </span>
              <span title="关闭当前页面" class="close-btn">
                <i class="iconfont icon-close"></i>
              </span>
            </div>
            <div class="slick-item slick-item-active" onContextmenu={onContextmenu}>
              <span class="tag"> 发货计划 </span>
              <span title="关闭当前页面" class="close-btn">
                <i class="iconfont icon-close"></i>
              </span>
            </div>
            <div class="slick-item" onContextmenu={onContextmenu}>
              <span class="tag"> 发货计划 </span>
              <span title="关闭当前页面" class="close-btn">
                <i class="iconfont icon-close"></i>
              </span>
            </div>
            <div class="slick-item" onContextmenu={onContextmenu}>
              <span class="tag"> 发货计划 </span>
              <span title="关闭当前页面" class="close-btn">
                <i class="iconfont icon-close"></i>
              </span>
            </div>
          </div>
        </div>
        <el-dropdown popper-class="accountDropdown" trigger="click" popper-options={popperOptions} onCommand={handleCommand}>{{
          default() {
            return <div class="account-btn">
              <div class="user-icon">
                <i class="iconfont icon-user"></i>
              </div>
              <span>超级管理员</span>
              <el-icon class="ml-1"><CaretBottom /></el-icon>
            </div>
          },
          dropdown() {
            return <el-dropdown-menu class="accountDropdown">
              <el-dropdown-item command="set">偏好设置</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          }
        }}</el-dropdown>

        <DialogForm v-model={setDialog.isShow} fieldList={setFormFieldList} form={setDialog.form} title="偏好设置" width={300} span={1} labelWidth={90} onConfirm={saveSetDialog} />

        {contextmenu.isShow && <ul class="contextmenu" style={{ left: `${contextmenu.x}px`, top: `${contextmenu.y}px` }}>
          <li>刷新当前页面</li>
          <li>固定当前页面</li>
          <li>关闭当前页面</li>
          <li>关闭其他页面</li>
        </ul>}
      </div>
    }
  }
}
</script>

<style lang="scss">
.layout__header {
  height: 38px;
  background: #252c38;
  color: #fffc;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tags-view {
    padding-top: 6px;
    display: flex;
    flex: 1;
  }

  .slick-list {
    display: flex;
  }

  .slick-item {
    position: relative;
    cursor: pointer;

    .tag {
      font-size: 12px;
      display: block;
      line-height: 32px;
      color: #fffc;
      cursor: pointer;
      min-width: 120px;
      padding: 0 25px 0 12px;
      border-radius: 6px 6px 0 0;
      box-sizing: border-box;
      user-select: none;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .close-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      border: none;
      background: none;
      padding: 0;
      font-size: 16px;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      display: inline-block;
      line-height: 16px;
      color: #fff9;
    }

    &:not(.slick-item-active) {
      &:after {
        position: absolute;
        right: -1px;
        top: 9px;
        width: 1px;
        height: 14px;
        background: rgba(255, 255, 255, .16);
        content: " ";
        display: inline-block;
      }

      .close-btn {
        display: none;
      }
    }

    &.slick-item-active {
      .tag {
        background: #fff;
        color: #0b1019 !important;
      }

      .close-btn {
        color: #888c94;

        &:hover {
          background: #f0f2f5;
        }
      }
    }

    &:hover {
      .tag {
        color: #fff;
      }

      .close-btn {
        display: block;
      }
    }

  }

  .el-dropdown {
    color: #fffc;
  }

  .contextmenu {
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 8px 0;
    border-radius: 2px;
    font-size: 12px;
    font-weight: 400;
    color: #33363c;
    box-shadow: 0 2px 4px #00000026;

    li {
      padding: 0 16px;
      cursor: pointer;
      font-size: 12px;
      line-height: 32px;
      height: 32px;
      border-radius: 2px;

      &:hover {
        background: #f2f2f2;
      }
    }
  }
}

.el-dropdown-menu.accountDropdown {
  width: 100px;
  padding: 8px 0;
  background: #fff;
  border: none;
  border-radius: 2px;
  box-shadow: 0 2px 4px #00000026;
  z-index: 99999 !important;

  .el-dropdown-menu__item {
    font-size: 12px;
    color: #0b1019;
    padding: 0 12px;
    line-height: 32px;
    cursor: pointer;

    &:hover {
      background-color: #f2f2f2;
    }
  }
}

.account-btn {
  padding: 0 8px;
  height: 32px;
  line-height: 32px;
  margin-left: 7px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover{
    color: #fff;
  }
}

.user-icon {
  background: #bfc2c7;
  border-radius: 20px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
  color: #fff;
  overflow: hidden;
  i{
    color: #fffc;
    font-size: 18px;
  }
}
</style>