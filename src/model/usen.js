import http from '../http/index.js'
const defaultState=[]
export default{
    namespace:'gethttpsition',
    state:[],
    reducers:{
        update(state=defaultState,{payload}){
            return [...state,...payload.data]
        }
    },
    effects:{
        *fetchQuerysition({payload},{call,put}){
           let data=yield call(http.get,payload)
           yield put({
               type:"update",
               payload:data
           })
        }

    }
}