/* eslint-disable import/no-unresolved */
// add a user path to the DB and update it

const express = require('express');

const router = express.Router();
const UserPath = require('../../models/userpath.js');
const User = require('../../models/user');

router.get('/:id', async (req, res) => {
  try {
    const path = await UserPath.findById(req.params.id).populate({
      path: 'collections',
    });
    res.json(path);
  } catch (error) {
    res.status(500).send(`Serevr error: ${error._message}`);
  }
});

router.get('/', async (req, res) => {
  try {
    const allpaths = await UserPath.find({}).exec();
    res.json(allpaths);
  } catch (e) {
    res.status(500).send(`Server error: ${e._message}`);
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      id, name, author, description, tags, likes, collections, mainPath, completed,
    } = req.body;
    const userPathDetails = {};
    if (name) userPathDetails.name = name;
    if (author) userPathDetails.author = author;
    if (description) userPathDetails.description = description;
    if (tags) userPathDetails.tags = tags;
    if (likes) userPathDetails.likes = likes;
    if (collections) userPathDetails.collections = collections;
    if (mainPath) userPathDetails.mainPath = mainPath;
    if (completed) userPathDetails.completed = completed;
    // create user path
    const userPath = new UserPath(userPathDetails);
    await userPath.save();
    console.log(userPath);
    // find the who sent this request and add the above userpath in.
    const user = await User.findById(id).exec();
    user.userCreatedPaths.push(user._id);
    user.save();

    res.json(userPath);
  } catch (err) {
    res.status(500).send(`Server error: ${err._message}`);
  }
});

module.exports = router;
