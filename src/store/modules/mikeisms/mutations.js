export default {
    setSayings(state, payload) {
        console.log(`setSayings()`, payload.length)
        console.log(state.sayings)
        state.sayings = payload;
    },
}