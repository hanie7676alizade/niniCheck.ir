import React from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fab } from "@fortawesome/free-brands-svg-icons"
import classes from "scss/Layout/Public/SocialNetwork.module.scss"

library.add(fab)

const SocialNetwork = props => {
    const handleIconName = item => {
        if (item.name === "Telegram") {
            return "telegram-plane"
        } else if (item.name === "Facebook") {
            return "facebook-f"
        }
        return `${item.name.toLowerCase()}`
    }
    const handleItemName = item => {
        if (item.name === "Telegram") {
            return "تلگرام"
        } else if (item.name === "Facebook") {
            return "فیسبوک"
        } else if (item.name === "Instagram") {
            return "اینستاگرام"
        } else if (item.name === "Twitter") {
            return "توییتر"
        }
        return `${item.name.toLowerCase()}`
    }
    let socialNetworks = null
    if (props.socialNetworks.length) {
        socialNetworks = (
            <ul className={[classes.UlWrapper, props.className].join(" ")}>
                {props.socialNetworks.map(item => (
                    <li key={item.name}>
                        <a href={item.link}>
                            <FontAwesomeIcon
                                size="2x"
                                icon={[`fab`, handleIconName(item)]}
                            />
                            <span className={classes.Title}>
                                {/* {item.name} */}
                                {handleItemName(item)}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        )
    }
    return <React.Fragment>{socialNetworks}</React.Fragment>
}

export default SocialNetwork
