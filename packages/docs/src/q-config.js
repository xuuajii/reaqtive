//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//


const qEnvironments = {
  "DESKTOP": {
      host: 'localhost',
      secure: false,
      port: 4848,
      prefix: '',
      appId: 'Purchasing.qvf'
  },
  "ENG_SERVER": {
    host: '40.113.14.238',
    secure: true,
    port: 443,
    prefix: '',
    appId: 'd487e0f7-ab0c-4332-b028-4ed460439f95'
  },
}

const qConfig = qEnvironments[process.env.REACT_APP_QLIK_ENV];

module.exports = module.exports = qConfig.default || qConfig;

module.exports =  qConfig
