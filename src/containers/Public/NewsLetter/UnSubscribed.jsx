import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import {
    setShowAlert,
    setMessage,
    setMessageType
} from "store/NewsLetter/actions"

class UnSubscribed extends React.Component {
    componentDidMount() {
        this.props.onSetMessage("عضویت شما درخبرنامه نی نی چک غیرفعال شد")
        this.props.onSetMessageType('Success')
        this.props.onSetShowAlert(true)
    }
    render() {
        return <Redirect to={"/"} />
    }
}
const mapActionToProps = dispatch => {
    return {
        onSetMessage: data => dispatch(setMessage(data)),
        onSetShowAlert: data => dispatch(setShowAlert(data)),
        onSetMessageType: data => dispatch(setMessageType(data))
    }
}

export default connect(null, mapActionToProps)(UnSubscribed)
