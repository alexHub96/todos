<template>
  <div class="clickable" @click="addItem">
    <button>+</button>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "AddButton",
  props: {
    text: {
      type: String,
      default: "Заголовок"
    }
  },
  methods: {
    addItem() {
      this.$emit("addItem");
    }
  }
};
</script>

<style lang="scss" scoped>
$accent-button-color: dodgerblue;
.clickable {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
button {
  border-radius: 50%;
  border: 3px solid $accent-button-color;
  color: $accent-button-color;
  font-size: 1.5em;
  line-height: 1em;
  padding: 0;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: transparent;
  transition: color 0.3s ease-in, background 0.3s ease-in;

  &:hover {
    background: $accent-button-color;
    color: white;
  }

  &:focus {
    outline: none;
  }
}

span {
  margin-left: 10px;
}
</style>
