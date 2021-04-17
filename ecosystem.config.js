module.exports = {
  /**
   * Application configuration section
   */
  apps: [
    {
      name: "TheatreTicketsServer",
      script: "server/server.js",
      instances: "max",
      exec_mode: "cluster",
      env: {},
      env_dev: {
        NODE_ENV: "dev",
      },
      env_stage: {
        NODE_ENV: "stage",
      },
      env_local: {
        NODE_ENV: "local",
      },
      env_qa: {
        NODE_ENV: "qa",
      },
      env_preprod: {
        NODE_ENV: "preprod",
      },
      env_prod: {
        NODE_ENV: "prod",
      },
    },
  ],
};
