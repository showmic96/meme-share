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
          sharableLink: `${config.app.baseUrl}:${config.app.port}/view/${fileName}`
        }
      });
  },

  increaseViews: ({ imageUrl }) => {
    return memeImage.findOne({ where: { imageUrl } })
      .then((memeImageData) => {
        const { views } = memeImageData.get({ plain: true });
        return memeImage.update({ views: views + 1 }, { where: { imageUrl } });
      });
  },

  updateLike: ({ imageUrl, type }) => {
    return memeImage.findOne({ where: { imageUrl } })
      .then((memeData) => {
        const { likes } = memeData.get({ plain: true });
        let updatedLikes = likes + 1;

        if (type === 'decrease') {
          updatedLikes = likes - 1;
        }

        return memeImage.update({ likes: updatedLikes }, { where: { imageUrl } });
      })
      .then(() => {
        return {
          message: 'Update Successful'
        };
      });
  },

  getStatus: () => {
    return memeImage.findAll()
      .then((memeDataList) => {
        return memeDataList.map((element) => element.get({ plain: true }));
      });
  }
};

module.exports = memeImageService;