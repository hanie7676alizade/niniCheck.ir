import React, { useState } from "react"
import { Col, Button, Form } from "react-bootstrap"
import { connect } from "react-redux"

import classes from "scss/Public/Test.module.scss"
import { sendCode, verifyCode } from "store/Test/actions"

const TestConfirm = props => {
    const [Code, setCode] = useState('')

    const Configuration = event => {
        event.preventDefault()
        props.onVerifyCode(props.mobileNumberStore, Code)
    }
    const EditNumber = () => {
        props.onSetStep(-1)
    }
    const SendCodeAgain = () => {
        props.onSendCode(props.mobileNumberStore)
    }
    return (
        <div className={classes.TestRegister}>
            <Form onSubmit={Configuration}>
                <Form.Group controlId="formBasicCode">
                    <Form.Control
                        onChange={e => setCode(e.target.value)}
                        type="text"
                        placeholder="کد اعتبار سنجی ارسالی را وارد کنید"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    تایید اعتبار
                </Button>
            </Form>
            <Button className={classes.EditNumber} onClick={EditNumber}>
                ویرایش شماره موبایل{" "}
            </Button>
            <Button className={classes.EditNumber} onClick={SendCodeAgain}>
                ارسال دوباره کد
            </Button>
        </div>
    )
}
const mapStatesToProps = state => {
    return {
        mobileNumberStore: state.Test.mobileNumber,
    }
}

const mapActionToProps = dispatch => {
    return {
        onSendCode: mobileNumber => dispatch(sendCode(mobileNumber)),
        onVerifyCode: (mobileNumber, code) =>
            dispatch(verifyCode(mobileNumber, code)),
    }
}
export default connect(mapStatesToProps, mapActionToProps)(TestConfirm)
