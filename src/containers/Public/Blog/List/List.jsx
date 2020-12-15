import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { Alert, Form, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

import {
    frontFetchAll,
    frontSetSearch,
    frontSetPage,
    frontSetRows
} from "store/Post/actions"
import WithLoading from "HOC/WithLoading"
import { stripHtml } from "helpers"
import Articles from "components/layout/Public/Articles/Articles"
import classes from "scss/Public/Blog.module.scss"
import Pagination from "components/UI/Pagination/Index"

class BlogList extends React.Component {
    state = {
        search: "",
        searchTimeout: null,
        page: 1
    }

    componentDidMount() {
        const search = this.props.location.search.replace("?", "").split("&")
        const object = {}
        for (const item of search) {
            if (typeof item === "string" && item.trim().length)
                object[item.split("=")[0]] = item.split("=")[1]
        }

        Object.keys(object).forEach(element => {
            if (object.hasOwnProperty(element)) {
                if (element === "q") {
                    this.props.onSetSearch(decodeURI(object[element]) || "")
                    this.setState({
                        search: decodeURI(object.q) || ""
                    })
                }
                if (element === "page") {
                    this.props.onSetPage(parseInt(object[element]) || 1)
                    this.setState({
                        page: parseInt(object.page) || 1
                    })
                }
            }
        })
this.props.onSetRows(10)
        this.props.onFetchAll(this.props.match.params.category)
    }

    handleSearch = event => {
        const value = event.target.value.trim()
        this.setState({
            search: value
        })

        clearTimeout(this.state.searchTimeout)

        const timeout = setTimeout(() => {
            this.doSearch(value)
        }, 800)

        this.setState({
            searchTimeout: timeout
        })
    }

    doSearch = value => {
        this.props.onSetSearch(value)
        this.setState({
            page: 1
        })
        this.props.onSetPage(1)
        this.props.onFetchAll(this.props.match.params.category)
    }

    renderCategory = () => {
        if (
            this.props.posts &&
            this.props.posts.rows &&
            this.props.posts.rows.length
        ) {
            return (
                <React.Fragment>
                    <h1> {this.props.posts.rows[0].Category.name} </h1>

                    {this.props.posts.rows.map(post => {
                        return (
                            <Link
                                to={"/" + post.slug}
                                className="media"
                                key={post.id}
                            >
                                <ListGroup.Item
                                    className={`d-flex flex-row flex-nowrap justify-content-between align-items-center ${classes.listGroup}`}
                                >
                                    {post.introImage && (
                                        <img
                                            src={post.introImage}
                                            className="align-self-center ml-3"
                                            alt={"تصویر معرف - " + post.title}
                                        />
                                    )}
                                    <div className={classes.mediaBody}>
                                        <h6 className="mt-0">{post.title}</h6>
                                        <div>{stripHtml(post.content)}...</div>
                                    </div>
                                </ListGroup.Item>
                            </Link>
                        )
                    })}
                </React.Fragment>
            )
        }
        return null
    }
    render() {
        let articles = null
        if (this.props.mostViewedArticles.length) {
            articles = <Articles posts={this.props.mostViewedArticles} />
        }
        return (
            <WithLoading>
                <ListGroup className={classes.BlogList}>
                    <div className={classes.ToolbarWrapper}>
                        <h6 className={classes.Title}>فیلتر</h6>
                        <div>
                            <Form.Control
                                type="text"
                                placeholder="جست و جو..."
                                onChange={this.handleSearch}
                                value={this.state.search}
                            ></Form.Control>
                        </div>
                    </div>
                    {this.state.search.length &&
                    this.props.posts &&
                    this.props.posts.rows &&
                    !this.props.posts.rows.length ? (
                        <Alert variant="info" className="my-5">
                            پستی با این نام یا این محتوا یافت نشد.
                        </Alert>
                    ) : null}
                    {this.renderCategory()}
                </ListGroup>
                {this.props.posts &&
                this.props.posts.rows &&
                this.props.posts.rows.length ? (
                    <Pagination
                        currentPage={this.state.page}
                        onChangePage={this.handleChangePage}
                        totalLinks={5}
                        totalPages={this.props.posts.totalPages}
                    />
                ) : null}
                {articles}
            </WithLoading>
        )
    }

    handleChangePage = page => {
        this.setState({
            page
        })
        this.props.onSetPage(page)
        setTimeout(() => {
            this.props.onFetchAll(this.props.match.params.category)
        })
    }
}

const mapStatesToProps = state => {
    return {
        posts: state.Post.frontPosts,
        mostViewedArticles: state.PublicLayout.posts,
        frontPage: state.Post.frontPage,
        frontRows: state.Post.frontRows,
        frontQuery: state.Post.frontQuery
    }
}

const mapActionsToProps = dispatch => {
    return {
        onFetchAll: category => dispatch(frontFetchAll(category)),
        onSetSearch: value => dispatch(frontSetSearch(value)),
        onSetPage: value => dispatch(frontSetPage(value)),
        onSetRows: value => dispatch(frontSetRows(value))
    }
}

export default connect(
    mapStatesToProps,
    mapActionsToProps
)(withRouter(BlogList))
