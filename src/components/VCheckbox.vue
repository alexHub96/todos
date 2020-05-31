<template>
  <div class="md-checkbox md-checkbox-inline">
    <input
      :id="'cardId-' + cardId + '-todo' + todo.id"
      type="checkbox"
      v-model="todo.isFinished"
      @click="updateData"
      :disabled="disabled"
    />
    <label :for="'cardId-' + cardId + '-todo' + todo.id">{{ todo.text }}</label>
  </div>
</template>

<script>
export default {
  name: "VCheckbox",
  props: {
    cardId: Number,
    todo: Object,
    disabled: { type: Boolean, default: false }
  },
  methods: {
    updateData() {
      this.$emit(
        "updateData",
        this.cardId,
        this.todo.id,
        this.todo.isFinished === null ? this.todo.isFinished : !this.todo.isFinished,
        this.todo.text
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/scss/_parts/VCheckbox";
</style>
