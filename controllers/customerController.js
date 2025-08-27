const prisma = require('../config/prisma')
const fs = require('fs');
const path = require('path');

exports.list = async (req, res) => {

    try {
        const customer = await prisma.customer.findMany({
            include:{
                profile:true
            }
        })
        res.send(customer)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server GetAll Error ❌" })
    }
}

exports.update = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID ❌" });
      }
  
      const { contact, google, facebook } = req.body;
  
      // Dueng khr moun phuae bg houp profile kao
      const oldCustomer = await prisma.customer.findUnique({
        where: { id },
        select: {
          profile: {
            select: {
              imagename: true
            }
          }
        }
      });
  
      // thar me file houp mai hai  req.file hai lop houp kao ork krn
      if (req.file && oldCustomer && oldCustomer.profile && oldCustomer.profile.imagename) {
        const oldImagePath = path.join(__dirname, '../Profileimages', oldCustomer.profile.imagename);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
   

      // Kiem khr moun update
      const updateData = {
        contact,
        google,
        facebook,
      };

      const baseUrl = `${req.protocol}://${req.get('host')}`;
  
      if (req.file) {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        updateData.imagename = req.file.filename;
        updateData.url = `${baseUrl}/Profileimages/${req.file.filename}`;
      }
      const newCustomer = await prisma.customer.update({
        where: { id },
        data: {
          contact,
          google,
          facebook,
          profile: {
            update: {
              imagename: req.file.filename,
              url: `${baseUrl}/Profileimages/${req.file.filename}`
            }
          }
        },
        include: {
          profile: true,
        }
      });
  
      delete newCustomer.password;
  
      res.status(200).json({ message: "Updated successfully ✅", newCustomer });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Update Customer Error ❌" });
    }
  };

exports.remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if(isNaN(id)){
            return res.status(400).json({ message: "Invalid ID ❌" })
        }

        // dueng profileId สlh houp
         const customer = await prisma.customer.findUnique({
      where: { id },
      select: { profileId: true, profile: { select: { imagename: true } } },
    });


    if (!customer) return res.status(404).json({ message: "Customer not found ❌" });



    // lop houp kao nia folder
    if (customer.profile && customer.profile.imagename) {
        const imagePath = path.join(__dirname, '../Profileimages', customer.profile.imagename);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

        // lop customer
        await prisma.customer.delete(
            {
                where: {
                    id
                }
            })

        // lop profile t pouk kun
        await prisma.profile.delete({
            where: {
                id: customer.profileId
            }
        })

        res.status(200).json({ message: "Customer and Profile remove Success ✅" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Delete customer and profile Error ❌" })
    }
}



