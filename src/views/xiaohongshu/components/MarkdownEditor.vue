<template>
  <div class="form-group">
    <label>Markdown 内容</label>
    
    <!-- Markdown 工具栏 -->
    <div class="toolbar">
      <button class="tool-btn font-bold" @click="insertSyntax('bold')" title="加粗">B</button>
      <button class="tool-btn font-italic" @click="insertSyntax('italic')" title="斜体">I</button>
      <div class="divider"></div>
      <button class="tool-btn" @click="insertSyntax('h3')" title="大标题">H3</button>
      <button class="tool-btn" @click="insertSyntax('h4')" title="小标题">H4</button>
      <div class="divider"></div>
      <button class="tool-btn" @click="insertSyntax('quote')" title="金句引用">”</button>
      <button class="tool-btn text-xl" @click="insertSyntax('ul')" title="无序列表">•</button>
      <button class="tool-btn" @click="insertSyntax('ol')" title="有序列表">1.</button>
      <div class="divider"></div>
      <button class="tool-btn" @click="insertSyntax('hr')" title="分割线">—</button>
      <template v-if="!hideAi">
        <div class="divider"></div>
        <button class="tool-btn ai-btn" @click="handleAIFormat('format-only')" title="仅排版：只对当前文字做 Markdown 格式排版，不修改内容" :disabled="isAILoading">
          <span v-if="isAILoading && localLoadingMode === 'format-only'" class="loading-spinner"></span>
          <span v-else>📐 排版</span>
        </button>
        <button class="tool-btn ai-btn ai-enhance" @click="handleAIFormat('optimize')" title="AI 润色：润色优化并排版文字内容（可能修改或增强原文）" :disabled="isAILoading">
          <span v-if="isAILoading && localLoadingMode === 'optimize'" class="loading-spinner"></span>
          <span v-else>✨ AI 润色</span>
        </button>
      </template>
    </div>

    <textarea 
      ref="textareaRef"
      v-model="text" 
      placeholder="输入 Markdown 内容..."
    ></textarea>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  isAILoading: {
    type: Boolean,
    default: false
  },
  hideAi: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'ai-format'])

const localLoadingMode = ref('')

const handleAIFormat = (mode) => {
  localLoadingMode.value = mode
  emit('ai-format', mode)
}

watch(() => props.isAILoading, (newVal) => {
  if (!newVal) localLoadingMode.value = ''
})

const text = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const textareaRef = ref(null)

const insertSyntax = (type) => {
  const textarea = textareaRef.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = text.value.substring(start, end)
  
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
    case 'h3':
      before = '### '
      after = ''
      defaultText = '大标题'
      if (start > 0 && text.value[start - 1] !== '\n') before = '\n### '
      break
    case 'h4':
      before = '#### '
      after = ''
      defaultText = '小标题'
      if (start > 0 && text.value[start - 1] !== '\n') before = '\n#### '
      break
    case 'quote':
      before = '> '
      after = ''
      defaultText = '引用文字'
      if (start > 0 && text.value[start - 1] !== '\n') before = '\n> '
      break
    case 'ul':
      before = '- '
      after = ''
      defaultText = '列表项'
      if (start > 0 && text.value[start - 1] !== '\n') before = '\n- '
      break
    case 'ol':
      before = '1. '
      after = ''
      defaultText = '列表项'
      if (start > 0 && text.value[start - 1] !== '\n') before = '\n1. '
      break
    case 'hr':
      before = '\n---\n'
      after = ''
      defaultText = ''
      break
  }

  const insertText = selectedText || defaultText
  const newText = text.value.substring(0, start) + before + insertText + after + text.value.substring(end)
  
  text.value = newText

  setTimeout(() => {
    textarea.focus()
    if (selectedText) {
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    } else if (defaultText) {
      textarea.setSelectionRange(start + before.length, start + before.length + defaultText.length)
    } else {
      textarea.setSelectionRange(start + before.length, start + before.length)
    }
  }, 0)
}
</script>

<style scoped>
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
  flex-wrap: wrap;
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
  flex-shrink: 0;
  white-space: nowrap;
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
  resize: none;
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

/* AI 按钮特有样式 */
.ai-btn {
  color: #6a1b9a;
  font-weight: bold;
  padding: 0 10px;
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.05), rgba(255, 36, 66, 0.05));
}
.ai-btn:hover {
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(255, 36, 66, 0.1));
  color: #4a148c;
  border-color: #e4e7ed;
}
.ai-enhance {
  color: #ff2442;
  background: linear-gradient(135deg, rgba(255, 36, 66, 0.05), rgba(255, 137, 137, 0.05));
}
.ai-enhance:hover {
  background: linear-gradient(135deg, rgba(255, 36, 66, 0.1), rgba(255, 137, 137, 0.1));
  color: #e61e38;
}
.ai-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid #8a2be2;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
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
}
</style>
