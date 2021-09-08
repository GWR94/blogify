export interface HubCapsule {
  payload: {
    event: string;
    data?: SignInUserData;
  };
}

export interface SignInUserData {
  Session: CognitoUserSession;
  authenticationFlorType: string;
  client: ClientData;
  keyPrefix: string;
  pool: CognitoUserPool;
  storage: Storage;
  userDataKey: string;
  username: string;
  attributes?: {
    sub: string;
  };
  email: string;
  id: string;
  signInUserSession: {
    idToken: {
      payload: {
        sub: string;
        email: string;
        name: string;
      };
    };
  };
}
