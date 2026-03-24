<template>
  <transition name="msg-fade" @after-leave="handleAfterLeave">
    <div v-if="visible" class="message-toast" :class="type">
      <span class="icon">{{ icon }}</span>
      <span class="text">{{ text }}</span>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  text: String,
  type: {
    type: String,
    default: 'info'
  },
  duration: {
    type: Number,
    default: 3000
  },
  onClose: Function
})

const visible = ref(false)

const icon = computed(() => {
  switch (props.type) {
    case 'success': return '✅'
    case 'warning': return '⚠️'
    case 'error': return '❌'
    default: return '💡'
  }
})

const handleAfterLeave = () => {
  if (props.onClose) {
    props.onClose()
  }
}

onMounted(() => {
  visible.value = true
  if (props.duration > 0) {
    setTimeout(() => {
      visible.value = false
    }, props.duration)
  }
})
</script>

<style scoped>
.message-toast {
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 9999;
  font-size: 14px;
  font-weight: bold;
}

.message-toast.error { color: #ff2442; background: #fff0f0; border: 1px solid #ffb4c0; }
.message-toast.warning { color: #e6a23c; background: #fdf6ec; border: 1px solid #faecd8; }
.message-toast.info { color: #909399; background: #f4f4f5; border: 1px solid #e9e9eb; }
.message-toast.success { color: #67c23a; background: #f0f9eb; border: 1px solid #e1f3d8; }

.msg-fade-enter-active,
.msg-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

.msg-fade-enter-from,
.msg-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style>
