<template>
  <div class="clickable" @click="confirm">
    <button></button>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "ConfirmButton",
  props: {
    text: String
  },
  methods: {
    confirm(e) {
      this.$emit("confirm", e);
    }
  }
};
</script>

<style lang="scss" scoped>
$accent-button-color: #4caf50;

.clickable {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  cursor: pointer;
  border-radius: 50%;
  border: 3px solid $accent-button-color;
  color: $accent-button-color;
  font-size: 1.5em;
  line-height: 1em;
  padding: 0;
  width: 30px;
  height: 30px;
  background: transparent;
  transform: rotateZ(-45deg);
  transition: color 0.3s ease-in, background 0.3s ease-in;

  &:hover {
    background: $accent-button-color;
    color: white;
  }

  &:focus {
    outline: none;
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(0.2em, 0.3em);
    width: 0.75em;
    height: 0.375em;
    border: 0.125em solid $accent-button-color;
    border-top-style: none;
    border-right-style: none;
  }

  &:hover:after {
    transform: translate(0.2em, 0.3em);
    width: 0.75em;
    height: 0.375em;
    border: 0.125em solid #fff;
    border-top-style: none;
    border-right-style: none;
  }
}

span {
  margin-left: 10px;
}
</style>
