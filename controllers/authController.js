const prisma = require('../config/prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { contact, password, Name, gmail, gender, phone, country } = req.body

        if (!Name || !gmail || !gender || !phone || !country || !contact || !password) {
            return res.status(400).json({ message: "Please enter complete information" })
        }

        // check contact
        const CheckContact = await prisma.Customer.findFirst({
            where: {
                contact
            }
        })
        if (CheckContact) {
            return res.status(400).json({ message: "User Already Exits" })
        }

        // hashpassword
        const hashpassword = await bcrypt.hash(password, 10)

        const checkGmail = await prisma.profile.findFirst({
            where: { gmail }
        })
        if (checkGmail) {
            return res.status(400).json({ message: "Gmail already exists" })
        }

        //Create profile
        const profile = await prisma.profile.create({
            data: {
                Name: Name,
                gmail: gmail,
                gender: gender,
                phone: phone,
                country: country
            }
        })


        // create Customer pouk kup profileId
        const customer = await prisma.Customer.create({
            data: {
                contact,
                password: hashpassword,
                profileId: profile.id
            }
        })
        // update profile
        await prisma.profile.update({
            where: { id: profile.id },
            data: {
                customeId: { connect: { id: customer.id } }
            }
        })

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
                }
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Register Error" })
    }
}


exports.login = async (req, res) => {
    try {
        const { contact, password } = req.body

        if (!contact) {
            return res.status(400).json({ message: "invalid contact" })
        }
        if (!password) {
            return res.status(400).json({ message: "invalid password" })
        }

        //check contact nai database
        const checkContact = await prisma.customer.findFirst({
            where: {
                contact
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
  const token = jwt.sign(payload, "Kaka", { expiresIn: "1d" });
  



  res.status(200).json({
    message: "Login success",
    profile: payload.profile,
    token: token
  });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Login Error" })
    }
}