import React from "react";

import './Button.styles.scss';

const Button = ({title, disabled}) => {

    return (
        <div className="btn-wrapper">
            <button className="btn" disabled={disabled}>{title}</button>
        </div>
    );
};

export default Button;