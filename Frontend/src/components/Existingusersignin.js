import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {graphql,withApollo} from "react-apollo";
import {Login} from "../mutation/mutation";
//Define a Login Component
class Existingusersignin extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            password : "",
            authFlag : false,
            failuser: false
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    
    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {

        this.props.client
            .mutate({
                mutation: Login,
                variables: {
                    email : this.state.email,
                    password : this.state.password
                }
            })
            .then(res => {

                console.log("Data: " + JSON.stringify(res.data));
                let temp = (res.data.Login)
                alert(JSON.stringify(res.data));
                sessionStorage.setItem('email',temp.email)
                this.props.history.push('/home')
                
            });

        
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(this.state.authFlag){
            redirectVar = <Redirect to= "/Letseat"/>
        }

        return(
            <div>
                {redirectVar}
                {/* <form onSubmit = {this.submitLogin}> */}
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Sign in with your Grubhub</h2>
                                <h2>account</h2>
                            
                        </div>  
                            <div class="form-group">
                                <div>Email</div>
                                <input onChange = {this.emailChangeHandler} type="text" class="form-control" required autoFocus name="email" />
                            </div>
                            <div class="form-group">
                                <div>Password</div>
                                <input onChange = {this.passwordChangeHandler} type="password" required class="form-control" name="password" />
                            </div><br></br>

                
                            <button type = "submit" onClick={this.submitLogin} className ="button">Sign in</button> <br></br>
                            
                            <div style = {{textAlign:"center"}}>or</div>

                            <div className="heading1">
        
                            </div><br></br>
                            <div >
                            <button className="fbbutton"> Continue with Facebook </button>  
                            </div><br></br>  
                            <div >
                            <button className="googlebutton"> Continue with Google </button>  
                            </div> <br></br>
                            {/* <a  href="/Buyersignup">Create your account</a> */}
                            <div><Link to="/signup">Create your account</Link></div>
                            </div> 
                    </div>
                </div>
                {/* </form> */}
            </div>
        )
    }
}
// export Login Component
export default 
  graphql(Login)
(withApollo(Existingusersignin));

// export default Existingusersignin