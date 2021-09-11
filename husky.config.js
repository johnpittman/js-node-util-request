const runPackageLock = 'pnpm i';

module.exports = {
  hooks: {
    'post-checkout': `if [[ $HUSKY_GIT_PARAMS =~ 1$ ]]; then ${runPackageLock}; fi`,
    'post-merge': runPackageLock,
    'post-rebase': runPackageLock,
    'pre-commit': 'pnpm run typecheck && pnpm run test:changed && pnpm run lint:staged'
  }
};
