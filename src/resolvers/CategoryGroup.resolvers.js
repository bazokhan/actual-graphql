module.exports = {
  categories: async catGroup => catGroup.getCategories(),
  deleted: async catGroup => Boolean(catGroup.tombstone)
};
