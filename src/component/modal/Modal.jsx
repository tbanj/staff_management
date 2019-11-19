import React from 'react';

import "./modal.scss";
const Modal = ({ children, showModal, handleClose }) => {
    const showHideClassName = showModal ? "modal display-block show" : "modal display-none fade";

    return (<React.Fragment>
        <div className={showHideClassName}>
            <section className="modal-dialog modal-lg">
                {children}
            </section>
        </div>
    </React.Fragment>);
}

export default Modal;