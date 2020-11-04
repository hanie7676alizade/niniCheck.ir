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
import TestConfirm from     'containers/Public/Test/Confirm';

class Test extends Component {
    componentDidMount() {
        this.props.onChangeDocumentTitle("تست تشخیص جنسیت کودک ")
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
                        <div className={classes.circle}>
                            1
                        </div>
                        <p>
                            از 28
                        </p>
                    </Col>
                    <Col lg={3}>
                        <img src={babyGirl} alt="babyGirl" />
                    </Col>
                </Row>
                <Row>
                    {/* <TestStep/> */}
                    {/* <TestRegister/> */}
                    <TestConfirm/>
                </Row>
            </div>
        )
    }
}

const mapStatesToProps = state => {
    return {}
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
