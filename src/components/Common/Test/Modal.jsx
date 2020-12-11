import React, { useState } from "react"
import { Form, Col, Row } from "react-bootstrap"
import { connect } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faEdit } from "@fortawesome/free-regular-svg-icons"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import {
    faWhatsapp,
    faTelegramPlane,
    faInstagram
} from "@fortawesome/free-brands-svg-icons"

import classes from "scss/Public/Test.module.scss"
import { setShowModal } from "store/Test/actions"
import babySon from "assets/images/baby-is-son.jpg"
import babyDaughter from "assets/images/baby-is-daughter.jpg"

const TestModal = props => {
    const [CustomerText, setCustomerText] = useState("")
    const SocialNetworkList = [
        {
            name: "WhatsApp",
            link: `whatsapp://send?text=${CustomerText}`,
            iconName: faWhatsapp
        },
        { name: "Instagram", link: `/${CustomerText}`, iconName: faInstagram },
        {
            name: "Email",
            link: `mailto:?subject=I wanted you to see this site&amp;body=Check out this site http://www.website.com.`,
            iconName: faEnvelope
        },
        {
            name: "Telegram",
            link: `tg://msg_url?url=https://valid.url &amp;text=${CustomerText}`,
            iconName: faTelegramPlane
        }
    ]
    const onCloseModal = () => {
        console.log("closeModal")
        props.onSetShowModal(false)
    }
    return (
        <React.Fragment>
            <div className={classes.mask} onClick={onCloseModal}></div>
            <Row className={classes.Modal}>
                <FontAwesomeIcon
                    icon={faTimes}
                    className={classes.closeIcon}
                    onClick={onCloseModal}
                />
                <Col
                    lg={6}
                    xl={6}
                    md={6}
                    xs={12}
                    className={classes.ShareContainer}
                >
                    <Row>
                        <FontAwesomeIcon
                            icon={faEdit}
                            className={classes.editIcon}
                        />
                        <Form.Control
                            as="textarea"
                            placeholder="متنی اضافه کنید"
                            defaultValue={CustomerText}
                            onChange={e => setCustomerText(e.target.value)}
                        />
                        <img
                            src={
                                props.probabilityStore === "male"
                                    ? babySon
                                    : babyDaughter
                            }
                            className={classes.imgBaby}
                            alt={`daughter`}
                        />
                        <span>نتیجه تست را با دوستانتان به اشتراک بگذارید</span>
                        <Col lg={12} md={12} xs={12}>
                            <Row className={classes.SocialNetworkList}>
                                {SocialNetworkList.map((item, index) => {
                                    return (
                                        <Col
                                            lg={6}
                                            className={classes.SocialNetwork}
                                            key={index}
                                        >
                                            <a
                                                href={item.link}
                                                className={`${item.name} `}
                                                title={`Share by ${item.name}`}
                                            >
                                                <p>{item.name}</p>
                                                <FontAwesomeIcon
                                                    icon={item.iconName}
                                                    className={classes.Icon}
                                                />
                                            </a>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col
                    lg={6}
                    xl={6}
                    md={6}
                    sm={12}
                    className={classes.AdContainer}
                >
                    <Row>
                        <span>لینک های پیشنهادی برای شما عزیزان:</span>
                    </Row>
                    <Row>
                        <div className="col-xl-1" />
                        <ul className="col-xl-5 col-lg-6 col-md-6 col-sm-6">
                            <li>
                                <p>محصولات کودک</p>
                            </li>
                            <li>
                                <a href="/">دکوراسیون تخصصی کودک</a>
                            </li>
                            <li>
                                <a href="/">دکوراسیون تخصصی کودک</a>
                            </li>
                            <li>
                                <a href="/">دکوراسیون تخصصی کودک</a>
                            </li>
                            <li>
                                <a href="/">دکوراسیون تخصصی کودک</a>
                            </li>
                        </ul>
                        <ul className="col-xl-5 col-lg-6 col-md-6 col-sm-6">
                            <li>
                                <p>محصولات کودک</p>
                            </li>
                            <li>
                                <a href="/">دکوراسیون تخصصی کودک</a>
                            </li>
                            <li>
                                <a href="/">دکوراسیون تخصصی کودک</a>
                            </li>
                            <li>
                                <a href="/">دکوراسیون تخصصی کودک</a>
                            </li>
                            <li>
                                <a href="/">دکوراسیون تخصصی کودک</a>
                            </li>
                        </ul>
                    </Row>
                    <Row>
                        <div className={classes.AdImage}></div>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    )
}
const mapStatesToProps = state => {
    return {
        probabilityStore: state.Test.probability
    }
}

const mapActionToProps = dispatch => {
    return {
        onSetShowModal: data => dispatch(setShowModal(data))
    }
}
export default connect(mapStatesToProps, mapActionToProps)(TestModal)
