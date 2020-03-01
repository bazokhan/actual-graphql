export default [{"modelName":"Users","fields":[{"fieldName":"id","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"autoIncrement","value":"false"},{"propertyName":"primaryKey","value":"true"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"name","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"},{"propertyName":"unique","value":"true"}]},{"fieldName":"role","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"email","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"},{"propertyName":"unique","value":"true"}]},{"fieldName":"password","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"tombstone","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.INTEGER"}]},{"fieldName":"createdAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]},{"fieldName":"updatedAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]}]},{"modelName":"Accounts","fields":[{"fieldName":"id","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"autoIncrement","value":"false"},{"propertyName":"primaryKey","value":"true"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"serviceId","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"name","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"tombstone","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.INTEGER"}]},{"fieldName":"createdAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]},{"fieldName":"updatedAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]}]},{"modelName":"Payees","fields":[{"fieldName":"id","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"autoIncrement","value":"false"},{"propertyName":"primaryKey","value":"true"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"serviceId","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"name","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"transferAccount","properties":[{"propertyName":"allowNull","value":"true"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"tombstone","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.INTEGER"}]},{"fieldName":"createdAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]},{"fieldName":"updatedAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]}]},{"modelName":"Groups","fields":[{"fieldName":"id","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"autoIncrement","value":"false"},{"propertyName":"primaryKey","value":"true"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"serviceId","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"name","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"isIncome","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.INTEGER"}]},{"fieldName":"tombstone","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.INTEGER"}]},{"fieldName":"createdAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]},{"fieldName":"updatedAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]}]},{"modelName":"Categories","fields":[{"fieldName":"id","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"autoIncrement","value":"false"},{"propertyName":"primaryKey","value":"true"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"serviceId","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"name","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"isIncome","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.INTEGER"}]},{"fieldName":"groupId","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"tombstone","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.INTEGER"}]},{"fieldName":"createdAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]},{"fieldName":"updatedAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]}]},{"modelName":"Transactions","fields":[{"fieldName":"id","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"autoIncrement","value":"false"},{"propertyName":"primaryKey","value":"true"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"serviceId","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"amount","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.FLOAT"}]},{"fieldName":"notes","properties":[{"propertyName":"allowNull","value":"true"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"date","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.INTEGER"}]},{"fieldName":"accountId","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"categoryId","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"payeeId","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"invoiceId","properties":[{"propertyName":"allowNull","value":"true"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"tombstone","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.INTEGER"}]},{"fieldName":"createdAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]},{"fieldName":"updatedAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]}]},{"modelName":"Invoices","fields":[{"fieldName":"id","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"autoIncrement","value":"false"},{"propertyName":"primaryKey","value":"true"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"serviceId","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"amountDue","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.FLOAT"}]},{"fieldName":"dateDue","properties":[{"propertyName":"allowNull","value":"true"},{"propertyName":"type","value":"Sequelize.INTEGER"}]},{"fieldName":"tombstone","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.INTEGER"}]},{"fieldName":"createdAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]},{"fieldName":"updatedAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]}]},{"modelName":"Products","fields":[{"fieldName":"id","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"autoIncrement","value":"false"},{"propertyName":"primaryKey","value":"true"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"serviceId","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"name","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"tombstone","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.INTEGER"}]},{"fieldName":"createdAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]},{"fieldName":"updatedAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]}]},{"modelName":"InvoiceProducts","fields":[{"fieldName":"invoiceId","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"productId","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"createdAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]},{"fieldName":"updatedAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]}]},{"modelName":"Services","fields":[{"fieldName":"id","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"autoIncrement","value":"false"},{"propertyName":"primaryKey","value":"true"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"ownerId","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"unique","value":"true"},{"propertyName":"type","value":"Sequelize.STRING"}]},{"fieldName":"createdAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]},{"fieldName":"updatedAt","properties":[{"propertyName":"allowNull","value":"false"},{"propertyName":"type","value":"Sequelize.DATE"}]}]}]