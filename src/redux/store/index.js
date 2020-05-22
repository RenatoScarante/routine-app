import { createStore } from "redux";
import storeSynchronize from "redux-localstore";

import reducers from "../ducks";

const store = createStore(reducers);

export default store;

storeSynchronize(store);
