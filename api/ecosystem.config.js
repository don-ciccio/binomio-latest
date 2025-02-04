module.exports = {
    apps: [
        {
            name: "binomio-latest",
            script: "yarn",
            args: "run dev",
            env: {
                NODE_ENV: "development",
                ENV_VAR1: "environment-variable",
            },
        },
    ],
};
