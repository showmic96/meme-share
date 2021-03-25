const config = require('config');
const _ = require('lodash');
const fsExtra = require('fs-extra');

const { memeImage } = require('../loaders/db');

const memeImageService = {
  createMeme: async ({ username, filePath }) => {
    const fileName = `${username}-${Date.now()}`;
    const imageUrl = `files/images/${fileName}.jpg`;

    return fsExtra.copy(filePath, imageUrl)
      .then(() => {
        return memeImage.create({ username, imageUrl });
      })
      .then((createdMemeImage) => {
        const memeImageData = createdMemeImage.get({ plain: true });
        return {
          ...memeImageData,
          sharableLink: `${config.app.baseUrl}:${config.app.port}/get-file/${fileName}`
        }
      });
  },

  increaseViews: ({ imageUrl }) => {
    return memeImage.findOne({ where: { imageUrl } })
      .then((memeImageData) => {
        const { views } = memeImageData.get({ plain: true });
        return memeImage.update({ views: views + 1 }, { where: { imageUrl } });
      });
  }
};

module.exports = memeImageService;