const { PACKAGE_MANAGER } = require('./constants');
const runPackageLock = `${PACKAGE_MANAGER} i`;

module.exports = {
  hooks: {
    'post-checkout': `if [[ $HUSKY_GIT_PARAMS =~ 1$ ]]; then ${runPackageLock}; fi`,
    'post-merge': runPackageLock,
    'post-rebase': runPackageLock,
    'pre-commit': `${PACKAGE_MANAGER} run typecheck && ${PACKAGE_MANAGER} run test:changed && ${PACKAGE_MANAGER} run lint:staged`
  }
};
