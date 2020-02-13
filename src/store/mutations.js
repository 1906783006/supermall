import {
  ADD_COUNT,
  ADD_CART
} from "./mutations-types.js"

export default {
  //  mutations里面的方法尽可能做的事情单一一点
  [ADD_COUNT](state, payload) {
    payload.count++;
  },
  [ADD_CART](state, payload) {
    payload.checked = false;
    state.cartList.push(payload);
  }
}