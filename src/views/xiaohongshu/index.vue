<template>
  <div class="container-home">
    <div class="editor-panel">
      <h2>✨ 小红书封面生成器</h2>

      <!-- 模式切换 -->
      <div class="mode-tabs">
        <button :class="['tab-btn', currentMode === 'markdown' ? 'active' : '']" @click="currentMode = 'markdown'">文字排版</button>
        <button :class="['tab-btn', currentMode === 'image' ? 'active' : '']" @click="currentMode = 'image'">图片加字</button>
      </div>

      <MarkdownEditor v-if="currentMode === 'markdown'" v-model="markdownText" :isAILoading="isAILoading" @ai-format="handleAIFormat" />
      <ImageEditor v-else-if="currentMode === 'image'" v-model="imageConfig" />

      <button class="export-btn" :disabled="isExporting" @click="exportImage">
        {{ isExporting ? '⏳ 正在导出，请稍候...' : '💾 导出超清封面图' }}
      </button>
      <div class="tips">💡 提示：选中文字后点击上方工具栏，可以快速添加加粗、标题等排版样式！</div>
    </div>

    <CoverPreview 
      ref="previewRef"
      :currentMode="currentMode" 
      :markdownText="markdownText" 
      v-model:imageConfig="imageConfig" 
    />

    <AIKeyModal v-model="showKeyModal" @save="onSaveApiKey" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as htmlToImage from 'html-to-image'

import MarkdownEditor from './components/MarkdownEditor.vue'
import ImageEditor from './components/ImageEditor.vue'
import CoverPreview from './components/CoverPreview.vue'
import AIKeyModal from './components/AIKeyModal.vue'
import { Message } from '@/components/Message/index'
import { useDeepSeek } from '@/utils/useDeepSeek'

const currentMode = ref('markdown')

const imageConfig = ref({
  bgUrl: '',
  titleText: '输入您的标题',
  titleColor: '#333333',
  titleFontSize: 48,
  titleLineHeight: 1.2,
  titleX: 50,
  titleY: 100
})

const markdownText = ref(`# 🌟 2026 前端大咖学习路线

🔥 掌握这些核心技术，成为高薪抢手人才！

## ✨ 核心大纲
1. **Vue 3 & React** 前端双引擎全解析
2. **TypeScript** 必备类型系统与规范
3. **工程化环境** 从零配置 Vite / Webpack
4. **性能监控** 首屏秒开的终极秘密

> "种一棵树最好的时间是十年前，其次是现在。不要犹豫，现在就开始行动！"

---
👉 **划到下一页看详细学习计划！**
每天进步一点点，记得点赞收藏，防走丢哦~ ❤️`)

const previewRef = ref(null)
const isExporting = ref(false)

// AI 相关的状态 - 从 composable 中提取
const { isAILoading, showKeyModal, apiKey, formatTextWithAI, saveApiKey } = useDeepSeek()

onMounted(() => {
  const saved = localStorage.getItem('xhs-image-config')
  if (saved) {
    try {
      imageConfig.value = { ...imageConfig.value, ...JSON.parse(saved) }
    } catch(e) {}
  }
  
  // apiKey already gets initialized internally
})

watch(() => imageConfig.value, (val) => {
  localStorage.setItem('xhs-image-config', JSON.stringify(val))
}, { deep: true })

// AI 排版逻辑
const handleAIFormat = async (mode = 'optimize') => {
  if (isAILoading.value) return
  const result = await formatTextWithAI(markdownText.value, mode, 'xiaohongshu')
  if (result) {
    markdownText.value = result
  }
}

const onSaveApiKey = async (key) => {
  saveApiKey(key)
  const result = await formatTextWithAI(markdownText.value, 'optimize', 'xiaohongshu')
  if (result) {
    markdownText.value = result
  }
}

const exportImage = async () => {
  const coverEl = previewRef.value?.getCoverElement()
  if (!coverEl || isExporting.value) return
  isExporting.value = true
  try {
    const dataUrl = await htmlToImage.toPng(coverEl, {
      quality: 1,
      pixelRatio: 3,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left'
      }
    })
    const link = document.createElement('a')
    link.download = `xhs-cover-${Date.now()}.png`
    link.href = dataUrl
    link.click()
  } catch (err) {
    console.error('导出失败:', err)
    Message.error('导出图片失败，请检查控制台')
  } finally {
    isExporting.value = false
  }
}
</script>

<style scoped>
.container-home {
  position: absolute; /* Changed from fixed because now it's inside a layout container */
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  background-color: #f1f2f5;
  box-sizing: border-box;
  z-index: 99;
}

/* 左侧栏：工具栏，紧贴边缘 */
.editor-panel {
  width: 480px;
  background: white;
  padding: 32px 36px;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  z-index: 10;
  overflow-y: auto;
  border-right: 1px solid #ebedf0;
}

.editor-panel h2 {
  margin-top: 0;
  color: #1a1a1a;
  margin-bottom: 20px;
  font-size: 24px;
}

/* 模式切换 Tabs */
.mode-tabs {
  display: flex;
  background: #f1f2f5;
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 24px;
}

.tab-btn {
  flex: 1;
  padding: 10px 0;
  text-align: center;
  border: none;
  background: transparent;
  color: #606266;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s;
}

.tab-btn.active {
  background: white;
  color: #ff2442;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.export-btn {
  padding: 16px 24px;
  background: #ff2442;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 16px rgba(255, 36, 66, 0.3);
}

.export-btn:hover:not(:disabled) {
  background: #e61e38;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 36, 66, 0.4);
}

.export-btn:disabled {
  background: #ffb4c0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.tips {
  margin-top: 16px;
  font-size: 13px;
  color: #909399;
  text-align: center;
}

@media (max-width: 768px) {
  .container-home {
    position: relative; /* Changed from static/absolute to relative so it scrolls correctly inside main-content */
    flex-direction: column;
    height: auto;
    min-height: 100%;
  }
  
  .editor-panel {
    width: 100%; /* Better width allocation */
    border-right: none;
    border-bottom: 1px solid #ebedf0;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.02);
    overflow: visible;
    box-sizing: border-box;
  }
  
  .editor-panel h2 {
    font-size: 20px;
    margin-bottom: 16px;
  }
}
</style>
