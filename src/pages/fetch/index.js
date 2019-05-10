import React from 'react'
import {connect} from 'dva'
class Feach extends React.Component{
    render(){
        return(
            <div>
                    22222
            </div>
        )
    }
    componentDidMount(){
        this.props.getchttp()
        console.log(this.props.qtype)
    }
}
export default connect(function(state){
    return{
        qtype:state
    }

},function(dispath){
        return{
            getchttp(){
                dispath({
                    type:"gethttpsition/fetchQuerysition",
                    payload:"/user/identity"
                })
            }
        }

})(Feach)