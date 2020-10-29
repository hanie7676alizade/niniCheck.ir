import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuidditch,
  faHome,
  faTachometerAlt,
  faTags,
  faLayerGroup,
  faCaretDown,
  faShareAlt,
  faFileAlt,
  faPhoneAlt
} from "@fortawesome/free-solid-svg-icons";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import { withRouter } from "react-router-dom";

import classes from "scss/Layout/Admin/Sidebar.module.scss";

const Sidebar = (props) => {
  const [layoutSubMenu, setLayoutSubMenu] = useState(false);

  /** Open the sidebar */
  const openMenu = () => {
    props.toggleMenu();
  };
  const openLayoutSubMenuHandler = (element) => {
    setLayoutSubMenu((prevState) => {
      if (prevState) return false;
      else {
        if (!props.menuState) openMenu();
        return true;
      }
    });
  };

  /**Close submenus */
  useEffect(() => {
    if (!props.menuState) setLayoutSubMenu(false);
    if (props.menuState && props.location.pathname.search('/admin/layout') === 0) setLayoutSubMenu(true);
  }, [props.menuState, props.location.pathname]);

  let layoutSubMenuClass = null;
  if (layoutSubMenu) layoutSubMenuClass = classes.Open;
  return (
    <div
      className={[
        classes.Wrapper,
        props.menuState ? classes.Open : null,
        "d-flex flex-column justify-content-between",
      ].join(" ")}
    >
      <ul className={classes.Nav}>
        <li>
          <NavLink to="/admin" exact activeClassName={classes.Active}>
            <FontAwesomeIcon fixedWidth icon={faTachometerAlt} />
            <span>داشبورد</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/post" activeClassName={classes.Active}>
            <FontAwesomeIcon fixedWidth icon={faQuidditch} />
            <span>پست&zwnj;ها</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/category" activeClassName={classes.Active}>
            <FontAwesomeIcon fixedWidth icon={faTags} />
            <span>دسته&zwnj;بندی&zwnj;ها</span>
          </NavLink>
        </li>
        <li>
          <div
            className={[classes.Parent, layoutSubMenuClass].join(" ")}

          >
            <div className={classes.Header} onClick={(event) => openLayoutSubMenuHandler(event.currentTarget)}>
              <div>
                <FontAwesomeIcon fixedWidth icon={faLayerGroup} />
                <span>پوسته</span>
              </div>
              <FontAwesomeIcon
                fixedWidth
                icon={faCaretDown}
                className={classes.Caret}
              />
            </div>
            <SlideDown className={classes.Slider}>
              {layoutSubMenu ? (
                  <div className={[classes.SubMenu].join(" ")}>
                    <ul className={classes.Nav}>
                      <li>
                        <NavLink
                          to="/admin/layout/social-networks"
                          activeClassName={classes.Active}
                        >
                          <FontAwesomeIcon fixedWidth icon={faShareAlt} />
                          <span>شبکه&zwnj;های اجتماعی</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/admin/layout/about-us"
                          activeClassName={classes.Active}
                        >
                          <FontAwesomeIcon fixedWidth icon={faFileAlt} />
                          <span>درباره&zwnj;ی ما</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/admin/layout/contact-us"
                          activeClassName={classes.Active}
                        >
                          <FontAwesomeIcon fixedWidth icon={faPhoneAlt} />
                          <span>ارتباط با ما</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
              ) : null}
            </SlideDown>
          </div>
        </li>
      </ul>
      <ul className={classes.Nav}>
        <li>
          <NavLink to="/" target="_blank">
            <FontAwesomeIcon fixedWidth icon={faHome} />
            <span>صفحه اصلی</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Sidebar);
