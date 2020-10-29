import React from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Master = (props) => {
    return (
        <React.Fragment>
            <Header />
            { props.children }
            <Footer />
        </React.Fragment>
    )
}

export default Master
