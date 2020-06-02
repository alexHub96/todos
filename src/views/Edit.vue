<template>
  <div class="edit">
    <Card class="mb-10">
      <router-link to="/">
        <h3>Домой</h3>
      </router-link>
    </Card>
    <Card class="mb-10" :key="todoCards.cardId">
      <Todo
        :todos-card="todoCards"
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
      todoCards: null
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
    console.log("query", this.$route.params);
    console.log("id", this.$route.params.id);
    this.$API.fetchTaskListById(this.$route.params.id).then(res => {
      this.todoCards = res[0];
    });
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
