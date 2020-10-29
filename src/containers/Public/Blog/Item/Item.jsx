import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { Card } from "react-bootstrap"

import { frontFetchOne } from "store/Post/actions"
import classes from "scss/Public/Blog.module.scss"
import Articles from "components/layout/Public/Articles/Articles"

class BlogItem extends React.Component {
    componentDidMount() {
        this.props.onFetchPost(this.props.match.params.post)
    }

    renderPost = () => {
        if (this.props.post !== null) {
            return (
                <Card.Body>
                    {this.props.post.introImage ? (
                        <Card.Img
                            src={this.props.post.introImage}
                            alt={this.props.post.slug}
                        />
                    ) : null}
                    <h1>{this.props.post.title}</h1>
                    <div
                        className={classes.content}
                        dangerouslySetInnerHTML={{
                            __html: this.props.post.content
                        }}
                    ></div>
                </Card.Body>
            )
        } else {
            return <p>پست یافت نشد</p>
        }
    }

    render() {
        let articles = null
        if (this.props.posts.length) {
            articles = <Articles posts={this.props.posts} />
        }
        return (
            <React.Fragment>
                <Card className={classes.Article}>{this.renderPost()}</Card>
                {articles}
            </React.Fragment>
        )
    }
}

const mapStatesToProps = state => {
    return {
        post: state.Post.frontPost,
        posts: state.PublicLayout.posts
    }
}

const mapActionsToProps = dispatch => {
    return {
        onFetchPost: post => dispatch(frontFetchOne(post))
    }
}

export default connect(
    mapStatesToProps,
    mapActionsToProps
)(withRouter(BlogItem))
