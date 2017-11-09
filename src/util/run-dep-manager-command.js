const removeKeysWithPrefix = require('./remove-keys-with-prefix'),
	execPromise = require('./exec-promise'),
	fsUtil = require('./fs-util'),
	fsPromise = require('./fs-promise'),
	tmppath = require('./tmppath');

module.exports = function runCommand(dir, app, options, logger) {
	'use strict';
	const cwd = process.cwd(),
		cmdlog = tmppath(),
		command = `${app} ${options}`;
	let env = process.env;
	logger.logApiCall(command);
	process.chdir(dir);
	if (app === 'npm' && fsUtil.fileExists('.npmrc')) {
		env = removeKeysWithPrefix(process.env, 'npm_');
	}
	return execPromise(command + ' > ' + cmdlog + ' 2>&1', { env: env })
		.then(() => fsPromise.unlinkAsync(cmdlog))
		.then(() => {
			process.chdir(cwd);
			return dir;
		})
		.catch(() => {
			process.chdir(cwd);
			return Promise.reject(command + ' failed. Check ' + cmdlog);
		});
};
