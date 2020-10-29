import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import './App.scss';
import * as authActions from "./store/Auth/actions";
import AnimatedSwitch from "./components/layout/Router/AnimatedSwitch";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.initiateInitialAuthCheck());
  }, [dispatch])

  const documentTitle = useSelector((state) => state.Common.documentTitle);
  useEffect(() => {
    document.querySelector('title').innerText = documentTitle;
  }, [documentTitle])


  return (
    <div className="rtl page d-flex flex-column">
      <Router>
        <AnimatedSwitch />
      </Router>

    </div>
  );
}

export default App;
