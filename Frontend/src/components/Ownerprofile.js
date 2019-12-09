import React, { Component } from 'react'
import axios from 'axios'
import '../App.css';
import '../css/Buyerprofile.css';
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import {getOwnerProfile} from "../queries/queries";
import {updateOwnerProfile} from "../mutation/mutation";
import {graphql,withApollo} from "react-apollo";
import * as compose from 'lodash.flowright';
import '../css/new.css';
import { throwServerError } from 'apollo-link-http-common';
const ROOT_URL = "http://localhost:3001";

//Define a Login Component
class Ownerprofile extends Component {
    
    constructor(props) {
       
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            pic: '',
            email: "",
            restaurant_zipcode: "",
            restaurant_name: "",
            password: "",
            authFlag: false,
            failuser: false,
            cuisine:''
        }
    }

    componentWillMount () {
        this.props.client.query({
            query:getOwnerProfile,
            variables:{
                email : sessionStorage.getItem('email')
            }}    
        ).then((res)=>{
            if(res.data){
                console.log(JSON.stringify(res.data))
                let temp = res.data.getOwnerProfile
                this.setState({  
                    password: temp.password,
                    first_name: temp.first_name,
                    last_name: temp.last_name,
                    restaurant_name : temp.restaurant_name,
                    restaurant_zipcode : temp.restaurant_zipcode,
                    cuisine : temp.cuisine
                })
                }
        })  
    }

    uploadImage = e => {
        e.preventDefault()
        // var headers = new Headers();
        const formData = new FormData()
        

        let email = sessionStorage.getItem('email')
        
        formData.append('myImage', this.state.file, email)
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios
            .post('/ownerprofile', formData, config)
            .then(response => {
                let data = { 'email': email }
                axios.post(`${ROOT_URL}/ownerimage`, data).then(response => {
                    window.location.reload();
                    console.log('Axios get:', response.data)
                    this.setState({
                        pic: 'data:image/png;base64, ' + response.data
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

    imageChangeHandler = e => {
       
        this.setState({
            file: e.target.files[0]
        })
    }

    update = (e) => {

        this.props.client
            .mutate({
                mutation: updateOwnerProfile,
                variables: {
                    // id: cookies.load('userid'),
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: sessionStorage.getItem('email'),
                    password: this.state.password,
                    restaurant_name : this.state.restaurant_name,
                    restaurant_zipcode : this.state.restaurant_zipcode,
                    cuisine : this.state.cuisine
                    // path :this.state.path
                }
            })
            .then(res => {
                // alert("Response" + JSON.stringify(res));
                alert("Data: " + JSON.stringify(res.data.updateOwnerProfile));
                let temp = res.data.updateOwnerProfile
                this.setState({
                    password: temp.password,
                    first_name: temp.first_name,
                    last_name: temp.last_name,
                    restaurant_name : temp.restaurant_name,
                    restaurant_zipcode : temp.restaurant_zipcode,
                    cuisine : temp.cuisine

                })
                window.location.reload()
            });
       
    }

    



    render() {
        let updatePic = null

        if (this.state.file !== '') {
            updatePic = (
                <button
                    type='submit'
                >
                    Update
        </button>
            )
        }
        

        let redirectVar  = null
    if (sessionStorage.getItem('OwnerJWT' === null)){ 
      redirectVar  = <Redirect to='/ownerlogin'/>
    }


        let createlogin = null;
        if (this.state.authFlag) {
            createlogin = <Redirect to="/ownerlogin" />
        }

        return (
            <div>
                {createlogin}
                {redirectVar}
                <div className="row">
                    <div className="col-sm-2">
                        <div className="col-shift">
                            <h2>Your account</h2>
                            <ul class="nav flex-column">
                                <li className="new-change">
                                    <a className="nav-link active" href="/ownerprofile" >
                                        <span className="profilenew">Profile</span></a></li>
                                <li><a className="nav-link" href="#" >
                                    <span className="new" >Address and phone</span></a></li>
                                <li><a className="nav-link" href="/ownerrestaurantmenu" >
                                    <span className="new" >Restaurant Menu</span></a></li>
                                <li><a className="nav-link " href="/menu" >
                                    <span className="new" >Add Menu</span></a></li>
                                <li><a className="nav-link new" href="/restaurantpastorders" >
                                    <span className="new" >Past orders</span></a></li>
                                <li><a className="nav-link" href="/restaurantorders">
                                    <span className="new" >Upcoming orders</span></a></li>
                                    <li><a className="nav-link" href="/OwnerMessage" >
                                    <span className="new" >Message</span></a></li>
                                <li><a className="nav-link" href="#" >
                                    <span className="new" >Refer a friend</span></a></li>
                                <li><a className="nav-link" href="#" >
                                    <span className="new">Saved restaurants</span></a></li>
                            </ul>
                        </div>
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
                                                src={this.state.pic}
                                                width='200'
                                                height='200'
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

                                    {/* <div className="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Current Email: {this.state.email}</div>
                                        <div className="boxwidth-change">
                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="email" placeholder='Edit Email' />
                                        </div>
                                    </div> */}


                                    <div className="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Restaurant Name: {this.state.restaurant_name}</div>
                                        <div className="boxwidth-change">
                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="restaurant_name" placeholder='Edit Restaurant name' />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Zip Code: {this.state.restaurant_zipcode}</div>
                                        <div className="boxwidth-change">
                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="restaurant_zipcode" placeholder='Edit Zipcode' />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}> Cuisine: {this.state.cuisine}</div>
                                        <div className="boxwidth-change">
                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="cuisine" placeholder='Edit Email' />
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
 
export default compose(
    graphql(getOwnerProfile),
    graphql(updateOwnerProfile)
)(withApollo(Ownerprofile));