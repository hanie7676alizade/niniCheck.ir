import React, { Component } from "react"
import { Row, Col, Card } from "react-bootstrap"
import { connect } from "react-redux"

import { getSectionData } from "helpers"
import { initiateFetchConfig } from "store/Config/actions"
import { setDocumentTitle } from "store/Common/actions"
import withCommonError from "HOC/withCommonError"
import classes from "scss/Public/ContactUs.module.scss"

class ContactUs extends Component {
    MapInput = ""
    MobileNumInput = ""
    PhoneNumInput = ""
    AddressInput = ""

    setInputForm = () => {
        this.MapInput = getSectionData(this.props.ConfigStore, "contact.mapUrl")
        this.MobileNumInput = getSectionData(
            this.props.ConfigStore,
            "contact.mobile"
        )
        this.PhoneNumInput = getSectionData(
            this.props.ConfigStore,
            "contact.phone"
        )
        this.AddressInput = getSectionData(
            this.props.ConfigStore,
            "contact.address"
        )
    }
    componentDidMount() {
        this.props.onChangeDocumentTitle("ارتباط با ما")
    }
    render() {
        this.setInputForm()
        return (
            <div className={classes.ContactUsPage}>
                <Col xs={12} md={10} lg={8} className="m-auto">
                    <Card className="shadow-sm ">
                        <Card.Body className="p-1">
                            <iframe
                                src={this.MapInput}
                                title='موقعیت مکانی'
                                width="100%"
                                height="350"
                                frameBorder="0"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                                ConfigStore
                            ></iframe>
                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <span>شماره تماس : </span>
                                    <p>
                                        {" "}
                                        {this.MobileNumInput} -{" "}
                                        {this.PhoneNumInput}{" "}
                                    </p>
                                </Col>
                                <Col lg={12} md={12} sm={12}>
                                    <span> آدرس:</span>
                                    <p> {this.AddressInput} </p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        )
    }
}

const mapStatesToProps = state => {
    return {
        loading: state.Config.loading,
        ConfigStore: state.PublicLayout.config
    }
}

const mapActionsToProps = dispatch => {
    return {
        onChangeDocumentTitle: text => dispatch(setDocumentTitle(text)),
        onFetchConfig: section => dispatch(initiateFetchConfig(section))
    }
}

export default connect(
    mapStatesToProps,
    mapActionsToProps
)(withCommonError(ContactUs))
