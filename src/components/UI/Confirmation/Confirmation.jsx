import React from "react";
import { CSSTransition } from "react-transition-group";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import classes from "scss/UI/Confirmation.module.scss";

const Confirmation = (props) => {
    const classNamesSlide = {
        enter: classes.SlideEnter,
        enterActive: classes.SlideEnterActive,
        exit: classes.SlideExit,
        exitActive: classes.SlideExitActive,
    }

    const classNamesFade = {
        enter: classes.FadeEnter,
        enterActive: classes.FadeEnterActive,
        exit: classes.FadeExit,
        exitActive: classes.FadeExitActive,
    }

    return (
        <React.Fragment>
            <CSSTransition in={props.show} classNames={classNamesFade} mountOnEnter unmountOnExit timeout={300} >
                <div className={classes.Backdrop} onClick={() => props.close()}>

                </div>
            </CSSTransition>
            <CSSTransition in={props.show} classNames={classNamesSlide} mountOnEnter unmountOnExit timeout={300} >
                <div className={[classes.Modal, 'shadow p-3 rounded-lg'].join(' ')}>
                    {props.children}
                    <hr />
                    <div className="d-flex flex-row flex-nowrap justify-content-between">
                        <Button onClick={() => props.confirm()} variant="outline-primary" className="d-flex align-items-center" size="lg"><FontAwesomeIcon fixedWidth icon={faCheck} /></Button>
                        <Button onClick={() => props.close()} variant="outline-danger" className="d-flex align-items-center" size="lg"><FontAwesomeIcon fixedWidth icon={faTimes} /></Button>
                    </div>
                </div>
            </CSSTransition>
        </React.Fragment>
    )
}

export default Confirmation;