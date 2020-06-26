const jwt = require('jsonwebtoken');
const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({}).populate('user');
    return res.send({ data: articles });
  } catch (err) {
    return next(err);
  }
};

module.exports.createArticle = async (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  try {
    const article = await Article.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: req.user._id,
    });
    return res.send({ data: article });
  } catch (err) {
    return next(err);
  }
};

module.exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id).orFail(
      () => new NotFoundError('Карточка не найдена'),
    );
    const decoded = jwt.decode(req.cookies.jwt);

    if (req.user._id !== decoded._id) {
      throw new ForbiddenError('Недостаточно прав');
    }
    await article.remove();
    return res.send({ data: article });
  } catch (err) {
    return next(err);
  }
};
