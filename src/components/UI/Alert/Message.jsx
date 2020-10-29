import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationTriangle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from "react-transition-group";

import classes from "scss/UI/Alert.module.scss"

const alert = (props) => {
    let icon = faTimesCircle;
    if (props.type === "Success")
        icon = faCheck;
    if (props.type === "Warning")
        icon = faExclamationTriangle;

    const classNames = {
        enter: classes.AlertEnter,
        enterActive: classes.AlertEnterActive,
        exit: classes.AlertExit,
        exitActive: classes.AlertExitActive,
    }
    return (
        <CSSTransition timeout={{ enter: 300, exit: 300 }} in={props.show} mountOnEnter unmountOnExit classNames={classNames}>
            <div className={[classes.Wrapper, classes[props.type]].join(' ')}>
                <FontAwesomeIcon icon={icon} size="2x" className={[classes.Icon, "ml-2",].join(' ')} />
                <h5 className="m-0" dangerouslySetInnerHTML={{ __html: props.message }}></h5>
                {/* <h5 className="m-0">{props.message}</h5> */}
            </div>
        </CSSTransition>
    );
}

export default alert;