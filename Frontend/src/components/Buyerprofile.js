import React, { Component } from 'react';
import '../App.css';
import '../css/Buyerprofile.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import '../css/new.css';
// import { getProfile } from '../actions'
// import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';
import NavBar from './NavBar.js';
import {getUserProfile} from "../queries/queries";
import {updateProfile} from "../mutation/mutation";
import {graphql,withApollo} from "react-apollo";
// import { getUserImage } from '../actions'
import BuyerOwnerNav from './Display/BuyerOwnerNav'
import * as compose from 'lodash.flowright';
const ROOT_URL = "http://localhost:3001";



//Define a Login Component
class Buyerprofile extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            first_name: "",
            last_name: "",
            profilepic: '',
            email: "",
            password: "",
            authFlag: false,
            failuser: false,
            selectedFile: null,
            phone: '',
            newEmail: '',
            // path: ''
        }
    }

    //Call the Will Mount to set the auth Flag to false

    componentWillMount() {

        this.props.client.query({
            query:getUserProfile,
            variables:{
                email : sessionStorage.getItem('email')
            }}    
        ).then((res)=>{
            if(res.data){
                console.log(JSON.stringify(res.data.getUserProfile))
                let temp = res.data.getUserProfile
                this.setState({  email: temp.email,
                    phone: temp.phone,
                    password: temp.password,
                    first_name: temp.first_name,
                    last_name: temp.last_name
                })
                // alert(JSON.stringify(res.data.getUserProfile));
                }
                console.log("Hello")
        })  
                
}

    update = (e) => {
        this.props.client
            .mutate({
                mutation: updateProfile,
                variables: {
                    // id: cookies.load('userid'),
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: sessionStorage.getItem('email'),
                    password: this.state.password,
                    phone: this.state.phone,
                    // path :this.state.path
                }
            })
            .then(res => {
                // alert("Response" + JSON.stringify(res));
                alert(JSON.stringify(res.data.updateProfile));
                let temp = res.data.updateProfile
                this.setState({
                    phone: temp.phone,
                    password: temp.password,
                    first_name: temp.first_name,
                    last_name: temp.last_name

                })
                window.location.reload()
            });
           
    }
    imageChangeHandler = e => {
        this.setState({
            file: e.target.files[0]
        })
    }

    uploadImage = e => {
        e.preventDefault()
        console.log(this.state.file);
        const formData = new FormData()

        let email = sessionStorage.getItem('email')
        formData.append('myImage', this.state.file, email)
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios
            .post('/userprofile', formData, config)
            .then(response => {
                let data = { 'email': email }
                axios.post(`${ROOT_URL}/userimage`, data).then(response => {
                    console.log('Axios get:', response.data)
                    this.setState({
                        profilepic: 'data:image/png;base64, ' + response.data
                    })
                })
                
            })
            .catch(error => { })
    }



    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    
    onSubmit = (e) => {
        // console.log("in submit profile");
        // const data = {
            // first_name: this.state.first_name,
            // last_name: this.state.last_name,
            // email: this.state.email,
            // password: this.state.password,
            // phone: this.state.phone,
            // path :this.state.path
        // }
        // console.log("in submit profile  data:" + data);
        // this.props.getProfile(data
        //     , (res) => {
        //         console.log("update profile", res.data);
        //         if (res.status === 200) {
        //             console.log(res.data[0]);
        //             // sessionStorage.setItem('Email', res.data[0].Email);
        //             // this.props.history.push('/login');
        //         }
        //     })

        this.props.client
            .mutate({
                mutation: updateProfile,
                variables: {
                    // id: cookies.load('userid'),
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email,
                    password: this.state.password,
                    phone: this.state.phone,
                    // path :this.state.path
                }
            })
            .then(res => {
                alert("Response" + JSON.stringify(res));
                console.log("Data: " + JSON.stringify(res.data));
            });

    }

    


    render() {
        let updatePic = null

        if (this.state.file !== '') {
            updatePic = (
                <button
                    className='btn btn-link'
                    type='submit'
                >
                    Update
        </button>
            )
        }
        //redirect based on successful login
        // let createlogin = null;

        // if (!cookie.load('cookie')) {
        //     createlogin = <Redirect to="/login" />
        // }

        let redirectVar  = null
    if (sessionStorage.getItem('JWT' === null)){ 
      redirectVar  = <Redirect to='/login'/>
    }


        let createlogin = null;
        if (this.state.authFlag) {
            createlogin = <Redirect to="/login" />
        }

        return (
            <div>
                {createlogin}
                {redirectVar}
                <div className="row">
                    <div className="col-sm-2">
                        <BuyerOwnerNav/>                       
                         </div>

                    <div className="col-sm-10">
                        <div class="container">
                            <div class="login-form">
                                <div className="column-change">
                                    {/* <div class="main-div"> */}
                                    <div class="panel">
                                        <h2 style={{ fontWeight: "bold", color: "black" }}>Your account</h2>
                                    </div>

                                    <form onSubmit={this.uploadImage} enctype='multipart/form-data'>
                                        <div>
                                            <img
                                                src={this.state.profilepic}
                                                width='300'
                                                height='300'
                                            />
                                            <input
                                                type='file'
                                                onChange={this.imageChangeHandler}
                                                name='myImage'
                                                id='myImage'
                                            />
                                            <br />
                                        </div>
                                        <span class='Error' />
                                        {updatePic}
                                    </form>


                                    <div className="editname">
                                        <h3>Edit account</h3><br></br>
                                    </div>
                                    <div className="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>First name: {this.state.first_name}</div>
                                        <div className="boxwidth-change">
                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="first_name" placeholder='Edit first name' />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Last name: {this.state.last_name} </div>
                                        <div className="boxwidth-change">
                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" autoFocus name="last_name" placeholder='Edit Last name' />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Current password : ***** </div>
                                        <div className="boxwidth-change">
                                            <input
                                                onChange={this.inputChangeHandler}
                                                type="password"
                                                placeholder="Edit Password"
                                                class="form-control"
                                                name="password" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Current Phone: {this.state.phone}</div>
                                        <div className="boxwidth-change">
                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="phone" placeholder='Edit Phone' />
                                        </div>
                                    </div>

                                    <div className="wrapperbutton">
                                        <button type="submit" className="button-edit" onClick={this.update}>update</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
             </div >



        )
    }
}
// const validate = (formValues) => {

//     const error = {};

//     // Validate the inputs from 'values'
//     if (!formValues.firstname) {
//         error.first_name = "Enter valid first_name";
//     }
//     if (!formValues.lastname) {
//         error.last_name = "Enter valid lastname";
//     }
//     if (!formValues.email) {
//         error.email = "Enter valid email";
//     }
//     if (!formValues.phone) {
//         error.phone = "Enter valid phone";
//     }
//     if (!formValues.password) {
//         error.password = "Enter valid password";
//     }

//     // If errors is empty, the form is fine to submit
//     // If errors has *any* properties, redux form assumes form is invalid
//     return error;
// }


// function mapStateToProps(state) {
//     return {
//       user: state.user
//     };
//   }
  
//   export default connect( mapStateToProps , {getProfile: getProfile, getUserImage:getUserImage})(Buyerprofile);

export default compose(
    graphql(getUserProfile),
    graphql(updateProfile)
)(withApollo(Buyerprofile));