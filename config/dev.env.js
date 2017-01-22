var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVICE_URL: '"http://localhost:8888/ascoota-api/"',
  STATS_URL: '"http://localhost:8888/ascoota-api/stats"'
})
