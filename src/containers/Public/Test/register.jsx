import React from "react"
import { Button, Form } from "react-bootstrap"
import { connect } from "react-redux"

import classes from "scss/Public/Test.module.scss"
import { setStep } from "store/Test/actions"

const TestRegister = props => {
    const SendCode = e => {
        e.preventDefault()
        props.onSetStep(0)
    }
    return (
        <div className={classes.TestRegister}>
            <Form>
                <Form.Control
                    type="text"
                    placeholder="شماره موبایل خود را وارد کنید"
                />
                <Button
                    variant="primary"
                    type="submit"
                    onClick={e => SendCode(e)}
                >
                    ارسال کد
                </Button>
            </Form>
        </div>
    )
}

const mapActionToProps = dispatch => {
    return {
        onSetStep: step => dispatch(setStep(step))
    }
}
export default connect(null, mapActionToProps)(TestRegister)
