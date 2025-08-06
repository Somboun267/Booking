const prisma = require("../config/prisma");



exports.createRoom = async (req, res) => {
    try {
        const { images, roomName, floor, type_room, description, is_active_status } = req.body;

        if(!roomName || roomName.trim() ==="" ||
        !floor || floor ==="" ||
        !type_room || type_room.trim() === "" ||
        !description || description.trim() === "" ||
        is_active_status === undefined || is_active_status === null
    ){
           return res.status(400).json({message:"Please enter complete information"})
        }


        const newRoom = await prisma.room.create({
            data: {
                images,
                roomName,
                floor,
                type_room,
                description,
                is_active_status,
            }
        });
        res.status(200).json({ message: "Created Success", newRoom });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal error" });
    }
};

exports.list = async(req,res)=>{
    try{

        const room = await prisma.room.findMany()
        
        res.status(200).send(room)

    }catch(err){
        console.log(err)
        res.staus(500).json({message:"Internal error"})
    }
}


exports.UpdateRoom = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { images, roomName, floor, type_room, description, is_active_status } = req.body;
  
      const updated = await prisma.room.update({
        where: { id },
        data: {
          images,
          roomName,
          floor,
          type_room,
          description,
          is_active_status,
        }
      });
  
      res.status(200).json({ message: "Updated Success", updated });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal error" });
    }
  };


  exports.remove = async(req,res)=>{
    try{

        const id = parseInt(req.params.id);   
        
        const checkroom = await prisma.room.findMany({
            where:{
                id
            }
        }) 
        if(checkroom.length>0){
          return res.status(400).json({message:"room is active"})
        }
        console.log(checkroom)
        
        const room = await prisma.room.delete({
            where:{
                id
            }
        })
        
        res.status(200).send(room)

    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal error"})
    }
}
