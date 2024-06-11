<script lang="jsx">
import { reactive, watch } from 'vue'
import { CaretBottom } from '@element-plus/icons-vue'
import DialogForm from '@/components/dialog-form'
import store from '@/store'
import menuList from './menuList'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const popperOptions = {
      modifiers: [
        {
          name: 'offset',
          options: { offset: [0, 8] }
        }
      ]
    }

    const setFormConfig = {
      grid: 1,
      labelWidth: 90,
      configList: [
        { label: '弹窗风格', prop: 'dialog-theme', type: 'select', options: [{label: '弹窗', value: 'dialog'}, {label: '抽屉', value: 'drawer'}]},
        { label: '默认分页条数', prop: 'pageSize', type: 'select', options: [10,20,50,100].map(value => ({label: `${value}条/页`, value})) }
      ]
    }

    const state = reactive({
      setDialog: {
        isShow: false,
        form: {...store.globalSetting}
      },
      popoverVisible: {},
      menuList
    })

    watch(() => route.path, v => {
      for (let menu of state.menuList) {
        let _active = false
        menu.children.forEach(child => {
          child.children.forEach(page => {
            if (`/${page.path}` === v) {
              _active = true
              page.active = true
            } else {
              page.active = false
            }
          })
        })
        menu.active = _active
      }
    }, {immediate: true})


    function handleCommand(command) {
      if (command === 'set') {
        state.setDialog.isShow = true
        state.setDialog.form = {...store.globalSetting}
      } else if (command === 'logout') {
        console.log('退出')
      }
    }

    async function saveSetDialog({form}) {
      debugger
      store.setGlobalSetting(form)
    }

    function genMenuItem(item) {
      return <el-popover v-model:visible={item.visible} show-arrow={false} popper-class="menu-download-popover" hide-after={0} placement="bottom-start" offset={0} width="auto">{{
        reference: () => <li class={{hover: item.visible, active: item.active,"menu-item": true}}>{item.title}</li>,
        default: () => <div class="menu-card">
          {item.children.map(child => <div class="menu-line">
            <div class="title">{child.title}</div>
            <ul>
              {child.children.map(page => <li onClick={() => {
                item.visible = false
                router.push(page.path)
              }} class={{"page-item": true, active: page.active}}>{page.title}</li>)}
            </ul>
          </div>)}
        </div>
      }}</el-popover>
    }

    return () => {
      const { setDialog, menuList } = state
      return <div class="layout__header">
        <div class="logo"></div>
        <ul class="menu-list">
          {menuList.map(item => genMenuItem(item))}
        </ul>
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

        <DialogForm v-model={setDialog.isShow} formConfig={setFormConfig} form={setDialog.form} title="偏好设置" width={300} onConfirm={saveSetDialog} />
      </div>
    }
  }
}
</script>

<style lang="scss">
.layout__header {
  height: 38px;
  background: #232f3e;
  color: #fffc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    width: 64px;
    height: 40px;
    cursor: pointer;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplM2U5ZWVjYi1mNWM1LTM2NGYtYWY0My0xMGFlODQ4MDUwMjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDIwM0JFQzI2OEUzMTFFQkE1MkNENjcxMEQxNEIwNkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDIwM0JFQzE2OEUzMTFFQkE1MkNENjcxMEQxNEIwNkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDMwQUU4OEI2ODY1MTFFQkFGN0NBODgxQTY1REU3MzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDMwQUU4OEM2ODY1MTFFQkFGN0NBODgxQTY1REU3MzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Jas4TAAABeElEQVR42mL8//8/Az0AC5hcIlUPJBtpZEcdQ8yzJiYop4FGFtXCzGVCsZm6loEsaYJxmDC8iSRJAahBN4cFh0sYobQuELMRafgfIL4IxNVA3Iw9MWB3EQgcA+INRFj2F4gjgdgHiFuwKWAi4H0bIA4A4l8ELIkCYlVclhCyCASqCFgGs0QZiFvxGcRERNiDLLPFYhnIkmggVgLiNkKGMBEZ0ZVAbIdkGciSGCBWAOJ24ksG4kAFlAZZJgDE8kDcQVoRRJploFB4S4olyBaVAXEXkXrKSHQcShHUTYYBxFrSgJ4YQJaVU9GSZpgl2FJdF5Usa4aWm3iTN6WWtaBbgi8fkWtZK7QwJinDkmpZG1JhTGI+innWxXC+VZ1B3jcJr7rHOzcw6JdWA5sEFGRYw+pkhgcbJBgUArywyj/adhxoSSB1yjqFAG+gZdswfbL9BIOclxUxRjARHQPoloEskfW0pE1ZB7FsKwMzhzAploAAI70akAABBgDcKViSR0SM3QAAAABJRU5ErkJggg==) no-repeat center center;
  }

  .menu-list {
    display: flex;
    flex: 1;
    height: 38px;

    .menu-item {
      position: relative;
      padding: 0 24px;
      user-select: none;
      flex-shrink: 0;
      cursor: pointer;
      color: #ddd;
      font-size: 14px;
      line-height: 38px;

      &:hover,
      &.hover,
      &.active {
        color: #fff;
        background-color: #000;
      }

      // &.active:before {
      //   position: absolute;
      //   border-radius: 4px;
      //   width: 100%;
      //   height: 4px;
      //   background: var(--el-color-primary);
      //   content: "";
      // }
    }
  }

  .el-dropdown {
    color: #fffc;
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

  &:hover {
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

  i {
    color: #fffc;
    font-size: 18px;
  }
}

.el-popover.menu-download-popover {
  // padding-top: 4px !important;
  transition: none;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.15);

  // background-color: transparent !important;
  .menu-card {
    display: flex;
    padding-left: 8px;
    overflow: hidden;
    z-index: 5000;
    user-select: none;
    border-radius: 4px;
    // background-color: #232f3e !important;
  }

  .menu-line {
    display: inline-block;
    padding: 8px 0 10px;
  }

  .title {
    position: relative;
    padding: 8px 16px 8px 24px;
    line-height: 24px;
    color: #999;

    &:before {
      content: "";
      position: absolute;
      left: 14px;
      top: 15px;
      width: 2px;
      height: 12px;
      background: var(--el-color-primary);
      border-radius: 4px;
    }
  }

  .page-item {
    padding: 0 32px 0 24px;
    line-height: 40px;
    white-space: nowrap;
    cursor: pointer;

    &.active,
    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>