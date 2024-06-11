<script lang="jsx">
import { reactive, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const state = reactive({
      tabs: [{path: '/首页', isLock: true}],
      contextmenu: {
        isShow: false,
        x: 0,
        y: 0,
        index: 0,
        tab: {}
      }
    })
    const route = useRoute()
    const router = useRouter()

    watch(() => route, v => {
      let currentTab;
      state.tabs.forEach(tab => {
        if (tab.path === v.path) {
          tab.active = true
          currentTab = tab
        } else {
          tab.active = false
        }
      })
      if (!currentTab) {
        const newTab = {...v}
        newTab.active = true
        state.tabs.push(newTab)
      }
    }, {immediate: true, deep: true})

    function deleteTab(tab, index) {
      if (tab.active) {
        const nextTab = state.tabs[index -1]
        router.push(nextTab.path)
      }
      state.tabs.splice(index, 1)
    }

    function onContextmenu(e, tab, index) {
      e.preventDefault()
      if (index === 0) return
      state.contextmenu = {
        isShow: true,
        x: e.x + 10,
        y: e.y - 38,
        tab,
        index
      }
    }
    function hideContextmenu() { state.contextmenu.isShow = false }
    window.addEventListener('click', hideContextmenu)
    onUnmounted(() => {
      window.removeEventListener('click', hideContextmenu)
    })

    function lockTab(tab, index) {
      const {isLock} = tab
      let nextLockIndex = state.tabs.findLastIndex(col => col.isLock)
      if (!isLock) {
        nextLockIndex++
      }
      state.tabs.splice(index, 1)
      state.tabs.splice(nextLockIndex, 0, tab)
      tab.isLock = !isLock
    }

    function reloadPage() {
      router.replace(state.contextmenu.tab.path)
    }

    function lockPage() {
      const {tab, index} = state.contextmenu
      lockTab(tab, index)
    }

    function closeOtherPages() {
      state.tabs = state.tabs.filter(tab => tab === state.contextmenu.tab || tab.isLock)
      const currentTab = state.tabs.at(-1)
      router.push(currentTab.path)
    }

    function genTabIcon(tab, index) {
      if (index === 0) return null
      return tab.isLock ? <i class="iconfont icon-pin-lock" onClick={() => lockTab(tab, index)}></i> : <i class="iconfont icon-close close-btn" onClick={() => deleteTab(tab, index)}></i>
    }

    return () => {
      const { contextmenu, tabs } = state
      return <div class="slick-list">
        {tabs.map((tab, index) => <div class={{'slick-item': true, 'slick-item-active': tab.active}} onContextmenu={e => onContextmenu(e, tab, index)}>
          <span class={{tag: true, 'is-home': index === 0}} onClick={() => router.push(tab.path)}> {tab.path} </span>
          {genTabIcon(tab, index)}
        </div>)}
        {contextmenu.isShow && <ul class="contextmenu" style={{ left: `${contextmenu.x}px`, top: `${contextmenu.y}px` }}>
          <li key="reload" onClick={reloadPage}>刷新当前页面</li>
          <li key="lock" onClick={lockPage}>{contextmenu.tab.isLock ? '取消固定' : '固定当前页面'}</li>
          <li key="close" onClick={() => deleteTab(contextmenu.tab, contextmenu.index)}>关闭当前页面</li>
          <li key="other" onClick={closeOtherPages}>关闭其他页面</li>
        </ul>}
      </div>
    }
  }
}
</script>

<style lang="scss">
.slick-list {
  display: flex;
  position: relative;
  background: #fff;
  border-bottom: var(--border);
  z-index: 9;
  height: 32px;
  padding: 0 12px;

  .slick-item {
    position: relative;
    cursor: pointer;
    border-radius: 8px 8px 0 0;

    .tag {
      font-size: 12px;
      display: block;
      line-height: 32px;
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
      &.is-home{
        min-width: 70px;
        padding: 0;
        text-align: center;
      }
    }

    .close-btn, .icon-pin-lock {
      position: absolute;
      top: 8px;
      right: 4px;
      border: none;
      background: none;
      padding: 0;
      font-size: 14px;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      display: inline-block;
      line-height: 18px;
      text-align: center;
      &:hover{
        background: #e3e4e8;
      }
    }
    .icon-pin-lock{
      font-size: 12px;
    }

    &:not(.slick-item-active) {
      &:after {
        position: absolute;
        right: -1px;
        top: 9px;
        width: 0px;
        height: 14px;
        border-right: var(--border);
        content: " ";
        display: inline-block;
      }

      .close-btn {
        display: none;
      }
    }

    &:last-child:after{
      display: none;
    }

    &.slick-item-active {
      background-color: var(--bg-color);
      color: var(--el-color-primary);
      border
      .close-btn {
        &:hover {
          background: #f0f2f5;
        }
      }
    }

    &:hover {
      color: var(--el-color-primary);
      .close-btn {
        display: block;
      }
    }

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
    box-shadow: 0 2px 8px #00000030;

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

</style>