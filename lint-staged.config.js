const packageManager = 'npm';

module.exports = {
  '**/*.{js,jsx,ts,tsx,json,html}': [`${packageManager} run lint:eslint`]
};
