<template>
    <div class="todos-list">
        <h2>Text header</h2>

        <div class="todo" v-for="todo in todos" :key="todo.id">
            <VCheckbox :id="todo.id"
                       :is-checked="todo.isFinished"
                       :text="todo.text"
                       @changedCheckboxStatus="updateTodoStatus"/>
        </div>

    </div>
</template>

<script>
    import VCheckbox from "@/views/VCheckbox";

    export default {
        name: "Todo",
        components: {VCheckbox},
        data() {
            return {
                todos: [
                    {
                        id: 1,
                        isFinished: true,
                        text: 'todo text'
                    },
                    {
                        id: 2,
                        isFinished: false,
                        text: 'todo text'
                    },
                    {
                        id: 3,
                        isFinished: false,
                        text: 'todo text'
                    },
                    {
                        id: 4,
                        isFinished: false,
                        text: 'todo text'
                    }
                ],
            }
        },
        methods: {
            updateTodoStatus(id, newStatus) {
                console.log(id, newStatus)
            }
        }
    }
</script>

<style lang="scss" scoped>
    h2 {
        margin: 0;
        text-align: center;
        font-weight: normal;
    }

    .todo * {
        margin: 10px 0;
        cursor: pointer;
    }
</style>