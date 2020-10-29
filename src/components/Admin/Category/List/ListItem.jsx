import React from "react";
import { ListGroup, Button, OverlayTrigger, Tooltip, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'


const ListItem = (props) => {
    return (
        <ListGroup.Item
            className="d-flex flex-row flex-nowrap justify-content-between align-items-center"
        >
            {props.category.name}
            <div>
                <ButtonGroup>
                    <OverlayTrigger placement="top" overlay={
                        <Tooltip id={`tooltip-${props.category.name}-delete`}>
                            <span>حذف</span>
                        </Tooltip>
                    }>
                        <Button variant="outline-danger" onClick={() => props.handleItemDelete(props.category.id)} size="sm"><FontAwesomeIcon icon={faTrash} /></Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={
                        <Tooltip id={`tooltip-${props.category.name}-delete`}>
                            <span>ویرایش</span>
                        </Tooltip>
                    }>
                        <Button variant="outline-warning" onClick={() => props.handleItemEdit(props.category.id)} size="sm"><FontAwesomeIcon icon={faEdit} /></Button>
                    </OverlayTrigger>
                </ButtonGroup>
            </div>
        </ListGroup.Item>
    )
}

export default ListItem;