import React, { useState,useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { CSSTransition } from "react-transition-group"
import { connect } from "react-redux"

import { setShowModal, setProbability } from "store/Test/actions"
import classes from "scss/Public/Test.module.scss"
const QuestionSAndAnswers = props => {
    const [ShowDescription, setShowDescription] = useState(false)
    let malePribability = 0
    let femalePribability = 0

    useEffect(() => {
        props.answersStore.map(item => {
            console.log(item,'item');
            if (item.probability === "female") {
                femalePribability++
            } else if (item.probability === "male") {
                malePribability++
            }
            console.log(malePribability,'malePribability',femalePribability,'femalePribability');
        })
        if(malePribability>femalePribability){
            props.onSetProbability('male')
        }else{
            props.onSetProbability('female')
        }
        props.onSetShowModal(true)
    }, [])

    const classNameShowDescription = {
        enter: classes.enterShowDescription,
        enterActive: classes.enterActiveShowDescription,
        exit: classes.exitShowDescription,
        exitActive: classes.exitActiveShowDescription
    }
    const onShowDescription = () => {
        setShowDescription(!ShowDescription)
    }
    return (
        <div className={classes.TestEndStep}>
            <div className={classes.QuestionSAndAnswers}>
                {props.questionStore.map((item, index) => {
                    return (
                        <div
                            className={classes.question}
                            onClick={onShowDescription}
                            key={index}
                        >
                            <p className={classes.questionText}>
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    className={`${
                                        ShowDescription
                                            ? classes.arrowIconDown
                                            : classes.arrowIconLeft
                                    } ${classes.arrowIcon}`}
                                />
                                {item.question}
                            </p>
                            <CSSTransition
                                in={ShowDescription}
                                classNames={classNameShowDescription}
                                mountOnEnter
                                unmountOnExit
                                timeout={300}
                            >
                                <div>
                                    <div className={classes.answer}>
                                        <p>
                                            {
                                                JSON.parse(item.options)[
                                                    props.answersStore[index]
                                                        .answer_id - 1
                                                ].answer
                                            }
                                        </p>
                                    </div>
                                    <div className={classes.description}>
                                        <span>توضیحات:</span>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: item.description
                                            }}
                                        ></p>
                                    </div>
                                </div>
                            </CSSTransition>
                        </div>
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
