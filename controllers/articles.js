const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { notFoundArticle, notEnoughRights } = require('../static/constants');

module.exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id }).populate('user');

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
    const article = await Article.findById(req.params.id).select('+owner').orFail(
      () => new NotFoundError(notFoundArticle),
    );
    if (article.owner.toString() !== req.user._id) {
      throw new ForbiddenError(notEnoughRights);
    }
    await article.remove();
    return res.send({ data: article });
  } catch (err) {
    return next(err);
  }
};
