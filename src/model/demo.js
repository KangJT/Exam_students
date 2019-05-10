import { getstudent } from "../server/servies";

export default {
  namespace: "demo",
  state: [],
  reducers: {
    update(state, action) {
        console.log(action)
      return [...state, action.payload];
    }
  },
  effects: {
    *gteroomer({ payload }, { call, put }) {
      let token = yield call(getstudent);
      console.log(token)
      yield put({
        type: "update",
        payload: token
      });
    }
  }
};
