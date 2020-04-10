//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//


const qEnvironments = {
  "DESKTOP": {
      host: 'localhost',
      secure: false,
      port: 4848,
      prefix: '',
      appId: 'Fleet Competitiveness Summary.qvf'
  },
  "ENG_SERVER": {
    host: '40.113.14.238',
    secure: true,
    port: 443,
    prefix: '',
    appId: '61102840-1738-42b6-aeb0-0e764b7cf03f'
  },
  "FCA_CERT": {
    host: 'lab-home.qliksense.fcagroup.com',
    secure: true,
    port: 443,
    prefix: '',
    appId: '5706c7fe-f390-4e24-8efc-4b921836a0e0'
  },
}

const qConfig = qEnvironments[process.env.REACT_APP_QLIK_ENV];

module.exports = module.exports = qConfig.default || qConfig;

module.exports =  qConfig
