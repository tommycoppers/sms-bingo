<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/bingo">
            <img alt="Vue logo" src="../assets/mike-r.jpg" />
          </router-link>
        </li>
        <li>
          <router-link to="/bingo">Bingo</router-link>
        </li>
        <li>
          <router-link to="/mikeisms">Mike-isms</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  padding: calc(var(--main-spacing) / 2) var(--main-spacing);
  background: var(--primary-color);
  color: #fff;
  font-size: 1.125rem;
}

ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}

ul {
  display: flex;
  align-items: center;
}
li {
  margin-right: 1em;
}

a {
  color: #fff;
  text-decoration: none;
}

img {
  border-radius: 100%;
}

a:hover {
  color: #d3c3e3;
}
</style>