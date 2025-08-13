const express = require('express')
const router = express.Router()
const {register,login} = require('../controllers/authController')
const { uploadProfile } = require('../uploads/UploadImagesProfile');
 

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new customer
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contact
 *               - password
 *               - Name
 *               - gmail
 *               - gender
 *               - phone
 *               - country
 *             properties:
 *               contact:
 *                 type: string
 *               password:
 *                 type: string
 *               Name:
 *                 type: string
 *               gmail:
 *                 type: string
 *               gender:
 *                 type: string
 *               phone:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: Register success
 *       400:
 *         description: Missing or duplicate fields
 *       500:
 *         description: Server error
 */
router.post('/register',uploadProfile,register)


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login with contact and password
 *     tags: [Auth]
 *     requestBody:
 *       required: trues
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contact
 *               - password
 *             properties:
 *               contact:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 profile:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     contact:
 *                       type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login',login)




module.exports = router                 