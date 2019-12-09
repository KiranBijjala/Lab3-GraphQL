import { gql } from 'apollo-boost';

const signup = gql`
mutation signup(
                    $email: String,
                    $first_name : String,
                    $last_name : String,
                    $password: String,
                    $phone : String
                    )
{
signup(email:$email
    first_name : $first_name
    last_name : $last_name
    password:$password
    phone : $phone)
{
email
first_name
last_name 
password
phone 
}
}
`

const Login = gql`
mutation Login(
                    
                    $email: String,
                    $password: String,
                    )
{
Login(email:$email
    password:$password)
{
email
password
}
}
`

const updateProfile = gql`
mutation updateProfile(
                    $id  :ID,
                    $email : String,
                    $first_name : String,
                    $last_name : String,
                    $password : String,
                    $phone :String
                    )
{
updateProfile(id:$id,email:$email,first_name: $first_name, last_name: $last_name,password:$password ,phone:$phone  )
{
id
email
first_name
last_name
password
phone
}
}
`

const ownerlogin = gql`
mutation ownerlogin(
                    
    $email: String,
    $password: String,
    )
{
ownerlogin(email:$email
password:$password)
{
email
password
first_name
last_name
}
}
`

const ownersignup = gql`
mutation ownersignup(
    $email: String,
    $first_name : String,
    $last_name : String,
    $password: String,
    $restaurant_name:String,
                      $restaurant_zipcode:String,
                      $cuisine:String
    )
{
ownersignup(email:$email
first_name : $first_name
last_name : $last_name
password:$password
restaurant_name : $restaurant_name
restaurant_zipcode : $restaurant_zipcode
cuisine : $cuisine)
{
email
first_name
last_name 
password
restaurant_name
restaurant_zipcode
cuisine
}
}
`

const updateOwnerProfile = gql`
mutation updateOwnerProfile(
    $id  :ID,
    $email : String,
    $first_name : String,
    $last_name : String,
    $password : String,
    $restaurant_name:String,
$restaurant_zipcode: String,
$cuisine : String
    )
{
updateOwnerProfile(id:$id,email:$email,first_name: $first_name, last_name: $last_name,password:$password ,restaurant_name: $restaurant_name,restaurant_zipcode: $restaurant_zipcode, cuisine: $cuisine )
{
id
email
first_name
last_name
password
restaurant_name
restaurant_zipcode
cuisine
}
}
`



export { Login, signup, updateProfile, ownerlogin, ownersignup, updateOwnerProfile };

