import React from "react";
import { Route, Redirect } from "dva/router";
import Cookie from '../http/utils'
const routerMap = val =>
    val.map((item, index) => (
        Cookie.get('userid')?<Route
            key={index}
            path={item.path}
            exact={item.exact ? true : false}
            render={(match) => {
                if (item.child) {
                    return <item.component {...match} routers={item.child} />
                } else {
                    return <item.component {...match}/>
                }
            }}
        />:(item.path === '/'?<Route
            key={index}
            path='/'
            exact={item.exact?true:false}
            render={(match) => {
                if (item.child) { 
                    return <item.component {...match} routers={item.child} />
                } else {
                    return <item.component {...match} />
                }
            }}
        />:<Redirect exact to="/" 
            key={index}/>)
    ))
export default routerMap;
