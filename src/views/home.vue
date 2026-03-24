<template>
  <div class="container-home">
    <div class="editor-panel">
      <h2>✨ 小红书封面生成器</h2>

      <div class="form-group">
        <label>Markdown 内容</label>
        
        <!-- Markdown 工具栏 -->
        <div class="toolbar">
          <button class="tool-btn font-bold" @click="insertSyntax('bold')" title="加粗">B</button>
          <button class="tool-btn font-italic" @click="insertSyntax('italic')" title="斜体">I</button>
          <div class="divider"></div>
          <button class="tool-btn" @click="insertSyntax('h1')" title="大标题">H1</button>
          <button class="tool-btn" @click="insertSyntax('h2')" title="小标题">H2</button>
          <div class="divider"></div>
          <button class="tool-btn" @click="insertSyntax('quote')" title="金句引用">”</button>
          <button class="tool-btn text-xl" @click="insertSyntax('ul')" title="无序列表">•</button>
          <button class="tool-btn" @click="insertSyntax('ol')" title="有序列表">1.</button>
          <div class="divider"></div>
          <button class="tool-btn" @click="insertSyntax('hr')" title="分割线">—</button>
        </div>

        <textarea 
          ref="textareaRef"
          v-model="markdownText" 
          placeholder="输入 Markdown 内容..."
        ></textarea>
      </div>

      <button class="export-btn" @click="exportImage">💾 导出超清封面图</button>
      <div class="tips">💡 提示：选中文字后点击上方工具栏，可以快速添加加粗、标题等排版样式！</div>
    </div>

    <div class="preview-panel">
      <!-- 预览区，严格 3:4 比例，小红书标准的比例 1080x1440 -->
      <div class="cover-wrapper" ref="coverRef">
        <div class="cover-content">
          <div class="markdown-body" v-html="parsedHTML"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { marked } from 'marked'
import * as htmlToImage from 'html-to-image'

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

const coverRef = ref(null)
const textareaRef = ref(null)

const parsedHTML = computed(() => {
  return marked.parse(markdownText.value)
})

// 插入 Markdown 语法的核心逻辑
const insertSyntax = (type) => {
  const textarea = textareaRef.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = markdownText.value.substring(start, end)
  
  let before = ''
  let after = ''
  let defaultText = ''

  switch (type) {
    case 'bold':
      before = '**'
      after = '**'
      defaultText = '加粗文字'
      break
    case 'italic':
      before = '*'
      after = '*'
      defaultText = '斜体文字'
      break
    case 'h1':
      before = '# '
      after = ''
      defaultText = '一级标题'
      // 特殊处理：标题最好是在新的一行
      if (start > 0 && markdownText.value[start - 1] !== '\n') before = '\n# '
      break
    case 'h2':
      before = '## '
      after = ''
      defaultText = '二级标题'
      if (start > 0 && markdownText.value[start - 1] !== '\n') before = '\n## '
      break
    case 'quote':
      before = '> '
      after = ''
      defaultText = '引用文字'
      if (start > 0 && markdownText.value[start - 1] !== '\n') before = '\n> '
      break
    case 'ul':
      before = '- '
      after = ''
      defaultText = '列表项'
      if (start > 0 && markdownText.value[start - 1] !== '\n') before = '\n- '
      break
    case 'ol':
      before = '1. '
      after = ''
      defaultText = '列表项'
      if (start > 0 && markdownText.value[start - 1] !== '\n') before = '\n1. '
      break
    case 'hr':
      before = '\n---\n'
      after = ''
      defaultText = ''
      break
  }

  const insertText = selectedText || defaultText
  const newText = markdownText.value.substring(0, start) + before + insertText + after + markdownText.value.substring(end)
  
  markdownText.value = newText

  // 恢复焦点并选中填入的文本（如果是默认占位文本则全选占位文本，如果是已有选中内容则保持选中）
  setTimeout(() => {
    textarea.focus()
    if (selectedText) {
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    } else if (defaultText) {
      textarea.setSelectionRange(start + before.length, start + before.length + defaultText.length)
    } else {
      // 仅插入了符号，光标移到最后
      textarea.setSelectionRange(start + before.length, start + before.length)
    }
  }, 0)
}

const exportImage = async () => {
  if (!coverRef.value) return
  try {
    const dataUrl = await htmlToImage.toPng(coverRef.value, {
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
    alert('导出图片失败，请检查控制台')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@700&display=swap');

.container-home {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  background-color: #f1f2f5;
  box-sizing: border-box;
  z-index: 99;
}

/* 左侧栏：工具栏，紧贴边缘 */
.editor-panel {
  width: 480px; /* 固定在左侧 */
  background: white;
  padding: 32px 36px;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.03); /* 侧边阴影 */
  display: flex;
  flex-direction: column;
  z-index: 10;
  overflow-y: auto; /* 内容过多可滚动 */
  border-right: 1px solid #ebedf0;
}

.editor-panel h2 {
  margin-top: 0;
  color: #1a1a1a;
  margin-bottom: 24px;
  font-size: 24px;
}

.form-group {
  margin-bottom: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
  font-size: 15px;
}

/* 工具栏样式 */
.toolbar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  background-color: #f8f9fa;
  border: 2px solid #e4e7ed;
  border-bottom: none; /* 与文本框无缝连接 */
  border-radius: 12px 12px 0 0;
}

.tool-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  color: #606266;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s;
}

.tool-btn:hover {
  background-color: #e4e7ed;
  color: #ff2442;
}

.tool-btn:active {
  background-color: #dcdfe6;
}

.font-bold { font-weight: bold; }
.font-italic { font-style: italic; font-family: serif; }
.text-xl { font-size: 18px; line-height: 1; }

.divider {
  width: 1px;
  height: 16px;
  background-color: #dcdfe6;
  margin: 0 4px;
}

textarea {
  flex: 1;
  width: 100%;
  padding: 16px;
  border: 2px solid #e4e7ed;
  border-radius: 0 0 12px 12px;
  font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: none; /* 禁用拖拽大小，填满剩余高度 */
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s;
  background-color: #fafbfc;
}

textarea:focus {
  border-color: #ff2442;
  background-color: #fff;
}

.form-group:focus-within .toolbar {
  border-color: #ff2442;
}
.form-group:focus-within textarea {
  border-color: #ff2442;
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

.export-btn:hover {
  background: #e61e38;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 36, 66, 0.4);
}

.tips {
  margin-top: 16px;
  font-size: 13px;
  color: #909399;
  text-align: center;
}

/* 右侧画布区域：SaaS 设计工具风格（带网格背景） */
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
  /* 严格 3:4 比例，中心海报画布 */
  width: 480px;
  height: 640px;
  background: #fffdf9;
  background-image: linear-gradient(to bottom right, #ffffff 0%, #fcf7f2 100%);
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0,0,0,0.02);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  /* 确保缩放正常工作 */
  flex-shrink: 0;
}

.cover-content {
  width: 100%;
  height: 100%;
  padding: 48px 40px; 
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  overflow: hidden;
}

/* ================= 预览区排版 ================= */
.markdown-body {
  font-family: 'Noto Sans SC', 'PingFang SC', 'Helvetica Neue', Helvetica, 'Microsoft YaHei', Arial, sans-serif;
  color: #2c3e50;
  width: 100%;
}

.markdown-body :deep(h1) {
  font-size: 34px;
  margin-top: 0;
  margin-bottom: 24px;
  text-align: center;
  line-height: 1.35;
  color: #1a1a1a;
  font-weight: 900;
  letter-spacing: 1.5px;
}

.markdown-body :deep(h2) {
  font-size: 22px;
  margin-top: 24px;
  margin-bottom: 16px;
  color: #1a1a1a;
  border-bottom: none;
  font-weight: 800;
  position: relative;
  padding-left: 14px;
  line-height: 1.4;
}

.markdown-body :deep(h2)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 20px;
  background: #ff2442;
  border-radius: 4px;
}

.markdown-body :deep(p) {
  font-size: 15px;
  line-height: 1.8;
  margin-bottom: 16px;
  color: #333333;
}

.markdown-body :deep(ul), .markdown-body :deep(ol) {
  padding-left: 24px;
  margin-bottom: 20px;
}

.markdown-body :deep(li) {
  font-size: 15px;
  line-height: 1.8;
  margin-bottom: 10px;
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
  margin: 24px 0;
  padding: 20px 24px;
  background: #f8f9fa;
  border-left: 5px solid #ff2442;
  border-radius: 0 10px 10px 0;
  color: #555;
  font-size: 15px;
  font-family: 'Noto Serif SC', 'SimSun', serif; 
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}

.markdown-body :deep(hr) {
  border: 0;
  border-top: 2px dashed rgba(0, 0, 0, 0.1);
  margin: 28px 0;
}

/* ================= 移动端适配 ================= */
@media (max-width: 768px) {
  .container-home {
    position: static;
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
  
  .editor-panel {
    width: auto;
    border-right: none;
    border-bottom: 1px solid #ebedf0;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.02);
    overflow: visible;
  }
  
  .editor-panel h2 {
    font-size: 20px;
    margin-bottom: 16px;
  }

  .toolbar {
    flex-wrap: wrap; 
    gap: 4px;
  }

  .tool-btn {
    min-width: 28px;
    height: 28px;
    padding: 0 4px;
  }

  textarea {
    min-height: 200px;
  }

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
