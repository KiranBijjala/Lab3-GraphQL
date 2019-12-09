import React, { Component } from 'react'
import '../../App.css'
import './Home.css'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import eat from '../../image/eat.png'

import { graphql, withApollo } from "react-apollo";
import { flowRight as compose } from 'lodash'
import { searchRestaurants } from '../../queries/queries'


class Home extends Component {
  constructor() {
    super()
    this.state = {
      restaurant_zipcode: '',
      dish_name: ''

    }
  }
  // get the books data from backend
  componentDidMount() {
    let temp = sessionStorage.getItem('email')

  }

  onSubmit = (e) => {
    // console.log('OnSubmit: ' + formValues)
    //   let data = {
    //     restaurant_zipcode: formValues.zipcode,
    //     dish_name: formValues.dish
    //   }

    // axios.defaults.withCredentials = true

    // this.props.searchrestaurants({ params: data }, (response)=>{
    //   // console.log('search test: ' + this.props.user[0].restaurant_name)
    //   console.log(typeof response.data);
    //   // let newdata = JSON.parse(response.data);
    //   let data= response.data.map((restaurant)=>{
    //     return restaurant
    //   })
    //   console.log(data);

    //   if(!this.props.user){
    //     console.log('No records found ' + this.props.user)
    //   }else{
    //     console.log(this.props.user);

    //     sessionStorage.setItem('restaurants',data);
    //     this.props.history.push('/search');
    //   }
    // });

    this.props.client.query({
      query: searchRestaurants,
      variables: {
        restaurant_zipcode: this.state.restaurant_zipcode,
        dish_name: this.state.dish_name
      }
    })
      .then(res => {
        console.log(this.state.restaurant_zipcode)
        alert("Response" + JSON.stringify(res.data.searchRestaurants));
        console.log("Data: " + JSON.stringify(res.datasearchRestaurants));
        sessionStorage.setItem('restaurants', res.data.search)
        // this.props.history.push('/search')
      });



  }

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {


    let redirectVar = null
    if (sessionStorage.getItem('email' === null)) {
      redirectVar = <Redirect to='/login' />
    }
    return (
      <div>
        <div className='overlay'
          style={{ backgroundImage: `url(${eat})`, height: "50%" }}>

          {redirectVar}
          <h1 className='title'>
            <span>Who delivers in your neighborhood?</span>
          </h1>
          {/* <form class="form-inline" onSubmit={this.onSubmit}> */}
            <div class="form-home-group">
              <div className='form-group'>
                <input name="restaurant_zipcode" id="restaurant_zipcode" component={this.inputChangeHandler} placeholder='Zipcode' />
                <input name="dish_name" id="dish_name" component={this.inputChangeHandler} placeholder='Pizza, sushi, chinese' />
                <button onClick={this.onSubmit} className='btn btn-primary'>Find food</button>
              </div>
            </div>
          {/* </form> */}
        </div>
      </div>
    )
  }
}




export default compose(
  graphql(searchRestaurants)
)(withApollo(Home));