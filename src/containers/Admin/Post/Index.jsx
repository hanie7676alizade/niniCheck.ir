import React from "react"
import { Row, Col, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { CSSTransition } from "react-transition-group"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import Form from "components/Admin/Post/Form/Form"
import List from "components/Admin/Post/List/List"
import classes from "scss/Admin/Post.module.scss"
import slideClasses from "scss/Animations/SlideToBottom.module.scss"
import * as postActions from "store/Post/actions"
import { fetchAll as fetchCategories } from "store/Category/actions"
import withCommonError from "HOC/withCommonError"
import WithLoading from "HOC/WithLoading"
import Confirmation from "components/UI/Confirmation/Confirmation"
import { addAxiosAuthorization } from "helpers"
import { setDocumentTitle } from "store/Common/actions"
import Pagination from "components/UI/Pagination/Index"

class Posts extends React.Component {
    state = {
        formMode: false,
        listMode: true,
        post: {
            title: "",
            slug: "",
            introImage: "",
            content: "",
            categoryId: null
        },
        showModal: false,
        modalMessage: "",
        selectedPost: "",
        editMode: false,
        transitionTiming: 300,
        page: 1
    }
    handleChangePage = page => {
        this.setState({
            page
        })

        setTimeout(() => {
            this.props.onFetchAll(page)
        })
    }

    handelShowForm = () => {
        this.props.onSetFormClose(false)

        this.setState({
            listMode: false
        })
        setTimeout(() => {
            this.setState({
                formMode: true
            })
        }, this.state.transitionTiming)
    }

    handelShowList = () => {
        this.setState({
            formMode: false
        })
        setTimeout(() => {
            this.setState({
                listMode: true,
                post: {
                    name: ""
                },
                editMode: false
            })
        }, this.state.transitionTiming)
    }

    classNames = {
        enter: slideClasses.SlideEnter,
        enterActive: slideClasses.SlideEnterActive,
        exit: slideClasses.SlideExit,
        exitActive: slideClasses.SlideExitActive
    }

    componentDidUpdate() {
        if (this.props.closeForm && this.state.formMode) {
            this.handelShowList()
            this.props.onSetFormClose(false)
            this.setState({
                post: {
                    name: ""
                }
            })
        }
    }

    componentDidMount() {
        this.props.onChangeDocumentTitle()
        addAxiosAuthorization()
        this.props.onFetchCategories()
    }

    handleFetchList = () => {
        this.props.onFetchAll(this.state.page)
    }

    render() {
        let redirect = null
        if (!this.props.auth || !this.props.auth.check)
            redirect = (
                <Redirect
                    to={{
                        pathname: "/admin/signin",
                        state: {
                            message: {
                                text: `لطفا ابتدا وارد شوید`,
                                type: "Info"
                            }
                        }
                    }}
                />
            )

        return (
            <WithLoading>
                {redirect}
                <div className={classes.Wrapper}>
                    <CSSTransition
                        in={this.state.formMode}
                        mountOnEnter
                        unmountOnExit
                        timeout={{
                            enter: 600,
                            exit: this.state.transitionTiming
                        }}
                        classNames={this.classNames}
                    >
                        <div>
                            <Row>
                                <Col>
                                    <Form
                                        categories={this.props.categories}
                                        editMode={this.state.editMode}
                                        titleChangedHandler={
                                            this.handleTitleChange
                                        }
                                        categoryIdChangedHandler={
                                            this.handleCategoryChange
                                        }
                                        slugChangedHandler={
                                            this.handleSlugChange
                                        }
                                        introImageChangedHandler={
                                            this.handleIntroImageChange
                                        }
                                        contentChangedHandler={
                                            this.handleContentChange
                                        }
                                        submitHandler={this.handleSubmit}
                                        cancel={this.handelShowList}
                                        onSetError={this.props.onSetError}
                                        errors={this.props.errors}
                                        loading={this.props.loading}
                                        post={this.state.post}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </CSSTransition>
                    <CSSTransition
                        in={this.state.listMode}
                        mountOnEnter
                        unmountOnExit
                        timeout={{
                            enter: 600,
                            exit: this.state.transitionTiming
                        }}
                        classNames={this.classNames}
                    >
                        <div>
                            <Row>
                                <Col>
                                    <Button
                                        variant="outline-success"
                                        onClick={this.handelShowForm}
                                        className="d-flex flex-row align-items-center"
                                    >
                                        پست تازه
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            className="mr-2"
                                        />
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {this.props.posts ? (
                                        <Pagination
                                            currentPage={this.state.page}
                                            onChangePage={this.handleChangePage}
                                            totalLinks={5}
                                            totalPages={
                                                this.props.posts.totalPages
                                            }
                                        />
                                    ) : null}

                                    <List
                                        handleItemDelete={this.handleItemDelete}
                                        handleItemEdit={this.handleItemEdit}
                                        posts={this.props.posts}
                                        onFetchList={this.handleFetchList}
                                    />
                                    {this.props.posts ? (
                                        <Pagination
                                            currentPage={this.state.page}
                                            onChangePage={this.handleChangePage}
                                            totalLinks={5}
                                            totalPages={
                                                this.props.posts.totalPages
                                            }
                                        />
                                    ) : null}
                                </Col>
                            </Row>
                        </div>
                    </CSSTransition>
                    <Confirmation
                        modalMessage={this.state.modalMessage}
                        close={this.handleModalClose}
                        confirm={this.handleConfirm}
                        show={this.state.showModal}
                    >
                        <div>{this.state.modalMessage}</div>
                    </Confirmation>
                </div>
            </WithLoading>
        )
    }
    handleConfirm = () => {
        this.handleModalClose()
        let pageToGo =
            this.props.posts.rows.length === 1 && this.state.page > 1
                ? this.state.page - 1
                : this.state.page
        this.setState({
            page: pageToGo
        })
        this.props.onDeletePost({
            postId: this.state.selectedPost,
            page: pageToGo
        })
    }
    handleModalClose = () => {
        this.setState({
            showModal: false,
            selectedPost: ""
        })
    }
    handleTitleChange = value => {
        this.setState(prevState => {
            return { post: { ...prevState.post, title: value } }
        })
    }
    handleSlugChange = value => {
        this.setState(prevState => {
            return { post: { ...prevState.post, slug: value } }
        })
    }
    handleCategoryChange = value => {
        this.setState(prevState => {
            return { post: { ...prevState.post, categoryId: value } }
        })
    }
    handleIntroImageChange = value => {
        this.setState(prevState => {
            return { post: { ...prevState.post, introImage: value } }
        })
    }
    handleContentChange = value => {
        this.setState(prevState => {
            return { post: { ...prevState.post, content: value } }
        })
    }
    handleSubmit = event => {
        if (!this.state.editMode) this.props.onStore(this.state.post)
        else
            this.props.onUpdate({
                title: this.state.post.title,
                slug: this.state.post.slug,
                introImage: this.state.post.introImage,
                content: this.state.post.content,
                categoryId: this.state.post.categoryId,
                id: this.state.selectedPost
            })
    }

    handleItemDelete = postId => {
        const post = this.props.posts.rows.find(post => {
            return post.id === postId
        })
        this.setState({
            modalMessage: 'آیا از حذف پست "' + post.title + '" اطمینان دارید؟',
            showModal: true,
            selectedPost: postId
        })
    }
    handleItemEdit = postId => {
        const post = this.props.posts.rows.find(post => {
            return post.id === postId
        })
        this.setState({
            selectedPost: postId,
            editMode: true,
            post: {
                title: post.title,
                slug: post.slug,
                introImage: post.introImage,
                categoryId: post.categoryId,
                content: post.content
            }
        })
        this.handelShowForm()
    }
}

const mapStateToProps = state => {
    return {
        auth: state.Auth.auth,
        errors: state.Post.postFormErrors,
        loading: state.Post.loading,
        closeForm: state.Post.closeForm,
        posts: state.Post.posts,
        categories: state.Category.categories
    }
}

const mapActionsToProps = dispatch => {
    return {
        onStore: postData => dispatch(postActions.newPost(postData)),
        onUpdate: postData => dispatch(postActions.updatePost(postData)),
        onSetError: error => dispatch(postActions.formSetError(error)),
        onSetFormClose: state => dispatch(postActions.setFormClose(state)),
        onFetchAll: page => dispatch(postActions.fetchAll(page)),
        onFetchCategories: () => dispatch(fetchCategories()),
        onDeletePost: data => dispatch(postActions.deletePost(data)),
        onChangeDocumentTitle: () => dispatch(setDocumentTitle("پست ها"))
    }
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withCommonError(Posts))
