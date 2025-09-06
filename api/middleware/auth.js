const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Keep compatibility with existing handlers that use either 'erro' or 'message'
    return res.status(401).json({ erro: 'Não autenticado: token não fornecido', message: 'Token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ erro: 'Não autorizado: token inválido', message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
