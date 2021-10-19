import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = req.query;
  
  switch (req.method) {
    case "GET":
      return getPosts();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getPosts() {
    try {
      let post = fetchWrapper.get(baseUrl + "/posts.json?page=1&size=200", access_token);
      
      await post.then(response=>{
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
