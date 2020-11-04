import React from "react"
import { Row, Col, Button ,Form } from "react-bootstrap"

import classes from "scss/Public/Test.module.scss"

const TestRegister = props => {
    return (
        <div className={classes.TestRegister}>
            <Form >
                <Form.Group controlId="formBasicnumber" as={Row}>
                    {/* <Form.Label>شماره موبایل</Form.Label> */}
                    <Form.Control type="text" placeholder="شماره موبایل خود را وارد کنید" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    ارسال کد
                </Button>
            </Form>
        </div>
    )
}
export default TestRegister
