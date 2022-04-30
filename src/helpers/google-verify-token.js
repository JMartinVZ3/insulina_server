const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = "975571153466-cc0le9shvit4llbpqdm8qd7hsr0uf8c2.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

const validateGoogleIdToken = async (token) => {

    try {

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: [CLIENT_ID, "975571153466-cc0le9shvit4llbpqdm8qd7hsr0uf8c2.apps.googleusercontent.com", "975571153466-46uhjl2ltrhejb5ibjjsg79ft9tsva33.apps.googleusercontent.com"], 
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