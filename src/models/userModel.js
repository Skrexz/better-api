const db = require('../../config/dbConfig');

exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM user', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM user WHERE id_user = ?', [userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};

exports.createUser = (user, password, email) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO user (user, password, email) VALUES (?, ?, ?)', [user, password, email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const newUser = { id_user: results.insertId, user, password, email };
        resolve(newUser);
      }
    });
  });
};

exports.updateUser = (userId, user, password, email) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE user SET user = ?, password = ?, email = ? WHERE id_user = ?',
      [user, password, email, userId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          const updatedUser = { id_user: userId, user, password, email };
          resolve(updatedUser);
        }
      }
    );
  });
};

exports.deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM user WHERE id_user = ?', [userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
