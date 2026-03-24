<template>
  <div class="layout-container">
    <div class="sidebar">
      <div class="logo">
        <h2>🛠️ 创作盒子</h2>
      </div>
      <div class="menu">
        <router-link to="/xhs" class="menu-item" active-class="active">
          <span class="icon">📱</span>
          <span class="text">小红书封面</span>
        </router-link>
        <router-link to="/wechat" class="menu-item" active-class="active">
          <span class="icon">✍️</span>
          <span class="text">公众号排版</span>
        </router-link>
      </div>
    </div>
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
// Layout logic here if needed
</script>

<style scoped>
.layout-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f1f2f5;
}

.sidebar {
  width: 240px;
  background-color: #ffffff;
  border-right: 1px solid #ebedf0;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(0,0,0,0.02);
  z-index: 100;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #ebedf0;
}

.logo h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.menu {
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: #606266;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background-color: #f5f7fa;
  color: #333;
}

.menu-item.active {
  background-color: #e6f7ff;
  color: #1890ff;
  font-weight: 500;
}

.menu-item .icon {
  margin-right: 12px;
  font-size: 18px;
}

.menu-item .text {
  font-size: 15px;
}

.main-content {
  flex: 1;
  position: relative;
  overflow: auto; /* Changed to auto so mobile content can scroll if needed */
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 📱 移动端适配：改为底部的 Tab 栏 */
@media (max-width: 768px) {
  .layout-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: 60px;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    left: 0;
    border-right: none;
    border-top: 1px solid #ebedf0;
    box-shadow: 0 -2px 8px rgba(0,0,0,0.05);
  }

  .logo {
    display: none; /* 移动端隐藏 Logo，节约空间 */
  }

  .menu {
    flex-direction: row;
    width: 100%;
    padding: 0;
    gap: 0;
  }

  .menu-item {
    flex: 1;
    flex-direction: column;
    justify-content: center;
    border-radius: 0;
    padding: 6px 0;
  }

  .menu-item .icon {
    margin-right: 0;
    margin-bottom: 4px;
    font-size: 20px;
  }

  .menu-item .text {
    font-size: 12px;
  }

  .main-content {
    height: calc(100vh - 60px);
    flex: none; /* 覆盖默认 flex: 1，防止手机端高度算错 */
  }
}
</style>
