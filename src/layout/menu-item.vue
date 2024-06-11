<script lang="jsx">
import {ref} from 'vue'

export default {
  setup() {
    const visible = ref(false)
    return <el-popover v-model:visible={visible.value} show-arrow={false} popper-class="menu-download-popover" hide-after={0} placement="bottom-start" offset={0} width="auto">{{
        reference: () => <li class={{active: visible.value, "menu-item": true}}>{item.title}</li>,
        default: () => <div class="menu-card">
          <div class="menu-line">
            <div class="title">产品管理</div>
            <ul>
              <li class="page-item">在线产品</li>
              <li class="page-item">在线产品</li>
              <li class="page-item">在线产品</li>
              <li class="page-item">在线产品</li>
              <li class="page-item">在线产品</li>
              <li class="page-item">在线产品</li>
            </ul>
          </div>
          <div class="menu-line">
            <div class="title">订单管理</div>
            <ul>
              <li class="page-item active">销售订单</li>
              <li class="page-item">退货订单</li>
              <li class="page-item">换货订单</li>
            </ul>
          </div>
          <div class="menu-line">
            <div class="title">运营管理</div>
            <ul>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
            </ul>
          </div>
          <div class="menu-line">
            <div class="title">运营管理</div>
            <ul>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
            </ul>
          </div>
          <div class="menu-line">
            <div class="title">运营管理</div>
            <ul>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
            </ul>
          </div>
          <div class="menu-line">
            <div class="title">运营管理</div>
            <ul>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
              <li class="page-item">运营计划</li>
            </ul>
          </div>
        </div>
      }}</el-popover>
  }
}
</script>

<style lang="scss">

</style>