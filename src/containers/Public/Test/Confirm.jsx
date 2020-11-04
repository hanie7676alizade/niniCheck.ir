import React from "react"
import { Row, Col, Button, Form } from "react-bootstrap"

import classes from "scss/Public/Test.module.scss"

const TestConfirm = props => {
    return (
        <div className={classes.TestRegister}>
            <Form as={Col} lg={12}>
                <Form.Group
                    className={classes.TestConfirm}
                    controlId="formBasicnumber"
                    as={Row}
                >
                    {/* <Form.Label>شماره موبایل</Form.Label> */}
                    <Form.Control
                        type="text"
                        placeholder="کد اعتبار سنجی ارسالی را وارد کنید"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    تایید اعتبار
                </Button>
            </Form>
            <Button className={classes.EditNumber}>ویرایش شماره موبایل </Button>
            <Button className={classes.EditNumber}>ارسال دوباره کد</Button>
        </div>
    )
}
export default TestConfirm
