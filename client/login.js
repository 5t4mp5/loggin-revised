import React, { Component } from "react";
import { connect } from "react-redux";
import { loginThunk } from "./store";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit = evt => {
    evt.preventDefault();
    this.props.loginThunk(this.state)
      .catch(e =>  this.setState({ error: "YOU DO NOT EXIST" }))
  }
  render() {
    return (
      <div className="h100 w100 flex column align-items-center justify-center">
        <h1>Let's Loggin'!</h1>
        <div className="flex w50">
          <img src="/loggin.png" />
          <form className="grow1" onSubmit={this.handleSubmit}>
            <div className="flex column">
              <div className="flex column m1">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" className="input" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="flex column m1">
                <label htmlFor="email">Password</label>
                <input type="password" name="password" className="input" value={this.state.password}  onChange={this.handleChange}/>
              </div>
              <div className="m1">
                <button type="submit" className="btn bg-blue white p1 rounded">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        {
          this.state.error.length ? <div>{this.state.error}</div> : ""
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { loginThunk: user => dispatch(loginThunk(user)) };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
