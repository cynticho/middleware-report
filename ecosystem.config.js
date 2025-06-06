module.exports = {
  apps: [
      {
          name: 'config-service',
          script: 'java',
          args: '-jar config-service.jar'
        },
      {
          name: 'authorization-service',
          script: 'java',
          args: '-jar authorization-service.jar'
        },
    {
      name: 'admin-service',
      script: 'java',
      args: '-jar admin-service.jar'
    },
    {
      name: 'agency-service',
      script: 'java',
      args: '-jar agency-service.jar'
    },
    {
      name: 'automobile-service',
      script: 'java',
      args: '-jar automobile-service.jar'
    },
    {
      name: 'city-service',
      script: 'java',
      args: '-jar city-service.jar'
    },
    {
      name: 'debug-service',
      script: 'java',
      args: '-jar debug-service.jar'
    },
    {
      name: 'discovery-service',
      script: 'java',
      args: '-jar discovery-service.jar'
    },
    {
      name: 'employee-service',
      script: 'java',
      args: '-jar employee-service.jar'
    },
    {
      name: 'gateway-service',
      script: 'java',
      args: '-jar gateway-service.jar'
    },
    {
      name: 'person-service',
      script: 'java',
      args: '-jar person-service.jar'
    },
    {
      name: 'role-service',
      script: 'java',
      args: '-jar role-service.jar'
    },
    {
      name: 'salary-service',
      script: 'java',
      args: '-jar salary-service.jar'
    }
  ]
};