var path = require('path');

let rootPath = path.join(__dirname, '../../');
let basePath = path.join(__dirname, '../../client/app');
let destPath = path.join(rootPath, 'dist');

let config = {
	rootPath: rootPath,
	basePath: basePath,
	appPath: path.join(__dirname, '../../client'),
	commonTplPath: path.join(basePath, '../../generator/common'),
	configDirPath: path.join(basePath, '../../generator.conf'),
	destPath: destPath
};

export default config;