import { createStore } from "redux";
import sidebarRenderer from "../reducers/sidebarReducer";

const store = createStore(sidebarRenderer);

export default store;
