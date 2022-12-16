//The config file is used to store the configuration variables that are used in the application.
// All configuration variables are stored in the .env file in the root of the project.
// If additional configuration variables are needed, they should be added to the .env file and then added to the interface below.


interface ENV {
    API_URL: string | undefined;
    AUTH0_DOMAIN: string | undefined;
    AUTH0_CLIENT_ID: string | undefined;
    AUTH0_CALLBACK_URL: string | undefined;
}

interface Config {
    API_URL: string;
    AUTH0_DOMAIN: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_CALLBACK_URL: string;
}

const getConfig = (): ENV => {
    return {
        API_URL: process.env.REACT_APP_API_URL,
        AUTH0_DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN,
        AUTH0_CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID,
        AUTH0_CALLBACK_URL: process.env.REACT_APP_AUTH0_CALLBACK_URL,
    };
}

const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env, please verify your config.env file or .env file`);
        }
    }
    return config as Config;
}

const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);
export default sanitizedConfig;

