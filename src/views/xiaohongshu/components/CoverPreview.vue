<template>
  <div class="preview-panel">
    <div class="cover-wrapper" ref="coverRef">
      <div class="cover-content" v-if="currentMode === 'markdown'">
        <div class="markdown-body" v-html="parsedHTML"></div>
      </div>

      <div class="cover-image-content" v-else-if="currentMode === 'image'" :style="{ backgroundImage: imageConfig.bgUrl ? 'url(' + imageConfig.bgUrl + ')' : '' }">
        <div v-if="!imageConfig.bgUrl" class="empty-bg-tip">暂无背景，请在左侧上传</div>
        <div 
          class="draggable-title" 
          v-show="imageConfig.titleText"
          :style="{ 
            left: imageConfig.titleX + 'px', 
            top: imageConfig.titleY + 'px', 
            color: imageConfig.titleColor, 
            fontSize: imageConfig.titleFontSize + 'px',
            lineHeight: imageConfig.titleLineHeight || 1.2
          }"
          @mousedown="startDrag"
          @touchstart="startDrag"
        >
          {{ imageConfig.titleText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  currentMode: {
    type: String,
    required: true
  },
  markdownText: {
    type: String,
    default: ''
  },
  imageConfig: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:imageConfig'])

const coverRef = ref(null)

defineExpose({
  getCoverElement: () => coverRef.value
})

const parsedHTML = computed(() => {
  return marked.parse(props.markdownText)
})

let dragState = { isDragging: false, startX: 0, startY: 0, initialX: 0, initialY: 0 }

const startDrag = (e) => {
  dragState.isDragging = true
  const touch = e.type === 'touchstart' ? e.touches[0] : e
  dragState.startX = touch.clientX
  dragState.startY = touch.clientY
  dragState.initialX = props.imageConfig.titleX
  dragState.initialY = props.imageConfig.titleY
  
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag, { passive: false })
  document.addEventListener('touchend', stopDrag)
}

const onDrag = (e) => {
  if (!dragState.isDragging) return
  if (e.cancelable) e.preventDefault()
  
  const touch = e.type.startsWith('touch') ? e.touches[0] : e
  const dx = touch.clientX - dragState.startX
  const dy = touch.clientY - dragState.startY
  
  const isMobile = window.innerWidth <= 768
  const scale = isMobile ? 0.7 : 1
  
  const newConfig = { ...props.imageConfig }
  newConfig.titleX = dragState.initialX + dx / scale
  newConfig.titleY = dragState.initialY + dy / scale
  emit('update:imageConfig', newConfig)
}

const stopDrag = () => {
  dragState.isDragging = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
}
</script>

<style scoped>
.preview-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #f1f2f5;
  background-image: 
    linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  overflow: auto;
  position: relative;
}

.cover-wrapper {
  width: 480px;
  height: 640px;
  background: #fffdf9;
  background-image: linear-gradient(to bottom right, #ffffff 0%, #fcf7f2 100%);
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0,0,0,0.02);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.cover-content {
  width: 100%;
  height: 100%;
  padding: 32px 32px; 
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  overflow: hidden;
}

.cover-image-content {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  background-color: #ececec;
}

.empty-bg-tip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #909399;
  font-size: 16px;
  pointer-events: none;
}

.draggable-title {
  position: absolute;
  cursor: grab;
  user-select: none;
  white-space: pre-wrap;
  line-height: 1.2;
  font-weight: 900;
  text-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.draggable-title:active {
  cursor: grabbing;
}

/* ================= 预览区排版 ================= */
.markdown-body {
  font-family: 'Noto Sans SC', 'PingFang SC', 'Helvetica Neue', Helvetica, 'Microsoft YaHei', Arial, sans-serif;
  color: #2c3e50;
  width: 100%;
}

.markdown-body :deep(h1) {
  font-size: 30px;
  margin-top: 0;
  margin-bottom: 12px;
  text-align: center;
  line-height: 1.35;
  color: #1a1a1a;
  letter-spacing: 1px;
}

.markdown-body :deep(h2) {
  font-size: 22px;
  margin-top: 20px;
  margin-bottom: 12px;
  color: #1a1a1a;
  border-bottom: none;
  line-height: 1.4;
}

.markdown-body :deep(h3) {
  font-size: 18px;
  margin-top: 16px;
  margin-bottom: 8px;
  color: #1a1a1a;
  border-bottom: none;
  position: relative;
  padding-left: 12px;
  line-height: 1.4;
}

.markdown-body :deep(h3)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 16px;
  background: #ff2442;
  border-radius: 4px;
}

.markdown-body :deep(h4) {
  font-size: 16px;
  margin-top: 12px;
  margin-bottom: 6px;
  color: #1a1a1a;
  line-height: 1.4;
}

.markdown-body :deep(h5) {
  font-size: 15px;
  margin-top: 8px;
  margin-bottom: 4px;
  color: #333333;
  line-height: 1.4;
}

.markdown-body :deep(p) {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 12px;
  color: #333333;
}

.markdown-body :deep(p:empty) {
  display: none;
}

.markdown-body :deep(ul), .markdown-body :deep(ol) {
  padding-left: 20px;
  margin-bottom: 16px;
}

.markdown-body :deep(li) {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;
  color: #333333;
}

.markdown-body :deep(li::marker) {
  color: #ff2442;
  font-weight: 900;
}

.markdown-body :deep(strong) {
  color: #ff2442; 
  font-weight: 800;
}

.markdown-body :deep(blockquote) {
  margin: 16px 0;
  padding: 12px 16px;
  background: #f8f9fa;
  border-left: 5px solid #ff2442;
  border-radius: 0 8px 8px 0;
  color: #555;
  font-size: 14px;
  font-family: 'Noto Serif SC', 'SimSun', serif; 
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}

.markdown-body :deep(hr) {
  border: 0;
  border-top: 2px dashed rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

@media (max-width: 768px) {
  .preview-panel {
    padding: 40px 0;
    align-items: flex-start;
    overflow: visible;
  }

  .cover-wrapper {
    transform: scale(0.7);
    transform-origin: top left;
    margin-bottom: -192px; 
    margin-right: -144px;
  }
}
</style>
