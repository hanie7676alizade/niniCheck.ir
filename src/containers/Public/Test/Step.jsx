import React from "react"
import { Row, Col, Form } from "react-bootstrap"

import classes from "scss/Public/Test.module.scss"

const TestStep = props => {
    return (
        <div className={classes.TestStep}>
            <Row>
                <h4>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است.
                </h4>
            </Row>
            <Form.Group as={Row}>
                <Col className={classes.option}>
                    <Form.Check
                        className={classes.CheckBox}
                        type="radio"
                        label={" لورم ایپسوم ایپسوم"}
                        custom
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1" //unic Key
                    />
                </Col>
                <Col className={classes.option}>
                    <Form.Check
                        className={classes.CheckBox}
                        type="radio"
                        label={" لورم ایپسوم ایپسوم"}
                        custom
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                    />
                </Col>
            </Form.Group>
            <Row>
                <div className={classes.NextPrevBTN}>
                    <button>بعدی</button>
                    <button>قبلی</button>
                </div>
            </Row>
            <Row>
                <button className={classes.finishBTN} >اتمام تست</button>
            </Row>
        </div>
    )
}
export default TestStep
