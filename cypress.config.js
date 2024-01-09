/* eslint-disable comma-dangle */
const faker = require('faker');
const { defineConfig } = require('cypress');
const { clear } = require('./server/db');
const { seed } = require('./server/db');
const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1667/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.ceil(Math.random(1000) * 1000);
          const userName =
            faker.name.firstName().toLowerCase() + `${randomNumber}`;
          return {

            username: userName,
            email: userName + '@mail.com',
            password: '12345Qwert!',
            // bio: faker.person.bio()
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word(),
          };
        },
        'db:clear'() {
          clear();

          return null;
        },
        'db:seed'() {
          seed();

          return null;
        },
      });
      addMatchImageSnapshotPlugin(on, config);
    },
  },
});
