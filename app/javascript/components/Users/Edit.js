import React from "react";
import FormInput from "../FormInput";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.user.first_name,
      lastName: props.user.last_name,
    }
  }

  nameChangeHandler = event => {
    const params = {
      [event.target.name]: event.target.value,
    }
    this.setState(params);
  }

  onSaveHandler = () => {
    const { firstName, lastName } = this.state;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Email": this.props.user.email,
        "X-Auth-Token": this.props.user.auth_token,
      },
      body: JSON.stringify({ user: { first_name: firstName, last_name: lastName} }),
    };
    fetch(this.props.user.update_url, requestOptions)
      .then(
        response => {
          location.assign(this.props.root_path);
        }
      )
  }

  render() {
    const { firstName, lastName } = this.state;
    return (
      <div className="w-full max-w-sm justify-center">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              First Name
            </label>
          </div>
          <div className="md:w-2/3">
            <FormInput
              name="firstName"
              value={firstName}
              onChangeHandler={this.nameChangeHandler}
              dataTestId="modal-user-first-name"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Last Name
            </label>
          </div>
          <div className="md:w-2/3">
            <FormInput
              name="lastName"
              value={lastName}
              onChangeHandler={this.nameChangeHandler}
              dataTestId="modal-user-first-name"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-1 mr-1"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={() => location.assign(this.props.root_path)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-1"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={this.onSaveHandler}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Edit;