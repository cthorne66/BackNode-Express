var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	development: {
		app: {
			title: 'BackNode-Express'
		},
		db: 'mongodb://localhost:27017/backnode-express',
		root: rootPath
	},
	test: {

	},
	production: {

	}
};
