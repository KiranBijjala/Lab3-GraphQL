import React, { Component } from 'react'
import '../../App.css'
import './RestaurantMenu.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getRestaurantDetails } from '../../actions'
import { getrestaurantsections } from '../../actions'
import { getSectionsMenu } from '../../actions'
import { loginuser } from '../../actions'
import { getUserImage } from '../../actions'
import SectionMenu from './SectionMenu'
import Cart from '../Cart/Cart'
import { connect } from 'react-redux'
import BuyerOwnerNav from '../Display/BuyerOwnerNav'

import { Field, reduxForm } from 'redux-form'

// Define a Login Component
class RestaurantMenu extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      file: '',
      img: '',
      sections: '',
      sectionArr: '',
      restaurantimg: '',
      restaurantnames: '',
      restaurantdetails: '',
      authFlag: false,
      authFailed: false
    }
  }
  // Call the Will Mount to set the auth Flag to false
  componentWillMount () {
    let name = sessionStorage.getItem('selectedRestaurant')
    console.log(name);
    let data = {
      restaurant_name: name
    }
    axios.defaults.withCredentials = true

    this.props.getrestaurantsections({ params: data }, response => {
      console.log( this.props.user)
      this.setState(
        {
          sections: this.props.user
        },()=>{
          // sessionStorage.setItem('sections', this.state.sections)
        }
      )
      console.log(this.props.user);
      sessionStorage.setItem('sections', this.state.sections)
      let v = sessionStorage.getItem('sections');
      console.log(v);
    })
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    // redirect based on successful login
    // let redirectVar = null
    let invalidtag = null
    let menulist = null
    let resturantslist = null
    let displayCart = null
    

    if (sessionStorage.getItem('checkout') !== 'new') {
      displayCart = (
        <Cart data={JSON.parse(sessionStorage.getItem('checkout'))} />
      )
    } else {
      displayCart = <div>Add items to your cart</div>
    }

    let list = this.state.sections
    if (typeof list === 'undefined' && list === null) {
      resturantslist = <div>Loading data!</div>
    } else {
      resturantslist = Object.keys(list).map(section => {
        return (
          <div>
            <h2>{list[section]}</h2>
            <div class='list-group'>
              <SectionMenu
                sections={list[section]}
                restaurant={sessionStorage.getItem('selectedRestaurant')}
              />
            </div>
          </div>
        )
      })
    }

    // if (!cookie.load('cookie')) {
    //   redirectVar = <Redirect to='/login' />
    // }

    let redirectVar  = null
    if (sessionStorage.getItem('JWT' === null)){ 
      redirectVar  = <Redirect to='/login'/>
    }


    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Invalid user name password!</label>
      )
    }
    let updatePic = null

    if (this.state.file !== '') {
      updatePic = (
        <button
          style={{ marginLeft: '537px' }}
          className='btn btn-link'
          type='submit'
        >
          Update
        </button>
      )
    }
    return (
      <div>
        {redirectVar}
       
        
        <div className='row'>
          <div className='col-sm-2'>
            <BuyerOwnerNav />
          </div>
          <div className='col-sm-10'>
            <div class='container'>
              <div class='login-form'>
                <div className='row'>
                </div>
                {resturantslist}
                <div class='main-div'>
                  <div class='panel'>

                    <div className='row'>
                      <div className='col-sm-4'>
                        <h2>Item</h2>
                      </div>
                      <div className='col-sm-4'>
                        <h2>Quantity</h2>
                      </div>
                      <div className='col-sm-4'>
                        <h2>Price</h2>
                      </div>
                    </div>
                    
                  </div>
                  {displayCart}
                </div>
                
              </div>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}


export default connect(
  mapStateToProps,
  { getrestaurantsections, getSectionsMenu }
)(
  reduxForm({
    form: 'streamSearch'
    // validate: validate
  })(RestaurantMenu)
)
