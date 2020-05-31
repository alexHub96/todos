<template>
  <div class="clickable" @click="decline">
    <button>
      +
    </button>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "DeclineButton",
  props: {
    text: String
  },
  methods: {
    decline(e) {
      this.$emit("decline", e);
    }
  }
};
</script>

<style lang="scss" scoped>
$accent-button-color: #d32f2f;

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
  font-weight: bold;
  padding: 0;
  width: 30px;
  height: 30px;
  background: transparent;
  transform: rotateZ(45deg);
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
