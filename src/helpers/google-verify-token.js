const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = "125698844710-hlk73b0v0541g5dejkv0rdt07s8c0e6j.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

const validateGoogleIdToken = async (token) => {

    try {

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: [CLIENT_ID, "125698844710-v15ktn81svthdplq2h2fsmlfe24fbj6t.apps.googleusercontent.com", "125698844710-o4mhgugttpufadrr8n6hq6coblh80d36.apps.googleusercontent.com"], 
        });
        const payload = ticket.getPayload();
        
        return {
            name: payload['given_name'],
            lastName: payload['family_name'],
            email: payload["email"]
        };
        
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

module.exports = {
    validateGoogleIdToken,
}