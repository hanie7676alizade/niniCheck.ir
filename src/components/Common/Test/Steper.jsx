import React, { useEffect } from "react"
import { connect } from "react-redux"

import classes from "scss/Public/Test.module.scss"

const TestSteper = props => {
    var doneSteper
    useEffect(() => {
        doneSteper = document.getElementById("doneSteper")
        if (doneSteper) {
            let newWidth = Math.round(
                (100 / props.questionStore.length) * props.stepStore - 1
            )
            doneSteper.style.width = `${newWidth}%`
        }
    })
    return (
        <div className={classes.TestSteper}>
            {props.questionStore.length === 0 ? null : (
                <div className={classes.allSteps}>
                    <div
                        id="doneSteper"
                        className={` doneSteper ${classes.doneSteper}`}
                    ></div>
                </div>
            )}
        </div>
    )
}
const mapStatesToProps = state => {
    return {
        stepStore: state.Test.step,
        questionStore: state.Test.question
    }
}

export default connect(mapStatesToProps)(TestSteper)
