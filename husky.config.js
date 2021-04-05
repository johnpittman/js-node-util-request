const runPackageLock = 'npm i --no-audit --prefer-offline';

module.exports = {
  hooks: {
    'post-checkout': `if [[ $HUSKY_GIT_PARAMS =~ 1$ ]]; then ${runPackageLock}; fi`,
    'post-merge': runPackageLock,
    'post-rebase': runPackageLock,
    'pre-commit': 'npm run typecheck && npm test && npm run lint:staged'
  }
};
