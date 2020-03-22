'use strict';
const uuidv1 = require('uuid/v1');
const bcrypt = require('bcryptjs');

const contributor1Id = uuidv1();
const contributor2Id = uuidv1();
const service1Id = uuidv1();
const service2Id = uuidv1();
module.exports = {
  up: async queryInterface => {
    try {
      await queryInterface.bulkInsert(
        'Users',
        [
          {
            id: contributor1Id,
            name: 'contributor1',
            role: 'USER',
            email: 'contributor1@server.com',
            password: await bcrypt.hash('123456', 10),
            tombstone: 0,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: contributor2Id,
            name: 'contributor2',
            role: 'USER',
            email: 'contributor2@server.com',
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
            ownerId: contributor1Id,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: service2Id,
            ownerId: contributor2Id,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      );
      await queryInterface.bulkInsert(
        'ServiceContributors',
        [
          {
            serviceId: service1Id,
            userId: contributor2Id,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            serviceId: service2Id,
            userId: contributor1Id,
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
