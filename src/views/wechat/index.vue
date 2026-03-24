<template>
  <div class="wechat-container">
    <div class="editor-panel">
      <h2>✍️ 公众号长文排版</h2>
      <div class="subtitle">在这里编写 Markdown，右侧实时预览公众号最终效果</div>
      
      <MarkdownEditor style="flex: 1;" v-model="markdownText" hide-ai />
      
      <div class="actions">
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
import { renderWechatHtml } from '@/utils/wechatRenderer'

const markdownText = ref(`# 🔥别再傻傻海投了！\n<span style="color: #2b5cff;">6个神级AI指令</span>，把求职变成一场“降维打击”

> 最近正是求职季，你是不是也陷入了这样的死循环：
> 精心准备的简历投出去石沉大海，Boss直聘上发了上百个招呼全是“已读不回”……
> 
> **停！别再用战术上的勤奋，掩盖战略上的懒惰了！**
> 在这个 AI 时代，教你 6 个被外网疯传、实测好用到爆的 AI 提示词！
> 
> <span style="color: #ff6b6b; font-weight: bold; font-size: 14px; text-align: center; display: block;">⭐ 建议先收藏，找工作时一定用得上！</span>

## 01 扔掉流水账，把简历变成“王炸”

### 💼 适用场景 重新打磨简历地基，增加量化数据

很多人写简历就像写流水账：我干了什么、负责什么……HR 扫一眼就困了。我们要让 AI 帮你加上“动词”和“量化数据”。

\`\`\`
这是我的工作经验：[填入你的日常职责]。

请针对[某行业]的[具体职位]，重写我的简历经历。要求突出核心业务成果。
\`\`\`

#### ✨ 降维效果：AI 会把你干瘪的“负责账号运营”，变成“主导小红书矩阵运营，实现粉丝量增长 150%”。这才是 HR 想看的！

## 02 为神仙岗位“量身定制”

### 🎯 适用场景 针对心仪的高薪公司，精准匹配JD

不要一份简历走天下，这只会让你成为分母。

\`\`\`
这是我心仪的职位JD：[粘贴JD]。
把它与我的经历对比，提取JD中的核心关键词润色我的经历，达到 90% 以上的匹配度！
\`\`\`

#### ✨ 降维效果：机器筛选（ATS）能秒过，人工审核时 HR 也会觉得你是完美候选人！

---

<div style="text-align: center; color: #888; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
  👇 你觉得找工作哪个环节最痛苦？欢迎留言！
</div>`)

const { isAILoading, showKeyModal, apiKey, formatTextWithAI, saveApiKey } = useDeepSeek()
const previewRef = ref<HTMLElement | null>(null)

// 替换掉之前简陋的正则表达式，改用真正的 Markdown 渲染引擎
const renderedHtml = computed(() => {
  return renderWechatHtml(markdownText.value)
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
