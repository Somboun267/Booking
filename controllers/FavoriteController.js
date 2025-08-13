const prisma = require("../config/prisma")

exports.listFavorite = async(req,res)=>{
    try{
        
      const favorite = await prisma.favorite.findMany({
        include:{
            room:{
                select:{
                    id:true,
                    roomName:true
                }
            },
            customer:{
                select:{
                    id:true,
                    contact:true
                }
            }
        }
      })
      res.send(favorite)
    }  catch(err){
        console.log(err)
        res.status(500).json({message:"Internal error"})
    }
}

exports.CreateFavorite = async(req,res) =>{
    try{
        const {roomId, customerId } = req.body
        const NewFavorite = await prisma.favorite.create({
            data:{
                roomId,
                customerId
            }
        })
        
        res.status(200).json({message:"Created Success",NewFavorite})
    }  catch(err){
        console.log(err)
        res.status(500).json({message:"Internal error"})
    }
}

exports.UpdateFavorite = async(req,res)=>{
    try{
        const id = parseInt(req.params.id)

        const {roomId, customerId } = req.body

        const update = await prisma.favorite.update({
            where:{
                id
            }, data:{
                roomId,
                customerId
            }
        }) 
        res.status(200).json({message:"Updated Success",update})

    } catch(err){
        console.log(err)
        res.status(500).json({message:"Internal error"})
    }
}

exports.remove = async(req,res) =>{
    try{
        const id = parseInt(req.params.id)
        const favorite = await prisma.favorite.delete({
            where:{
                id 
            }
        })
        res.status(200).json({message:" Delete Success" ,favorite})

    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal error"})
    }
}