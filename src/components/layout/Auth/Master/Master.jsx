import React from "react";
import classes from "scss/Layout/Auth/Master.module.scss";

const master = (props) => {
    return (
        <main className={[classes.AuthWrapper,'d-flex flex-column justify-content-center align-items-center'].join(' ')}>
            <img src="/images/logo/logo.png" className={classes.Logo} width="150" alt=""/>
            { props.children }
        </main>
    )
}

export default master