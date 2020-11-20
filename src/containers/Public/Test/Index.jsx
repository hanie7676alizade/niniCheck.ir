import React, { Component } from "react"
import { connect } from "react-redux"
import { Row, Col } from "react-bootstrap"

import WithLoading from "HOC/WithLoading"
import { setDocumentTitle } from "store/Common/actions"
import classes from "scss/Public/Test.module.scss"
import babySon from "assets/images/baby-is-son.jpg"
import babyDaughter from "assets/images/baby-is-daughter.jpg"
import babyBoy from "../../../assets/images/icons/babyBoy.png"
import babyGirl from "../../../assets/images/icons/babyGirl.png"
import TestRegister from "containers/Public/Test/register"
import TestStep from "containers/Public/Test/Step"
import TestConfirm from "containers/Public/Test/Confirm"
import { setShowAlert, setMessage } from "store/Test/actions"
import Alert from "components/UI/Alert/Alert"
import EndTest from "containers/Public/Test/EndTest/Index"

class Test extends Component {
    internalAlert = null
    componentDidMount() {
        this.props.onChangeDocumentTitle("تست تشخیص جنسیت کودک ")
    }
    componentDidUpdate() {
        if (this.props.showAlert) {
            this.internalAlert = setInterval(() => {
                if (this.props.showAlert) {
                    this.props.onSetShowAlert(false)
                }
            }, 3500)
        } else {
            clearInterval(this.internalAlert)
        }
    }
    renderStepsComponent = () => {
        if (this.props.StepStore === -1) {
            return <TestRegister />
        } else if (this.props.StepStore === 0) {
            return <TestConfirm />
        } else if (this.props.StepStore > 0) {
            if (
                this.props.StepStore > this.props.questionStore.length &&
                this.props.questionStore.length > 1
            ) {
                return <EndTest />
            }
            return <TestStep />
        }
    }
    handleStepNumber = () => {
        switch (this.props.StepStore) {
            case -1:
                return "-"
            case 0:
                return "-"
            default:
                return this.props.StepStore
        }
    }
    onShowModal = () => {
        return (
            <div className={classes.mask}>
                <div className={classes.Modal}>
                    <div className={classes.sidesContainer}>
                        <img
                            src={babyDaughter}
                            className={classes.imgBaby}
                            alt={`daughter`}
                        />
                    </div>
                    <div className={classes.sidesContainer}>fdf;d;</div>
                </div>
            </div>
        )
    }
    render() {
        const alert = (
            <Alert
                type={this.props.messageType}
                show={this.props.showAlert}
                message={this.props.message}
            />
        )
        return (
            <WithLoading>
                {this.props.showModal ? this.onShowModal() : null}

                <div className={classes.TestPage}>
                    {alert}
                    <Row>
                        <Col lg={3}>
                            <img
                                className={classes.babyIcon}
                                src={babyBoy}
                                alt="babyBoy"
                            />
                        </Col>
                        <Col lg={6}>
                            <h2>نی نی من دختره یا پسر؟</h2>
                            {this.props.questionStore.length > 0 ? (
                                <div className={classes.circle}>
                                    {this.handleStepNumber()}
                                </div>
                            ) : null}
                            {this.props.questionStore.length === 0 ? null : (
                                <p>
                                    از
                                    {this.props.questionStore.length}
                                </p>
                            )}
                        </Col>
                        <Col lg={3}>
                            <img
                                className={classes.babyIcon}
                                src={babyGirl}
                                alt="babyGirl"
                            />
                        </Col>
                    </Row>
                    <Row>{this.renderStepsComponent()}</Row>
                </div>
            </WithLoading>
        )
    }
}
const mapStatesToProps = state => {
    return {
        StepStore: state.Test.step,
        message: state.Test.message,
        showAlert: state.Test.showAlert,
        questionStore: state.Test.question,
        messageType: state.Test.messageType,
        showModal: state.Test.showModal
    }
}
const mapActionsToProps = dispatch => {
    return {
        onChangeDocumentTitle: text => dispatch(setDocumentTitle(text)),
        onSetMessage: data => dispatch(setMessage(data)),
        onSetShowAlert: data => dispatch(setShowAlert(data))
    }
}
export default connect(mapStatesToProps, mapActionsToProps)(Test)
