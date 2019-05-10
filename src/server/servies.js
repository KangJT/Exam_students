import http from '../http'
function getstudent(){
    return http.get('/user/user',{})
}

export {getstudent}