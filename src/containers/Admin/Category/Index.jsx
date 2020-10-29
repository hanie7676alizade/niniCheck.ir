import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Form from "components/Admin/Category/Form/Form";
import List from "components/Admin/Category/List/List";
import classes from "scss/Admin/Category.module.scss";
import slideClasses from "scss/Animations/SlideToBottom.module.scss";
import * as categoryActions from "../../../store/Category/actions";
import withCommonError from "HOC/withCommonError";
import WithLoading from "HOC/WithLoading";
import withAuthorizationHeader from "HOC/withAuthorizationHeader";
import Confirmation from "components/UI/Confirmation/Confirmation";
import withMessage from "HOC/withMessage";
import { setDocumentTitle } from "store/Common/actions"


class Categories extends React.Component{

    state = {
        formMode: false,
        listMode: true,
        category: {
            name: '',
        },
        showModal: false,
        modalMessage: "",
        selectedCategory: "",
        editMode: false,
        transitionTiming: 300
    }

    handelShowForm = () => {
        this.props.onSetFormClose(false);

        this.setState({
            listMode: false,
        });
        setTimeout(() => {
            this.setState({
                formMode: true,
            });
        }, this.state.transitionTiming);
    }

    handelShowList = () => {
        this.setState({
            formMode: false
        });
        setTimeout(() => {
            this.setState({
                listMode: true,
                category: {
                    name: '',
                },
                editMode: false
            });
        }, this.state.transitionTiming);
    }

    classNames = {
        enter: slideClasses.SlideEnter,
        enterActive: slideClasses.SlideEnterActive,
        exit: slideClasses.SlideExit,
        exitActive: slideClasses.SlideExitActive,
    }

    componentDidUpdate() {
        if (this.props.closeForm && this.state.formMode) {
            this.handelShowList();
            this.props.onSetFormClose(false);
            this.setState({
                category: {
                    name: ""
                }
            })
        }
    }

    componentDidMount(){
        this.props.onChangeDocumentTitle();
    }
    // componentWillUnmount() {
    //     this.props.onSetError({});
    // }

    handleFetchList = () => {
        this.props.onFetchAll();
    }

    render() {
        let redirect = null;
        if (!this.props.auth || !this.props.auth.check)
            redirect = <Redirect to={{
                pathname: "/admin/signin",
                state: {
                    message: { text: `لطفا ابتدا وارد شوید`, type: 'Info' }
                }
            }} />

        return (
            <WithLoading>
                {redirect}
                <div className={classes.Wrapper}>
                    <CSSTransition in={this.state.formMode} mountOnEnter unmountOnExit timeout={{ enter: 600, exit: this.state.transitionTiming }} classNames={this.classNames}>
                        <div>
                            <Row>
                                <Col>
                                    <Form editMode={this.state.editMode} nameChangedHandler={this.handleNameChange} submitHandler={this.handleSubmit} cancel={this.handelShowList} onSetError={this.props.onSetError} errors={this.props.errors}
                                        loading={this.props.loading} category={this.state.category} />
                                </Col>
                            </Row>
                        </div>
                    </CSSTransition>
                    <CSSTransition in={this.state.listMode} mountOnEnter unmountOnExit timeout={{ enter: 600, exit: this.state.transitionTiming }} classNames={this.classNames}>
                        <div>
                            <Row>
                                <Col>
                                    <Button variant='outline-success' onClick={this.handelShowForm} className="d-flex flex-row align-items-center">
                                        دسته&zwnj;بندی تازه
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <List handleItemDelete={this.handleItemDelete} handleItemEdit={this.handleItemEdit} categories={this.props.categories} onFetchList={this.handleFetchList} />
                                </Col>
                            </Row>
                        </div>
                    </CSSTransition>
                    <Confirmation modalMessage={this.state.modalMessage} close={this.handleModalClose} confirm={this.handleConfirm} show={this.state.showModal} >
                        <div>
                            {this.state.modalMessage}
                        </div>
                    </Confirmation>
                </div>
            </WithLoading>
        )
    }
    handleConfirm = () => {
        this.handleModalClose();
        this.props.onDeleteCategory(this.state.selectedCategory);
    }
    handleModalClose = () => {
        this.setState({
            showModal: false,
            selectedCategory: ''
        });
    }
    handleNameChange = (value) => {
        this.setState({ category: { name: value } });
    }
    handleSubmit = (event) => {
        if (!this.state.editMode)
            this.props.onStore(this.state.category);
        else
            this.props.onUpdate({ name: this.state.category.name, id: this.state.selectedCategory });
    }

    handleItemDelete = (categoryId) => {
        const category = this.props.categories.find((category) => {
            return category.id === categoryId;
        })
        this.setState({
            modalMessage: "آیا از حذف دسته بندی \"" + category.name + "\" اطمینان دارید؟",
            showModal: true,
            selectedCategory: categoryId
        });
    }
    handleItemEdit = (categoryId) => {
        const category = this.props.categories.find((category) => {
            return category.id === categoryId;
        })
        this.setState({
            selectedCategory: categoryId,
            editMode: true,
            category: {
                name: category.name,
            },
        });
        this.handelShowForm();
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.Auth.auth,
        errors: state.Category.categoryFormErrors,
        loading: state.Category.loading,
        closeForm: state.Category.closeForm,
        categories: state.Category.categories
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        onStore: (categoryData) => dispatch(categoryActions.newCategory(categoryData)),
        onUpdate: (categoryData) => dispatch(categoryActions.updateCategory(categoryData)),
        onSetError: (error) => dispatch(categoryActions.formSetError(error)),
        onSetFormClose: (state) => dispatch(categoryActions.setFormClose(state)),
        onFetchAll: () => dispatch(categoryActions.fetchAll()),
        onDeleteCategory: (categoryId) => dispatch(categoryActions.deleteCategory(categoryId)),
        onChangeDocumentTitle: () => dispatch(setDocumentTitle('دسته بندی ها'))
    }
}

export default connect(mapStateToProps, mapActionsToProps)((withCommonError(withAuthorizationHeader(withMessage(Categories)))));