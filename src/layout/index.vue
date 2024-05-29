<script lang="jsx">
export default {
  setup() {
    return () => <div class="layout__container">
      <div class="layout__sideBar"></div>
      <div class="layout__content">
        <div class="layout__header">
          <span>logo</span>
          <el-dropdown popper-class="accountDropdown" trigger="click">{{
            default() {
              return <div class="account-btn">超级管理员</div>
            },
            dropdown() {
              return <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
              </el-dropdown-menu>
            }
          }}</el-dropdown>
        </div>
        <div class="layout__main">
          <RouterView />
        </div>
      </div>
    </div>
  }
}
</script>

<style lang="scss">
.layout__ {
  &container {
    display: flex;
    height: 100%;
  }

  &sideBar {
    flex-shrink: 0;
    width: 180px;
    height: 100%;
    background: #14181f;
    display: flex;
    flex-direction: column;
  }

  &content {
    flex: auto;
    height: 100%;
    overflow: hidden;
  }

  &header {
    height: 38px;
    background: #252c38;
    color: #fffc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;

    .el-dropdown {
      color: #fffc;
    }
  }

  &main {
    height: calc(100% - 38px);
    background: var(--bg-color);
  }
}

.el-dropdown-menu.accountDropdown {
  width: 120px;
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
    &:hover{
      background-color: #f2f2f2;
    }
  }
}
</style>