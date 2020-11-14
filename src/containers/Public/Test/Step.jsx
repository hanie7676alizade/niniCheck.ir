import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Row, Col, Form } from "react-bootstrap"

import classes from "scss/Public/Test.module.scss"
import { setStep, FetchQuestion } from "store/Test/actions"

const TestStep = props => {
    useEffect(() => {
        if (!!props.isVerifiedStore) {
            props.onFetchQuestion(props.mobileNumberStore)
        }
    }, [])
    const NextStep = () => {
        props.onSetStep(props.Step + 1)
    }
    const PrevStep = () => {
        props.onSetStep(props.Step - 1)
    }
    const currentQuestion = props.questionStore[props.stepStore - 1]
    const setArrayAnswer=(item)=>{
        
    }
    if (props.questionStore.length) {
        return (
            <div className={classes.TestStep}>
                <Row>
                    <h4>{currentQuestion.question}</h4>
                </Row>
                <Form.Group as={Row}>
                    {JSON.parse(currentQuestion.options).map((item, index) => {
                        return (
                            <Col className={classes.option}>
                                <Form.Check
                                    className={classes.CheckBox}
                                    type="radio"
                                    label={item.answer}
                                    custom
                                    name="formHorizontalRadios"
                                    id={index + 1}
                                    onClick={(item)=>setArrayAnswer(item)}
                                />
                            </Col>
                        )
                    })}
                </Form.Group>
                <Row>
                    <div className={classes.NextPrevBTN}>
                        {props.stepStore ===
                        props.questionStore.length ? null : (
                            <button
                                className="outLineNone"
                                onClick={e => NextStep(e)}
                            >
                                بعدی
                            </button>
                        )}
                        {props.stepStore === 1 ? null : (
                            <button
                                className="outLineNone"
                                onClick={e => PrevStep(e)}
                            >
                                قبلی
                            </button>
                        )}
                    </div>
                </Row>
                <Row>
                    <button className={classes.finishBTN}>اتمام تست</button>
                </Row>
            </div>
        )
    } else {
        return null
    }
}

const mapStatesToProps = state => {
    return {
        isVerifiedStore: state.Test.isVerified,
        mobileNumberStore: state.Test.mobileNumber,
        stepStore: state.Test.step,
        questionStore: state.Test.question
    }
}
const mapActionToProps = dispatch => {
    return {
        onSetStep: step => dispatch(setStep(step)),
        onFetchQuestion: mobileNumber => dispatch(FetchQuestion(mobileNumber))
    }
}
export default connect(mapStatesToProps, mapActionToProps)(TestStep)
