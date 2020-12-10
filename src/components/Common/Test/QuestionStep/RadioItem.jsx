import React, { useRef, useEffect, useState } from "react"
import { Col } from "react-bootstrap"

import classes from "scss/Public/Test.module.scss"

const CheckBoxItem = props => {
    const checkedRadioElement = useRef(null)
    let sellectedOption = props.currentQuestion.Answers.length
        ? props.currentQuestion.Answers[0].option
        : null
    const [IsChecked, setIsChecked] = useState(
        eval(sellectedOption) === props.index + 1
    )
    useEffect(() => {
        if (props.currentQuestion.Answers.length) {
            checkedRadioElement.current.checked = IsChecked
        }
    })

    const handleRadioClick = () => {
        if (!IsChecked) {
            setIsChecked(false)
        }
    }
    return (
        <Col
            className={classes.option}
            key={`${props.stepStore}${props.index + 1}`}
        >
            <label
                className={classes.container}
                onClick={() => handleRadioClick()}
            >
                {props.item.answer}
                <input
                    type="radio"
                    id={props.index + 1}
                    name="radio"
                    ref={checkedRadioElement}
                />
                <span className={classes.checkmark}></span>
            </label>
        </Col>
    )
}

export default CheckBoxItem
