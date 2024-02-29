const boom = require('@hapi/boom');
const News = require('../schemas/news.schema');

class NewsService {
  async find() {
    const news = await News.find().populate('createBy').exec();

    return news;
  }

  async findOne(id) {
    const news = await News.findOne({ _id: id }).exec();

    if (!news) {
      throw boom.notFound();
    }

    return news;
  }

  async create(articleData) {
    const news = new News({ ...articleData });

    await news.save();

    return news;
  }

  async update(id, data) {
    const res = await News.updateOne({ _id: id }, { ...data }).exec();

    return res;
  }

  async delete(id) {
    const res = await News.findOneAndDelete({ _id: id }).exec();

    return res;
  }
}

module.exports = NewsService;
