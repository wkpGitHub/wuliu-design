<script lang="jsx">
import SideBar from './sideBar'
import Header from './header'
export default {
  setup() {
    return () => <div class="layout__container">
      <SideBar />
      <div class="layout__content">
        <Header />
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

  &content {
    flex: auto;
    height: 100%;
    overflow: hidden;
  }

  &main {
    height: calc(100% - 38px);
    background: var(--bg-color);
  }
}
</style>