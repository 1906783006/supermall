import {debounce} from "./utils";
import BackTop from 'components/content/backtop/Backtop'

export const itemListenerMixin = {
  data() {
    return {
      itemListener: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200);

    this.itemListener = () => {
      this.newRefresh();
    };

    this.$bus.$on('itemImgLoad', this.itemListener);  
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  }
}