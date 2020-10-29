import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import classes from "scss/UI/ComponentLoading.module.scss";

const ComponentLoading = () => {
    return <div className={classes.Wrapper}>
        <div className={classes.Inner}><FontAwesomeIcon icon={faSpinner} spin size="3x" /></div>
    </div>
}

export default ComponentLoading;