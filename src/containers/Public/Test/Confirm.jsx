import React from "react"
import { Col, Button, Form } from "react-bootstrap"
import { connect } from "react-redux"

import classes from "scss/Public/Test.module.scss"
import { setStep } from "store/Test/actions"

const TestConfirm = props => {
    const Configuration = e => {
        e.preventDefault()
        props.onSetStep(1)
    }
    const EditNumber = () => {
        props.onSetStep(-1)
    }
    console.log(props)
    return (
        <div className={classes.TestRegister}>
            <Form as={Col} lg={12}>
                <Form.Control
                    type="text"
                    placeholder="کد اعتبار سنجی ارسالی را وارد کنید"
                />
                <Button
                    variant="primary"
                    type="submit"
                    onClick={e => Configuration(e)}
                >
                    تایید اعتبار
                </Button>
            </Form>
            <Button className={classes.EditNumber} onClick={EditNumber}>ویرایش شماره موبایل </Button>
            <Button className={classes.EditNumber}>ارسال دوباره کد</Button>
        </div>
    )
}
const mapActionToProps = dispatch => {
    return {
        onSetStep: step => dispatch(setStep(step))
    }
}
export default connect(null, mapActionToProps)(TestConfirm)
