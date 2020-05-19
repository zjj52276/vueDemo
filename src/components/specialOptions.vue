<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div><!-- 在双花括号中使用过滤器 -->
      此处展示的是全局过滤器结果{{ time | formateDate }}
    </div>
    <!-- 在 `v-bind` 中使用过滤器 -->
    <div v-bind:id="rawId | formatId">左右均是局部过滤器结果{{ rawId2 | formatIdWithOptions('2', '0') }}</div>
    <div><!-- 在双花括号中使用computed -->
      computed的计算结果{{ time2 }}
    </div>
  </div>
</template>

<script>
export default {
//   name: 'HelloWorld', //当这里跟router同时定义了name时，优先读取组件内的name
  data () {
    return {
      msg: 'This is a page about comment for computed, filter and watch',
      rawId:1,
      rawId2:2,
      time:10000
    }
  },
  created() {
    //this.$formateDate(10000)
  },
  computed: {
    /**
     * 根据原有的属性，计算出一个新的属性，当依赖的属性发生改变的时候，新的属性也会发生改变
    （1）不通过传参，数据都是从data中获取，且必须有返回值
    （2）有缓存的作用
    （3）相当于data中的属性，直接使用
     */
    time2() {
      let date = new Date(this.time * 1000);
      let Y = date.getFullYear();
      let M = date.getMonth() + 1;
      let D = date.getDate();
      M = M < 10 ? "0" + M : M;
      D = D < 10 ? "0" + D : D;
      return `${Y}-${M}-${D}`;
    }
  },
  filters: {
    //常用于格式化字段
    //（1）需要传参和返回值
    //（2）局部过滤器：在组件中定义本地的过滤器
    formatId (val) {
        return `${2*val}`
    },
    //注意：当需要传参时，vue里面小括号需要挨着方法名，不然会报错
    formatIdWithOptions(T, val2, val3) {
      return `${2*T} - ${val2} - ${val3}`;
    }
  },
  watch: {
    // 主要用来监听某些特定数据的变化，从而进行某些业务逻辑的操作（可以看做methods和computed的结合体）
    time(T) {   对time这个属性进行监听
      let date = new Date(T);
      let Y = date.getFullYear();
      let M = date.getMonth() + 1;
      let D = date.getDate();
      M = M < 10 ? "0" + M : M;
      D = D < 10 ? "0" + D : D;
      let str = `${Y}-${M}-${D}`;
      this.time2 = str;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
