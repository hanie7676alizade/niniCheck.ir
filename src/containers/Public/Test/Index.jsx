import React, { Component } from "react"
import { connect } from "react-redux"
import { Row, Col } from "react-bootstrap"

import { setDocumentTitle } from "store/Common/actions"
import withCommonError from "HOC/withCommonError"
import classes from "scss/Public/Test.module.scss"
import babyBoy from "../../../assets/images/icons/babyBoy.png"
import babyGirl from "../../../assets/images/icons/babyGirl.png"
import TestRegister from "containers/Public/Test/register"
import TestStep from "containers/Public/Test/Step"
import TestConfirm from "containers/Public/Test/Confirm"
import { CSSTransition } from "react-transition-group"

class Test extends Component {
    componentDidMount() {
        this.props.onChangeDocumentTitle("تست تشخیص جنسیت کودک ")
    }
    renderStepsComponent = () => {
        switch (this.props.StepStore) {
            case -1:
                return <TestRegister />
            case 0:
                return <TestConfirm />
            default:
                return <TestStep Step={this.props.StepStore} />
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
    ChangeStep = {
        enter: classes.enterChangeStep,
        enterActive: classes.enterActiveChangeStep,
        exit: classes.exitChangeStep,
        exitActive: classes.exitActiveChangeStep
    }
    render() {
        return (
            <div className={classes.TestPage}>
                <Row>
                    <Col lg={3}>
                        <img src={babyBoy} alt="babyBoy" />
                    </Col>
                    <Col lg={6}>
                        <h2>نی نی من دختره یا پسر؟</h2>
                        <CSSTransition
                            in={true}
                            mountOnEnter
                            unmountOnExit
                            timeout={{ enter: 300, exit: 150 }}
                        >
                            <div className={classes.circle}>
                                {this.handleStepNumber()}
                            </div>
                        </CSSTransition>
                        <p>از 28</p>
                    </Col>
                    <Col lg={3}>
                        <img src={babyGirl} alt="babyGirl" />
                    </Col>
                </Row>
                <Row>{this.renderStepsComponent()}</Row>
            </div>
        )
    }
}

const mapStatesToProps = state => {
    return {
        StepStore: state.Test.step
    }
}

const mapActionsToProps = dispatch => {
    return {
        onChangeDocumentTitle: text => dispatch(setDocumentTitle(text))
    }
}

export default connect(
    mapStatesToProps,
    mapActionsToProps
)(withCommonError(Test))
