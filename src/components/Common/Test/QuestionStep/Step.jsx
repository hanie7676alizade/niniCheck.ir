import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Row, Col } from "react-bootstrap"

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
import RadioList from "components/Common/Test/QuestionStep/RadioList"

const TestStep = props => {
    const currentQuestion = props.questionStore[props.stepStore - 1]

    let selectedOptionId = null

    var oldAnswers = props.answersStore || []

    const currentQuestionOptions = currentQuestion
        ? JSON.parse(currentQuestion.options)
        : []

    useEffect(() => {
        if (props.isVerifiedStore) {
            props.onFetchQuestion(props.mobileNumberStore)
        }
    }, [])

    // const setAnswersInStore = () => {
    //     props.questionStore.map((item, index) => {
    //         // index + 1 = currentQuestion.id :)
    //         // item = currentQuestion
    //         const OptionId = item.Answers[0].option
    //        const probability = JSON.parse(item.options)[OptionId-1].probability
    //         var CurrentAnswer = {
    //             probability,
    //             questionId: index +1,
    //             selectedOptionId: OptionId
    //         }
    //         console.log(CurrentAnswer);
    //     })
    // }
    const SaveAnswerReduxDatabase = choosenRdb => {
        //save answer in database and set answer in redux
        if (choosenRdb) {
            // keep Choosen Answer Id in a state. for NextStep and PrevStep function
            selectedOptionId = choosenRdb.id
            // remove answer of current Question. so... we haven't duplicate answer
            var CurrentOldAnswers = oldAnswers.length
                ? [...oldAnswers].filter(item=>item.questionId != props.stepStore)
                : []
            // new answer
            var CurrentAnswer = {
                probability:
                    currentQuestionOptions[selectedOptionId - 1].probability,
                questionId: currentQuestion.id,
                selectedOptionId: selectedOptionId
            }
            props.onSetAnswer([...CurrentOldAnswers, { ...CurrentAnswer }]) //save on redux
            // save on dataBase
            props.onSaveAnswer(
                props.mobileNumberStore,
                currentQuestion.id,
                selectedOptionId
            )
        }
    }

    const NextStep = () => {
        const radios = document.querySelectorAll('[name="radio"]')
        let choosenRdb = false //we have not any answer here
        radios.forEach(element => {
            // 32=> map on radios to find checked element
            if (element.checked) choosenRdb = element
        })
        SaveAnswerReduxDatabase(choosenRdb)
        if (choosenRdb) {
            props.onSetStep(props.stepStore + 1)
        } else {
            props.onSetMessage("پاسخی انتخاب نشده")
            props.onSetMessageType("Warning")
            props.onSetShowAlert(true)
        }
    }

    const PrevStep = () => {
        const radios = document.querySelectorAll('[name="radio"]')
        let choosenRdb = false //we have not any answer here
        radios.forEach(element => {
            // map on radios to find checked element
            if (element.checked) choosenRdb = element
        })
        SaveAnswerReduxDatabase(choosenRdb)

        // prev Step
        props.onSetStep(props.stepStore - 1)
    }

    if (props.questionStore.length) {
        return (
            <Col className={classes.TestStep}>
                <Row>
                    <h4>{currentQuestion.question}</h4>
                </Row>
                <RadioList currentQuestion={currentQuestion} />
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
        answersStore: state.Test.answers
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

export default connect(mapStatesToProps, mapActionToProps)(TestStep)
