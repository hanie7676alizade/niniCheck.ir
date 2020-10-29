import React from "react";

import MenuToggle from "components/UI/MenuToggle/MenuToggle";
import classes from "scss/Layout/Public/MobileMenu.module.scss";

const MobileMenu = (props) => {
    return (
        <React.Fragment>
            <MenuToggle className={classes.MenuToggle} setMenuState={props.toggleMenu} menuState={props.menuState} />
        </React.Fragment>
    );
}

export default MobileMenu;