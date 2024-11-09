export default async function handler(req, res) {
  const { id } = req.query;
  const url = `https://www.zohoapis.com/crm/v2/Vendors/${id}`;

  if (req.method === 'DELETE') {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Zoho-oauthtoken ${process.env.ZOHO_ACCESS_TOKEN}`,
        },
      });
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete vendor' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const response = await fetch(url, {
        method: 'PUT',
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
      return res.status(500).json({ error: 'Failed to update vendor' });
    }
  }
}