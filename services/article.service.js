const boom = require('@hapi/boom');
const Article = require('../schemas/article.schema');

class ArticleService {
  async find() {
    const news = await Article.find().exec();

    return news;
  }

  async store(articleData) {
    const article = new Article({ ...articleData });

    await article.save();

    return article;
  }
}

module.exports = ArticleService;
