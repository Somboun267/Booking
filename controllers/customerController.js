const prisma = require('../config/prisma')
const bcrypt = require('bcrypt')
exports.list = async (req, res) => {

    try {
        const customer = await prisma.customer.findMany({})
        res.send(customer)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "error list " })
    }
}

exports.update = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const { contact, google, facebook } = req.body

        const newCustomer = await prisma.customer.update({
            where: {
                id
            },
            data: {
                contact,

                google,
                facebook
            }
        })

        delete newCustomer.password
        res.status(200).json({ message: "update", newCustomer })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "error update" })
    }
}

exports.remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        // dueng profileId krn lop customer
        const customer = await prisma.customer.findUnique({
            where: { id },
            select: { profileId: true }
        })

        if (!customer) return res.status(404).json({
            message: "Customer not found"
        })

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

        res.status(200).json({ message: "Customer and Profile removed" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error removing customer and profile" })
    }
}



