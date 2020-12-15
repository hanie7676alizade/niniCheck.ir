import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { connect } from "react-redux"

import classes from "scss/Public/Test.module.scss"
import { setMobileNumber, sendCode } from "store/Test/actions"

const TestRegister = props => {
    const [mobileNumber, setmobileNumber] = useState(props.mobileNumberStore)

    const SendCode = event => {
        event.preventDefault()
        props.onSendCode(mobileNumber)
        props.onSetMobileNumber(mobileNumber)
    }
    return (
        <div className={classes.TestRegister}>
            <Form onSubmit={SendCode}>
                <Form.Group controlId="formBasicMobileNumber">
                    <Form.Control
                        value={mobileNumber}
                        type="text"
                        placeholder="شماره موبایل خود را وارد کنید"
                        onChange={e => setmobileNumber(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    ارسال کد
                </Button>
            </Form>
        </div>
    )
}
const mapStatesToProps = state => {
    return {
        mobileNumberStore: state.Test.mobileNumber
    }
}

const mapActionToProps = dispatch => {
    return {
        onSetMobileNumber: step => dispatch(setMobileNumber(step)),
        onSendCode: mobileNumber => dispatch(sendCode(mobileNumber))
    }
}
export default connect(mapStatesToProps, mapActionToProps)(TestRegister)
