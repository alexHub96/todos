<template>
  <transition name="fade" @after-enter="showContent = true">
    <div class="popup-wrapper" v-if="showPopup" @click.self="closePopup">
      <transition name="slidePop" @after-leave="showPopup = false">
        <div class="popup" v-if="showContent">
          <div class="close" @click="this.closePopup">X</div>
          <card class="padding">
            <slot></slot>
          </card>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "Popup",
  components: { Card },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    args: {
      type: Object
    }
  },
  data() {
    return {
      showContent: false
    };
  },
  methods: {
    closePopup() {
      this.showContent = false;
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.popup-wrapper {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(17, 17, 17, 0.65);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.popup {
  z-index: 2;
  position: relative;
  max-width: 90vw;
  .close {
    position: absolute;
    top: 0;
    right: 6px;
    transform: rotateX(45deg);
    font-size: 20px;
    padding: 4px;
    cursor: pointer;
  }
  .padding {
    padding: 25px;
  }
}

.fade-enter-active {
  animation: fade-in 0.3s;
}

.fade-leave-active {
  animation: fade-in 0.3s reverse;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.slidePop-enter-active {
  animation: slidePop-in 0.5s;
}

.slidePop-leave-active {
  animation: slidePop-in 0.5s reverse;
}

@keyframes slidePop-in {
  0% {
    transform: translate(0, -1000px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
