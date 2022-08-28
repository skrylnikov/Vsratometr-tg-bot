module.exports = {
  apps: [
    {
      name: "vsratometr",
      script: "pnpm",
      automation: false,
      args: "start",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
}
