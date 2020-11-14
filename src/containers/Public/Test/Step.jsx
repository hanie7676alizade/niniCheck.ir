import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Row, Col, Form } from "react-bootstrap"

import classes from "scss/Public/Test.module.scss"
import {
    setStep,
    FetchQuestion,
    setAnswer,
    saveAnswer
} from "store/Test/actions"
import { useState } from "react"

const TestStep = props => {
    // let oldAnswerStore = [...props.answerStore]
    const [answerId, setanswerId] = useState(null)
    const currentQuestion = props.questionStore[props.stepStore - 1]
    const setArrayAnswer = (id) => {
        // let changedAnswer
        // let newAnswersArray
        setanswerId(id)
        props.onSetAnswer([
            {
                question_id: currentQuestion.id,
                answer_id: id
            }
        ])
    }
    useEffect(() => {
        if (!!props.isVerifiedStore) {
            props.onFetchQuestion(props.mobileNumberStore)
        }
    }, [])
    const NextStep = () => {
        console.log( props.mobileNumberStore,
            currentQuestion.id,
            answerId,'OnsaveAnswerrrrrrrrrrrrrrrr ');
        props.onSaveAnswer(
            props.mobileNumberStore,
             currentQuestion.id,
             answerId
        )
        props.onSetStep(props.Step + 1)
    }
    const PrevStep = () => {
        props.onSetStep(props.Step - 1)
    }
    console.log(currentQuestion, "currentQuestion", answerId, "answerId")
    if (props.questionStore.length) {
        return (
            <div className={classes.TestStep}>
                <Row>
                    <h4>{currentQuestion.question}</h4>
                </Row>
                <Form.Group as={Row}>
                    {JSON.parse(currentQuestion.options).map((item, index) => {
                        return (
                            <Col className={classes.option} key={`${currentQuestion.id}${index+1}`}>
                                <Form.Check
                                    className={classes.CheckBox}
                                    type="radio"
                                    label={item.answer}
                                    custom
                                    name="formHorizontalRadios"
                                    id={index + 1}
                                    onClick={(e) =>
                                        setArrayAnswer(e.target.id)
                                    }
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
        questionStore: state.Test.question,
        answerStore: state.Test.answer
    }
}
const mapActionToProps = dispatch => {
    return {
        onSetStep: step => dispatch(setStep(step)),
        onFetchQuestion: mobileNumber => dispatch(FetchQuestion(mobileNumber)),
        onSetAnswer: answers => dispatch(setAnswer(answers)),
        onSaveAnswer: (mobileNumber, question_id, answer_id) => dispatch(saveAnswer(mobileNumber, question_id, answer_id))
    }
}
export default connect(mapStatesToProps, mapActionToProps)(TestStep)
