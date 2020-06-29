const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { auth } = require('../middlewares/auth');

const customValidation = Joi.string().required().custom((value, helpers) => {
  const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
+ '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  if (!pattern.test(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'custom validation');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

router.get('/articles', auth, getArticles);

router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: customValidation,
    image: customValidation,
  }),
}), auth, createArticle);

router.delete('/articles/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).required().alphanum(),
  }),
}), auth, deleteArticle);

module.exports = router;
