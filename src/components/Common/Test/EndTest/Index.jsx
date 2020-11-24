import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import { setShowModal, setProbability } from "store/Test/actions"
import classes from "scss/Public/Test.module.scss"
import QuestionItem from "./QuestionItem"
const QuestionSAndAnswers = props => {
    let malePribability = 0
    let femalePribability = 0

    useEffect(() => {
        props.answersStore.map(item => {
            if (item.probability === "female") {
                femalePribability++
            } else if (item.probability === "male") {
                malePribability++
            }
        })
        if (malePribability > femalePribability) {
            props.onSetProbability("male")
        } else {
            props.onSetProbability("female")
        }
        props.onSetShowModal(true)
    }, [])

    return (
        <div className={classes.TestEndStep}>
            <div className={classes.QuestionSAndAnswers}>
                {props.questionStore.map((item, index) => {
                    return (
                        <QuestionItem
                            item={item}
                            index={index}
                            key={props.index}
                        />
                    )
                })}
            </div>
        </div>
    )
}
const mapStatesToProps = state => {
    return {
        questionStore: state.Test.question,
        answersStore: state.Test.answers
    }
}

const mapActionToProps = dispatch => {
    return {
        onSetShowModal: data => dispatch(setShowModal(data)),
        onSetProbability: data => dispatch(setProbability(data))
    }
}
export default connect(mapStatesToProps, mapActionToProps)(QuestionSAndAnswers)
