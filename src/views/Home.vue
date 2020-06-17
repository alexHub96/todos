<template>
  <div class="home">
    <transition-group name="list">
      <Card
        class="mb-10"
        v-for="todoCard in todoCards"
        :key="'card-' + todoCard.cardId"
      >
        <Todo :todos-card="todoCard" :toggle-disabled="true" />
        <div class="edit-buttons mt-10">
          <router-link
            class="text-no-decoration c-black"
            :to="'/edit/' + todoCard.cardId"
          >
            <edit-button text="Редактировать" />
          </router-link>
          <decline-button
            class="text-no-decoration"
            text="Удалить"
            @decline="deleteTaskList(todoCard.cardId)"
          />
        </div>
      </Card>
    </transition-group>
    <Card>
      <AddButton text="Добавить список" @addItem="addTaskList" />
    </Card>
    <popup :show-popup="popupState" @close="decline">
      <component :is="popup_comp"/>
    </popup>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import AddButton from "@/components/buttons/AddButton";
import Todo from "@/components/Todo";
import EditButton from "@/components/buttons/EditButton";
import DeclineButton from "@/components/buttons/DeclineButton";
import Popup from "@/components/Popup";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import Vue from 'vue'
const eventBus = new Vue();

const confirmDelete = Vue.component('confirmDelete',{
  components: {
    ConfirmButton,
    DeclineButton,
  },
  template:`
     <div class="confirm-popup-wrapper">
        <h2 style="text-align: center">Подтвердите удаление</h2>
        <div class="todo-confirm">
          <ConfirmButton text="Принять" @confirm="confirmDelete" />
          <DeclineButton text="Отменить" @decline="decline" />
        </div>
      </div>`,
  methods:{
    confirmDelete() {},
    decline(){
      eventBus.$emit('decline')
    },
  }
})

export default {
  name: "Home",
  components: {
    Popup,
    DeclineButton,
    EditButton,
    Todo,
    AddButton,
    Card
  },
  data() {
    return {
      popupState: false,
      selectedTasklist: null,
      popup_comp: confirmDelete,
      todoCards: [{
        "header": "Header",
        "cardId": 2,
        "todos": [
          {
            "id": 1,
            "isFinished": true,
            "text": "todo text"
          },
          {
            "id": 2,
            "isFinished": false,
            "text": "todo text"
          },
          {
            "id": 3,
            "isFinished": false,
            "text": "todo text"
          },
          {
            "id": 4,
            "isFinished": false,
            "text": "todo text"
          }
        ]
      }],
    };
  },
  methods: {
    addTaskList() {
      // плохая идея по поводу индексов, но переделывать уже не буду
      const curLen = this.todoCards.length;
      const obj = {
        header: "New Header",
        cardId: curLen,
        todos: [
          {
            id: 1,
            isFinished: false,
            text: "todo text"
          }
        ]
      };
      this.$API.addTaskList(obj);
      this.todoCards.push(obj);
    },
    deleteTaskList(id) {
      this.selectedTasklist = id;
      this.togglePopup(true);
    },
    confirmDelete() {
      this.todoCards = this.todoCards.filter(
        item => item.cardId !== this.selectedTasklist
      );
      this.$API.deleteTaskListById(this.selectedTasklist);
      this.togglePopup(false);
    },
    decline() {
      this.togglePopup(false);
    },
    togglePopup(state) {
      this.popupState = state;
    }
  },
  created(){
    eventBus.$on('decline', () => {
      console.log('asda')
      this.decline()
    });
  },
  mounted() {
    this.$API.fetchAllTaskLists().then(res => {
      if(res !== undefined) this.todoCards = res;
    });

  }
};
</script>

<style lang="scss" scoped>
.edit-buttons,
.edit-confirm {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  & > *:not(:last-child) {
    margin-right: 15px;
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
@import "src/scss/_parts/transitions";
</style>
