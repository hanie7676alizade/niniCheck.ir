import React from "react"
import { connect } from "react-redux"

import { getSectionData } from "helpers"
import withMessage from "HOC/withMessage"
import classes from "scss/Public/Home.module.scss"
import Slide from "components/Common/Home/Slide"
import StartTest from "components/Common/Home/StartTest"
import AboutTest from "components/Common/Home/AboutTest"
import Instagram from "components/Common/Home/Instagram"
import DragWeeks from "components/Common/Home/DragWeeks"
import Alert from "components/UI/Alert/Alert"

import { frontFetchAll, frontSetRows } from "store/Post/actions"
import { setShowAlert, isSaveEmail, setMessage } from "store/NewsLetter/actions"
import Articles from "components/layout/Public/Articles/Articles"

class Home extends React.Component {
    AboutIntro = ""
    internalAlert = null
    handleScroll = () => {
        var offset = document.getElementsByName("startTest")[0].offsetTop
        window.scrollTo(0, offset + 50)
    }
    handleShowInstaComponent = () => {
        var res = 0
        var instaLink = null
        //check socialNetworks
        this.props.socialNetworks.map(item => {
            if (item.id === 3) {
                res++
                instaLink = item.link
            }
            return null
        })
        return res === 0 ? null : <Instagram instagramLink={instaLink} />
    }
    setaboutUsText = () => {
        this.AboutIntro = getSectionData(this.props.ConfigStore, "about.intro")
    }
    componentDidMount() {
        this.props.onFrontSetRows(40)
        this.props.onFetch40Weeks("هفته-به-هفته")
    }
    componentDidUpdate() {
        if (this.props.showAlert) {
            this.internalAlert = setInterval(() => {
                this.props.onSetShowAlert(false)
                this.props.onIsSaveEmail(false)
            }, 4500)
        } else {
            clearInterval(this.internalAlert)
        }
    }
    render() {
        this.setaboutUsText()
        const alert = (
            <Alert
                type={this.props.messageType}
                show={this.props.showAlert}
                message={this.props.message}
            />
        )
        let articles = null
        if (this.props.posts.length) {
            articles = <Articles posts={this.props.posts} />
        }
        return (
            <div className={classes.MainWrapper}>
                {alert}
                <Slide
                    handleScroll={this.handleScroll}
                    AboutIntro={this.AboutIntro}
                />
                <StartTest />
                <AboutTest />
                <DragWeeks WeekPosts={this.props.WeekPosts} />
                {this.handleShowInstaComponent()}
                {articles}
            </div>
        )
    }
}

const mapStatesToProps = state => {
    return {
        categories: state.PublicLayout.categories,
        socialNetworks: state.PublicLayout.socialNetworks,
        ConfigStore: state.PublicLayout.config,
        posts: state.PublicLayout.posts,
        message: state.NewsLetter.message,
        showAlert: state.NewsLetter.showAlert,
        messageType: state.NewsLetter.messageType,
        WeekPosts: state.Post.frontPosts
    }
}

const mapActionsToProps = dispatch => {
    return {
        onIsSaveEmail: data => dispatch(isSaveEmail(data)),
        onSetMessage: data => dispatch(setMessage(data)),
        onSetShowAlert: data => dispatch(setShowAlert(data)),
        onFetch40Weeks: category => dispatch(frontFetchAll(category)), //هفته-به-هفته
        onFrontSetRows: data => dispatch(frontSetRows(data))
    }
}

export default withMessage(connect(mapStatesToProps, mapActionsToProps)(Home))
