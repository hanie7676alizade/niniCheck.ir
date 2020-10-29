import React from "react"
import { Col, Row, Button } from "react-bootstrap"

import babyBoy from "../../../assets/images/icons/babyBoy.png"
import babyGirl from "../../../assets/images/icons/babyGirl.png"
import mad from "../../../assets/images/mad.png"
import classes from "scss/Public/Home.module.scss"

const StartTest = () => (
    <React.Fragment>
        <Row className={`${classes.StartTest} m-auto `} name="startTest">
            <img
                src={babyBoy}
                className={classes.LeftSideIcon}
                alt="babyIcon"
            />

            <Col className={`${classes.StartTest} m-auto `}>
                <Row>
                    <Col>
                        <h6>
                            با انجام این تست جنسیت و بارداری کودک خود را مشخص
                            کنید
                        </h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" size="lg">
                            شروع تست
                        </Button>
                    </Col>
                </Row>
                <Row>
                   <Col>
                        <img className={classes.madImage} src={mad} alt="madIcone"/>
                   </Col>
                </Row>
                <Row>
                    <Col>
                        <p>نتیجه تست را با دوستانتان به اشتراک بگذارید</p>
                    </Col>
                </Row>
            </Col>

            <img
                src={babyGirl}
                className={classes.RightSideIcon}
                alt="babyIcon"
            />
        </Row>
    </React.Fragment>
)

export default StartTest
