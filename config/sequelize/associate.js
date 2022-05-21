'use strict' 

const applyAssociate = ( sequelize ) => {
	const { user, article } = sequelize.models

	user.hasMany(article, { foreignKey: 'username' })
	article.belongsTo(user, { foreignKey: 'username' })
}

module.exports = { applyAssociate }
