<template>
  <div class="wechat-container">
    <div class="editor-panel">
      <h2>✍️ 公众号长文排版</h2>
      <div class="subtitle">在这里编写 Markdown，右侧实时预览公众号最终效果</div>
      
      <MarkdownEditor style="flex: 1;" v-model="markdownText" :isAILoading="isAILoading" @ai-format="handleAIFormat" hide-ai-optimize />
      
      <div class="actions">
        <div class="theme-selector">
          <select v-model="currentTheme">
            <option value="tech">💎 科技职场风格</option>
            <option value="minimal">🍏 苹果极简风格</option>
            <option value="emotion">💌 情感走心风格</option>
            <option value="indigo">📘 深度技术风格</option>
            <option value="geek">💻 极客开发风格</option>
          </select>
        </div>
        <button class="action-btn primary" @click="copyHtml">🔗 一键复制排版去公众号粘贴</button>
      </div>
    </div>
    
    <div class="preview-panel">
      <div class="phone-shell">
        <div class="phone-content" ref="previewRef" v-html="renderedHtml">
        </div>
      </div>
    </div>

    <AIKeyModal v-model="showKeyModal" @save="onSaveApiKey" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Message } from '@/components/Message/index'
import MarkdownEditor from '../xiaohongshu/components/MarkdownEditor.vue'
import AIKeyModal from '../xiaohongshu/components/AIKeyModal.vue'
import { useDeepSeek } from '@/utils/useDeepSeek'
import type { WechatTheme } from '@/utils/wechatRenderer'
import { renderWechatHtml } from '@/utils/wechatRenderer'

const currentTheme = ref<WechatTheme>('tech')

const markdownText = ref(`# 🚀 全新一代公众号排版引擎（测试文档）
<span style="color: #888; font-size: 14px;">（请在右上角下拉框自由切换 4 种预设主题体验区别！）</span>

> 欢迎使用纯本地化构建的 Markdown 公众号渲染器！
> 无论是 **科技职场**、**极简干货**、**情感走心** 还是 **极客开发**，我们都能瞬间帮您拿捏气场。
> 下面我将为您展示目前渲染器支持的所有排版元素种类。

## 01 基础版式与文字强调

### 💡 多级标题支持

你不仅能用常规的加粗来 **强调文本**，还能利用不同的标题层级制造视觉冲击：

#### 这是一个四级标题，相当于强调卡片，通常用来做高亮总结与核心观点升华！

## 02 代码与极客元素支持

在现代技术博客中，行内代码 \`console.log('Hello World')\` 是必不可少的。而对于大段长串代码，这里有完美的适配保护：

\`\`\`javascript
// 💬 核心业务流保护样例：
function optimizeWorkflow() {
  const tools = ['GPT-4o', 'Claude 3.5', 'DeepSeek'];
  console.log('开启全自动极客模式！');
  return tools.map(tool => activate(tool));
}
\`\`\`

## 03 列表与数据表格展示

有时候你需要有条理地陈列信息，这是无序/有序列表嵌套排版的演示：

*   **准备工作阶段**
    *   下载并安装最新版本开发工具
    *   输入 \`chrome://inspect\` 打开配置
*   **落地执行步骤**
    1.  梳理自动化重构流程
    2.  坚决执行任务，定期复盘

当遇到对比数据时，表格是梳理逻辑的最佳解药（原生支持左、中、右列对齐定制）：

| 底层基础模型 | 逻辑推理能力 | 代码生成能力 | 核心适用场景定位 |
| :--- | :---: | :---: | :--- |
| **Claude 3.5** | 卓越（S 级） | ✨ 巅峰（SS 级） | 前后端组件全自动构建、老项目重构 |
| **GPT-4o** | 优秀（S 级） | 优秀（S 级） | 通用知识结构解答、多模态任务流处理 |
| **DeepSeek** | 强大（S 级） | 极为优秀（S 级）| 极高性价比的日常高频需求开发助手 |

---

<div style="text-align: center; color: #888; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
  👇 你觉得今天加的哪个主题最好看？快去上方下拉框自由切换试试吧！
</div>`)

const { isAILoading, showKeyModal, apiKey, formatTextWithAI, saveApiKey } = useDeepSeek()
const previewRef = ref<HTMLElement | null>(null)

// 响应式渲染多主题 Markdown
const renderedHtml = computed(() => {
  return renderWechatHtml(markdownText.value, currentTheme.value)
})

const handleAIFormat = async (mode: 'optimize' | 'format-only' = 'optimize') => {
  if (isAILoading.value) return
  const result = await formatTextWithAI(markdownText.value, mode, 'wechat')
  if (result) {
    markdownText.value = result
  }
}

const onSaveApiKey = async (key: string) => {
  saveApiKey(key)
  const result = await formatTextWithAI(markdownText.value, 'optimize', 'wechat')
  if (result) {
    markdownText.value = result
  }
}

const copyHtml = async () => {
  if (!previewRef.value) return
  try {
    const html = previewRef.value.innerHTML
    
    // 现代浏览器支持使用 ClipboardItem 写入富文本 (HTML)
    if (navigator.clipboard && window.ClipboardItem) {
      const blobHtml = new Blob([html], { type: 'text/html' })
      const blobText = new Blob([previewRef.value.innerText], { type: 'text/plain' })
      const data = [new ClipboardItem({
        'text/html': blobHtml,
        'text/plain': blobText
      })]
      await navigator.clipboard.write(data)
      Message.success('复制成功！快去公众号后台 Ctrl+V 粘贴吧~')
      return
    }

    // 后备方案：使用 document.execCommand 复制
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    tempDiv.style.position = 'fixed'
    tempDiv.style.left = '-9999px'
    document.body.appendChild(tempDiv)
    
    const range = document.createRange()
    range.selectNodeContents(tempDiv)
    const selection = window.getSelection()
    if (selection) {
      selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')
      selection.removeAllRanges()
      Message.success('复制成功！快去公众号后台 Ctrl+V 粘贴吧~')
    }
    document.body.removeChild(tempDiv)

  } catch (err) {
    console.error('复制失败:', err)
    Message.error('复制失败，请尝试手动全选右侧预览区域进行复制。')
  }
}
</script>

<style scoped>
.wechat-container {
  display: flex;
  width: 100%;
  height: 100%;
  background: #f1f2f5;
}

.editor-panel {
  flex: 1;
  background: white;
  padding: 32px 36px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ebedf0;
  max-width: 600px; /* 控制编辑器宽度防止过大 */
}

.editor-panel h2 {
  margin: 0 0 8px 0;
  color: #1a1a1a;
  font-size: 24px;
}

.subtitle {
  color: #909399;
  font-size: 14px;
  margin-bottom: 24px;
}

.actions {
  display: flex;
  gap: 16px;
  margin-top: 24px;
  align-items: center;
}

.theme-selector select {
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
  font-size: 15px;
  outline: none;
  background: white;
  cursor: pointer;
  color: #333;
  transition: all 0.3s;
}

.theme-selector select:hover {
  border-color: #1890ff;
}

.action-btn {
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  width: 100%;
  box-shadow: 0 4px 12px rgba(7, 193, 96, 0.3);
}

.action-btn.primary {
  background: #07c160; /* 微信绿 */
  color: white;
}

.action-btn.primary:hover {
  background: #06ad56;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(7, 193, 96, 0.4);
}

/* 手机壳预览区 */
.preview-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background: #f8f9fa;
  overflow-y: auto;
}

.phone-shell {
  width: 375px;
  height: 667px;
  background: #fff;
  border-radius: 40px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1), 0 0 0 10px #e0e0e0;
  overflow: hidden;
  position: relative;
}

/* 模拟手机刘海 */
.phone-shell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 30px;
  background: #e0e0e0;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  z-index: 10;
}

.phone-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-top: 40px; /* 避开刘海 */
  box-sizing: border-box;
}

.phone-content::-webkit-scrollbar {
  width: 0;
}

/* 📱 移动端适配 */
@media (max-width: 768px) {
  .wechat-container {
    flex-direction: column;
    height: auto;
    min-height: 100%;
  }

  .editor-panel {
    max-width: 100%;
    width: 100%;
    padding: 20px;
    border-right: none;
    border-bottom: 1px solid #ebedf0;
    box-sizing: border-box;
  }

  .preview-panel {
    padding: 20px;
  }

  .phone-shell {
    transform: scale(0.9); /* 在小屏幕上稍微缩放手机壳 */
    transform-origin: top center;
  }
}
</style>
