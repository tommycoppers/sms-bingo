<template>
  <section class="bingo-card">
    <header>BINGO</header>
    <div v-if="showBoard" class="bingo-board">
      <div class="bingo-board-inner">
        <div
          class="bingo-board__square"
          v-for="saying in boardSayings"
          :class="{ 'is-selected': saying.isSelected }"
          :key="saying"
          @click="toggleSelected(saying)"
        >
          <div class="bingo-board__square-content">{{ saying.saying }}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Not Enough Sayings</h2>
      <p><router-link to="/mikeisms">Go Add Some!</router-link></p>
    </div>
  </section>
</template>

<script>
const FREE_PIECE = "FREE";
const rowCount = 5;
const totalSpaces = rowCount * rowCount;
const winningCombos = getWinningCombos(rowCount);
const minimumSayingsCount = totalSpaces - 1; // Because the FREE space will be added

import { ref, watch, computed } from "vue";
import { shuffle } from "../../utils/array-helpers";

export default {
  emits: ["won"],
  props: {
    sayings: {
      default: [],
    },
  },
  setup(props, context) {
    const boardSayings = ref(generateBoardSayings(props));

    watch(props, (newVals) => {
      newVals.sayings && (boardSayings.value = generateBoardSayings(props));
    });

    const showBoard = computed(() => {
      return boardSayings.value.length > minimumSayingsCount;
    });

    function toggleSelected(saying) {
      if (saying.saying === FREE_PIECE) {
        return;
      }

      saying.isSelected = !saying.isSelected;

      const winningSequence = evaluateGameStatus(boardSayings);
      if (winningSequence) {
        const winningSayings = winningSequence.map(
          (index) => boardSayings.value[index].saying
        );
        context.emit("won", winningSayings);
      }
    }

    return {
      showBoard,
      boardSayings,
      toggleSelected,
    };
  },
};

function generateBoardSayings(props) {
  const sayings = props.sayings || [];
  if (sayings.length < minimumSayingsCount) {
    return sayings;
  }

  const shuffledSayings = shuffle(sayings);
  shuffledSayings.length = minimumSayingsCount;
  shuffledSayings.splice(12, 0, FREE_PIECE);

  const sayingsConfig = shuffledSayings.map((saying) => ({
    saying,
    isSelected: saying === FREE_PIECE,
  }));

  return sayingsConfig;
}

function evaluateGameStatus(boardSayings) {
  const currentlySelected = boardSayings.value.reduce((acc, saying, index) => {
    if (saying.isSelected) {
      acc.push(index);
    }
    return acc;
  }, []);

  const winningSequence = winningCombos.find((combo) => {
    return combo.every((i) => currentlySelected.includes(i));
  });

  return winningSequence;
}

function getWinningCombos(rowCount = 5) {
  const items = [...Array(rowCount * rowCount)].map((_, i) => i);
  const rows = items.reduce((acc, item, index) => {
    if (index % rowCount === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(item);
    return acc;
  }, []);

  const columns = rows.reduce(
    (cols, row) => {
      row.forEach((item, index) => cols[index].push(item));
      return cols;
    },
    [...Array(rows.length)].map(() => [])
  );

  const diagonals = rows.reduce(
    (diag, row, index) => {
      diag[0].push(row[index]);
      diag[1].push(row[row.length - index - 1]);
      return diag;
    },
    [...Array(2)].map(() => [])
  );

  return [...rows, ...columns, ...diagonals];
}

</script>

<style scoped>
.bingo-card {
  --border-weight: 3px;
  width: 80vw;
  max-width: 60vh;
  margin: 0 auto;
  box-shadow: 0 5px 2px -2px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  background: #fff;
  border: 1px solid #005d5d;
  border-radius: 0.5rem;
  overflow: hidden;
}

.bingo-card header {
  background: var(--primary-color);
  color: #fff;
  text-align: center;
  padding: 1rem;
  margin: -1rem -1rem 1rem;
  font-size: 2rem;
  font-weight: 800;
  border-bottom: 1px solid #005d5d;
}

.bingo-board {
  position: relative;
  border: var(--border-weight) solid transparent;
  background: #260347;
  clip: border;
}

.bingo-board:after {
  content: "";
  padding-top: 100%;
  display: block;
}

.bingo-board-inner {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: var(--border-weight);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bingo-board__square {
  background: #fff;
  padding-top: 100%;
  position: relative;
}

.bingo-board__square:hover {
  cursor: pointer;
}

.bingo-board__square:before {
  content: "";
  top: -100vh;
  border-radius: 100%;
  margin: 0.25em;
  position: absolute;
  transform: scale(1.1) rotateY(70deg);
  transition: transform 0.15s ease-out;
  opacity: 0.6;
}

.bingo-board__square.is-selected:before {
  --chip-color: var(--secondary-color);
  content: "";
  background: var(--chip-color);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  box-shadow: inset 1px 1px var(--chip-color),
    inset 1px 1px 1px 3px rgba(255, 255, 255, 0.3);
  transform: scale(1) rotateY(0);
}

.bingo-board__square-content {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  font-size: 70%;
  text-align: center;
}
</style>