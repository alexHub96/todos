<template>
  <div class="wrapper">
    <div class="md-checkbox md-checkbox-inline">
      <input
        :id="'cardId-' + cardId + '-todo' + todo.id"
        type="checkbox"
        v-model="todo.isFinished"
        @click="updateData"
        :disabled="disabled"
        :checked="todo.isFinished"
      />
      <label :for="'cardId-' + cardId + '-todo' + todo.id">
        <span v-if="!edit">{{ todo.text }}</span>
        <input
          v-else
          type="text"
          v-model="todo.text"
          @focusout="confirmEdit"
          @keyup.enter="confirmEdit"
          ref="input"
        />
      </label>
    </div>

    <div class="edit-block">
      <transition name="fade">
      <div class="edit-buttons" v-if="!edit">
        <edit-button @edit="editItem" />
        <decline-button @decline="deleteItem" />
      </div>
      <div class="edit-confirm" v-else>
        <ConfirmButton @confirm="confirmEdit" />
<!--        <DeclineButton @decline="declineEdit" />-->
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
import VCheckbox from "@/components/VCheckbox";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import DeclineButton from "@/components/buttons/DeclineButton";
import EditButton from "@/components/buttons/EditButton";

export default {
  name: "VCheckboxEditable",
  extends: VCheckbox,
  components: {
    EditButton,
    ConfirmButton,
    DeclineButton
  },
  data() {
    return {
      edit: false
    };
  },
  methods: {
    editItem() {
      this.edit = true;
      this.$nextTick(() => this.$refs.input.focus());
    },
    deleteItem() {
      this.todo.isFinished = null;
      this.updateData();
    },
    confirmEdit() {
      this.edit = false;
      this.updateData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/scss/_parts/VCheckbox";

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-buttons,
.edit-confirm {
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 8px;
  }
}

.md-checkbox {
  span,
  input[type="text"] {
    min-height: 22px;
    display: inline-block;
  }

  input[type="text"] {
    border: none;
    border-bottom: 2px solid grey;
    font-size: 1em;
    outline: none;
  }
}
@import "src/scss/_parts/transitions";
</style>
