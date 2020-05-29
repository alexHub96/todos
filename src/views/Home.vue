<template>
  <div class="home">
    <Card class="mb-10">
      <AddTodoButton/>
    </Card>

    <Card class="mb-10">
      <Todo/>
    </Card>

    <Card class="mb-10">
      <AddTodoButton/>
    </Card>
    <popup>
      asdasdas
    </popup>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import AddTodoButton from "@/components/AddTodoButton";
import Todo from "@/components/Todo";
import Popup from "@/components/Popup";

export default {
  name: "Home",
  components: {
    Popup,
    Todo,
    AddTodoButton,
    Card
  }
};
</script>

