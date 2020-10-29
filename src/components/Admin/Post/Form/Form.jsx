import React, { useEffect, useRef } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from "react-router-dom";

import { HTMLEditor } from "components/UI/HTMLEditor";

const PostForm = (props) => {

    const { onSetError } = props;
    const slugInput = useRef(null)

    useEffect(() => {
        onSetError({})
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

    const handleTitleToSlug = (str) => {
        str = str.replace(/^\s+|\s+$/g, '');

        str = str.toLowerCase();

        str = str.replace(/[^\u0600-\u08FF\u0020\u0021-\u002Fa-z0-9 -]/g, '')
            // Collapse whitespace and replace by -
            .replace(/\s+/g, '-')
            // Collapse dashes
            .replace(/-+/g, '-');

        props.slugChangedHandler(str);
    }

    let btnLabel = "افزودن";
    if (props.editMode)
        btnLabel = "ویرایش";

    let cardLabel = "پست جدید";
    if (props.editMode)
        cardLabel = "ویرایش پست";

    let redirect = null;
    if (!props.categories.length) {
        redirect = <Redirect to={{
            pathname: "/admin/category",
            state: {
                message: { text: `لطفا ابتدا یک دسته بندی اضافه نمایید.`, type: 'Warning' }
            }
        }} />
    }



    return (
        <React.Fragment>
            {redirect}
            <Row className={["d-flex", 'flex-column', 'justify-content-center', 'py-3'].join(' ')}>
                <Col>
                    <Card className="shadow-lg">
                        <Card.Header>{cardLabel}</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Control as="select" custom
                                        onChange={(event) => props.categoryIdChangedHandler(event.target.value)}
                                        isInvalid={props.errors.categoryId} value={props.post.categoryId}
                                        type="text" placeholder="دسته&zwnj;بندی..." >
                                        <option value="">--دسته&zwnj;بندی--</option>
                                        {
                                            props.categories.map((category) => {
                                                return <option value={category.id}>{category.name}</option>
                                            })
                                        }
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {props.errors.categoryId}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control onChange={(event) => {
                                        props.titleChangedHandler(event.target.value);
                                        handleTitleToSlug(event.target.value);
                                    }} isInvalid={props.errors.title}
                                        value={props.post.title} type="text" placeholder="عنوان..." />
                                    <Form.Control.Feedback type="invalid">
                                        {props.errors.title}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control onChange={(event) => props.slugChangedHandler(event.target.value)}
                                        isInvalid={props.errors.slug} ref={slugInput} value={props.post.slug} type="text"
                                        placeholder="متن آدرس..." />
                                    <Form.Control.Feedback type="invalid">
                                        {props.errors.slug}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control onChange={(event) => props.introImageChangedHandler(event.target.value)}
                                        isInvalid={props.errors.introImage} value={props.post.introImage} type="text"
                                        placeholder="تصویر معرف..." />
                                    <Form.Control.Feedback type="invalid">
                                        {props.errors.introImage}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <HTMLEditor
                                initialValue={props.post.content}
                                contentChangedHandler={props.contentChangedHandler}
                                />
                                <Form.Control isInvalid={props.errors.content} value={props.post.content}
                                    style={{ visibility: "hidden" }} />
                                <Form.Control.Feedback type="invalid">
                                    {props.errors.content}
                                </Form.Control.Feedback>
                                <Form.Group className="mt-5">
                                    <Button type="submit" disabled={props.loading} block variant="outline-success">
                                        {btnLabel}
                                        {btnIcon}
                                    </Button>
                                </Form.Group>
                                <Form.Group>
                                    <Button type="button" onClick={() => props.cancel()} disabled={props.loading}
                                        block variant="outline-danger">
                                        انصراف
                                        {cancelIcon}
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}


export default PostForm;
