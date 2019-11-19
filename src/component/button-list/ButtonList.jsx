import React, { Component } from 'react';
import PropTypes from 'prop-types';
class ButtonList extends Component {
    submitEvent() {
        if (this.props.emitEvent) {
            this.props.emitEvent();
        }
    }

    render() {
        const { buttonText } = this.props;
        return (<React.Fragment>
            <button onClick={() => this.submitEvent()} data-test="buttonListComponent">{buttonText}</button>
        </React.Fragment>);
    }
}

ButtonList.propTypes = {
    buttonText: PropTypes.string,
    emitEvent: PropTypes.func,
}

export default ButtonList;