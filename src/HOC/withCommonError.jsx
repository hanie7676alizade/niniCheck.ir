import React from "react"
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "store/Common/actions";
import * as authActions from "store/Auth/actions";
import Alert from "components/UI/Alert/Alert"
import axios from "store/Test/node_modules/axiosInstance";

const withCommonError = (WrappedComponent) => {
    const Component = class extends React.Component {
        state = {
            showAlert: false,
            timeout: null,
            redirectToSignin: false
        }

        componentDidMount() {
            axios.interceptors.request.use((request) => {
                this.props.onError({});
                this.setState({
                    showAlert: false
                });

                return Promise.resolve(request);
            })
            axios.interceptors.response.use((response) => Promise.resolve(response),
                (error) => {
                    const timeOutStat = this.state.timeout;
                    clearTimeout(timeOutStat);
                    let message = null;
                    let code = 500;
                    let data = null;
                    if (!error.response && error.message === "Network Error") {
                        message = "خطا در سرور!";
                    }

                    if (error.response) {
                        if (error.response.status === 422)
                            message = "داده&zwnj;های نا معتبر!";

                        if (error.response.status === 500)
                            message = "خطا در سرور!";

                        if (error.response.status === 404)
                            message = "آیتم پیدا نشد!";

                        if (error.response.status === 401) {
                            message = "خطای شناسایی کاربر!";
                            this.setState({ redirectToSignin: true })
                            this.props.unsetAuth();
                        }

                        code = error.response.status;
                        data = error.response.data
                    }

                    const err = new Error(message);
                    err.code = code;
                    err.data = data;

                    this.props.onError(err);
                    this.setState({
                        showAlert: true
                    });
                    const timeout = setTimeout(() => {
                        this.setState({
                            showAlert: false
                        });
                    }, 3300);
                    this.setState({
                        timeout
                    })
                    return Promise.reject(error);
                });
        }

        render() {
            let redirectToSignin = null;
            if (this.state.redirectToSignin) {
                redirectToSignin = <Redirect to={{
                    pathname: "/admin/signin",
                    state: {
                        message: { text: `لطفا دوباره وارد شوید`, type: 'Info' }
                    }
                }} />
            }
            return (
                <React.Fragment>
                    {redirectToSignin}
                    <Alert type="Error" show={this.state.showAlert} message={this.props.error.message} />
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
    }


    const mapStateToProps = (state) => {
        return {
            error: state.Common.error
        }
    }

    const mapActionToProps = (dispatch) => {
        return {
            onError: (error) => dispatch(actions.setError(error)),
            unsetAuth: () => dispatch(authActions.authSet({ user: null, token: null }))
        }
    }

    return connect(mapStateToProps, mapActionToProps)(Component);
}


export default withCommonError;