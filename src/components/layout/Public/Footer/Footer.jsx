import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons"
import { connect } from "react-redux"
import { Col, Button, Form } from "react-bootstrap"
import { NavLink } from "react-router-dom"

import classes from "scss/Layout/Public/Footer.module.scss"
import SocialNetwork from "components/layout/Public/Header/SocialNetwork"
import { saveEmail } from "../../../../store/NewsLetter/actions"

const Footer = props => {
    const [EmailInput, setEmailInput] = useState("")
    const handleSendEmail = e => {
        e.preventDefault()
        props.onSaveEmail(EmailInput)
        setEmailInput("")
    }

    return (
        <div className={classes.FooterMainWrapper}>
            <div className={classes.SubFooter}>
                <div className="row">
                    <Col
                        md="12"
                        lg="6"
                        xl="7"
                        className={[
                            classes.FooterQuickAccess,
                            "d-flex flex-row justify-content-between"
                        ].join(" ")}
                    >
                        <div className={classes.FooterColums}>
                            <h4>نی نی چک</h4>
                            <ul>
                                <li>
                                    <NavLink to="/">صفحه نخست</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/blog">بلاگ</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/">درباره ما</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/">تماس با ما</NavLink>
                                </li>
                            </ul>
                        </div>
                        {props.posts.length ? (
                            <div className={classes.FooterColums}>
                                <h4>مقالات پر بازدید</h4>
                                <ul>
                                    {props.posts.map(item => (
                                        <li key={item.id}>
                                            <NavLink to={"/" + item.slug}>
                                                {item.title}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                        {props.socialNetworks.length ? (
                            <div className={classes.FooterColums}>
                                <h4>شبکه&zwnj;های اجتماعی</h4>
                                <SocialNetwork
                                    socialNetworks={props.socialNetworks}
                                    className={classes.SocialNetwork}
                                />
                            </div>
                        ) : null}
                    </Col>
                    <Col
                        md="12"
                        lg="5"
                        xl="4"
                        className={[classes.FooterNewsletter, "shadow"].join(
                            " "
                        )}
                    >
                        <FontAwesomeIcon
                            icon={faQuoteLeft}
                            size="3x"
                            className={classes.Quote}
                        />
                        <h4>خبرنامه</h4>
                        <p>ما جدیدترین خبرها را به شما اطلاع میدهیم</p>
                        <div
                            className={[
                                "d-flex flex-row justify-content-between", classes.formWrapper
                            ].join(" ")}
                        >
                            <Form
                                onSubmit={e => {
                                    handleSendEmail(e)
                                }}
                            >
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control
                                        className="EmailInput"
                                        value={EmailInput}
                                        onChange={e => {
                                            setEmailInput(e.target.value)
                                        }}
                                        type="text"
                                        placeholder="آدرس ایمیل خود را وارد کنید"
                                    />
                                   
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    ارسال
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </div>
            </div>
            <div
                className={[
                    classes.Copyright,
                    "d-flex justify-content-center align-items-center"
                ].join(" ")}
            >
                <p>تمامی حقوق محفوظ و متعلق به این سایت می&zwnj;باشد</p>
            </div>
        </div>
    )
}

const mapStatesToProps = state => {
    return {
        socialNetworks: state.PublicLayout.socialNetworks,
        posts: state.PublicLayout.posts,
        isSaveEmail: state.NewsLetter.isSave,
        messageErr:state.NewsLetter.message
    }
}

const mapActionsToProps = dispatch => {
    return {
        onSaveEmail: email => dispatch(saveEmail(email)),
    }
}

export default connect(mapStatesToProps, mapActionsToProps)(Footer)
