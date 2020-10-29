import React from "react";
import { ListGroup, Button, OverlayTrigger, Tooltip, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'


const ListItem = (props ) => {
    return (
        <ListGroup.Item
            className="d-flex flex-row flex-nowrap justify-content-between align-items-center"
        >
            <div className="media">
                {
                    props.post.introImage && (
                        <img src={props.post.introImage} className="align-self-center ml-3" alt={"تصویر معرف - " + props.post.title} width="75"/>
                    )
                }
                
                <div className="media-body">
                    <h6 className="mt-0">{props.post.title}</h6>
                    <small>({props.post.Category.name})</small>
                </div>
            </div>
            <div>
                <ButtonGroup>
                    <OverlayTrigger placement="top" overlay={
                        <Tooltip id={`tooltip-${props.post.title}-delete`}>
                            <span>حذف</span>
                        </Tooltip>
                    }>
                        <Button variant="outline-danger" onClick={() => props.handleItemDelete(props.post.id)} size="sm"><FontAwesomeIcon icon={faTrash} /></Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={
                        <Tooltip id={`tooltip-${props.post.title}-delete`}>
                            <span>ویرایش</span>
                        </Tooltip>
                    }>
                        <Button variant="outline-warning" onClick={() => props.handleItemEdit(props.post.id)} size="sm"><FontAwesomeIcon icon={faEdit} /></Button>
                    </OverlayTrigger>
                </ButtonGroup>
            </div>
        </ListGroup.Item>
    )
}

export default ListItem;