import React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux"
import { Form, Button } from "react-bootstrap";

import { setDocumentTitle } from "store/Common/actions"

class Index extends React.Component {

    componentDidMount(){
        this.props.onChangeDocumentTitle();
    }

    render() {
        let redirect = null;
        if (!this.props.auth || !this.props.auth.check)
            redirect = <Redirect to={{
                pathname: "/admin/signin",
                state: {
                    message: { text: `لطفا ابتدا وارد شوید`, type: 'Info' }
                }
            }} />
        return (
            <React.Fragment>
                {redirect}
                <Form.Group>
                    <Form.Label>شماره موبایل</Form.Label>
                    <Form.Control value={'09393929239'} />
                </Form.Group>
                <Button variant="outline-primary">ارسال</Button>
            </React.Fragment>
        );
    }
}

const mapStatesToProps = (state) => {
    return {
        auth: state.Auth.auth
    }
}

const mapActionsToProps = ((dispatch) => {
    return {
        onChangeDocumentTitle: () => dispatch(setDocumentTitle('داشبورد'))
    }
})

export default connect(mapStatesToProps, mapActionsToProps)(Index);