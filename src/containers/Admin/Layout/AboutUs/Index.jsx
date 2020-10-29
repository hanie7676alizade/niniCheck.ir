import React from "react"
import { connect } from "react-redux"
import { Row, Col, ListGroup, Card } from "react-bootstrap"

import {
    initiateFetchConfig,
    saveConfig,
    setConfig
} from "store/Config/actions"
import { setDocumentTitle } from "store/Common/actions"
import {
    setMessage,
    setIsSaved,
    setShowAlert
} from "store/Config/actions"
import WithLoading from "HOC/WithLoading"
import withCommonError from "HOC/withCommonError"
import { addAxiosAuthorization } from "helpers"
import AboutUsForm from "components/Admin/AboutUs/Form"
import Alert from "components/UI/Alert/Message"
import { getSectionData } from "helpers"

class AboutUs extends React.Component {
    AboutIntro = ""
    AboutHtml = ""

    state = {
        config: [],
        aboutIntro: "",
        aboutHtml: ""
    }

    handleSubmit = Aboutdata => {
        let config = [
            {
                key: "about.html",
                value: Aboutdata.aboutHtml ? Aboutdata.aboutHtml : ""
            },
            {
                key: "about.intro",
                value: Aboutdata.aboutIntro
            }
        ]
        this.props.onSetConfig(config)
        this.props.onSaveConfig(config)
        this.props.onSetMessage(`به روزرسانی شد`)
        this.props.onSetShowAlert(true)
        this.props.onSetIsSaved(true)
    }

    componentDidMount() {
        addAxiosAuthorization()
        this.props.onChangeDocumentTitle()
        this.props.onFetchConfig("about")
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
        this.AboutIntro = getSectionData(this.props.dataStore, "about.intro")
        this.AboutHtml = getSectionData(this.props.dataStore, "about.html")
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
                            <Card.Header>
                                ویرایش متن درباره&zwnj;ی ما
                            </Card.Header>
                            <Card.Body className="p-0">
                                <ListGroup>
                                    <AboutUsForm
                                        submitHandler={this.handleSubmit}
                                        loading={this.props.loading}
                                        dataStore={this.props.dataStore}
                                        // onSetConfig={this.props.onSetConfig}
                                        AboutHtml={this.AboutHtml}
                                        AboutIntro={this.AboutIntro}
                                    />
                                </ListGroup>
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
        isSaved: state.Config.isSaved
    }
}

const mapActionsToProps = dispatch => {
    return {
        onChangeDocumentTitle: () => dispatch(setDocumentTitle("درباره ما")),
        onFetchConfig: section => dispatch(initiateFetchConfig(section)),
        onSaveConfig: data => dispatch(saveConfig(data)),
        onSetConfig: data => dispatch(setConfig(data)),
        onSetMessage: message => dispatch(setMessage(message)),
        onSetIsSaved: state => dispatch(setIsSaved(state)),
        onSetShowAlert: state => dispatch(setShowAlert(state))
    }
}

export default connect(
    mapStatesToProps,
    mapActionsToProps
)(withCommonError(AboutUs))
