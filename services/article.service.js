const boom = require('@hapi/boom');

class ArticleService {
  show() {
    // throw new Error('No Existe Nada');
    throw boom.badData('Informacion invalida');
  }
}

module.exports = ArticleService;
