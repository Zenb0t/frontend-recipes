interface ENV {
    API_URL: string | undefined;
}

interface Config {
    API_URL: string;
}

const getConfig = (): ENV => {
    return {
        API_URL: process.env.REACT_APP_API_URL,
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

