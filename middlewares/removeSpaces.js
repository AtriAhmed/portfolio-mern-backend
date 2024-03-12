const removeSpaces = (req, res, next)=> {
    if (req.files?.image) {
      req.files.image.name = req.files.image.name.replace(/\s/g, '');
    }
    next()
  }

  module.exports = {removeSpaces}