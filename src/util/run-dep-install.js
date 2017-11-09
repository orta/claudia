const runDepManagerCommand = require('./run-dep-manager-command'),
	fsUtil = require('./fs-util');

module.exports = function runDepInstall(dir, logger) {
	'use strict';
	const useYarn = fsUtil.fileExists('yarn.lock');
	if (useYarn) {
		return  runDepManagerCommand(dir, 'yarn', 'install --production --ignore-optional', logger);
	} else {
		return  runDepManagerCommand(dir, 'npm', 'install --production --no-optional', logger);
	}
};
