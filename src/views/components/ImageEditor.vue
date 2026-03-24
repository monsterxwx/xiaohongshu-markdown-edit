<template>
  <div class="form-group image-mode-group">
    <div class="tool-section">
      <label>背景图片 (3:4)</label>
      <div class="upload-box" @click="$refs.bgInput.click()">
        <span v-if="!modelValue.bgUrl">点击上传背景图</span>
        <span v-else>重新上传背景图</span>
        <input type="file" ref="bgInput" accept="image/*" @change="uploadBg" style="display: none;" />
      </div>
    </div>

    <div class="tool-section">
      <label>标题文字</label>
      <textarea v-model="modelValue.titleText" placeholder="输入封面标题，可在右侧拖拽定位..." rows="2" class="title-input"></textarea>
    </div>

    <div class="tool-section row">
      <div class="control-item">
        <label>文字颜色</label>
        <input type="color" v-model="modelValue.titleColor" class="color-picker" />
      </div>
      <div class="control-item">
        <label>文字大小 (px)</label>
        <input type="number" v-model="modelValue.titleFontSize" class="number-input" min="12" max="200" />
      </div>
      <div class="control-item">
        <label>行高</label>
        <input type="number" v-model="modelValue.titleLineHeight" class="number-input" min="0.5" max="3" step="0.1" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const bgInput = ref(null)

const uploadBg = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (ev) => {
      const newConfig = { ...props.modelValue, bgUrl: ev.target.result }
      emit('update:modelValue', newConfig)
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.image-mode-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tool-section {
  display: flex;
  flex-direction: column;
}

.tool-section.row {
  flex-direction: row;
  gap: 16px;
}

.control-item {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.upload-box {
  width: 100%;
  height: 80px;
  border: 2px dashed #dcdfe6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #fafbfc;
}

.upload-box:hover {
  border-color: #ff2442;
  color: #ff2442;
}

.title-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e4e7ed;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

.title-input:focus {
  border-color: #ff2442;
}

.color-picker {
  width: 100%;
  height: 40px;
  padding: 0;
  border: 2px solid #e4e7ed;
  border-radius: 6px;
  cursor: pointer;
}

.number-input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 2px solid #e4e7ed;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.number-input:focus {
  border-color: #ff2442;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
  font-size: 15px;
}
</style>
