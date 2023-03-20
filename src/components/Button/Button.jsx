import React from "react";
import css from './Button.module.css'


export function Button({activeLoadMore}) {
    return (
        <button className={css.btn} type="button" onClick={activeLoadMore}>
            Load more
        </button>
    )
}