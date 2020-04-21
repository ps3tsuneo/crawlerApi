var config = {
        database: {
            host: 'ip',
            user: 'user',
            password: 'password',
            database : 'dbName'
        },
        certs: {
            privKey: 'path2privkey/privkey.pem',
            cert: 'path2cert/cert.pem'
        },
        user: {
            username: 'username',
            password: 'password'
        },
        jsonPayload: {
            username: 'username',
            organization: 'dummy',
            telf: 'dummy',
            title: 'dummy'
        },
        jwtSigningKeys: {
            privKey: 'path2key/private.pem',
            pubKey: 'path2key/public.pem'
        },
        jwtSigningOptions: {
            issuer: "UNDomains CA",
            subject:  "DB crawler access",
            expiresIn:  "12h",
            algorithm:  "RS256"
        },
        jwtVerifyOptions : {
            issuer: "UNDomains CA",
            subject:  "DB crawler access",
            expiresIn:  "12h",
            algorithm:  ["RS256"]
        }
};

module.exports = config;

		