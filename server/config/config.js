var _ = require('lodash');

var config={
    dev:'development',
    test:'testing',
    prod:'production',
    port: process.env.PORT || 8000
};
//check if node environemnt was set else set it to development
process.env.NODE_ENV=process.env.NODE_ENV || config.dev
//set config.env to whatever NODE_ENV is
config.env=process.env.NODE_ENV;

var envConfig;

module.exports=_.merge(config,envConfig);