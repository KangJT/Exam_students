import http from '@/http'

export default {
    namespace: 'products2',
    state: [],
    reducers: {
      borderland(state,action){
          return [...state,...action.payload]
      }
    },
    effects: {
      *addAfter1Second(action, { call, put }) {
        let res =  yield call(http.get,action.payload)
        yield put({ type: 'borderland',payload:res.data });
      },
    },
}