const runDepManagerCommand = require('./run-dep-manager-command'),
	fsUtil = require('./fs-util');

module.exports = function runDepSave(dir, moduleName, logger) {
	'use strict';
	const useYarn = fsUtil.fileExists('yarn.lock');
	if (useYarn) {
		return  runDepManagerCommand(dir, 'yarn', `add ${moduleName}`, logger);
	} else {
		return  runDepManagerCommand(dir, 'npm', `install ${moduleName} -s`, logger);
	}
};
