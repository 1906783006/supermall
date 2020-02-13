import Toast from './Toast'

const obj = {};

obj.install = (Vue) => {
  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  // 2.创建组件对象
  const toast = new toastContrustor();

  // 3.将组件对象手动挂载到一个元素上
  toast.$mount(document.createElement('div'));

  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;

}

export default obj