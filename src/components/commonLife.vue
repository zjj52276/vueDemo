<template>
  <div id="lifeCycle" ref="lifeCycleContainer">
    {{testNum}}
    <el-button @click="changeNum">更改data</el-button>
    <van-button icon="https://img.yzcdn.cn/vant/logo.png" type="info">按钮</van-button>
  </div>
</template>
<script>
export default {
  // el: '#lifeCycle',//当这里不写时，beforeMount和beforeUpdate只会调用一次
  components: {// 引入组件

  },
  data () {
    return {
      testNum: 23456789
    }
  },
  beforeCreate () {
    // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
    console.log('创建前：')
    console.log(this.$el)// undefined
    console.log(this.$data)// undefined
  },
  created () {
    // 在实例创建完成后被立即调用。
    // 在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。
    // 然而，挂载阶段还没开始，$el 属性目前不可见。
    console.log('创建完成：')
    console.log(this.$el)// undefined
    console.log(this.$data.testNum)// 此时可以获取到data里面的内容 23456789
    this.testNum = 111111
  },
  beforeMount () {
    // 在挂载开始之前被调用：相关的 render 函数首次被调用。
    // 该钩子在服务器端渲染期间不被调用。
    // #当存在el选项时
    // 1.报错[Vue warn]: Cannot find element: lifeCycleContainer
    // console.log('挂载前：')
    // console.log(this.$el)// <div></div>
    // console.log(this.$data.testNum)// 此时可以获取到data里面的内容 111111

    // 2.第二次输出
    // console.log('挂载前：')
    // console.log(this.$el)// undefined
    // console.log(this.$data.testNum)// 此时可以获取到data里面的内容 222222
    // this.testNum = 222222

    // #当不存在el选项时
    console.log('挂载前：')
    console.log(this.$el)// undefined
    console.log(this.$data.testNum)// 此时可以获取到data里面的内容 111111
    this.testNum = 222222
  },
  mounted () {
    // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
    // 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
    // 注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted：
    // 该钩子在服务器端渲染期间不被调用。
    console.log('挂载完成：')
    console.log(this.$el)// <div id="lifeCycle" ref="lifeCycleContainer">333333</div>
    console.log(this.$data.testNum)// 此时可以获取到data里面的内容 222222
    this.testNum = 333333
    this.$nextTick(function () {
      // Code that will run only after the entire view has been rendered
    })
  },
  beforeUpdate () {
    // 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
    // 该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。
    // #el存在时，该方法也执行了两次不过输出相同
    // #el不存在时，该方法只执行一次
    console.log('数据更新时')
    console.log(this.$el)// <div id="lifeCycle" ref="lifeCycleContainer">333333</div>
    console.log(this.$data.testNum)// 此时可以获取到data里面的内容 333333
  },
  updated () {
    // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
    // 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。
    // 注意 updated 不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以用 vm.$nextTick 替换掉 updated：
    // 该钩子在服务器端渲染期间不被调用。
    console.log('数据更改完成：')
    console.log(this.$el)// <div id="lifeCycle" ref="lifeCycleContainer">333333</div>
    console.log(this.$data.testNum)// 此时可以获取到data里面的内容 333333
    this.$nextTick(function () {
    // Code that will run only after the entire view has been re-rendered
    })
  },
  activated () {
    // keep-alive 组件激活时调用。
    // 该钩子在服务器端渲染期间不被调用。
  },
  deactivated () {
    // keep-alive 组件停用时调用
    // 该钩子在服务器端渲染期间不被调用。
  },
  beforeDestroy () {
    // 实例销毁之前调用。在这一步，实例仍然完全可用。
    // 组件一切都是正常的，可以进行最后的操作
    // 该钩子在服务器端渲染期间不被调用。
  },
  // beforeDestroy --->>> destoryed之间执行
  // 1. remove self from parent （从父组件中移除）
  // 2. teardown watchers （移除watchers）
  // 3. remove reference from data observer （从observer中移除引用）
  // 4. invoke destroy hooks on current rendered tree （处理DOM tree）
  // 5. fire destroyed hook （触发destroyed）
  destroyed () {
    // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    // 该钩子在服务器端渲染期间不被调用。
  },
  errorCaptured () {
    // 2.5.0+ 新增
    // 类型：(err: Error, vm: Component, info: string) => ?boolean
    // 详细：
    // 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。
    // 你可以在此钩子中修改组件的状态。因此在模板或渲染函数中设置其它内容的短路条件非常重要，它可以防止当一个错误被捕获时该组件进入一个无限的渲染循环。
  },
  computed: {

  },
  methods: {
    changeNum () {
      this.testNum = 444444
    }
  },
  watch: {
    testNum: {
      deep: true, // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
      immediate: true, // 1.设置为true时，该回调将会在侦听开始之后被立即调用,beforeCreate就开始调用了,此时下面输出时23456789 undefined
      handler: function (val, oldVal) {
        console.log('watch被调用了')
        // 2.在created，beforeMoute,mouted里面修改数据，不过会等到mouted之后才会监听到数据变化
        // mouted之后调用时，输出是333333 23456789
        // 3.点击按钮修改data时，会立刻触发watch监听，输出444444 333333；然后执行beforeupdate，updated方法
        console.log(val)
        console.log(oldVal)
      }
    }
  }

}
</script>
<style lang="less" scoped>
</style>
