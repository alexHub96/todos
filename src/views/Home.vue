<template>
  <div class="home">
    <Card class="mb-10">
      <AddButton text="Добавить список" />
    </Card>

    <Card class="mb-10" v-for="todoCard in todoCards" :key="todoCard.cardId">
      <Todo :todos-card="todoCard" :toggle-disabled="true" />
    </Card>

    <Card class="mb-10">
      <AddButton text="Добавить список" />
    </Card>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import AddButton from "@/components/buttons/AddButton";
import Todo from "@/components/Todo";

export default {
  name: "Home",
  components: {
    Todo,
    AddButton,
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
        },
        {
          header: "Header",
          cardId: 2,
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
