import {
  ADD_COUNT,
  ADD_CART
} from "./mutations-types.js"

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找之前商品是否有加入的商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
    
    // 2.把商品添加到cartlist中
    if(oldProduct) {
      // oldProduct.count += 1;
      context.commit(ADD_COUNT, oldProduct);
      resolve('当前商品数量+1');
    } else {
      payload.count = 1;
      // state.cartList.push(payload);
      context.commit(ADD_CART, payload);
      resolve('成功添加新的商品');
    }
    })
  }
}