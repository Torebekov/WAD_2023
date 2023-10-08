import React from 'react';
import './hoc.css';

const withHoverBorder = (WrappedComponent) => {
    return (props) => {
        return (
            <div className="hoc-wrapper">
                <div className="hoc-content">
                    <WrappedComponent {...props} />
                </div>
            </div>
        );
    };
};

export default withHoverBorder;
