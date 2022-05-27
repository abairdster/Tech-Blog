const sequelize = require("../config/connection")
const {User,Blog} = require("../models")

const users = [
    {
        username:"Lalla",
        password:"password"
    },
    {
        username:"Fran",
        password:"password1"
    },
    {
        username:"Ron",
        password:"Password1"
    }
]

const blogs = [
    {
        title:"My first webinar",
        body:"Welcome and Thank you for attending.",
        UserId:1
    },
    {
        title:"My second webinar",
        body:"Cant believe it, this is only the second one I've done.",
        UserId:1
    },
    {
        title:"Love of the potato",
        body:"Rather starchy, but that's why we love them.",
        UserId:2
    }
]

const feedMe = async ()=>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Blog.bulkCreate(blogs);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

feedMe()