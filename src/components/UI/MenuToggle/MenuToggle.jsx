import React from "react"
import classes from "scss/UI/MenuToggle.module.scss"

const MenuToggle = props => {
    return (
        <div
            onClick={() => props.setMenuState()}
            className={[
                classes.MenuToggle,
                props.className,
                props.menuState ? classes.MenuOpen : null
            ].join(" ")}
        >
            <span className={classes.Humberger}></span>
            <span className={classes.Humberger}></span>
            <span className={classes.Humberger}></span>
        </div>
    )
}

export default MenuToggle
