import React, { useState } from "react";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import classes from "scss/Layout/Admin/Master.module.scss";

const Master = (props) => {
  const [menuState, setMenuState] = useState({ open: false });

  const menuToggleHandler = () => {
    setMenuState({ open: !menuState.open });
  };

  return (
    <React.Fragment>
      <div className={classes.Wrapper}>
        <Header menuState={menuState.open} toggleMenu={menuToggleHandler} />
        <Sidebar menuState={menuState.open} toggleMenu={menuToggleHandler} />
        <div className={classes.ContentWrapper}>
          <div className={[
              classes.Content,
              menuState.open ? classes.MenuOpen : null,
            ].join(" ")}>
            {props.children}
          </div>
          <div
            onClick={() => menuToggleHandler()}
            className={[
              classes.MenuBackdrop,
              "d-block d-md-none",
              menuState.open ? classes.MenuOpen : null,
            ].join(" ")}
          ></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Master;
