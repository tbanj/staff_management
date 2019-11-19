import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './Input';
import InputJob from './InputJob';
import InputJobPosition from './InputJobPosition';
import InputOnly from './InputOnly';
class Form extends Component {
    state = { data: {}, errors: {}, dataJob: {}, errorsJob: {} }

    /* Job Apply for start */
    validateJobProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schemaJob = { [name]: this.schemaJob[name] }
        const { error } = Joi.validate(obj, schemaJob);
        return error ? error.details[0].message : null;
    }

    validateJob = () => {
        const option = { abortEarly: false };
        const result = Joi.validate(this.state.dataJob, this.schemaJob, option);
        if (!result.error) return null;
        const errorsJob = {};
        for (let item of result.error.details)
            errorsJob[item.path[0]] = item.message;
        return errorsJob;
    };

    handleJobSubmit = (e) => {
        // is use to prevent the form from sending detail to server
        e.preventDefault();
        const errorsJob = this.validateJob();
        this.setState({ errorsJob: errorsJob || {} });
        if (errorsJob) return;
        this.doJobSubmit();
    };


    handleJobChange = ({ currentTarget: input }) => {
        const errorsJob = { ...this.state.errorsJob };
        console.log(input.value);
        const errorMessage = this.validateJobProperty(input);
        if (errorMessage) errorsJob[input.name] = errorMessage;
        else delete errorsJob[input.name];
        const dataJob = { ...this.state.dataJob };
        dataJob[input.name] = input.value;
        this.setState({ dataJob, errorsJob })
    };

    handleJobChanger = ({ currentTarget: input }) => {
        const errorsJob = { ...this.state.errorsJob };
        const errorMessage = this.validateJobProperty(input);
        if (errorMessage) errorsJob[input.name] = errorMessage;
        else delete errorsJob[input.name];
        const dataJob = { ...this.state.dataJob };
        dataJob[input.name] = input.value;
        this.setState({ dataJob, errorsJob })
    };

    /* Job Apply for end */
    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] }
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    validate = () => {
        const option = { abortEarly: false };
        const result = Joi.validate(this.state.data, this.schema, option);
        if (!result.error) return null;
        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    };

    handleSubmit = (e) => {
        // is use to prevent the form from sending detail to server
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors })
    };

    handleChanger = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors })
    };

    renderButton(addIcon = "", label, classType = "btn btn-primary", buttonType = "button", styleType = {}, modalClose) {
        return (
            <button disabled={this.validate()} type={buttonType} data-dismiss={modalClose}
                className={classType} style={styleType}>
                {label} {<i className={addIcon}></i>}</button>
        );
    }

    renderDropdown(name, label, data, labelClass, addElement = '') {
        const { errors } = this.state;
        return (
            <div className="form-group">
                <label className={labelClass} htmlFor={name}>{label} {addElement}</label>
                <select value={this.state.data.enquiryType} className="form-control select2" onChange={this.handleChange} id={name} name={name} >
                    <option></option>
                    {data.map((data, key) => (
                        <option value={data.title} key={key}>{data.title}</option>
                    ))}
                </select>
                {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
            </div>

        )
    }

    renderInput(name, label, placeholder, type = "text", autoFocus = false, addElement = "", labelClass) {
        const { data, errors } = this.state;
        return (<Input type={type} name={name} autoFocus={autoFocus} value={data[name]} label={label}
            onChange={this.handleChange} addElement={addElement} placeholder={placeholder} labelClass={labelClass}
            error={errors[name]} />)
    }

    renderTextarea(name, label, placeholder, row = 4, classType = '', addElement = '', labelClass) {
        const { data } = this.state;
        return (
            <div className="form-group">
                <label className={labelClass} htmlFor={name}>{label}  {addElement}</label>
                <textarea className={classType} placeholder={placeholder} name={name} value={data[name]}
                    onChange={this.handleChange} row={row} />
            </div>
        )
    }

    // file upload
    renderUploadFile(name, label, placeholder, type = "file", addElement = "",
        divClass = "", inputClass = "custom-file-input", labelClass) {
        const { data } = this.state;
        return (
            <div className="form-group">
                <label className={labelClass} htmlFor={name}>{label}</label>
                <span>{addElement}</span>
                <div className={divClass}>
                    <input type={type} className={inputClass} name={name} id="customFile" value={data[name]}
                        onChange={this.handleChange} />
                    {/* <label className="custom-file-label" for="customFile">{placeholder}</label> */}
                </div>
            </div>
        )
    }

    /*  job apply inputs tag start */
    renderJobButton(addIcon = "", label, classType = "btn btn-primary", buttonType = "button", styleType = {}, modalClose) {
        return (
            <button disabled={this.validateJob()} type={buttonType} data-dismiss={modalClose}
                className={classType} style={styleType}>
                {label}{<i className={addIcon}></i>}</button>
        );
    }

    // file upload
    renderJobUploadFile(name, label, placeholder, type = "file", addElement = "",
        divClass = "", inputClass = "custom-file-input", labelClass) {
        const { dataJob } = this.state;
        return (
            <div className="form-group">
                <div className="row">
                    <div className="col-md-2 pt-2"><label className={labelClass} htmlFor={name}>{label} {addElement}</label></div>
                    <div className="col-md-10">
                        <div className={divClass}>
                            <input type={type} className={inputClass} name={name} id="customFile" value={dataJob[name]}
                                onChange={this.handleJobChange} />
                            {/* <label className="custom-file-label" for="customFile">{placeholder}</label> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderJobTextarea(name, label, placeholder, row = 4, classType = '', addElement = '', labelClass) {
        const { dataJob } = this.state;
        return (
            <div className="form-group">
                <div className="row">
                    <div className="col-md-3"> <label className={labelClass} htmlFor={name}>{label} {addElement}</label></div>
                    <div className="col-md-9">
                        <textarea className={classType} placeholder={placeholder} name={name} value={dataJob[name]}
                            onChange={this.handleJobChange} row={row} />
                    </div>
                </div>
            </div>
        )
    }



    renderJobInput(name, label, placeholder, type = "text", autoFocus = false, addElement = "", labelSize, inputSize, labelClass) {
        const { dataJob, errorsJob } = this.state;
        return (<InputJob type={type} name={name} autoFocus={autoFocus} value={dataJob[name]} label={label}
            onChange={this.handleJobChange} addElement={addElement} placeholder={placeholder}
            error={errorsJob[name]} labelClass={labelClass} />)
    }

    renderJobInputPosition(name, label, placeholder, type = "", autoFocus = false, addElement = "", labelSize, inputSize, labelClass) {
        const { dataJob, errorsJob } = this.state;
        return (<InputJobPosition type={type} name={name} autoFocus={autoFocus} value={dataJob[name]} label={label}
            onChange={this.handleJobChange} addElement={addElement} placeholder={placeholder}
            labelSize={labelSize} inputSize={inputSize} labelClass={labelClass}
            error={errorsJob[name]} />)
    }
    /*  job apply inputs tag end */

    renderInputOnly(name = "", placeholder, type = "", autoFocus = false, addElement = "", divClass, inputSize) {
        const { dataJob, errorsJob } = this.state;
        console.log(name);
        return (<InputOnly type={type} name={name} autoFocus={autoFocus} value={dataJob[name]}
            onChange={this.handleChange} addElement={addElement} placeholder={placeholder}
            inputSize={inputSize} divClass={divClass}
            error={errorsJob[name]} />)
    }


    renderJobInputOnly(name = "", placeholder, type = "", autoFocus = false, addElement = "", divClass, inputSize) {
        const { dataJob, errorsJob } = this.state;
        console.log(name);
        return (<InputOnly type={type} name={name} autoFocus={autoFocus} value={dataJob[name]}
            onChange={this.handleJobChange} addElement={addElement} placeholder={placeholder}
            inputSize={inputSize} divClass={divClass}
            error={errorsJob[name]} />)
    }
}

export default Form;