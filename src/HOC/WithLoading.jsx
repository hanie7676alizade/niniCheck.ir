import React from "react"
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from "react-transition-group";

import classes from "scss/HOC/WithLoading.module.scss";

class WithLoading extends React.Component {

    classNames = {
        enter: classes.FadeEnter,
        enterActive: classes.FadeEnterActive,
        exit: classes.FadeExit,
        exitActive: classes.FadeExitActive,
    }

    render() {
        return (
            <React.Fragment>
                <div className={classes.Group}>
                    {this.props.children}
                    <CSSTransition timeout={{ enter: 200, exit: 200 }} in={this.props.loading} mountOnEnter unmountOnExit classNames={this.classNames}>
                        <section className={classes.Section}>
                            <div className={[classes.Wrapper].join(' ')}>
                                <FontAwesomeIcon className={[classes.Spinner, 'text-light'].join(' ')} icon={faSpinner} spin size="5x" />
                            </div>
                        </section>
                    </CSSTransition>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.Common.loading
    }
}

export default connect(mapStateToProps)(WithLoading);