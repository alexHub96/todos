<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Roboto);
body *,
body *:before,
body *:after {
  box-sizing: border-box;
}
#app {
  width: 95%;
  max-width: 600px;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
}

.mt-10 {
  margin-top: 10px;
}
.mb-10 {
  margin-bottom: 10px;
}

.text-no-decoration {
  text-decoration: none;
}

.c-black {
  color: black;
}
</style>
