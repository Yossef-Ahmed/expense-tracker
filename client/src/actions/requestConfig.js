export const setTokenAndConfig = getState => {
    const token = getState().auth.token;
    
    const config = setConfig();
    
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}

export const setConfig = () => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    return config;
}