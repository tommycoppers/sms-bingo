<template>
  <div>
    <the-header></the-header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
export default {
  name: "App",
  components: { TheHeader },
};
</script>

<style>
:root {
  --main-spacing: 1rem;
  --primary-color: #481d72;
  --secondary-color: #16a7a7;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

html,
body {
  margin: 0;
  padding: 0;
  background: #fafafa;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
main {
  padding: calc(var(--main-spacing) * 3) calc(var(--main-spacing) * 2);
}

main h1 {
  margin-top: 0;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.01em;
  background: var(--primary-color);
  color: #fff;
  border: 0;
  padding: 0.5em 1.5em;
  border-radius: 0.5rem;
  font-size: 1rem;
  height: 2.5em;
  transition: background-color 0.5s;
}

button:hover {
  cursor: pointer;
}

button.small {
  font-size: 0.75rem;
}

button.invert {
  background-color: #fff;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

button.invert:hover {
  background: var(--primary-color);
  color: #fff;
}

button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
