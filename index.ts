import { NativeModules, requireNativeComponent } from 'react-native';

export interface SignInWithAppleOptions {
  /**
   * The scopes that you are requesting. Supply an array. Defaults to an empty array (no scopes).
   */
  requestedScopes?: SignInWithAppleScope[];

  /**
   * The operation that you would like to perform.
   */
  requestedOperation?: SignInWithAppleOperation;

  /**
   * Typically you leave this property set to nil the first time you authenticate a user.
   * Otherwise, if you previously received an SignInWithAppleCredential set this property to the value from the user property.
   * Must be set for Refresh and Logout operations.
   */
  user?: string;

  /**
   * Data that’s returned to you unmodified in the corresponding credential after a successful authentication.
   * Used to verify that the response was from the request you made. Can be used to avoid replay attacks.
   */
  state?: string;
}

export interface SignInWithAppleCredential {
  /**
   * A JSON Web Token (JWT) that securely communicates information about the user to your app.
   */
  identityToken: string;

  /**
   * A short-lived token used by your app for proof of authorization when interacting with the app’s server counterpart.
   */
  authorizationCode: string;

  /**
   * An arbitrary string that your app provided to the request that generated the credential.
   * You can set this in SignInWithAppleOptions.
   */
  user: string;

  /**
   * An identifier associated with the authenticated user.
   * You can use this to check if the user is still authenticated later.
   * This is stable and can be shared across apps released under the same development team.
   * The same user will have a different identifier for apps released by other developers.
   */
  state?: string;

  /**
   * The contact information the user authorized your app to access.
   */
  authorizedScopes: SignInWithAppleScope[];

  /**
   * The user’s name. Might not present if you didn't request access or if the user denied access.
   */
  fullName?: string;

  /**
   * The user’s email address. Might not present if you didn't request access or if the user denied access.
   */
  email?: string;

  /**
   * A value that indicates whether the user appears to be a real person.
   */
  realUserStatus: SignInWithAppleUserDetectionStatus;
}

export interface SignInWithAppleScopes {
  FULL_NAME: string;
  EMAIL: string;
}

export type SignInWithAppleScope = keyof SignInWithAppleScopes;

export interface SignInWithAppleOperations {
  LOGIN: string;
  LOGOUT: string;
  REFRESH: string;
  IMPLICIT: string;
}

export type SignInWithAppleOperation = keyof SignInWithAppleOperations;

export interface SignInWithAppleUserDetectionStatuses {
  LIKELY_REAL: string;
  UNKNOWN: string;
  UNSUPPORTED: string;
}

export type SignInWithAppleUserDetectionStatus = keyof SignInWithAppleUserDetectionStatuses;


export interface ISignInWithApple {
  requestAsync: (signInWithAppleOptions: SignInWithAppleOptions) => Promise<SignInWithAppleCredential>;
  Scope: SignInWithAppleScopes;
  Operation: SignInWithAppleOperations;
  UserDetectionStatus: SignInWithAppleUserDetectionStatuses;
}

export const SignInWithApple: ISignInWithApple = NativeModules.RNCAppleAuthentication;

export const SignInWithAppleButton = requireNativeComponent('RNCSignInWithAppleButton');