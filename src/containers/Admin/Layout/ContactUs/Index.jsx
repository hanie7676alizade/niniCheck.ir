import React from "react"
import { connect } from "react-redux"
import { Row, Col, Card } from "react-bootstrap"

import {
    initiateFetchConfig,
    saveConfig,
    setConfig
} from "store/Config/actions"
import { setDocumentTitle } from "store/Common/actions"
import WithLoading from "HOC/WithLoading"
import withCommonError from "HOC/withCommonError"
import { addAxiosAuthorization } from "helpers"
import ContactUsForm from "components/Admin/ContactUs/Form"
import Alert from "components/UI/Alert/Message"
import { getSectionData } from "helpers"
import {
    setMessage,
    setIsSaved,
    setShowAlert
} from "store/Config/actions"

class ContactUs extends React.Component {
    MapInput = ""
    MobileNumInput = ""
    PhoneNumInput = ""
    AddressInput = ""

    state = {
        config: [],
        MapInput: "",
        MobileNumInput: "",
        PhoneNumInput: "",
        AddressInput: ""
    }

    handleSubmit = Contactdata => {
        let config = [
            {
                key: "contact.mobile",
                value: Contactdata.MobileNumInput
            },
            {
                key: "contact.phone",
                value: Contactdata.PhoneNumInput
            },
            {
                key: "contact.address",
                value: Contactdata.AddressInput
            },
            {
                key: "contact.mapUrl",
                value: Contactdata.MapInput
            }
        ]
        this.props.onSetConfig(config)
        this.props.onSaveConfig(config)
        this.setState(oldState => ({
            ...oldState,
            config
        }))
        
        this.props.onSetMessage(`به روزرسانی شد`)
        this.props.onSetShowAlert(true)
        this.props.onSetIsSaved(true)
    }

    componentDidMount() {
        addAxiosAuthorization()
        this.props.onChangeDocumentTitle()
        this.props.onFetchConfig("contact")
    }

    componentDidUpdate() {
        if (this.props.isSaved) {
            setTimeout(() => {
                this.props.onSetShowAlert(false)
                this.props.onSetIsSaved(false)
            }, 2500)
        }
    }

    setInputForm = () => {
        this.MapInput = getSectionData(this.props.dataStore, "contact.mapUrl")
        this.MobileNumInput = getSectionData(
            this.props.dataStore,
            "contact.mobile"
        )
        this.PhoneNumInput = getSectionData(
            this.props.dataStore,
            "contact.phone"
        )
        this.AddressInput = getSectionData(
            this.props.dataStore,
            "contact.address"
        )
    }

    render() {
        this.setInputForm()
        const alert = (
            <Alert
                type="Success"
                show={this.props.showAlert}
                message={this.props.message}
            />
        )
        
        return (
            <WithLoading>
                {alert}
                <Row>
                    <Col
                        xs={12}
                        md={{ span: 8, offset: 2 }}
                        lg={{ span: 10, offset: 1 }}
                    >
                        <Card className="shadow-lg">
                            <Card.Header>ویرایش ارتباط با ما</Card.Header>
                            <Card.Body className="p-0">
                                <ContactUsForm
                                    submitHandler={this.handleSubmit}
                                    loading={this.props.loading}
                                    dataStore={this.props.dataStore}
                                    MapInput={this.MapInput}
                                    MobileNumInput={this.MobileNumInput}
                                    PhoneNumInput={this.PhoneNumInput}
                                    AddressInput={this.AddressInput}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </WithLoading>
        )
    }
}

const mapStatesToProps = state => {
    return {
        loading: state.Config.loading,
        dataStore: state.Config.config,
        showAlert: state.Config.showAlert,
        message: state.Config.message,
        isSaved: state.Config.isSaved,
    }
}

const mapActionsToProps = dispatch => {
    return {
        onChangeDocumentTitle: () => dispatch(setDocumentTitle("ارتباط با ما")),
        onFetchConfig: section => dispatch(initiateFetchConfig(section)),
        onSaveConfig: data => dispatch(saveConfig(data)),
        onSetConfig: data => dispatch(setConfig(data)),
        onSetMessage: message => dispatch(setMessage(message)),
        onSetIsSaved: state => dispatch(setIsSaved(state)),
        onSetShowAlert: state => dispatch(setShowAlert(state)),
    }
}

export default connect(
    mapStatesToProps,
    mapActionsToProps
)(withCommonError(ContactUs))
