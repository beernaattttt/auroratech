export default function handler(req, res) {
  if (req.method === 'GET') {
    if (req.session && req.session.user) {
      return res.status(200).json(req.session.user);
    }
    return res.status(401).json({ message: 'Not authenticated' });
  }
}
