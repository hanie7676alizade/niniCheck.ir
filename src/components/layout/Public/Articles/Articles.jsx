import React from "react"
import { Col, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { stripHtml } from "helpers"

import classes from "scss/Layout/Public/Articles.module.scss"
import { Link } from "react-router-dom"

const Articles = props => {
    return (
        <React.Fragment>
            <Col className={`m-auto ${classes.Articles} `} >
                <Row>
                    <span>پر بازدیدترین ها</span>
                </Row>
                <Row>
                    {
                        props.posts.map((item)=>{
                            return(
                                <Link to={"/" + item.slug} key={item.title} className={`${classes.Article}`}>
                                    <Col>
                                        {" "}
                                        <Row>
                                            <img
                                                src={item.introImage}
                                                alt={`تصویر پست ${item.title}`}
                                                className={classes.introImage}
                                            />
                                        </Row>
                                        <Row>
                                            <h5>{item.title}</h5>
                                        </Row>
                                        <Row>
                                            <p>
                                                {stripHtml(item.content)}
                                            </p>
                                        </Row>
                                        <Row className={classes.RowIcon}>
                                            <FontAwesomeIcon
                                                icon={faArrowLeft}
                                                className={`${classes.arrowIcon}`}
                                            />
                                        </Row>
                                    </Col>
                            </Link>
        
         
                            )
                        })
                    }
                 </Row>
            </Col>
        </React.Fragment>
    )
}


export default Articles;

