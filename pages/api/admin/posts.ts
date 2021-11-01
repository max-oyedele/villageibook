import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = req.query;
  
  switch (req.method) {
    case "GET":
      return getPosts();
    case "POST":
      return createPost();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getPosts() {
    try {
      let post = fetchWrapper.get(baseUrl + "/posts.json", access_token);
      
      await post.then(response=>{
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async function createPost() {
    try {
      fetchWrapper.post(baseUrl + "/posts", req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
