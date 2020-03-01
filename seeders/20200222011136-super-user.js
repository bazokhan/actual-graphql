'use strict';
const uuidv1 = require('uuid/v1');
const bcrypt = require('bcryptjs');

const user1Id = uuidv1();
const user2Id = uuidv1();
const service1Id = uuidv1();
const service2Id = uuidv1();
module.exports = {
  up: async queryInterface => {
    try {
      await queryInterface.bulkInsert(
        'Users',
        [
          {
            id: user1Id,
            name: 'admin',
            role: 'SUPERADMIN',
            email: 'admin@server.com',
            password: await bcrypt.hash('123456', 10),
            tombstone: 0,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: user2Id,
            name: 'user',
            role: 'USER',
            email: 'user@server.com',
            password: await bcrypt.hash('123456', 10),
            tombstone: 0,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      );
      await queryInterface.bulkInsert(
        'Services',
        [
          {
            id: service1Id,
            ownerId: user1Id,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: service2Id,
            ownerId: user2Id,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      );
    } catch (err) {
      console.log(err);
    }
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
