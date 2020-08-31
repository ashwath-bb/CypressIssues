import React from "react";
import Modal from "./Modal";
import TailwindModal from "./TailwindModal";
import FormInput from "./FormInput";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showStaticModal: false,
      userName: this.props.userDetails.user_name,
    };
  }

  handleLogout = () => {
    this.setState({ scrollTesting: false });
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(this.props.userDetails.logoutUrl, requestOptions).then(
      response => {
        window.location.reload();
      }
    );
  };

  setTailwindModal = bool => this.setState({ showModal: bool, scrollTesting: false });

  setBootstrapModal = bool => this.setState({ showStaticModal: bool, scrollTesting: false });

  nameChangeHandler = event => {
    const params = {
      [event.target.name]: event.target.value,
    }
    this.setState(params);
  }

  renderBootstrapModal = () => {
    return (
      <Modal
        modalClass="cypress-modal"
        title="Cypress Test Modal"
        isModalOpen={this.state.showStaticModal}
        closeModal={() => this.setBootstrapModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Full Name:
        </label>
        <FormInput
          name="userName"
          value={this.state.userName}
          onChangeHandler={this.nameChangeHandler}
          dataTestId="modal-user-name"
        />
        <div className="mt-4 mb-4">
          <button
            type="button"
            className="btn btn-info mr-3"
            onClick={() => this.setBootstrapModal(false)}
            data-test-id="modal-cancel"
          >
            Close
          </button>
        </div>
      </Modal>
    )
  }

  scrollTesting = () => {
    this.setState({ scrollTesting: true });
  }

  renderButton = (color, buttonText, handler) => {
    return (
      <button
        className={`bg-${color}-400 text-white active:bg-${color}-600 font-bold uppercase text-sm px-6 py-3 outline-none focus:outline-none mr-1 mb-1`}
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={handler}
      >
        {buttonText}
      </button>
    )
  }
  render() {
    const { showModal, showStaticModal } = this.state;

    return (
      <React.Fragment>
        <div className="flex mb-4">
          <div className="w-1/4 bg-red-400 h-13 text-center">
            {this.renderButton('red', 'Test Logout', this.handleLogout)}
          </div>
          <div className="w-1/4 bg-green-400 h-13 text-center">
            {this.renderButton('green', 'Test Scroll', this.scrollTesting)}
          </div>
          <div className="w-1/4 bg-orange-400 h-13 text-center">
            {this.renderButton('orange', 'Bootstrap modal', () => this.setBootstrapModal(true))}
            {this.renderBootstrapModal()}
          </div>
          <div className="w-1/4 bg-blue-400 h-13 text-center">
            <a href={this.props.userDetails.editLink} className="no-underline text-white font-bold uppercase text-sm px-6 py-3">
              Test Partial Typing<br />
              (Edit User)
            </a>
          </div>
          <div className="w-1/4 bg-pink-400 h-13 text-center">
            {this.renderButton('pink', 'Tailwind modal', () => this.setTailwindModal(true))}
            {showModal &&
              <TailwindModal
                setModal={this.setTailwindModal}
              />
            }
          </div>
        </div>
        { this.state.scrollTesting && (
          <React.Fragment>
            <div className="h-screen text-center bg-green-400">
              A Dummy Container To Test Scroll. There is an input field at the bottom of the page.
              <div className="justify-center">
                <button
                  className="text-right bg-green-700 text-white uppercase p-1 rounded"
                  onClick={() => this.setState({ scrollTesting: false })}
                >
                  Remove Container
                </button>
              </div>
            </div>
            <div className="flex mt-4 mb-4">
              <div className="w-1/2 h-13 text-center">
                <FormInput
                  name="userName"
                  value={this.state.userName}
                  onChangeHandler={this.nameChangeHandler}
                  dataTestId="scroll-test-user-name"
                />
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default App;
