const prisma = require("../prisma/index");

const createPost = async (req, res) => {
  try {
    const { title, slug, userId, body } = req.body;

    if (!title || !slug || !userId || !body) {
      return res.status(400).json({ message: "all field are required" });
    }

    const isUser = await prisma.user.findUnique({ where: { id: userId } });

    if (!isUser) {
      return res.status(400).json({
        message: "user are not found you are not able to create a post",
      });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        userId,
        body,
      },
    });

    return res.status(201).json({ message: "post created", newPost });
  } catch (error) {
    return res.status(500).json({ error: error, message: "error from server" });
  }
};


const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ error: error, message: "error from server" });
  }
};

module.exports = { createPost, getPosts };
