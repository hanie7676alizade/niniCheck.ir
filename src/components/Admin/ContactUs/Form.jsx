import React, { Fragment } from "react"
import { Row, Col, Form, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons"
const ContactUsForm = props => {
    let MapInput = props.MapInput
    let MobileNumInput = props.MobileNumInput
    let PhoneNumInput = props.PhoneNumInput
    let AddressInput = props.AddressInput
    const onChangeMapInput = event => {
        MapInput = event.target.value
    }
    const onChangeMobileNumInput = event => {
        MobileNumInput = event.target.value
    }
    const onChangePhoneNumInput = event => {
        PhoneNumInput = event.target.value
    }
    const onChangeAddressInput = event => {
        AddressInput = event.target.value
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.submitHandler({
            MapInput,
            MobileNumInput,
            PhoneNumInput,
            AddressInput
        })
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
                        <Row className="mt-5 mb-2">
                            <Col sm="5">
                                <Form.Group
                                    as={Row}
                                    className="mb-4"
                                    controlId="formLocation"
                                >
                                    <Form.Label column sm="12">
                                        لینک موقعیت مکانی :{" "}
                                    </Form.Label>
                                    <Col sm="12">
                                        <Form.Control
                                            type="text"
                                            placeholder="Map Url"
                                            defaultValue={MapInput}
                                            onChange={event =>
                                                onChangeMapInput(event)
                                            }
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    className="mb-4 "
                                    controlId="formMobileNumber"
                                >
                                    <Form.Label column sm="12">
                                        شماره موبایل :{" "}
                                    </Form.Label>
                                    <Col sm="12">
                                        <Form.Control
                                            type="text"
                                            defaultValue={MobileNumInput}
                                            onChange={event =>
                                                onChangeMobileNumInput(event)
                                            }
                                            placeholder="mobile Number"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    className=" mt-4"
                                    controlId="formPhoneNumber"
                                >
                                    <Form.Label column sm="12">
                                        شماره تلفن :{" "}
                                    </Form.Label>
                                    <Col sm="12">
                                        <Form.Control
                                            type="text"
                                            defaultValue={PhoneNumInput}
                                            onChange={event =>
                                                onChangePhoneNumInput(event)
                                            }
                                            placeholder="phone Number"
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col sm="7">
                                <Row>
                                    <iframe
                                        src={MapInput}
                                        title='your Location'
                                        width="100%"
                                        height="350"
                                        frameBorder="0"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        aria-hidden="false"
                                        tabIndex="0"
                                    ></iframe>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group as={Row} controlId="formAddress">
                                    <Form.Label column sm="12">
                                        {" "}
                                        آدرس :{" "}
                                    </Form.Label>
                                    <Col sm="12">
                                        <Form.Control
                                            type="text"
                                            defaultValue={AddressInput}
                                            onChange={event =>
                                                onChangeAddressInput(event)
                                            }
                                            placeholder="Address"
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
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

export default ContactUsForm
