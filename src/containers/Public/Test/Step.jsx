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

const TestStep = props => {
    const oldAnswers = props.answerStore
    var answerId = null
    const currentQuestion = props.questionStore[props.stepStore - 1]
    const setArrayAnswer = e => {
        answerId = e.target.id
        console.log(e.target.id, "in onSetArrayAnswer")
        oldAnswers.push({
            question_id: currentQuestion.id,
            answer_id: e.target.id
        })
        props.onSetAnswer(oldAnswers)
    }
    useEffect(() => {
        if (!!props.isVerifiedStore) {
            props.onFetchQuestion(props.mobileNumberStore)
        }
    }, [])
    const NextStep = () => {
        props.onSaveAnswer(
            props.mobileNumberStore,
            currentQuestion.id,
            answerId
        )
        var customerAnswer = oldAnswers.filter(
            item => item.question_id == currentQuestion.id
        )
        console.log('To Step>>>>', props.stepStore + 1);
        if (customerAnswer.length !== 0) {
            props.onSetStep(props.stepStore + 1)
        }
    }
    const PrevStep = () => {
        props.onSetStep(props.Step - 1)
    }
    console.log(props.questionStore.length,props.questionStore,'props.questionStore')
    if (props.questionStore.length) {
        return (
            <div className={classes.TestStep}>
                <Row>
                    <h4>{currentQuestion.question}</h4>
                </Row>
                <Form.Group as={Row}>
                    {JSON.parse(currentQuestion.options).map((item, index) => {
                        return (
                            <Col
                                className={classes.option}
                                key={`${currentQuestion.id}${index + 1}`}
                            >
                                <Form.Check
                                    className={classes.CheckBox}
                                    type="radio"
                                    label={item.answer}
                                    custom
                                    name="formHorizontalRadios"
                                    id={index + 1}
                                    // checked={currentQuestion.answers.length && currentQuestion.answers[0].option ===index +1 }
                                    onClick={e => setArrayAnswer(e)}
                                />
                            </Col>
                        )
                    })}
                </Form.Group>
                <Row>
                    <div className={classes.NextPrevBTN}>
                        <button
                            className="outLineNone"
                            onClick={e => NextStep(e)}
                        >
                            {props.stepStore === props.questionStore.length
                                ? "مشاهده تست"
                                : "بعدی"}
                        </button>
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
                {/* <Row>
                    {props.stepStore === props.questionStore.length ? (
                        <button
                            className={classes.finishBTN}
                            onClick={e => FinishTest(e)}
                        >
                            اتمام تست
                        </button>
                    ) : null}
                </Row> */}
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
        answerStore: state.Test.answers
    }
}
const mapActionToProps = dispatch => {
    return {
        onSetStep: step => dispatch(setStep(step)),
        onFetchQuestion: mobileNumber => dispatch(FetchQuestion(mobileNumber)),
        onSetAnswer: answers => dispatch(setAnswer(answers)),
        onSaveAnswer: (mobileNumber, question_id, answer_id) =>
            dispatch(saveAnswer(mobileNumber, question_id, answer_id))
    }
}
export default connect(mapStatesToProps, mapActionToProps)(TestStep)
