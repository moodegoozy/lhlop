module.exports = {
  apps: [
    {
      name: 'lhloop-react',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/var/www/a.lhloop.com',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
