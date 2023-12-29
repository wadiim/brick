import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: "us-east-1_8aMFBTrZD",
    ClientId: "1s1b457jtch0sr5l0fvtia9f87"
}

const userPool = new CognitoUserPool(poolData);

export default userPool
