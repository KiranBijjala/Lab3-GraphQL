const graphql = require("graphql");
const _ = require("lodash");

var Buyer = require('../models/user')
var  Owner  = require('../models/owner');
var Menu = require('../models/menu')
const crypt = require('../crypt');
const mongoose = require('mongoose');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        image: { type: GraphQLString },
        phone: { type: GraphQLString }

    })
});

const OwnerType = new GraphQLObjectType({
    name: "Owner",
    fields: () => ({
        id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        restaurant_name: { type: GraphQLString },
        restaurant_zipcode: { type: GraphQLInt },
        cuisine: { type: GraphQLString },
        image: { type: GraphQLString }
    })
});



const Orders = new GraphQLObjectType({
    name: "Orders",
    fields: () => ({
        order_id: { type: GraphQLID },
        orderlist: { type: GraphQLString },
        total: { type: GraphQLInt },
        user_email: { type: GraphQLString },
        restaurant_name: { type: GraphQLString },
        order_status: { type: GraphQLString },
    })
});

const MenuType = new GraphQLObjectType({
    name: "Menu",
    fields: () => ({
        id: { type: GraphQLID },
        dish_name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        section: { type: GraphQLString },
        restaurant_name: { type: GraphQLString },
        restaurant_zipcode: { type: GraphQLString },
        image: { type: GraphQLString },

    })
});


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        Login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            async resolve(parent, args ) {
                // console.log("In Login"+JSON.stringify(args));
                let users = await Buyer.find(args, (err, res) => {
                    console.log("Error :" + err);

                    // res.send(JSON.stringify(res));
                });
                console.log("users :", users);
                if (!users || users.length === 0) {
                    throw errorObj({ _error: "User not found" });
                }
                // console.log(users)
                return users[0]
            }
        },

        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                phone: { type: GraphQLString },
                password: { type: GraphQLString }
            },
             async resolve(parent, args) {
                console.log("In Sign Up:", JSON.stringify(args));
                //   crypt.createHash(args.password, (hash) => {
                      let users =  await Buyer.create(
                        {   
                            first_name: args.first_name,
                            last_name: args.last_name,
                            email: args.email,
                            password: args.password,
                            phone: args.phone
                        }
                        
                        )
                return users

            }
            

        },

        updateProfile: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                email: { type: GraphQLString },
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                phone: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log("In Profile Update :", JSON.stringify(args));
                let found_users = await Buyer.findOneAndUpdate(args.email,
                    {
                        $set: {
                            first_name: args.first_name,
                            last_name: args.last_name,
                            password: args.password,
                            phone: args.phone
                        }
                    }, { new: true }, (err, res) => {
                        console.log("err : ", err);
                        console.log("res : ", res);

                    })

                return found_users;
            }
        },
        ownerlogin : {
            type: OwnerType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            async resolve(parent, args) {
                // console.log("In Login"+JSON.stringify(args));
                let users = await Owner.find(args, (err, res) => {
                    console.log("Error :" + err);
                });
                console.log("users :", users);
                if (!users || users.length === 0) {
                    throw errorObj({ _error: "User not found" });
                }
                // console.log(users)
                return users[0]
            }
        },

        ownersignup: {
            type: OwnerType,
            args: {
                email: { type: GraphQLString },
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                restaurant_name: { type: GraphQLString },
                restaurant_zipcode :  { type: GraphQLString },
                cuisine:{type:GraphQLString},
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log("In Owner Sign Up:", JSON.stringify(args));
                //  crypt.createHash(args.password, (hash) => {
                    let users = await Owner.create(
                        {   
                            first_name: args.first_name,
                            last_name: args.last_name,
                            email: args.email,
                            password: args.password,
                            restaurant_name : args.restaurant_name,
                            restaurant_zipcode : args.restaurant_zipcode,
                            cuisine : args.cuisine
                        }
                        
                    )
                        

                // })
                return users

            }
            

        },

        updateOwnerProfile: {
            type: OwnerType,
            args: {
                id: { type: GraphQLID },
                email: { type: GraphQLString },
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                restaurant_name: { type: GraphQLString },
                restaurant_zipcode: { type: GraphQLString },
                cuisine: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log("In Owner Profile Update :", JSON.stringify(args));
                let found_users = await Owner.findOneAndUpdate(args.email,
                    {
                        $set: {
                            email: args.email,
                            first_name: args.first_name,
                            last_name: args.last_name,
                            password: args.password,
                            restaurant_name :  args.restaurant_name,
                            restaurant_zipcode:args.restaurant_zipcode,
                            cuisine : args.cuisine
                        }
                    }, { new: true }, (err, res) => {
                        console.log("err : ", err);
                        console.log("res : ", res);

                    })

                return found_users;
            }
        },
        

        addMenu: {
            type: MenuType,
            args: {
                id: { type: GraphQLID },
                dish_name: { type: GraphQLString },
                description: { type: GraphQLString },
                price: { type: GraphQLInt },
                section: { type: GraphQLString },
                restaurant_name: { type: GraphQLString },
                restaurant_zipcode: { type: GraphQLString },
                image: { type: GraphQLString }
                },
             async resolve(parent, args) {
                var id = mongoose.Types.ObjectId()
                console.log("In Menu Add", JSON.stringify(args));
                //   crypt.createHash(args.password, (hash) => {
                    let menu =  await Menu.create(
                        // {   _id : id,
                        {
                            _id :id,
                            dish_name: args.dish_name,
                            description: args.description,
                            price: args.price,
                            section: args.section,
                            restaurant_name: args.restaurant_name,
                            restaurant_zipcode:args.restaurant_zipcode
                        }
                        
                        )
                console.log(menu)
                return menu

            }
            

        },
    }
});



const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {

        getUserProfile: {
            type: UserType,
            args: {
                // id: { type: GraphQLID}
                email : {type : GraphQLString}
            },
            async resolve(parent, args) {
                console.log("In Get User Profile Query", args.email);
                let user_profile = await Buyer.find({email : args.email}, (err, res) => {
                    console.log("Error :" + err);
                });
                return user_profile[0]
            }
        },
        getOwnerProfile: {
            type: OwnerType,
            args: {
                email: { type: GraphQLString}
            },
            async resolve(parent, args) {
                console.log("In get Owner Profile Query", args.email);
                let user_profile = await Owner.find({email : args.email}, (err, res) => {
                    console.log("Error :" + err);

                });
                console.log(user_profile)
                return user_profile[0]
            }
        },

        getMenu: {
            type: new GraphQLList(MenuType),
            args: {
                restaurant_name: { type: GraphQLString}
            },
            async resolve(parent, args) {
                console.log("In get Menu Query", args.restaurant_name);
                let user_profile = await Menu.find({restaurant_name : args.restaurant_name}, (err, res) => {
                    console.log("Error :" + res);
                });
                return user_profile
            }
        },
        
        searchRestaurants: {
            type: new GraphQLList(MenuType),
            args: {
                restaurant_zipcode: { type: GraphQLString },
                dish_name: { type: GraphQLString },
                restaurant_name : {type:GraphQLString}
            },
            async resolve(parent, args) {
                console.log("Inside Search Restaurants");
                console.log(args.restaurant_zipcode);
                console.log(args.dish_name)
                let result = await Menu.distinct('restaurant_name',{
                        dish_name: new RegExp(args.dish_name, "i"),
                        restaurant_zipcode: args.restaurant_zipcode       
                })
                let arr =[]
                result.forEach((data)=>{
                    arr.push({restaurant_name : data})
                })
                return arr;
            }
            
        },

    }
});


const errorObj = obj => {
    return new Error(JSON.stringify(obj));
};

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});