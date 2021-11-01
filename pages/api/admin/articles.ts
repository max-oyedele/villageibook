import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = req.query;
  
  switch (req.method) {
    case "GET":
      return getArticles();
    case "POST":
      return createArticle();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getArticles() {
    try {
      let article = fetchWrapper.get(baseUrl + "/articles.json", access_token);
      
      await article.then(response=>{
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async function createArticle() {
    try {
      fetchWrapper.post(baseUrl + "/articles", req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
