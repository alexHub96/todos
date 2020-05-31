<template>
  <div class="edit">
    <Card class="mb-10" v-for="todoCard in todoCards" :key="todoCard.cardId">
      <Todo
        :todos-card="todoCard"
        :toggle-disabled="false"
        :editable="true"
        displayedItemsAmount="all"
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
  }
};
</script>

<style scoped></style>
