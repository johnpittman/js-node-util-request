const packageManager = 'npm';
const runPackageLock = `${packageManager} i`;

module.exports = {
  hooks: {
    'post-checkout': `if [[ $HUSKY_GIT_PARAMS =~ 1$ ]]; then ${runPackageLock}; fi`,
    'post-merge': runPackageLock,
    'post-rebase': runPackageLock,
    'pre-commit': `${packageManager} run typecheck && ${packageManager} run test:changed && ${packageManager} run lint:staged`
  }
};
