<template>
  <div @click="edit" class="clickable">
    <button>
      <svg
        version="1.1"
        class="pencil"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="528.899px"
        height="528.899px"
        viewBox="0 0 528.899 528.899"
        style="enable-background:new 0 0 528.899 528.899;"
        xml:space="preserve"
      >
        <g>
          <path
            d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
		c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
		C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
		L27.473,390.597L0.3,512.69z"
          />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    </button>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "editButton",
  props: {
    text: String
  },
  methods: {
    edit(e) {
      this.$emit("edit", e);
    }
  }
};
</script>

<style lang="scss" scoped>
$accent-button-color: lightgrey;
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
  line-height: 0.3em;
  font-weight: bold;
  padding: 0;
  width: 30px;
  height: 30px;
  background: transparent;
  transition: color 0.3s ease-in, background 0.3s ease-in;

  &:hover {
    background: $accent-button-color;
    color: white;
  }

  &:focus {
    outline: none;
  }

  .pencil {
    fill: $accent-button-color;
    width: 0.9em;
    height: 0.9em;
    display: inline-block;
    cursor: pointer;
  }

  &:hover .pencil {
    fill: white;
  }
}

span {
  margin-left: 10px;
}
</style>
