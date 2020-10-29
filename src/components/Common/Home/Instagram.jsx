import React from "react"
import { Col, Row } from "react-bootstrap"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"

import classes from "scss/Public/Home.module.scss"
import teddy from "../../../assets/images/teddy.png"
import instagramMobile from "../../../assets/images/instagramMobile.png"
import { Link } from "react-router-dom"

library.add(fab)

const InstagramC = props => {
    return (
        <React.Fragment>
            <Col className={`${classes.Instagram}`}>
                <Row className={classes.firstBackG}>
                    <Col lg={4} md={4} className={"d-none d-md-block"}>
                        <img
                            src={instagramMobile}
                            alt="instagramMobile"
                            className={classes.instagramMobile}
                        />
                    </Col>
                    <Col lg={4} md={5} sm={12}>
                        <h3>نی نی چک در اینستاگرام</h3>
                        <p>به اینستاگرام ما حتما سر بزنید</p>
                        <FontAwesomeIcon
                            icon={faArrowDown}
                            className={`${classes.lgIcon} ${classes.arrowIcon}`}
                        />
                    </Col>
                    {/* <Col lg={4} md={3} className={"d-none d-md-block"}> */}
                        <img 
                            src={teddy}
                            alt="teddy"
                            className={`d-none d-md-block ${classes.teddyImg}`}
                        />
                    {/* </Col> */}
                </Row>
                <Row>
                    <Col className={classes.secondBackG}>
                        <Row>
                            <Col lg={12}>
                                <p>
                                    <Link to={props.instagramLink}>
                                        <span>Ninicheck</span>
                                        <FontAwesomeIcon
                                            icon={[`fab`, "instagram"]}
                                            className={`${classes.lgIcon} ${classes.instagramIcon}`}
                                        />
                                    </Link>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </React.Fragment>
    )
}
export default InstagramC
