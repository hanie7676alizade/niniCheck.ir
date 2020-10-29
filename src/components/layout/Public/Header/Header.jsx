import React from "react"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { connect } from "react-redux"
import { Row, Col } from "react-bootstrap"
import { SlideDown } from "react-slidedown"
import moment from "moment-jalaali"
import { CSSTransition } from "react-transition-group"

import classes from "scss/Layout/Public/Header.module.scss"
import * as headerActions from "store/PublicLayout/actions"
import SocialNetwork from "./SocialNetwork"
import Logo from "./Logo"
import Search from "./Search"
import MobileMenu from "./MobileMenu"

moment.loadPersian({ usePersianDigits: true })

class Header extends React.Component {
    state = {
        blogSubmenu: false,
        menuState: false
    }

    componentDidMount() {
        this.props.onFetchHeaderData()
    }

    handelMenuOpen = () => {
        setTimeout(() => {
            this.setState({
                blogSubmenu: true
            })
        }, 100)
    }

    handelMenuClose = () => {
        setTimeout(() => {
            this.setState({
                blogSubmenu: false
            })
        }, 100)
    }

    handleMenuState = () => {
        this.setState(prevState => {
            return { menuState: !prevState.menuState }
        })
    }

    classNamesSlide = {
        enter: classes.SlideEnter,
        enterActive: classes.SlideEnterActive,
        exit: classes.SlideExit,
        exitActive: classes.SlideExitActive
    }

    classNamesFade = {
        enter: classes.FadeEnter,
        enterActive: classes.FadeEnterActive,
        exit: classes.FadeExit,
        exitActive: classes.FadeExitActive
    }

    render() {
        let blog = null
        if (this.props.categories.length) {
            blog = (
                <div
                    className={classes.NavItem}
                    onMouseEnter={() => this.handelMenuOpen()}
                    onMouseLeave={() => this.handelMenuClose()}
                >
                    <NavLink
                        exact
                        activeClassName={classes.Active}
                        className={classes.NavLink}
                        to="/blog"
                    >
                        بلاگ{" "}
                        {/* <FontAwesomeIcon icon={faQuidditch} className="mr-1" /> */}
                        <FontAwesomeIcon icon={faCaretDown} className="mr-3" />
                    </NavLink>
                    <SlideDown
                        className={[
                            classes.Slider,
                            "shadow",
                            "rounded-lg"
                        ].join(" ")}
                    >
                        {this.state.blogSubmenu ? (
                            <div className={classes.Children}>
                                {this.props.categories.map(category => {
                                    return (
                                        <NavLink
                                            key={category.slug}
                                            exact
                                            activeClassName={classes.Active}
                                            className={classes.NavLink}
                                            to={"/blog/" + category.slug}
                                        >
                                            {category.name}
                                        </NavLink>
                                    )
                                })}
                            </div>
                        ) : null}
                    </SlideDown>
                </div>
            )
        }

        const menu = (
            <nav className={classes.Nav}>
                <div className={classes.NavItem}>
                    <NavLink
                        exact
                        activeClassName={classes.Active}
                        className={classes.NavLink}
                        to="/"
                    >
                        صفحه نخست{" "}
                        {/* <FontAwesomeIcon icon={faHome} className="mr-1" /> */}
                    </NavLink>
                </div>
                {blog}
                <div className={classes.NavItem}>
                    <NavLink
                        exact
                        activeClassName={classes.Active}
                        className={classes.NavLink}
                        to="/about-us"
                    >
                        درباره ما{" "}
                        {/* <FontAwesomeIcon icon={faHome} className="mr-1" /> */}
                    </NavLink>
                </div>
                <div className={classes.NavItem}>
                    <NavLink
                        exact
                        activeClassName={classes.Active}
                        className={classes.NavLink}
                        to="/contact-us"
                    >
                        تماس با ما{" "}
                        {/* <FontAwesomeIcon icon={faHome} className="mr-1" /> */}
                    </NavLink>
                </div>
            </nav>
        )

        return (
            <header
                className={[
                    "shadow-sm",
                    classes.Header,
                    this.state.menuState ? classes.MenuOpen : null
                ].join(" ")}
            >
                <div className={classes.TopHeaderWrapper}>
                    <div
                        id="top-header"
                        className={[classes.TopHeader, "nini-container"].join(
                            " "
                        )}
                    >
                        <Row
                            style={{ height: "100%" }}
                            className="py-2 py-0 mx-0 mx-md-n3"
                        >
                            <Col
                                md="4"
                                sm="12"
                                className={[
                                    classes.TopHeaderColumn,
                                    classes.TopHeaderSocialNetwork,
                                    " d-none d-md-block"
                                ].join(" ")}
                            >
                                <SocialNetwork
                                    className={classes.SocialNetwork}
                                    socialNetworks={this.props.socialNetworks}
                                />
                            </Col>
                            <Col
                                md="4"
                                sm="6"
                                className={[
                                    classes.TopHeaderColumn,
                                    classes.TopHeaderLogo
                                ].join(" ")}
                            >
                                <Logo />
                            </Col>
                            <Col
                                md="4"
                                sm="6"
                                className={[
                                    classes.TopHeaderColumn,
                                    classes.TopHeaderSearch
                                ].join(" ")}
                            >
                                <Search />
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="nini-container d-none d-md-block">
                    <div className="d-flex justify-content-between">
                        <div>{menu}</div>
                        <div className="d-flex flex-row align-items-center">
                            <span className={classes.Date}>
                                {moment().format(" jD jMMMM jYYYY ")}
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    className={[
                        classes.MobileMenuToggle,
                        "d-block d-md-none"
                    ].join(" ")}
                >
                    <MobileMenu
                        className={classes.MobileMenuToggle}
                        menuState={this.state.menuState}
                        toggleMenu={this.handleMenuState}
                    />
                </div>
                <React.Fragment>
                    <CSSTransition
                        in={this.state.menuState}
                        classNames={this.classNamesFade}
                        mountOnEnter
                        unmountOnExit
                        timeout={300}
                    >
                        <div
                            className={classes.Backdrop}
                            onClick={() => this.handleMenuState()}
                        ></div>
                    </CSSTransition>
                    <CSSTransition
                        in={this.state.menuState}
                        classNames={this.classNamesSlide}
                        mountOnEnter
                        unmountOnExit
                        timeout={300}
                    >
                        <div className={classes.MobileMenuWrapper}>
                            {menu}
                            <SocialNetwork
                                className={`${classes.SocialNetwork} mr-4 `}
                                socialNetworks={this.props.socialNetworks}
                            />
                        </div>
                    </CSSTransition>
                </React.Fragment>
            </header>
        )
    }
}

const mapStatesToProps = state => {
    return {
        categories: state.PublicLayout.categories,
        socialNetworks: state.PublicLayout.socialNetworks
    }
}

const mapActionsToProps = dispach => {
    return {
        onFetchHeaderData: () => dispach(headerActions.getLayoutData())
    }
}

export default connect(mapStatesToProps, mapActionsToProps)(Header)
