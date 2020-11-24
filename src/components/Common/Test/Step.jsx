import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Row, Col, Form } from "react-bootstrap"

import classes from "scss/Public/Test.module.scss"
import {
    setStep,
    FetchQuestion,
    setAnswer,
    saveAnswer,
    setMessageType,
    setMessage,
    setShowAlert
} from "store/Test/actions"

const TestStep = props => {
    const currentQuestion = props.questionStore[props.stepStore - 1]
    var oldAnswers = props.answerStore
    const questionOptions = currentQuestion
        ? JSON.parse(currentQuestion.options)
        : null

    const setArrayAnswer = e => {
        var changedAnswer = props.answerStore.filter(
            item => item.question_id != currentQuestion.id
        )
        oldAnswers = [
            ...changedAnswer,
            {
                question_id: currentQuestion.id,
                answer_id: e.target.id,
                probability: questionOptions[e.target.id - 1].probability
            }
        ]
        props.onSetAnswer(oldAnswers)
    }

    useEffect(() => {
        if (!!props.isVerifiedStore) {
            props.onFetchQuestion(props.mobileNumberStore)
        }
    }, [])

    const NextStep = () => {
        var customerAnswer = oldAnswers.filter(
            item => item.question_id == currentQuestion.id
        )
        if (customerAnswer.length !== 0) {
            //if option is seleted => save answer in dataBase
            props.onSaveAnswer(
                props.mobileNumberStore,
                currentQuestion.id,
                customerAnswer[0].answer_id
            )
            props.onSetStep(props.stepStore + 1) //next Step
        } else {
            props.onSetMessageType("Warning")
            props.onSetShowAlert(true)
            props.onSetMessage(`پاسخی انتخاب نشده`)
        }
    }

    const PrevStep = () => {
        props.onSetStep(props.stepStore - 1)
    }
    if (props.questionStore.length) {
        return (
            <Col className={classes.TestStep}>
                <Row>
                    <h4>{currentQuestion.question}</h4>
                </Row>
                <Form.Group as={Row}>
                    {questionOptions.map((item, index) => {
                        return (
                            <Col
                                className={classes.option}
                                key={`${currentQuestion.id}${index + 1}`}
                            >
                                <Form.Check
                                    checked={currentQuestion.Answers.length && currentQuestion.Answers[0].option ==index +1 }
                                    className={classes.CheckBox}
                                    type="radio"
                                    label={item.answer}
                                    custom
                                    name="formHorizontalRadios"
                                    id={index + 1}
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
                                ? "مشاهده نتیجه تست"
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
            </Col>
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
        answerStore: state.Test.answers,
        femaleStore: state.Test.female,
        maleStore: state.Test.male
    }
}
const mapActionToProps = dispatch => {
    return {
        onSetMessageType: type => dispatch(setMessageType(type)),
        onSetShowAlert: data => dispatch(setShowAlert(data)),
        onSetMessage: message => dispatch(setMessage(message)),
        onSetStep: step => dispatch(setStep(step)),
        onFetchQuestion: mobileNumber => dispatch(FetchQuestion(mobileNumber)),
        onSetAnswer: answers => dispatch(setAnswer(answers)),
        onSaveAnswer: (mobileNumber, question_id, answer_id) =>
            dispatch(saveAnswer(mobileNumber, question_id, answer_id))
    }
}
// setMessageType("Warning")
// setShowAlert(true)
// setMessage
export default connect(mapStatesToProps, mapActionToProps)(TestStep)
