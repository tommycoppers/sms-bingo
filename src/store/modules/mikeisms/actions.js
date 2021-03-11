import MikeismsService from "../../../services/MikeismsService";
const service = new MikeismsService();
export default {
  async loadSayings(context) {
    const sayings = await service.getSayings();
    context.commit("setSayings", sayings);
  },
  async saveSayings(context, sayings = []) {
    const saveProms = sayings.map(saying=>service.saveSaying(saying))
    await Promise.all(saveProms)
  },

  async deleteSaying(context, sayingId) {
      await service.deleteSaying(sayingId)
  },
};

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
