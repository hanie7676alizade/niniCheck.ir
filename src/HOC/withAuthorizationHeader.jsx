import React from "react"
import { connect } from "react-redux";


import axios from "axiosInstance";

const withAuthorizationHeader = (WrappedComponent) => {
    const Component = class extends React.Component{
        componentDidMount(){
            axios.interceptors.request.use((request) => {
                const newRequest = {...request}
    
                if (this.props.auth && this.props.auth.check){
                    const auth = this.props.auth;
                    const token = auth.getToken();
    
                    newRequest.headers.authorization = "Bearer " + token.token;
                }
    
                return Promise.resolve(newRequest);
            });
        }
    
        render() {
            return (
                <React.Fragment>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            auth: state.Auth.auth
        }
    }
    
    return connect(mapStateToProps)(Component);
}

export default withAuthorizationHeader;