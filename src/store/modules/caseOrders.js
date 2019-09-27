
import db from '../../config/firebaseConfig'
const state = {
  caseOrders: []
}

const getters = {
  // @caseOrders is a list of all case
  caseOrders: (state) => {
    return state.caseOrders
  },
  statsTotalCase: (state) => {
    // let _statsTotalCase = state.caseOrder.filter( () => {
    //   state.caseOrder.length
    // })
    return state.caseOrders.length
  },
  stats_Dentist_CaseCompleted: (state) => {
    let _statsCaseCompleted = state.caseOrders.filter(statsCase =>
      statsCase.status === 'Completed'
    )
    return _statsCaseCompleted.length
  },
  stats_Dentist_CaseInprogress: (state) => {
    let _statsCaseInprogress = state.caseOrders.filter(statsCase =>
      statsCase.status === 'Inprogress'
    )
    return _statsCaseInprogress.length
  },
  stats_Dentist_CaseAttention: (state) => {
    let _statsCaseAttention = state.caseOrders.filter(statsCase =>
      statsCase.attention_require === 'Dentist'
    )
    return _statsCaseAttention.length
  }
}

const mutations = {
  LOAD_ORDERS: (state, payload) => {
    state.caseOrders = payload
  },
  ADD_CASEORDER_AT_LIST: (state, payload) => {
    state.caseOrders = state.caseOrders.concat(payload)
  },
  EDIT_CASEORDER_AT_LIST: (state, payload) => {
    let index = state.caseOrders.findIndex(patient => patient.id === payload.id)
    state.caseOrders.splice(index, 1)
    state.caseOrders = state.caseOrders.concat(payload)
  }
}

const actions = {
  LOAD_ORDERS ({ commit }, payload) {
    let { where } = payload
    let query = db.collection('caseOrders')
    if (where) {
      if (where[0] instanceof Array) {
        for (let w of where) {
          query = query.where(...w)
        }
      } else {
        query = query.where(...where)
      }
    }
    let orders = []
    query.get().then(querySnapshot => {
      querySnapshot.forEach(order => {
        orders.push(order.data())
      })
    })
    commit('LOAD_ORDERS', orders)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
