import React, { Component } from "react";

class Modal extends Component {
  componentDidMount() {
    const { keyboard = true, backdrop = true, isModalOpen } = this.props;
    $(this.modal).modal({
      keyboard,
      backdrop,
      show: isModalOpen,
    });
    $(this.modal).on("hidden.bs.modal", () => {
      this.closeModal();
    });
  }

  closeModal = () => {
    this.props.closeModal();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isModalOpen !== this.props.isModalOpen) {
      this.modalAction(this.props.isModalOpen);
    }
  }

  modalAction(openModal) {
    $(this.modal).modal(openModal ? "show" : "hide");
  }

  render() {
    const {
      title = "",
      header,
      footer,
      showCloseButton = true,
      modalClass = "",
      modalDialogClass = "",
      dataTestId,
    } = this.props;
    const headerStyle = !title ? { borderBottom: "none" } : {};
    return (
      <div
        className={`modal fade ${modalClass}`}
        tabIndex="-1"
        ref={el => {
          this.modal = el;
        }}
      >
        <div
          className={`modal-dialog modal-dialog-centered ${modalDialogClass}`}
        >
          <div className="modal-content">
            {(!!title || showCloseButton) && !header && (
              <div
                className="modal-header align-items-center"
                style={headerStyle}
              >
                {!!title && (
                  <h4
                    className="modal-title"
                    data-test-id={dataTestId + "-title"}
                  >
                    {title}
                  </h4>
                )}
                {showCloseButton && (
                  <button
                    type="button"
                    className="close"
                    onClick={this.closeModal}
                    data-test-id={dataTestId + "-close"}
                  >
                    &times;
                  </button>
                )}
              </div>
            )}
            {!!header && (
              <div
                className="modal-header"
                data-test-id={dataTestId + "-header"}
              >
                {header}
              </div>
            )}
            <div className="modal-body" data-test-id={dataTestId + "-body"}>
              {this.props.children}
            </div>
            {!!footer && (
              <div
                className="modal-footer"
                data-test-id={dataTestId + "-footer"}
              >
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
