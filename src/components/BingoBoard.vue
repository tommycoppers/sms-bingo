<template>
  <div>
    <!-- <code>{{boardSayings}}</code> -->
    <h2>YOU WON: {{!!isWon}}</h2>

    <div v-if="boardSayings.length >= 25" class="bingo-board">
      <div class="bingo-board-inner">
        <div
          class="bingo-board__square"
          v-for="saying in boardSayings"
          :class="{'is-selected': saying.isSelected}"
          :key="saying"
          @click="toggleSelected(saying)"
        >
          <div class="bingo-board__square-content">{{saying.saying}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
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
  [4, 8, 12, 16, 20]
];

export default {
  props: {
    sayings: {
      default: []
    }
  },
  setup(props) {
    const boardSayings = ref(getSayings(props));
    const isWon = ref(false);

    watch(props, (newVals, oldVals) => {
        console.log('WATCH', newVals, oldVals)
      newVals.sayings && (boardSayings.value = getSayings(props));
    });

    function toggleSelected(saying) {
      if (saying.saying === FREE_PIECE) {
        return;
      }
      saying.isSelected = !saying.isSelected;
      evaluateGameStatus(boardSayings, isWon);
    }

    return {
      boardSayings,
      toggleSelected,
      isWon
    };
  }
};

function getSayings(props) {
  const sayings = props.sayings || [];
  if (!sayings.length) {
    return sayings;
  }
  const shuffledSayings = shuffle(sayings);
  shuffledSayings.length = 24;
  shuffledSayings.splice(12, 0, FREE_PIECE);
  const sayingsConfig = shuffledSayings.map(saying => ({
    saying,
    isSelected: saying === FREE_PIECE
  }));

  return sayingsConfig;
}

function evaluateGameStatus(boardSayings, isWon) {
  const currentlySelected = boardSayings.value.reduce((acc, saying, index) => {
    if (saying.isSelected) {
      acc.push(index);
    }
    return acc;
  }, []);

  const winningSequence = winningCombos.find(combo => {
    return combo.every(i => currentlySelected.includes(i));
  });

  isWon.value = !!winningSequence;
}

function shuffle(arr) {
  arr = arr.slice(); // Copy the array
  let len = arr.length;
  let i;

  // While there remain elements to shuffle…
  while (len) {
    // Pick a remaining element…
    // And swap it with the current element.
    i = Math.floor(Math.random() * len--);
    [arr[len], arr[i]] = [arr[i], arr[len]];
  }

  return arr;
}
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
}
.bingo-board {
  width: 60vw;
  position: relative;
  border: 5px solid transparent;
  background: var(--primary-color);
  clip: border;
  margin: 0 auto;
}

.bingo-board:after {
  content: "";
  padding-top: 100%;
  display: block;
}

.bingo-board-inner {
  display: grid;
  /* grid-template-rows: repeat(5, 1fr); */
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

  /* padding: 1em; */
  padding-top: 100%;
  position: relative;
}
.bingo-board__square:hover {
  cursor: pointer;
}

.bingo-board__square.is-selected {
  /* background: #ccc; */
}
.bingo-board__square:before {
  content: "";
  top: -100vh;
  border-radius: 100%;
  margin: 0.25em;
  position: absolute;
  transform: scale(1.1) rotateY(70deg);
  transition: transform 0.15s ease-out;
  opacity: .6;
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