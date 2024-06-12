<script lang="jsx">
import { Discount, Setting } from '@element-plus/icons-vue'
import { reactive, onUnmounted, withModifiers } from 'vue'

export default {
  setup() {
    let _timer;
    const state = reactive({
      expand: false,
      isShowDrawer: false,
      hideMenu: false,
      currentSubMenu: Array.from({ length: 10 }, () => { }),
      openeds: ['1-1', '2-1']
    })

    function hideSubMenu() {
      state.hideMenu = true
      _timer = setTimeout(() => {
        state.isShowDrawer = false
        state.hideMenu = false
      }, 200);
    }

    window.addEventListener('click', hideSubMenu)
    onUnmounted(() => {
      window.removeEventListener('click', hideSubMenu)
    })

    function genExpandMenu() {
      return <el-menu class="expand-menu first-menu" router default-openeds={state.openeds}>
        <el-sub-menu index="1">{{
          title: () => <>
            <el-icon><Discount /></el-icon>
            <span class="title">产品</span>
          </>,
          default: () => <>
            <el-sub-menu class="second-menu" index="1-1">{{
              title: () => <span>开发</span>,
              default: () => <>
                <el-menu-item index="/list2">
                  <span>新品开发</span>
                </el-menu-item>
              </>
            }}</el-sub-menu>
            <el-sub-menu class="second-menu" index="2-1">{{
              title: () => <span>产品</span>,
              default: () => <>
                <el-menu-item index="/list">
                  <span>产品管理</span>
                </el-menu-item>
                <el-menu-item index="/edit">
                  <span>编辑产品</span>
                </el-menu-item>
                <el-menu-item index="2111">
                  <span>辅料管理</span>
                </el-menu-item>
              </>
            }}</el-sub-menu>
          </>
        }}</el-sub-menu>
        <el-sub-menu index="2">{{
          title: () => <>
            <el-icon><Setting /></el-icon>
            <span class="title">销售</span>
          </>,
          default: () => <el-sub-menu class="second-menu" index="2-1">{{
            title: () => <span>商品管理</span>,
            default: () => <>
              <el-menu-item index="22">
                <span>B2B售价</span>
              </el-menu-item>
              <el-menu-item index="23">
                <span>FBA费差异</span>
              </el-menu-item>
            </>
          }}</el-sub-menu>
        }}</el-sub-menu>
      </el-menu>
    }

    function genCollapseMenu() {
      return <el-menu class="first-menu" onClick={withModifiers(() => {}, ['stop'])}>
        <el-menu-item index="2111">
          <a onClick={() => state.isShowDrawer = true}>
            <el-icon><Discount /></el-icon>
            <span class="title">产品</span>
          </a>
        </el-menu-item>
        <el-menu-item index="2111">
          <a onClick={() => state.isShowDrawer = true}>
            <el-icon><Setting /></el-icon>
            <span class="title">销售</span>
          </a>
        </el-menu-item>
      </el-menu>
    }

    function genDrawer() {
      return state.isShowDrawer && <>
        <div class={['sub-menu', {'hide-menu': state.hideMenu}]}>
          {state.currentSubMenu.map(item => <div class="submenu-block">
            <div class="submenu-title">
              <span>采购单据</span>
            </div>
            <div class="submenu-content">
              <a onClick={hideSubMenu}>采购计划</a>
              <a onClick={hideSubMenu}>采购计划</a>
              <a onClick={hideSubMenu}>采购计划</a>
              <a onClick={hideSubMenu}>采购计划</a>
            </div>
          </div>)}
        </div>
        <div class="contain-modal" onClick={hideSubMenu}></div>
      </>
    }


    return () => <div class={['layout__sideBar', { expand: state.expand }]}>
      <div class="layout__sideBar-content">
        <div class="logo"><i class="iconfont icon-LOGO"></i></div>
        {state.expand ? genExpandMenu() : genCollapseMenu()}
        <div class="handel-collapse">
          <div class="collapse-box" onClick={() => state.expand = !state.expand}><i class="iconfont icon-expand"></i></div>
        </div>
      </div>
      {genDrawer()}
    </div>
  }
}
</script>

<style lang="scss">
.layout__sideBar {
  --dark-bg-1: #14181f;
  --dark-bg-2: #23262a;
  flex-shrink: 0;
  height: 100%;
  position: relative;
  transition: width .2s;
  width: 56px;

  &-content {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 9999;
    background: var(--dark-bg-1);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &.expand {
    width: 180px;

    .collapse-box {
      transform: rotate(180deg) !important;
    }
  }

  .logo {
    height: 56px;
    display: flex;
    padding-left: 14px;
    align-items: center;
    i{
      display: block;
      width: 28px;
      height: 28px;
      font-size: 28px;
      color: #005bf5;
    }
  }

  .handel-collapse {
    height: 48px;
    background: var(--dark-bg-1);
    display: flex;
    align-items: center;

    .collapse-box {
      width: 28px;
      height: 28px;
      align-items: center;
      justify-content: center;
      display: flex;
      cursor: pointer;
      margin-left: 13px;
      border-radius: 4px;

      &:hover {
        background-color: #ffffff1f;
      }
    }

    i {
      font-size: 20px;
      color: #ffffff8a;
    }
  }

  .el-menu {
    background-color: var(--dark-bg-2);
    .el-menu-item {
      border-right: none;
      padding: 0 !important;
      line-height: 16px;
      height: 64px !important;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff8a;

      a {
        width: 48px;
        height: 48px;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 20px;
      }

      &:hover {
        color: #fff !important;
        background-color: var(--dark-bg-1) !important;
      }

      &.active {
        color: #fff !important;
        background-color: var(--dark-bg-1) !important;
      }
    }
    .el-icon{
      margin-right: 0 !important;
    }
  }

  .el-menu.first-menu {
    border-right: none;
    background: var(--dark-bg-1);
    height: calc(100% - 104px);
    overflow: scroll;
    scrollbar-width: none;

    .el-menu-item {
      min-width: auto;
      padding: 0 !important;
      line-height: 16px;

      &:hover {
        background-color: #3c4146 !important;
      }

    }
  }

  .expand-menu {
    .el-menu-item {
      justify-content: flex-start;
      color: #fffffff2;
    }

    .el-sub-menu {
      &.is-opened {
        background-color: var(--dark-bg-2);

        .el-sub-menu__title {
          background-color: var(--dark-bg-2);
        }

        .title {
          font-weight: 700;
          color: #fff !important;
        }

        i {
          color: #fff !important;
        }
      }

      &.second-menu {
        .el-sub-menu__title {
          padding-left: 30px !important;
          padding-right: 14px !important;
          color: #ffffffb3;
          font-size: 12px;
        }

        .el-menu-item {
          height: 36px !important;

          span, a {
            padding-left: 50px;
            align-items: flex-start !important;
            color: #fffffff2;
            text-decoration: none;
          }
        }
      }
    }

    .el-sub-menu__title {
      height: 46px;
      line-height: 46px;
      font-size: 12px;
      color: #ffffffe6;
      padding-left: 14px !important;
      padding-right: 10px !important;

      &:hover {
        background-color: var(--dark-bg-1);
        color: #fff !important;
      }

      .title {
        font-size: 14px;
        margin-left: 8px;
      }
    }
  }

  .sub-menu {
    position: absolute;
    left: 56px;
    top: 0;
    height: 100%;
    min-height: 500px;
    background: #ffffff;
    z-index: 9998;
    box-shadow: 0 2px 4px #00000026;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    line-height: 40px;
    color: #0b1019;
    letter-spacing: 0;
    font-size: 12px;
    writing-mode: vertical-lr;
    animation: drawer-data .2s;
    transition: transform .2s;
    &.hide-menu{
      transform: translate(-100%);
    }
  }

  @keyframes drawer-data {
    0% {
      transform: translate(-100%);
    }

    100% {
      transform: translate(0);
    }
  }

  .submenu-block {
    width: 180px;
    background: #ffffff;
    padding: 16px 0 0;
    writing-mode: horizontal-tb;
  }

  .submenu-title {
    padding: 8px 16px;
    font-size: 12px;
    color: #888c94;
    line-height: 16px;
  }

  .submenu-content {
    a {
      display: block;
      color: #0b1019;
      padding: 8px 16px 8px 32px;
      cursor: pointer;
      line-height: 16px;

      &:hover {
        background: rgba(0, 91, 245, .06);
      }
    }
  }

  .contain-modal {
    position: fixed;
    top: 0;
    right: 0;
    left: 56px;
    bottom: 0;
    background: rgba(0, 0, 0, .25);
    z-index: 9990;
    transition: opacity .2s;
    &.hide-menu{
      opacity: 0;
    }
  }
}
</style>