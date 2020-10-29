import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import {
    setShowAlert,
    setMessage,
    setMessageType
} from "store/NewsLetter/actions"

class Sucsess extends React.Component {
    componentDidMount() {
        this.props.onSetMessage("شما با موفقیت در خبرنامه ما عضو شدید")
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

export default connect(null, mapActionToProps)(Sucsess)
