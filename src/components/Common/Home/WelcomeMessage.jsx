import React from "react"
import { Col } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

import classes from "scss/Public/Home.module.scss"

const WelcomeMessage = props => {
    return (
        <React.Fragment>
            <Col className={`${classes.WelcomeMessage} shadow z-depth-5`}>
                <FontAwesomeIcon
                    icon={faQuoteRight}
                    className={classes.lgIcon}
                />
                <h4>به نی نی چک خوش آمدید</h4>
                <p>{props.AboutIntro}</p>
                <Link to="/about-us">درباره ما</Link>
            </Col>
        </React.Fragment>
    )
}

export default WelcomeMessage
