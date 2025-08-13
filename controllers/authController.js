const prisma = require('../config/prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    try {
      const { contact, password, Name, gmail, gender, phone, country } = req.body;
  
      if (!Name || !gmail || !gender || !phone || !country || !contact || !password) {
        return res.status(400).json({ message: "Please enter complete information" });
      }
  
      // Check  contact 
      const CheckContact = await prisma.customer.findUnique({ where: { contact } });
      if (CheckContact) {
        return res.status(400).json({ message: "User Already Exists" });
      }
  
      // Hash password
      const hashpassword = await bcrypt.hash(password, 10);
  
      // Check if gmail exists
      const checkGmail = await prisma.profile.findFirst({ where: { gmail } });
      if (checkGmail) {
        return res.status(400).json({ message: "Gmail already exists" });
      }
  
      // Prepare profile image data (if any)
      const imageName = req.file ? req.file.filename : null;
      const url = req.file ? `${req.protocol}://${req.get('host')}/Profileimages/${req.file.filename}` : null;
  
      // Create profile with image info
      const profile = await prisma.profile.create({
        data: {
          Name,
          gmail,
          gender,
          phone,
          country,
          imagename: imageName,
          url: url,
        }
      });
  
      // Create customer linked to profile
      const customer = await prisma.customer.create({
        data: {
          contact,
          password: hashpassword,
          profileId: profile.id
        }
      });
  
      // Update profile with customerId relation
      await prisma.profile.update({
        where: { id: profile.id },
        data: {
          customeId: { connect: { id: customer.id } }
        }
      });
  
      res.status(201).json({
        message: "Register success",
        customer: {
          id: customer.id,
          contact: customer.contact,
          profile: {
            Name: profile.Name,
            gmail: profile.gmail,
            gender: profile.gender,
            phone: profile.phone,
            country: profile.country,
            imagename: profile.imagename,
            url: profile.url,
          }
        }
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Register Error" });
    }
  };
  

exports.login = async (req, res) => {
    try {
        const { contact,gmail, password } = req.body

        if (!contact) {
            return res.status(400).json({ message: "invalid contact" })
        }
        if (!password) {
            return res.status(400).json({ message: "invalid password" })
        }

        //check contact nai database
        const checkContact = await prisma.customer.findFirst({
            where: {
                OR: [
                    { contact: contact },
                    { profile: { gmail: gmail } }
                ]
            }, include: {
                profile: true
            }
        })
        // 
        if (!checkContact) {
            return res.status(400).json({ message: "User not found" });
        }

        //compare password
        const isMatch = await bcrypt.compare(password,checkContact.password)
        //check password 
        if (!isMatch) {
            return res.status(400).json({
                message: " password is not match"
            })
        }

  //  Create payload
const payload = {
    profile: {
      id: checkContact.profile.id,   
      contact: checkContact.contact,
    
    }
  };
  
  // ✅ Create token
  const AccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "5m" });

  //   Create refresh token
  const RefreshToken = jwt.sign({id:checkContact.profile.id},process.env.REFERSH_TOKEN, { expiresIn: "7d" });

  // send response
  res.status(200).json({
    message: "Login success",
   
    token: AccessToken,
    refersh: RefreshToken,
  });


    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Login Error" })
    }
}