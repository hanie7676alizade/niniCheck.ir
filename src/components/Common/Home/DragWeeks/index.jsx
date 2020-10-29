import React from "react"
import SwiperCore, { Virtual } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/swiper.scss"

import WeekItem from "components/Common/Home/DragWeeks/item"
import classes from "scss/Public/Home.module.scss"

SwiperCore.use([Virtual])

const DragWeeks = props => {
    const handleShowItems = props => {
        var elements = []
        for (let index = 2; index <= 41; index++) {
            elements = [...elements, index]
        }
        return elements.map((slideContent, index) => {
            return (
                <SwiperSlide
                    key={slideContent}
                    virtualIndex={index}
                    style={{ width: "50px" }}
                >
                    <WeekItem
                        item={slideContent}
                        WeekPosts={props.WeekPosts.rows[slideContent - 2]}
                    />
                </SwiperSlide>
            )
        })
    }
    const responsiveSwiper = () => {
        if (window.innerWidth > 1250) return 13

        if (window.innerWidth < 400) return 4
        if (window.innerWidth < 600) return 5
        if (window.innerWidth < 950) return 6

        if (window.innerWidth < 1250) return 9
    }
    if (props.WeekPosts.rows && props.WeekPosts.rows.length) {
        return (
            <div className={classes.DragWeeks}>
                <h4>بارداری شما در هر هفته</h4>
                <div className={classes.swiperWrapper}>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={responsiveSwiper()}
                        virtual
                    >
                        {handleShowItems(props)}
                    </Swiper>
                </div>
                <div className={classes.lineBottom}></div>
            </div>
        )
    }
    return null
}

export default DragWeeks
