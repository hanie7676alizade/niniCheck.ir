import React, { useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import { connect } from "react-redux"

import classes from "scss/Public/Test.module.scss"
import babyBoy from "../../../assets/images/icons/babyBoy.png"
import babyGirl from "../../../assets/images/icons/babyGirl.png"

const TestHeader = props => {
    var DoneStep
    useEffect(() => {
        DoneStep = document.getElementById("done")
        if (DoneStep) {
            let newWidth = Math.round(
                (100 / props.questionStore.length) * props.stepStore - 1
            )
            DoneStep.style.width = `${newWidth}%`
        }
    })
    const handleStepNumber = () => {
        switch (props.stepStore) {
            case -1:
                return "-"
            case 0:
                return "-"
            default:
                if (props.stepStore > props.questionStore.length) return "-"
                return props.stepStore
        }
    }
    return (
        <Row className={classes.TestHeader}>
            <h2>نی نی من دختره یا پسر؟</h2>
            <Col lg={3} sm={3} xs={4}>
                <img className={classes.babyIcon} src={babyBoy} alt="babyBoy" />
            </Col>
            <Col lg={6} sm={6} xs={4}>
                {props.questionStore.length === 0 ? null : (
                    <div className={classes.allSteps}>
                        <div
                            id="done"
                            className={` done ${classes.done}`}
                        ></div>
                    </div>
                )}

                {/* in mobile */}
                {/* {props.questionStore.length > 0 ? (
                    <div className={classes.circle}>{handleStepNumber()}</div>
                ) : null}
                {props.questionStore.length === 0 ? null : (
                    <p>
                        از
                        {props.questionStore.length}
                    </p>
                )} */}
            </Col>
            <Col lg={3} sm={3} xs={4}>
                <img
                    className={classes.babyIcon}
                    src={babyGirl}
                    alt="babyGirl"
                />
            </Col>
        </Row>
    )
}
const mapStatesToProps = state => {
    return {
        stepStore: state.Test.step
    }
}

export default connect(mapStatesToProps)(TestHeader)
