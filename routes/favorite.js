const express =  require('express')

const router = express.Router()
const{CreateFavorite,listFavorite,UpdateFavorite,remove} = require('../controllers/FavoriteController')

const {ProtectRoutes} = require('../middleware/protectRoutes')

/**
 * @swagger
 * tags:
 *   name: Favorite
 *   description: Favorite management
 */

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get all favorites
 *     tags: [Favorite]
 *     responses:
 *       200:
 *         description: List of favorites
 */
router.get('/favorites',ProtectRoutes,listFavorite)

/**
 * @swagger
 * /favorite:
 *   post:
 *     summary: Create a new favorite
 *     tags: [Favorite]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: integer
 *               customerId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Favorite created
 */
router.post('/favorite',ProtectRoutes,CreateFavorite)

/**
 * @swagger
 * /favorite/{id}:
 *   put:
 *     summary: Update a favorite
 *     tags: [Favorite]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: integer
 *               customerId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Favorite updated
 */
router.put('/favorite/:id',ProtectRoutes,UpdateFavorite)

/**
 * @swagger
 * /favorite/{id}:
 *   delete:
 *     summary: Delete a favorite
 *     tags: [Favorite]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Favorite deleted
 */
router.delete('/favorite/:id',remove)



module.exports = router