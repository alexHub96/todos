<template>
  <div>
    <div class="todos-list">
      <div class="header-block">
        <transition name="fade" mode="out-in" @after-enter="$refs.vheader.focus()" >
          <div class="header-inputs" v-if="!editHeaderStatus" key="fade-1">
            <h2>{{ localTodos.header }}</h2>
            <edit-button @edit="editHeader" />
          </div>
          <div class="header-inputs" v-else key="fade-2">
            <input
              type="text"
              v-model="localTodos.header"
              @focusout="confirmHeader"
              @keyup.enter="confirmHeader"
              ref="vheader"
            />
            <div>
              <ConfirmButton @confirm="confirmHeader" />
            </div>
          </div>
        </transition>
      </div>
      <transition-group name="list" tag="div">
        <div
          class="todo"
          v-for="todo in editTodosCardDisplayed"
          :key="'list-' + todo.id"
        >
          <Component
            :is="chooseCheckboxComponent"
            :card-id="todosCard.cardId"
            :todo="todo"
            :disabled="toggleDisabled"
            @updateData="updateTodo"
          />
        </div>
      </transition-group>
      <div
        class="show-all-items"
        v-if="typeof displayedItemsAmount != 'string'"
      >
        <hr />
        <div class="arrow" :class="{ opened }" @click="showAllTodos">
          >
        </div>
      </div>
      <Card class="mt-10" v-if="this.editable">
        <AddButton text="Добавить задачу" @addItem="addItem" />
      </Card>
      <transition name="conf" tag="div">
        <div v-if="todoCardChanged">
          <hr />
          <div class="todo-confirm">
            <ConfirmButton text="Сохранить" @confirm="confirmCardEdit" />
            <DeclineButton
              text="Отменить изменения"
              @decline="declineCardEdit"
            />
          </div>
        </div>
      </transition>
    </div>

    <popup :show-popup="showPopup"
           @close="declineCardEdit">

    </popup>
  </div>
</template>

<script>

const Card = () => import("@/components/Card");
const Popup = () => import("@/components/Popup");
const AddButton = () => import("@/components/buttons/AddButton");
const EditButton = () => import("@/components/buttons/EditButton");
const ConfirmButton = () => import("@/components/buttons/ConfirmButton");
const DeclineButton = () => import("@/components/buttons/DeclineButton");
const VCheckbox = () => import("@/components/VCheckbox");
const VCheckboxEditable = () => import("@/components/VCheckboxEditable");

export default {
  name: "Todo",
  components: {
    EditButton,
    AddButton,
    Card,
    Popup,
    DeclineButton,
    ConfirmButton,
    VCheckbox,
    VCheckboxEditable
  },
  props: {
    todosCard: Object,
    displayedItemsAmount: {
      type: [Number, String],
      default: 2
    },
    toggleDisabled: Boolean,
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      opened: false,
      showPopup: false,
      editHeaderStatus: false,
      todoCardDisplayed: this.displayedItemsAmount,
      todoCardChanged: false,
      localTodos: JSON.parse(JSON.stringify(this.todosCard)),
      tempTodoId: null,

      template_1:` <div class="confirm-popup-wrapper">
        <h2>Подтвердите действие</h2>
        <div class="todo-confirm">
          <ConfirmButton text="Принять" @confirm="deleteItem" />
          <DeclineButton text="Отменить" @decline="decline" />
        </div>
      </div>`
    };
  },
  methods: {

    editHeader() {
      this.editHeaderStatus = true;
      this.todoCardChanged = true;
    },

    confirmHeader() {
      this.editHeaderStatus = false;
    },

    // updates todos list
    // if to-do status if null - deletes it
    updateTodo(cardId, id, newStatus, newText) {
      console.log(cardId, id, newStatus, newText);
      if (newStatus === null) {
        this.tempTodoId = id;
        this.showPopup = true;
      }
      this.todoCardChanged = true;
    },

    // add task to todolist
    addItem() {
      const newId = this.localTodos.todos.length + 1;
      this.localTodos.todos.push(
        JSON.parse(
          JSON.stringify({
            id: newId,
            isFinished: false,
            text: "Задача"
          })
        )
      );
      this.todoCardChanged = true;
    },

    // delete tassk from todolist
    deleteItem() {
      this.showPopup = false;
      this.localTodos.todos = this.localTodos.todos.filter(
        item => item.id !== this.tempTodoId
      );
    },

    // toggle amount of tasks.
    // default task dispalyed = 2
    // to show all tasks change todoCardDisplayed to 'all' or other string
    showAllTodos() {
      this.opened = !this.opened;
      if (typeof this.todoCardDisplayed === "string") {
        this.todoCardDisplayed = this.displayedItemsAmount;
      } else {
        this.todoCardDisplayed = "all";
      }
    },

    confirmCardEdit(e) {
      this.todoCardChanged = false;
      console.log(e, "card saved");
    },

    // decline card object edit
    // returns all data to props todosCard state
    declineCardEdit(e) {
      const obj = this.todosCard;
      this.localTodos = JSON.parse(JSON.stringify(obj));
      this.todoCardChanged = false;
      console.log(e, "card edit declined");
    },
    // closes popup preventing any data changes
    decline() {
      this.showPopup = false;
    }
  },
  computed: {

    // toggles amount of displayed todos
    editTodosCardDisplayed() {
      if (typeof this.todoCardDisplayed === "string")
        return this.localTodos.todos;
      return this.localTodos.todos.slice(0, this.todoCardDisplayed);
    },

    // toggles child component for simple todos view or editable
    chooseCheckboxComponent() {
      return this.editable ? "VCheckboxEditable" : "VCheckbox";
    }
  }
};
</script>

<style lang="scss" scoped>
.mt-10 {
  margin-top: 10px;
}

.header-block {
  h2 {
    margin: 0;
    font-size: 30px;
    height: 30px;
    font-weight: normal;
  }

  .header-inputs {
    display: flex;
    align-items: center;
    justify-content: space-between;

    input[type="text"] {
      min-height: 30px;
      display: inline-block;
    }

    input[type="text"] {
      border: none;
      border-bottom: 2px solid grey;
      font-size: 1em;
      outline: none;
    }
  }
}

.todos-list {
  position: relative;
}

.todo *:not(.show-all-items .wrapper) {
  margin: 10px 0;
  cursor: pointer;
}

.show-all-items {
  position: relative;
  font-size: 16px;

  hr {
    border: none;
    color: lightgray;
    background: lightgray;
    height: 1px;
  }

  .arrow {
    position: absolute;
    cursor: pointer;
    top: -0.52em;
    left: calc(50% - 1em);
    margin: 0 5px;
    background: #fff;
    width: 1em;
    height: 1em;
    font-size: 2em;
    line-height: 0.93em;
    text-align: center;
    color: lightgray;
    padding: 0;
    border: 1px solid lightgray;
    border-radius: 50%;
    transform: rotateZ(90deg);
    transition: 0.3s all;

    &.opened {
      transform: rotateZ(-90deg);
    }

    &:hover {
      background: lightgray;
      color: #fff;
    }
  }
}

.list {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s, max-height 0.3s cubic-bezier(0, 1.05, 0, 1);
    overflow: hidden;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    max-height: 0;
  }

  &-leave,
  &-enter-to {
    opacity: 1;
    max-height: 4000px;
  }
}

.todo-confirm {
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  div {
    display: flex;
    align-items: center;

    span {
      margin-left: 8px;
    }
  }
}

.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s;
    overflow: hidden;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-leave,
  &-enter-to {
    opacity: 1;
  }
}

.conf {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s, max-height 0.3s;
    overflow: hidden;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    max-height: 0;
  }

  &-leave,
  &-enter-to {
    opacity: 1;
    max-height: 100px;
  }
}

.confirm-popup-wrapper {
  .todo-confirm {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: wrap;

    & > div {
      margin: 10px 20px;
    }
  }
}
</style>
