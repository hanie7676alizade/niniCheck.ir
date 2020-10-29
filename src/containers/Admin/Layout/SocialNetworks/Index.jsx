import React from "react";
import { connect } from "react-redux";
import { Row, Col, ListGroup, Card } from "react-bootstrap";

import { setDocumentTitle } from "store/Common/actions";
import { initiateFetchAll, saveItem, setMessage, setItems, setIsSaved, setShowAlert } from "store/SocialNetwork/actions";
import WithLoading from "HOC/WithLoading";
import withCommonError from "HOC/withCommonError";
import { addAxiosAuthorization } from "helpers";
import ListItem from "components/Admin/SocialNetwork/ListItem"
import Alert from "components/UI/Alert/Message";


class SocialNetworks extends React.Component {

    state = {
        submitTimeout: null,
    }

    componentDidMount() {
        this.props.onChangeDocumentTitle();
        addAxiosAuthorization();
        setTimeout(() => {
            this.props.onFetchAll();
        }, 100);
    }

    handleLinkChange = (value, id) => {
        this.props.onSetItems(
            [
                ...this.props.items.map((item) => {
                    if (item.id === id){
                        item.link = value;
                    }
                    return item;
                })
            ]
        )
        clearTimeout(this.state.submitTimeout);
        const submitTimeout = setTimeout(() => {
            const item = this.props.items.filter((item) => item.id === id)[0];
            this.props.onSetMessage(`لینک شبکه ${item.name} به روزرسانی شد.`);
            this.props.onSave(value, id);
        }, 800)
        this.setState({
            submitTimeout
        });
    }

    componentDidUpdate(){
        if(this.props.isSaved){
            setTimeout(() => {
                this.props.onSetShowAlert(false);
                this.props.onSetIsSaved(false);
            }, 3300);
        }
    }

    render() {
        const alert = <Alert type="Success" show={this.props.showAlert} message={this.props.message} />

        return (
            <WithLoading>
                {alert}
                <Row>
                    <Col xs={12} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                        <Card className="shadow-lg">
                            <Card.Header>ویرایش لینک شبکه&zwnj;های اجتماعی</Card.Header>
                            <Card.Body className="p-0">
                                <ListGroup>
                                    {this.props.items.map((item) => {
                                        return (
                                            <ListItem linkChangeHandler={this.handleLinkChange} item={item}></ListItem>
                                        )
                                    })}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </WithLoading>
        );
    }
}

const mapStatesToProps = ((state) => {
    return {
        items: state.SocialNetwork.socialNetworks,
        showAlert: state.SocialNetwork.showAlert,
        message: state.SocialNetwork.message,
        isSaved: state.SocialNetwork.isSaved,
    }
})

const mapActionsToProps = ((dispatch) => {
    return {
        onChangeDocumentTitle: () => dispatch(setDocumentTitle('شبکه های اجتماعی')),
        onFetchAll: () => dispatch(initiateFetchAll()),
        onSave: (link, id) => dispatch(saveItem(link, id)),
        onSetItems: (items) => dispatch(setItems(items)),
        onSetMessage: (message) => dispatch(setMessage(message)),
        onSetIsSaved: (state) => dispatch(setIsSaved(state)),
        onSetShowAlert: (state) => dispatch(setShowAlert(state)),
    }
})

export default connect(mapStatesToProps, mapActionsToProps)(withCommonError(SocialNetworks));