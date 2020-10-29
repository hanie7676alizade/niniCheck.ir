import React from "react";

import classes from "scss/Layout/Public/Search.module.scss";

const Search = () => {
    return (
        <div>
            <input type="text" className={[classes.Input, 'rounded-pill'].join(' ')}/>
        </div>
    );
}

export default Search;