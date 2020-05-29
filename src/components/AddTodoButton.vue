<template>
    <router-link class="add-button" to="/edit">
        <button>
            +
        </button>
        <p>
            Добавить напоминание
        </p>
    </router-link>
</template>

<script>
    export default {
        name: "AddTodoButton",
    }
</script>

<style lang="scss" scoped>
    .add-button, .add-button button{
        cursor: pointer;
    }
    .add-button {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: #000;
        button{
            border-radius: 50%;
            border: 3px solid dodgerblue;
            color: dodgerblue;
            font-size: 1.5em;
            line-height: 1em;
            padding: 0;
            width: 30px;
            height: 30px;
            background: transparent;
            transition: color 0.3s ease-in, background 0.3s ease-in;
            &:hover{
                background: dodgerblue;
                color: white;
            }
        }

        p {
            margin: 0;
            padding-left: 15px;
        }
    }
</style>