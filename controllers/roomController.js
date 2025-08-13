const prisma = require("../config/prisma");

const fs = require('fs');
const path = require('path');

exports.createRoom = async (req, res) => {
    try {
      const { roomName, floor, type_room, description, is_active_status } = req.body;
  
      const newRoom = await prisma.room.create({
        data: {
          roomName,
          floor: floor.toString(),
          type_room,
          description,
          is_active_status: is_active_status === 'true' || is_active_status === true,
        }
      });
  
      if (req.files && req.files.length > 0) {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
  
        const imagesData = req.files.map(file => ({
          imageName: file.filename,   // 
          url: `${baseUrl}/images/${file.filename}`,
          roomId: newRoom.id,
        }));
  
        await prisma.image.createMany({
          data: imagesData,
        });
      }
  
      const roomWithImages = await prisma.room.findUnique({
        where: { id: newRoom.id },
        include: { images: true },
      });
  
      res.status(200).json({ message: "Created Success", room: roomWithImages });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal error" });
    }
  };
  

exports.list = async(req,res)=>{
    try{

        const room = await prisma.room.findMany({
            include: {
                images: {
                    select:{
                        id: true,
                        imageName: true,
                        url: true
                    }
                } 
            }
        })
        
        res.status(200).send(room)

    }catch(err){
        console.log(err)
        res.staus(500).json({message:"Internal error"})
    }
}




exports.UpdateRoom = async (req, res) => {
  try {
    const roomId = parseInt(req.params.id);
    const { roomName, floor, type_room, description, is_active_status } = req.body;

    // อัปเดตข้อมูล room
    const updated = await prisma.room.update({
      where: { id: roomId },
      data: {
        roomName,
        floor,
        type_room,
        description,
        is_active_status: is_active_status === 'true' || is_active_status === true,
      },
    });

    // ดึงรูปเก่าทั้งหมด
    const oldImages = await prisma.image.findMany({ where: { roomId } });

    // ลบไฟล์เก่าในโฟลเดอร์และลบข้อมูลใน DB
    if (oldImages.length > 0) {
      oldImages.forEach(image => {
        const imagePath = path.join(__dirname, '..', 'images', image.imageName); 
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
      await prisma.image.deleteMany({ where: { roomId } });
    }

    // ถ้ามีไฟล์ใหม่อัปโหลด ให้บันทึกลง DB
    if (req.files && req.files.length > 0) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;

      const newImagesData = req.files.map(file => ({
        imageName: file.filename,
        url: `${baseUrl}/images/${file.filename}`,
        roomId: roomId,
      }));

      await prisma.image.createMany({ data: newImagesData });
    }

    // ดึงข้อมูลห้องที่อัปเดตพร้อมไฟล์
    const updatedRoom = await prisma.room.findUnique({
      where: { id: roomId },
      include: { images: true },
    });

    res.status(200).json({ message: "Updated Success", room: updatedRoom });
  } catch (err) {
    console.error(err);
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
