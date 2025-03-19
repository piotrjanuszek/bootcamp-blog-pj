import prisma from '../../../lib/prisma';


// PUT /api/publish/:id
export default async function handle(req, res) {
  const postId = req.query.id;
  const { url } = req.query;

  try {
    // Make a GET request to the provided URL
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(400).json({ message: 'Failed to fetch from the provided URL' });
    }

    // Update the post
    const post = await prisma.post.update({
      where: { id: postId },
      data: { published: true },
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}