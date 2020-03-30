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
  "FCA_CERT": {
    host: 'lab-home.qliksense.fcagroup.com',
    secure: true,
    port: 443,
    prefix: '',
    appId: 'b11cb256-efc4-4e14-a3db-9c74099f450a'
  },
}

const qConfig = qEnvironments[process.env.REACT_APP_QLIK_ENV];

module.exports = module.exports = qConfig.default || qConfig;

// const qConfig = {
//     host: '40.113.14.238',
//     secure: true,
//     port: 443,
//     prefix: '',
//     appId: '8aa3a035-0689-4aab-a920-d6722509ed51'
// };


module.exports =  qConfig
