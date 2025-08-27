const prisma = require("../config/prisma");

exports.listFavorite = async (req, res) => {
  try {
    const favorite = await prisma.favorite.findMany({
      include: {
        room: {
          select: {
            id: true,
            roomName: true,
            images: {
              select: {
                id: true,
                imageName: true,
                url: true,
              },
            },
          },
        },
        customer: {
          select: {
            id: true,
            contact: true,
          },
        },
      },
    });
    res.send(favorite);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server GetAll Error ❌" });
  }
};

exports.CreateFavorite = async (req, res) => {
  try {
    const { roomId } = req.body;
    const customerId = req.user.id;

    if (!roomId) {
      return res.status(400).json({ message: "Invalid Room ID ❌" });
    }

    const favorite = await prisma.favorite.create({
      data: {
        roomId,
        customerId,
      },
    });

    // Dueng khr moun favorite ma show
    const NewFavorite = await prisma.favorite.findMany({
      where: { id: favorite.id },
      include: {
        room: {
          select: {
            id: true,
            roomName: true,
            images: { select: { id: true, imageName: true, url: true } },
          },
        },
        customer: {
          select: { id: true, contact: true },
        },
      },
    });

    res.status(200).json({ message: "Created Success ✅", NewFavorite });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Create Error ❌" });
  }
};

exports.UpdateFavorite = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID ❌" });
    }

    const { roomId, customerId } = req.body;

    const update = await prisma.favorite.update({
      where: {
        id,
      },
      data: {
        roomId,
        customerId,
      },
    });
    res.status(200).json({ message: "Updated Success ✅", update });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Update Error ❌" });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID ❌" });
    }
    const favorite = await prisma.favorite.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: " Delete Success ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server remove Error ❌" });
  }
};
