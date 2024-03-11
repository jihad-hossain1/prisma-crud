const prisma = require('../prisma/index')
// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()


const createUser = async (req,res)=>{
try {
    const dataFromBody = req.body;
console.log(dataFromBody)
    const {name,email,password} = dataFromBody;

    if(name === '' && email === "" && password === "" ){
        return res.json({message: "name email & password are required"})
        }



    const alreadyUser = await prisma.user.findFirst({where: {email}})
    if(alreadyUser){
        return res.status(400).json({message: "user already exist"})
    }


    const user = await prisma.user.create({
        data: {
            name, email, password
        }
    })
    console.log(user)
    
    if(user){
        res.json({message: "user are created", user});
    }
} catch (error) {
    return res.json({error})
}

}


const getAllUser = async(req,res)=>{
    try {
        const users = await prisma.user.findMany()
        return res.json(users)
    } catch (error) {
        return res.status(500).json({error: error, message: "error from server"})
    }
}


const singleUser = async(req,res)=>{
    const {id} = req.params;
    console.log(id)
    try {
        const user = await prisma.user.findUnique({
          where: { id },
          include: { posts: true },
        });
        if(user){
            res.json(user)
        }else{
            return res.json({message: 'user are not found'})
        }
    } catch (error) {
        return res.status(500).json({error: error, message: "error from server"})
    }
}


const updateUser = async(req,res)=>{
    const {id} = req.params;
    // console.log(id)
    const reqFromBody = req.body;

    const {name} = reqFromBody;

    
    try {
        const updateUserData = await prisma.user.update({
            where: {id}, 
            data: {name}})
        return res.json(updateUserData)
    } catch (error) {
        return res.status(500).json({error: error, message: "error from server"})
    }
}

const deleteUser = async(req,res)=>{
    const {id} = req.params;
    try {
          await prisma.user.delete({where: {id}});
        return res.status(201).json({message: 'user delete ok.'})

    } catch (error) {
        return res.json({error,message: "error from server"})
    }
}


module.exports = {createUser,getAllUser,singleUser,updateUser,deleteUser}