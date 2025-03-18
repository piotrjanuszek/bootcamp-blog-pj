import { getServerSession } from "next-auth/next";
import prisma from '../../../lib/prisma';
import { authOptions } from "../auth/[...nextauth]";

// GET /api/post/:id
export default async function handle(req, res) {
  const { id } = req.query;

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const post = await prisma.$queryRaw`SELECT * FROM post WHERE id = ${Number(id)}`;

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post[0]);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}