
import http from "../utils/fetch";
let initState = [];
export default {
  namespace: "classall",
  state: [],
  reducers: {
    getclass(state = initState, { payload }) {
      //state.push(payload);
      // console.log(payload);
      return state;
    }
  },
  effects: {
    *getdata(action, { put, call }) {
      let { payload } = action;
      let data = yield call(http.get, payload);
      yield put({
        type: "getclass",
        payload: data
      });
    }
  }
};
