const runPackageLock = 'npm i --no-audit --prefer-offline';

module.exports = {
  hooks: {
    'post-checkout': `if [[ $HUSKY_GIT_PARAMS =~ 1$ ]]; then ${runPackageLock}; fi`,
    'post-merge': runPackageLock,
    'post-rebase': runPackageLock,
    'pre-commit': 'npm run typecheck && npm run test:changed && npm run lint:staged'
  }
};
