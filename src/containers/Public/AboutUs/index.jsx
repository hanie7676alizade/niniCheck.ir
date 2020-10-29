import React, { Component } from 'react';
import { connect } from "react-redux";

import { setDocumentTitle } from "store/Common/actions";
import withCommonError from "HOC/withCommonError";
import classes from "scss/Public/AboutUs.module.scss";
import {getSectionData} from 'helpers';

class AboutUs extends Component {

   AboutHtml = '';

   setInputForm = () => {
      this.AboutHtml=getSectionData(this.props.ConfigStore , 'about.html')
   }
   componentDidMount() {
      this.props.onChangeDocumentTitle('درباره ما');
   };
   render() {
      this.setInputForm();
      return (
         <div className={classes.AboutUsPage}>
            <div className='AboutUsPage'
            dangerouslySetInnerHTML={{
               __html: this.AboutHtml
           }}
            >
            </div>
         </div>
      );
   }
}

const mapStatesToProps = ((state) => {
   return {
      loading: state.Config.loading,
      ConfigStore: state.PublicLayout.config,
   }
})

const mapActionsToProps = ((dispatch) => {
   return {
      onChangeDocumentTitle: (text) => dispatch(setDocumentTitle(text)),
   }
})

export default connect(mapStatesToProps, mapActionsToProps)(withCommonError(AboutUs));