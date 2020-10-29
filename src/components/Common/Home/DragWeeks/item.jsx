import React from "react"
import { Link } from "react-router-dom"
import classes from "scss/Public/Home.module.scss"

function WeekItem(props) {
    const cache = {}
    function importAll(r) {
        r.keys().forEach(key => {
            cache[key] = r(key)
        })
    }
    importAll(require.context("assets/images/40Weeks/", true, /\.svg$/))
    return (
        <Link to={`/${props.WeekPosts.slug}`} className={classes.WeekItem}>
                <img src={cache[`./fruit_week${props.item}.svg`]} alt="" />
            
            <div className={classes.circle}></div>
            <span>{props.item}</span>
        </Link>
    )
}

export default WeekItem
