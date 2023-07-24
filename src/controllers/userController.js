const userModel = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createUser = async (req, res) => {
  const { user, password, email } = req.body;

  if (!user || !password || !email) {
    return res.status(400).json({ error: 'User, password, and email are required' });
  }

  try {
    const newUser = await userModel.createUser(user, password, email);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { user, password, email } = req.body;

  try {
    const userToUpdate = await userModel.getUserById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await userModel.updateUser(userId, user, password, email);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const userToDelete = await userModel.getUserById(userId);
    if (!userToDelete) {
      return res.status(404).json({ error: 'User not found' });
    }

    await userModel.deleteUser(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
