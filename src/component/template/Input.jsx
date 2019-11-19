import React from 'react';
const Input = ({ name, label, error, placeholder, addElement = "", labelClass = "", ...rest }) => {
    return (
        <div className="form-group">
            <label className={labelClass} htmlFor={name}>{label}{addElement}</label>
            <input id={name} name={name}  {...rest} className="form-control" aria-describedby="textHelp" placeholder={` ${placeholder}`} />
        </div>
    );
}

export default Input;