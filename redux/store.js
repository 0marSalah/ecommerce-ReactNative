import { createStore } from "redux";
import { cartReducer } from "./cartReducer";

export const store = createStore(cartReducer);


