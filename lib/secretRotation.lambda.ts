import {
    GetSecretValueCommand,
    SecretsManagerClient,
    UpdateSecretCommand,
  } from '@aws-sdk/client-secrets-manager';
  import axios from 'axios';
  
  const secretsManager = new SecretsManagerClient({ region: 'us-east-1' });
  
  export const main = async () => {
    const secretName = process.env.SECRET_NAME;
  
    try {
      if (!secretName) {
        throw new Error('Secret name not provided in environment variable SECRET_NAME.');
      }
  
      const { SecretString: secretString } = await secretsManager.send(
        new GetSecretValueCommand({ SecretId: secretName })
      );
  
      if (!secretString) {
        throw new Error(`Secret string not found for secret: ${secretName}`);
      }
  
      const secrets = JSON.parse(secretString);
  
      console.log('Generating new access token from Auth0.');
  
      const res = await axios.post(
        secrets['LYNKWELL_API_TOKEN_URL'],
        {
          audience: secrets['LYNKWELL_API_AUDIENCE'],
          client_id: secrets['LYNKWELL_API_CLIENT_ID'],
          client_secret: secrets['LYNKWELL_API_CLIENT_SECRET'],
          grant_type: 'client_credentials',
        },
        { headers: { 'Accept-Encoding': '*', 'Content-Type': 'application/json' } }
      );
      secrets['AUTH0_ACCESS_TOKEN'] = res.data.access_token;
  
      console.log('Generated new access token from Auth0.');
  
      const updatedSecretString = JSON.stringify(secrets);
  
      await secretsManager.send(
        new UpdateSecretCommand({ SecretId: secretName, SecretString: updatedSecretString })
      );
  
      return { statusCode: 200, body: 'Secret rotation successful.' };
    } catch (error) {
      console.error('Error rotating secret:', error);
      return { statusCode: 500, body: 'Error rotating secret.' };
    }
  };
  