import { createStore } from 'vuex';

import mikeismsModule from './modules/mikeisms/index.js';

const store = createStore({
    modules: {
        mikeisms: mikeismsModule,
    }
});

export default store;