import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import classes from "scss/Public/Blog.module.scss"
import { Card, Row } from "react-bootstrap"
import Articles from "components/layout/Public/Articles/Articles"

class Blog extends React.Component {
    render() {
        let articles = null
        if (this.props.posts.length) {
            articles = <Articles posts={this.props.posts} />
        }
        return (
            <React.Fragment>
                <div as={Row} className={classes.BlogIndex}>
                    {this.props.categories.map(category => {
                        return (
                            <Card
                                lg={5}
                                key={category.slug}
                                className={classes.category}
                            >
                                <Link to={"/blog/" + category.slug}>
                                    {category.name}
                                </Link>
                            </Card>
                        )
                    })}
                </div>
                {articles}
            </React.Fragment>
        )
    }
}

const mapStatesToProps = state => {
    return {
        categories: state.PublicLayout.categories,
        posts: state.PublicLayout.posts
    }
}

export default connect(mapStatesToProps)(Blog)
