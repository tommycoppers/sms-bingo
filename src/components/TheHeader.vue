<template>
  <header>
    <router-link to="/bingo" class="home-link">
      <img alt="Vue logo" src="../assets/mike-r.jpg" />
      Shit Mike Says BINGO
    </router-link>
    <nav>
      <ul>
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
  display: flex;
  align-items: center;
  padding: calc(var(--main-spacing) / 2) var(--main-spacing);
  background: var(--primary-color);
  color: #fff;
  font-size: 1.125rem;
}

header a:hover {
  cursor: pointer;
}

.home-link {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.home-link img {
  margin-right: 0.75rem;
}

nav {
  margin-left: auto;
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