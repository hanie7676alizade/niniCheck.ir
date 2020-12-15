import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons"

import image from "assets/images/slide.jpg"
import classes from "scss/Public/Home.module.scss"
import WelcomeMessage from "components/Common/Home/WelcomeMessage"

const Slide = props => {
    var slide = null
    // if (window.innerWidth > 768) {
        slide = (
            <div className={classes.SlideImage}>
                <img src={image} alt="Slide" />
            </div>
        )
    // }
    return (
        <React.Fragment>
            {slide}
            <WelcomeMessage  AboutIntro={props.AboutIntro}/>
            <FontAwesomeIcon
                icon={faArrowCircleDown}
                onClick={() => props.handleScroll()}
                className={classes.flashIcon}
            />
        </React.Fragment>
    )
}
export default Slide
