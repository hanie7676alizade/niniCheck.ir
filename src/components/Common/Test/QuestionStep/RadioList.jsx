import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Row, Form } from "react-bootstrap"
import { setAnswer } from "store/Test/actions"
import RadioItem from "./RadioItem"

const CheckBoxs = props => {
    const currentQuestion = props.questionStore[props.stepStore - 1]
    const currentAnswer = props.answersStore.filter(
        item => item.questionId === props.stepStore
    )[0]

    const questionOptions = currentQuestion
        ? JSON.parse(currentQuestion.options)
        : null
    console.log(
        props.answersStore[props.stepStore - 1],
        "props.answersStore[props.stepStore - 1]",
        props.answersStore,
        "props.answersStore List"
    )

    return (
        <Form.Group as={Row}>
            {questionOptions.map((item, index) => {
                return (
                    <RadioItem
                        item={item}
                        index={index}
                        stepStore={props.stepStore}
                        currentQuestion={currentQuestion}
                        currentAnswer={currentAnswer}
                    />
                )
            })}
        </Form.Group>
    )
}

const mapStatesToProps = state => {
    return {
        stepStore: state.Test.step,
        questionStore: state.Test.question,
        answersStore: state.Test.answers
    }
}

const mapActionToProps = dispatch => {
    return {
        onSetAnswer: answers => dispatch(setAnswer(answers))
    }
}
export default connect(mapStatesToProps, mapActionToProps)(CheckBoxs)
