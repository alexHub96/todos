<template>
  <div class="edit">
    <Card class="mb-10" v-for="todoCard in todoCards" :key="todoCard.cardId">
      <Todo
        :todos-card="todoCard"
        :toggle-disabled="false"
        :editable="true"
        displayedItemsAmount="all"
        @stateChange="changeStateStatus"
      />
    </Card>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Todo from "@/components/Todo";

export default {
  name: "Edit",
  components: {
    Todo,
    Card
  },
  data() {
    return {
      stateChanged: false,
      todoCards: [
        {
          header: "Header",
          cardId: 1,
          todos: [
            {
              id: 1,
              isFinished: true,
              text: "todo text"
            },
            {
              id: 2,
              isFinished: false,
              text: "todo text"
            },
            {
              id: 3,
              isFinished: false,
              text: "todo text"
            },
            {
              id: 4,
              isFinished: false,
              text: "todo text"
            }
          ]
        }
      ]
    };
  },
  methods: {
    changeStateStatus(state) {
      this.stateChanged = state;
    },
    handleUnload(e) {
      if (!this.stateChanged) {
        return;
      }
      e.returnValue = this.message;
      return this.message;
    },
    confirmLeave(text) {
      return window.confirm(text);
    }
  },
  mounted() {
    window.addEventListener("beforeunload", this.handleUnload);
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.handleUnload);
  },

  beforeRouteLeave(to, from, next) {
    if (this.stateChanged) {
      const answer = this.confirmLeave("Перезагуизть сайт?");
      console.log(answer);
      answer ? next() : next(false);
    } else {
      next();
    }
  }
};
</script>

<style lang="scss" scoped>
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
