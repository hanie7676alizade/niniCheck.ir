import React, { useEffect } from "react";
import { Col, ListGroup } from "react-bootstrap";

import ListItem from "./ListItem";

const List = (props) => {

    const {onFetchList} = props;

    useEffect(() => {
        const id = setTimeout(() => {
           onFetchList();
        }, 100);
        return () => clearTimeout(id);
    }, [onFetchList])
    return (
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
            <ListGroup>
                {
                    props.categories.map((category) => {
                        return <ListItem handleItemDelete={props.handleItemDelete} handleItemEdit={props.handleItemEdit} key={category.id} category={category} />
                    })
                }
            </ListGroup>
        </Col>
    )
}

export default List;