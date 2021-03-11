<template>
  <div>
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
  </div>
</template>

<script>
const minimumSayingsCount = 24;
const FREE_PIECE = "FREE";
const winningCombos = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

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
</script>

<style scoped>

.bingo-board {
  width: 80vw;
  max-width: 60vh;
  position: relative;
  border: 5px solid transparent;
  background: var(--primary-color);
  clip: border;
  margin: 0 auto;
  box-shadow: 0 5px 2px -2px rgba(0, 0, 0, 0.3);
}

.bingo-board:after {
  content: "";
  padding-top: 100%;
  display: block;
}

.bingo-board-inner {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
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
  --chip-color: var(--primary-color);
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
  font-size: 1.2vw;
  text-align: center;
}
</style>