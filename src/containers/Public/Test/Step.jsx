import React from "react"
import { connect } from "react-redux"
import { Row, Col, Form } from "react-bootstrap"

import classes from "scss/Public/Test.module.scss"
import { setStep } from "store/Test/actions"

const TestStep = props => {
    const NextStep = e => {
        props.onSetStep(props.Step + 1)
        
    }    
    const PrevStep = e => {
        props.onSetStep(props.Step - 1)
    }
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
                    <button className='outLineNone' onClick={e => NextStep(e)} >بعدی</button>
                    <button className='outLineNone' onClick={e => PrevStep(e)} >قبلی</button>
                </div>
            </Row>
            <Row>
                <button className={classes.finishBTN} >اتمام تست</button>
            </Row>
        </div>
    )
}

const mapActionToProps = dispatch => {
    return {
        onSetStep: step => dispatch(setStep(step))
    }
}
export default connect(null, mapActionToProps)(TestStep)
