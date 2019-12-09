import { gql } from 'apollo-boost';

const getUserProfile = gql`
query getUserProfile($email:String)
{
  getUserProfile(email:$email)
    {
    
    email
    first_name
    last_name 
    password
    phone
    
    }
    
}
`
const getOwnerProfile = gql`
query getOwnerProfile($email:String)
{
getOwnerProfile(email : $email)
{
first_name
last_name 
password
restaurant_name
restaurant_zipcode
cuisine

}
} 
`

const searchRestaurants= gql`
query searchRestaurants($restaurant_zipcode:String,
  $dish_name : String)
      {
        searchRestaurants(restaurant_zipcode:$restaurant_zipcode,
        dish_name: $dish_name)
          {
            restaurant_name
            
          }
          
  }
`  

export { getUserProfile,getOwnerProfile,searchRestaurants};