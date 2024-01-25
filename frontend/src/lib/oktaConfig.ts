export const oktaConfig = {
    clientId: '0oadzkqd8uaRkCluu5d7',
    issuer: 'https://dev-36379144.okta.com/oauth2/default',
    redirectUri: 'https://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true
}