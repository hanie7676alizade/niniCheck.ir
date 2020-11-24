import React, { Component } from "react"
import { connect } from "react-redux"
import { Row, Col } from "react-bootstrap"

import WithLoading from "HOC/WithLoading"
import { setDocumentTitle } from "store/Common/actions"
import classes from "scss/Public/Test.module.scss"
import TestRegister from "components/Common/Test/register"
import TestStep from "components/Common/Test/Step"
import TestConfirm from "components/Common/Test/Confirm"
import TestModal from "components/Common/Test/Modal"
import { setShowAlert, setMessage } from "store/Test/actions"
import Alert from "components/UI/Alert/Alert"
import EndTest from "components/Common/Test/EndTest/Index"
import TestHeader from "components/Common/Test/TestHeader"
import Steper from "components/Common/Test/Steper"

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

    onShowModal = () => {
        if (this.props.showModal) {
            return <TestModal />
        }
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
                {this.onShowModal()}
                <Steper/>
                <Col  className={`${classes.TestPage}`}>
                    {alert}
                    <TestHeader questionStore={this.props.questionStore} />
                    <Row>{this.renderStepsComponent()}</Row>
                </Col>
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
