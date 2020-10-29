import React, { Suspense, lazy } from "react"
import { withRouter, Switch, Route } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { Container } from "react-bootstrap"
import { connect } from "react-redux"

import AdminLayout from "components/layout/Admin/Master/Master"
import PublicLayout from "components/layout/Public/Master/Master"
import AuthLayout from "components/layout/Auth/Master/Master"
import Home from "containers/Common/Home"
import classes from "scss/Layout/Router/AnimatedSwitch.module.scss"
import ComponentLoading from "components/UI/ComponentLoading/ComponentLoading"

const AsyncSignin = lazy(() => {
    return import("containers/Auth/Signin/Signin")
})

const AsyncAdminIndex = lazy(() => {
    return import("containers/Admin/Index/Index")
})

const AsyncAdminPosts = lazy(() => {
    return import("containers/Admin/Post/Index")
})

const AsyncAdminCategories = lazy(() => {
    return import("containers/Admin/Category/Index")
})

const AsyncPublicBlog = lazy(() => {
    return import("containers/Public/Blog/Index/Index")
})

const AsyncPublicBlogList = lazy(() => {
    return import("containers/Public/Blog/List/List")
})

const AsyncPublicBlogItem = lazy(() => {
    return import("containers/Public/Blog/Item/Item")
})

const AsyncLayout = lazy(() => {
    return import("containers/Public/Layout/Index")
})

const AsyncAdminSocialNetworks = lazy(() => {
    return import("containers/Admin/Layout/SocialNetworks/Index")
})

const AsyncAdminAboutUs = lazy(() => {
    return import("containers/Admin/Layout/AboutUs/Index")
})

const AsyncAdminContactUs = lazy(() => {
    return import("containers/Admin/Layout/ContactUs/Index")
})

const AsyncPublicAboutUs = lazy(() => {
    return import("containers/Public/AboutUs")
})
const AsyncPublicContactUs = lazy(() => {
    return import("containers/Public/ContactUs")
})
const AsyncPublicSuccess = lazy(() => {
    return import("containers/Public/NewsLetter/Success")
})
const AsyncPublicFailed = lazy(() => {
    return import("containers/Public/NewsLetter/Failed")
})
const AsyncPublicUnSubscribed = lazy(() => {
    return import("containers/Public/NewsLetter/UnSubscribed")
})

const animatedSwith = props => {
    const classNames = {
        enter: classes.FadeEnter,
        enterActive: classes.FadeEnterActive,
        exit: classes.FadeExit,
        exitActive: classes.FadeExitActive
    }
    let Layout = PublicLayout
    let isPublic = true
    if (props.location.pathname.indexOf("/admin") === 0) {
        Layout = AdminLayout
        isPublic = false
    }
    if (props.location.pathname.indexOf("/layout") === 0) {
        Layout = props => props.children
        isPublic = false
    }
    if (props.location.pathname.indexOf("/admin/signin") === 0) {
        Layout = AuthLayout
        isPublic = false
    }

    return (
        <Layout>
            <Container
                fluid
                className={["flex-grow-1", isPublic ? "p-0" : "py-3"].join(" ")}
            >
                {/*py-2 p-md-3*/}
                <TransitionGroup className={classes.Group}>
                    <CSSTransition
                        key={props.location.key}
                        timeout={{ enter: 300, exit: 150 }}
                        in
                        classNames={classNames}
                    >
                        <section className={classes.Section}>
                            <Switch location={props.location}>
                                <Route path="/" exact>
                                    <Home />
                                </Route>
                                <Route path="/admin" exact>
                                    <Suspense fallback={<ComponentLoading />}>
                                        <AsyncAdminIndex />
                                    </Suspense>
                                </Route>
                                <Route path="/admin/signin">
                                    <Suspense fallback={<ComponentLoading />}>
                                        <AsyncSignin />
                                    </Suspense>
                                </Route>
                                <Route path="/about-us">
                                    <Suspense fallback={<ComponentLoading />}>
                                        <AsyncPublicAboutUs />
                                    </Suspense>
                                </Route>
                                <Route path="/contact-us">
                                    <Suspense fallback={<ComponentLoading />}>
                                        <AsyncPublicContactUs />
                                    </Suspense>
                                </Route>
                                <Route path="/admin/post">
                                    <Suspense fallback={<ComponentLoading />}>
                                        <AsyncAdminPosts />
                                    </Suspense>
                                </Route>
                                <Route path="/admin/category">
                                    <Suspense fallback={<ComponentLoading />}>
                                        <AsyncAdminCategories />
                                    </Suspense>
                                </Route>
                                <Route path="/admin/layout/social-networks">
                                    <Suspense fallback={<ComponentLoading />}>
                                        <AsyncAdminSocialNetworks />
                                    </Suspense>
                                </Route>
                                <Route path="/admin/layout/about-us">
                                    <Suspense fallback={<ComponentLoading />}>
                                        <AsyncAdminAboutUs />
                                    </Suspense>
                                </Route>
                                <Route path="/admin/layout/contact-us">
                                    <Suspense fallback={<ComponentLoading />}>
                                        <AsyncAdminContactUs />
                                    </Suspense>
                                </Route>
                                <Route path="/blog" exact>
                                    <Suspense fallback={<ComponentLoading />}>
                                        <AsyncPublicBlog />
                                    </Suspense>
                                </Route>
                                <Route path="/blog/:category">
                                    <Suspense fallback={<ComponentLoading />}>
                                        <AsyncPublicBlogList />
                                    </Suspense>
                                </Route>
                                <Route path="/newsletter/success">
                                    <Suspense fallback={<ComponentLoading />}>
                                        <AsyncPublicSuccess />
                                    </Suspense>
                                </Route>
                                <Route path="/newsletter/failed">
                                    <Suspense fallback={<ComponentLoading />}>
                                        <AsyncPublicFailed />
                                    </Suspense>
                                </Route>
                                <Route path="/newsletter/unsubscribed">
                                    <Suspense fallback={<ComponentLoading />}>
                                        <AsyncPublicUnSubscribed />
                                    </Suspense>
                                </Route>
                                <Route path="/layout">
                                    <Suspense fallback={<ComponentLoading />}>
                                        <AsyncLayout />
                                    </Suspense>
                                </Route>

                                {/* last */}
                                <Route path="/:post">
                                    <Suspense fallback={<ComponentLoading />}>
                                        <AsyncPublicBlogItem />
                                    </Suspense>
                                </Route>
                            </Switch>
                        </section>
                    </CSSTransition>
                </TransitionGroup>
            </Container>
        </Layout>
    )
}

const mapStatesToProps = state => {
    return {
        frontPage: state.Post.frontPage,
        frontRows: state.Post.frontRows,
        frontQuery: state.Post.frontQuery
    }
}

export default connect(
    mapStatesToProps
)(withRouter(animatedSwith))
