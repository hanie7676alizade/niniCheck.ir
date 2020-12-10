import React from "react"
import { connect } from "react-redux"
import { Row, Form } from "react-bootstrap"

import RadioItem from "./RadioItem"

const CheckBoxs = props => {
    const currentQuestion = props.questionStore[props.stepStore - 1]

    const questionOptions = currentQuestion
        ? JSON.parse(currentQuestion.options)
        : null

    return (
        <Form.Group as={Row}>
            {questionOptions.map((item, index) => {
                return (
                    <RadioItem
                        item={item}
                        index={index}
                        stepStore={props.stepStore}
                        currentQuestion={currentQuestion}
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
export default connect(mapStatesToProps)(CheckBoxs)
