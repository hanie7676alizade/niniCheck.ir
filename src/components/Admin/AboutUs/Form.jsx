import React, { Fragment } from "react"
import { Row, Col, Form, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons"

import { HTMLEditor } from "components/UI/HTMLEditor"

const AboutUsForm = props => {
    let aboutIntro = props.AboutIntro
    let aboutHtml = props.AboutHtml

    const handleSubmit = e => {
        e.preventDefault()
        props.submitHandler({ aboutHtml, aboutIntro })
    }
    const handleContentChange = (content, editor) => {
        aboutHtml = content
    }
    const changeIntroHandler = event => {
        aboutIntro = event.target.value
    }
    let btnIcon = <FontAwesomeIcon icon={faCheck} className="mr-2" />
    if (props.loading) {
        btnIcon = <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
    }
    let cancelIcon = <FontAwesomeIcon icon={faTimes} className="mr-2" />
    if (props.loading) {
        cancelIcon = <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
    }
    return (
        <Fragment>
            <Row>
                <Col lg={11} className="m-auto">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group
                            className="mt-4"
                            controlId="Form.ControlTextarea1"
                        >
                            <Form.Label>
                                <h6>متن معرفی سایت (صفحه اصلی)</h6>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                defaultValue={props.AboutIntro}
                                onChange={event => changeIntroHandler(event)}
                            />
                        </Form.Group>
                        <h6 className="mt-3">
                            متن صفحه&zwnj;ی درباره&zwnj;ی ما
                        </h6>
                        <div className="mt-2">
                            <HTMLEditor
                                initialValue={props.AboutHtml}
                                contentChangedHandler={handleContentChange}
                            />
                        </div>
                        <Form.Group className="mt-3">
                            <Button
                                type="submit"
                                disabled={props.loading}
                                block
                                variant="outline-success"
                            >
                                ذخیره
                                {btnIcon}
                            </Button>
                        </Form.Group>
                        <Form.Group>
                            <Button
                                type="button"
                                onClick={() => props.cancel()}
                                disabled={props.loading}
                                block
                                variant="outline-danger"
                            >
                                انصراف
                                {cancelIcon}
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Fragment>
    )
}

export default AboutUsForm
