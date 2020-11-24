import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { CSSTransition } from "react-transition-group"
import { connect } from "react-redux"

import classes from "scss/Public/Test.module.scss"

const Question = props => {
    const [ShowDescription, setShowDescription] = useState(false)

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
        <div
            className={classes.question}
            onClick={onShowDescription}
            key={props.index}
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
                {props.item.question}
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
                                JSON.parse(props.item.options)[
                                    props.answersStore[props.index].answer_id -
                                        1
                                ].answer
                            }
                        </p>
                    </div>
                    <div className={classes.description}>
                                        <span>توضیحات:</span>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: props.item.description
                                            }}
                                        ></div>
                                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}
const mapStatesToProps = state => {
    return {
        questionStore: state.Test.question,
        answersStore: state.Test.answers
    }
}

export default connect(mapStatesToProps)(Question)
