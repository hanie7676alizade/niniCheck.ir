import React, { useEffect, useRef } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'


const CategoryForm = (props) => {

    const { onSetError } = props;
    const nameInputRef = useRef(null);
    useEffect(() => {
        onSetError({});
        nameInputRef.current.focus()
    }, [onSetError])
    let btnIcon = <FontAwesomeIcon icon={faCheck} className="mr-2" />;
    if (props.loading) {
        btnIcon = <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />;
    }
    let cancelIcon = <FontAwesomeIcon icon={faTimes} className="mr-2" />;
    if (props.loading) {
        cancelIcon = <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.submitHandler()
    }

    let btnLabel = "افزودن";
    if (props.editMode)
        btnLabel = "ویرایش";

    let cardLabel = <span>دسته&zwnj;بندی جدید</span>;
    if (props.editMode)
        cardLabel = <span>ویرایش دسته&zwnj;بندی</span>;

    return (
        <Row className={["d-flex", 'flex-column', 'justify-content-center', 'py-3'].join(' ')}>
            <Col md={{ span: 8, offset: 2 }} lg={{ span: 4, offset: 4 }}>
                <Card className="shadow-lg">
                    <Card.Header>{cardLabel}</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Control ref={nameInputRef} onChange={(event) => props.nameChangedHandler(event.target.value)} isInvalid={props.errors.name} value={props.category.name} type="text" placeholder="نام..." />
                                <Form.Control.Feedback type="invalid">
                                    {props.errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mt-5">
                                <Button type="submit" disabled={props.loading} block variant="outline-success">
                                    {btnLabel}
                                    {btnIcon}
                                </Button>
                            </Form.Group>
                            <Form.Group>
                                <Button type="button" onClick={() => props.cancel()} disabled={props.loading} block variant="outline-danger">
                                    انصراف
                                        {cancelIcon}
                                </Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}


export default CategoryForm;
