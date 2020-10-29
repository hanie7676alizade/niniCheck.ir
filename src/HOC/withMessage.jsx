import React from "react"
import { withRouter } from "react-router-dom";

import Alert from "components/UI/Alert/Alert"

const withMessage = (WrappedComponent) => {

    const Component = class extends React.Component{
        state = {
            showAlert: false,
            timeout: null
        }
    
        componentDidMount(){
            if (this.props.location && this.props.location.state && this.props.location.state.message) {
                setTimeout(() => {
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
                }, 500);
            }
        }
    
        render() {
            let alert = null;
            if (this.props.location && this.props.location.state && this.props.location.state.message) {
                alert = <Alert type={this.props.location.state.message.type} show={this.state.showAlert} message={this.props.location.state.message.text} />
            }
    
            return (
                <React.Fragment>
                    {alert}
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
    }

    return withRouter(Component);
}


export default withMessage;