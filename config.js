const { NODE_ENV, JWT_SECRET, DATABASE_URL } = process.env;
module.exports.PORT = process.env.PORT || 3000;
module.exports.DATABASE_URL = NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://localhost:27017/mestodb';
module.exports.JWT_KEYS = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
