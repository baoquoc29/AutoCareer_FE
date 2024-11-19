import React from "react";
import PropTypes from "prop-types";

const ModalComponent = ({id, title, body, primaryAction, secondaryAction}) => {
    return (
        <>
            <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={`${id}Label`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`${id}Label`}>{title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {body}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={secondaryAction}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={primaryAction}>Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
ModalComponent.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.node.isRequired,
    primaryAction: PropTypes.func,
    secondaryAction: PropTypes.func,
};
export default ModalComponent;