import React from "react";
import { useSelector } from "react-redux";

import classes from "scss/Layout/Admin/Header.module.scss";
import MenuToggle from "../../../UI/MenuToggle/MenuToggle";

const Header = (props) => {
    const documentTitle = useSelector((state) => state.Common.documentTitle);
    return (
        <div className={[classes.Wrapper, 'd-flex shadow', props.menuState ? classes.MenuOpen : null].join(' ')}>
            <MenuToggle className={classes.MenuToggle} setMenuState={props.toggleMenu} menuState={props.menuState} />
            <h6 className={classes.PageTitle}>{documentTitle}</h6>
        </div>
    )
}

export default Header