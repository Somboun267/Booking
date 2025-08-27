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
           room: {
            include:{
                images: {
                    select: {
                        id: true,
                        imageName: true,
                        url: true
                    }
                }
            }
           }
    
         }
       });
       res.json(bookings);
        
    } catch(err){
     console.log(err)
     res.status(500).json({message:"Server GetAll Error ❌"})
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

        res.status(200).json({message:"Create Success ✅",newBook})
    } catch(err){
        console.log(err)
        res.status(500).json({message:"Server Create Error ❌"})
    }
}

exports.update = async (req,res)=>{
    try{
        const id = parseInt(req.params.id)
     
        if(isNaN(id)){
        return res.status(400).json({message:"Invalid ID ❌"})
       }

        const { customerId, roomId,roomName, mettingDate, mettingTime,startTime,endTime,equipments, } = req.body;


     const booking = await prisma.booking.findUnique({
        where:{
            id
        }
     })
        if(!booking){
            return res.status(404).json({ message: "Booking not found ❌" });
        }

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
        res.status(200).json({message:"Updated Success ✅",book})

    } catch(err){
        console.log(err)
        res.status(500).json({message:" Server Update Error ❌"})   
       }
}

exports.deleteBook = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID ❌" });
        }
  
      const booking = await prisma.booking.findUnique({
        where: { id },
      });
  
      if (!booking) {
        return res.status(404).json({ message: "Booking Not found ❌"});
      }
  
      
      await prisma.booking.delete({
        where: { id },
      });
  
      res.status(200).json({ message: "Deleted booking successfully ✅" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: " Server Delete Error ❌" });
    }
  };
  