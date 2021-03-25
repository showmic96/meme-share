const router = require('express').Router();
const config = require('config');
const multer = require('multer');
const fsExtra = require('fs-extra');

const upload = multer({ dest: 'files/uploads/' });

const authMiddleware = require('../middlewares/auth');

const memeImageService = require('../services/meme-image');

router.post('/create-meme', authMiddleware.verifyJwt, upload.any(), (req, res) => {
  const filePath = req.files[0].path;
  const { username } = req.user;

  return memeImageService.createMeme({ filePath, username })
    .then((createdMemeImage) => {
      res.status(200)
        .send(createdMemeImage);

      fsExtra.unlink(filePath);
    })
    .catch((error) => {
      res.status(error.status || 500)
        .send(error);

      fsExtra.unlink(filePath);
    });

});

router.get('/view/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const imageUrl = `${config.app.baseUrl}:${config.app.port}/files/images/${fileName}.jpg`;

  return memeImageService.increaseViews({ imageUrl: `files/images/${fileName}.jpg` })
    .then(() => {
      res.redirect(imageUrl);
    })
    .catch((error) => {
      res.status(error.status || 500)
        .send(error);
    });

});

router.put('/update-like', (req, res) => {
  const { imageUrl, type } = req.body;

  return memeImageService.updateLike({ imageUrl, type })
    .then((updateResponse) => {
      res.status(200)
        .send(updateResponse);
    })
    .catch((error) => {
      res.status(error.status || 500)
        .send(error);
    });
});

router.get('/get-status', authMiddleware.verifyJwt, (req, res) => {
  return memeImageService.getStatus()
    .then((statusList) => {
      res.status(200)
        .send(statusList);
    })
    .catch((error) => {
      res.status(error.status || 500)
        .send(error);
    });
});

router.get('/get-images', authMiddleware.verifyJwt, (req, res) => {
  return memeImageService.getImages()
    .then((imageList) => {
      res.status(200)
        .send(imageList);
    })
    .catch((error) => {
      res.status(error.status || 500)
        .send(error);
    });
});

module.exports = router;