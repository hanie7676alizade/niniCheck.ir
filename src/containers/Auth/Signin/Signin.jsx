import React, { Component } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'

import * as authActions from "store/Auth/actions";
import withCommonError from "HOC/withCommonError";
import classes from "scss/Auth/Login.module.scss";
import withMessage from "HOC/withMessage";

class Login extends Component {
    state = {
        user: {
            username: "admin",
            password: "admin",
        },
    }

    componentWillUnmount() {
        this.props.onSetError({});
    }

    render() {
        let redirect = null;
        if (this.props.auth && this.props.auth.check) {
            redirect = <Redirect to={{
                pathname: "/admin",
                state: {
                    message: { text: `${this.props.auth.user.name} عزیز خوش آمدید.`, type: 'Success' }
                }
            }} />;
        }

        let btnIcon = <FontAwesomeIcon icon={faCheck} className="mr-2" />;
        if (this.props.loading) {
            btnIcon = <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />;
        }

        return (
                <Row className={[classes.FloodHeight, "d-flex", 'flex-column', 'justify-content-center', 'py-3'].join(' ')}>
                    {redirect}
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card className="mx-auto shadow-lg" style={{ width: "18rem" }}>
                            <Card.Body>
                                <Form onSubmit={this.submitHandler}>
                                    <Form.Group>
                                        <Form.Control onChange={this.usernameChangedHandler} isInvalid={this.props.errors.username} value={this.state.user.username} type="text" placeholder="نام کاربری..." />
                                        <Form.Control.Feedback type="invalid">
                                            {this.props.errors.username}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control onChange={this.passwordChangedHandler} isInvalid={this.props.errors.password} value={this.state.user.password} type="password" placeholder="گذرواژه..." />
                                        <Form.Control.Feedback type="invalid">
                                            {this.props.errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-5">
                                        <Button type="submit" disabled={this.props.loading} block variant="outline-success">
                                            ورود
                                        {btnIcon}
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
        );
    }

    usernameChangedHandler = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                username: event.target.value
            }
        });
    }

    passwordChangedHandler = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                password: event.target.value
            }
        });
    }

    submitHandler = (event) => {
        event.preventDefault();

        const userData = {
            username: this.state.user.username,
            password: this.state.user.password,
        };

        this.props.onSignin(userData);
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.Auth.auth,
        errors: state.Auth.signinErrors,
        loading: state.Auth.loading
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        onSignin: (userData) => dispatch(authActions.signin(userData)),
        onSetError: (error) => dispatch(authActions.signinSetError(error))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(withCommonError(withMessage(Login)));
