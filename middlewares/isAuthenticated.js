const isAuthenticated = (req, res, next) => {

    if (!req.isAuthenticated()) {
      return res.status(403).json({ message: 'Permission denied.' });
    }

    next();
  };


module.exports = {isAuthenticated}