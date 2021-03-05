import MikeismsService from '../../../services/MikeismsService'
const service = new MikeismsService()
export default {
    async loadSayings(context) {
        const sayings = await service.getSayings()
        context.commit('setSayings', sayings)
    },
    async saveSaying(context, payload) {
        service.saveSaying(payload)
    }
}

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }