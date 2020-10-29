import React from "react";
import { ListGroup, Form } from "react-bootstrap";

const ListItem = (props) => {
    const handleChangeLink = (value) => {
        props.linkChangeHandler(value, props.item.id);
    }
    return (
        <ListGroup.Item className="d-flex flex-row justify-content-between">
            <span className="align-self-center ml-2">{props.item.name}:</span>
            <Form.Group className="m-0 flex-grow-1">
                <Form.Control
                    type="text"
                    placeholder="لینک..."
                    size="sm"
                    value={props.item.link}
                    onChange={(event) => handleChangeLink(event.target.value)}>
                </Form.Control>
            </Form.Group>
        </ListGroup.Item>
    );
}

export default ListItem;