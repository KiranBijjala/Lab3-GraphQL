import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { signup } from '../mutation/mutation';
import { graphql, withApollo } from "react-apollo";
import { flowRight as compose } from 'lodash'
const ROOT_URL = "http://localhost:3001";
// const ROOT_URL = "http://3.133.145.87:3001";

//Define a Login Component
class Buyersignup extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            phone: '',
            authFlag: false,
            failuser: false
        }

    }

    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //username change handler to update state variable with the text entered by the user
    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitSignup = (e) => {

        this.props.client
            .mutate({
                mutation: signup,
                variables: {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    phone: this.state.phone,
                    email: this.state.email,
                    password: this.state.password
                }
            })
            .then(res => {
                console.log(this.state.first_name)
                alert("Response" + JSON.stringify(res.data));
                console.log("Data: " + JSON.stringify(res.data));
            });
            this.props.history.push('/login')

    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (this.state.authFlag) {
            redirectVar = <Redirect to="/login" />
        }
        let userexists = null;
        if (this.state.failuser) {
            userexists = (
                <label style={{ color: "red" }}>User already exists .Please create account  </label>
            )
        }

        return (
            <div>
                {redirectVar}
                <div class="container">

                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2 style={{ fontWeight: "bold", color: "black" }}>Create your account</h2>
                            </div>

                            <div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <label style={{ fontWeight: "normal" }}>First name</label>
                                    </div>
                                    <div class="col-sm-6">
                                        <label style={{ fontWeight: "normal" }}>Last name</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-6">
                                    <input required onChange={this.inputChangeHandler} type="text" class="form-control" name="first_name" />
                                </div>
                                <div class="col-sm-6">
                                    <input onChange={this.inputChangeHandler} type="text" class="form-control" name="last_name" />
                                </div>
                            </div>


                            <div>
                                <label style={{ fontWeight: "normal" }}>Email</label>
                            </div>

                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="email" />
                            </div>

                            <div>
                                <label style={{ fontWeight: "normal" }}>Password</label>
                            </div>

                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="password" class="form-control" name="password" />
                            </div><br></br>

                            <div>
                                <label style={{ fontWeight: "normal" }}>Phone</label>
                            </div>

                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="number" class="form-control" name="phone" />
                            </div><br></br>

                            <button type="submit" onClick={this.submitSignup} class="btn btn-primary">Create your account</button> <br></br><br></br>
                            {userexists}
                            <div style={{ textAlign: "center" }}>or</div>





                            <div>
                                <button type="button" style={{ backgroundColor: "#3b5998", color: "white" }} className="btn btn-primary"> Log in with Facebook </button>
                            </div><br></br>

                            <div>
                                <button type="button" style={{ backgroundColor: "#4285f4", color: "white" }} className="btn btn-primary"> Log in with Google </button>
                            </div> <br></br>

                            <div className="textAligncenter">
                                <label >Have an account?<span style={{ color: "blue" }}><a href="/login">Sign in</a></span></label>
                                {/* <div><Link to="/login">Sign in</Link></div> */}
                            </div><br></br>
                            <p style={{ fontSize: "10px" }}>By creating your Grubhub account, you agree to the <span style={{ color: "blue" }}>Terms of Use </span>and <span style={{ color: "blue" }}>Privacy Policy</span>  </p>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//export Login Component
export default compose(
    graphql(signup)
)(withApollo(Buyersignup));