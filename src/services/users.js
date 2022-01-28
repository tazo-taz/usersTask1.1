const knex = require('../knex');

const USER_TABLE = 'users';

module.exports = {
  async getById(id) {
    const item = await knex(USER_TABLE).select('*').where({ id }).first();

    return item;
  },

  async getList() {
    const item = await knex(USER_TABLE).select('*').orderBy('id');

    return item;
  },

  async addItem(item) {
    return knex(USER_TABLE).insert(item);
  },

  async updateItem(id, item) {
    return knex(USER_TABLE)
      .update({
        username: item.username || null,
        email: item.email || null,
        avatar: item.avatar || null,
        age: item.age || null,
        phone: item.phone || null,
      })
      .where({ id });
  },

  async patchItem(id, item) {
    return knex(USER_TABLE).update(item).where({ id });
  },

  async removeItem(id) {
    return knex(USER_TABLE).where({ id }).del();
  },
};
