export default async function handler(req, res) {

  const url = 'https://www.zohoapis.com/crm/v2/Vendors';
  
  if (req.method === 'GET') {
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Zoho-oauthtoken ${process.env.ZOHO_ACCESS_TOKEN}`,
        },
      });
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch vendors' });
    }
  }
  
  if (req.method === 'POST') {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${process.env.ZOHO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [req.body]
        }),
      });
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create vendor' });
    }
  }
}