import React, { useRef, useEffect, useState } from "react"
import { Col } from "react-bootstrap"

import classes from "scss/Public/Test.module.scss"

const CheckBoxItem = props => {
    const checkedRadioElement = useRef(null)
    let selectedOptionId = !!props.currentAnswer
        ? props.currentAnswer.selectedOptionId
        : null
    const optionTarget = eval(selectedOptionId)
    const [IsChecked, setIsChecked] = useState(optionTarget === props.index + 1)
    console.log(IsChecked, "IsChecked ",optionTarget ,'optionTarget' )
    
    console.log(
        props.currentAnswer,
        "props.currentAnswer useEffect",
        IsChecked
    )
    useEffect(() => {
        console.log(IsChecked, "IsChecked useEffect",optionTarget ,'===' ,props.index + 1)

        if (optionTarget === props.index + 1) {
            checkedRadioElement.current.checked = true
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
