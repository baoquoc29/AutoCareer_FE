import React from 'react';
import PropTypes from "prop-types";

const Button = ({onClick, children, className = '', iconClass, disabled, style}) => {
    return (
        <>
            <button
                type="button"
                className={`btn btn-${style} hstack gap-2 ${className}`}
                onClick={onClick}
                disabled={disabled}
            >
                <i className={iconClass}></i>
                <span className="vr"></span>
                {children}
            </button>
        </>
    )
}
Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    style: PropTypes.string,
    className: PropTypes.string,
    iconClass: PropTypes.string,
    disabled: PropTypes.bool
};

export default Button;