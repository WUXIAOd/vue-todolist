import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    // 文本框内容
    inputValue: '默认文本',
    nextId: 5
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    // 为store 中的inputValue赋值
    setInputValue(state, val) {
      state.inputValue = val
    },
    // 添加列表项
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 删除列表项
    removeItem(state, id) {
      // 根据id 查找对应的索引
      const i = state.list.findIndex(x => x.id === id)
      // 根据索引删除
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 修改列表的勾选状态
    checkBox(state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    // 清除已完成的选项
    removeHaveDone(state) {
      state.list = state.list.filter(x => x.done === false)
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    }
  },
  modules: {
  }
})
