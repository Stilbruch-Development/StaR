const rewireStyledComponents = require('react-app-rewire-styled-components');

module.exports = function override(config, env) {
  const rewired = rewireStyledComponents(config, env, {
    displayName: true
  });
  return rewired;
};
