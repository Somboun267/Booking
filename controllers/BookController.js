const prisma = require("../config/prisma");

exports.list = async (req,res) =>{
    try{
     const bookings = await prisma.booking.findMany({
         include: {
           customer:{
            select:{
                id:true,
                contact:true
            }
           },  // 
           room: true
         }
       });
       res.json(bookings);
        
    } catch(err){
     console.log(err)
     res.status(500).json({message:"internal err"})
    }
 }

exports.createBook = async (req,res)=>{
    try{
        const { customerId, roomId,roomName, mettingDate, mettingTime,startTime,endTime,equipments, } = req.body;
        const newBook = await prisma.booking.create({
            data:{
                customerId,
                roomId,
                roomName,
                mettingDate,
                mettingTime,
                startTime,
                endTime,
                equipments,
            }
        }) 
     
        res.send(newBook)
    } catch(err){
        console.log(err)
        res.status(500).json({message:"internal err"})
    }
}

exports.update = async (req,res)=>{
    try{
        const id = parseInt(req.params.id)
        const { customerId, roomId,roomName, mettingDate, mettingTime,startTime,endTime,equipments, } = req.body;

        const book = await prisma.booking.update({
            where:{
                id
            }, data:{
                customerId,
                roomId,
                roomName,
                mettingDate,
                mettingTime,
                startTime,
                endTime,
                equipments,
            }
        }) 
        res.status(200).json({message:"Updated Success",book})

    } catch(err){
        console.log(err)
        res.status(500).json({message:"internal err"})
       }
}

