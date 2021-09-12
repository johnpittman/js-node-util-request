const { PACKAGE_MANAGER } = require('./constants');

module.exports = {
  '**/*.{js,jsx,ts,tsx,json,html}': [`${PACKAGE_MANAGER} run lint:eslint`]
};
