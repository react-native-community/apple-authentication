# Sign In with Apple for React Native

---

**🚧 UNDER CONSTRUCTION 🚧**

*This library is not currently released. The README below shows what the library will eventually do. Take a look in the [issues](https://github.com/react-native-community/apple-sign-in/issues) page for discussions on our progress.*

---

![Supports iOS](https://img.shields.io/badge/platforms-ios-lightgrey.svg) ![MIT License](https://img.shields.io/npm/l/@react-native-community/netinfo.svg)

Allows you to easily implement Sign In with Apple for your React Native app.

## Getting started

Install the library using either Yarn:

```
yarn add @react-native-community/apple-sign-in
```

or npm:

```
npm install --save @react-native-community/apple-sign-in
```

You then need to link the native parts of the library for the platforms you are using. The easiest way to link the library is using the CLI tool by running this command from the root of your project:

```
react-native link @react-native-community/apple-sign-in
```

If you can't or don't want to use the CLI tool, you can also manually link the library using the instructions below (click on the arrow to show them):

<details>
<summary>Manually link the library on iOS</summary>

Either follow the [instructions in the React Native documentation](https://facebook.github.io/react-native/docs/linking-libraries-ios#manual-linking) to manually link the framework or link using [Cocoapods](https://cocoapods.org) by adding this to your `Podfile`:

```ruby
pod 'react-native-apple-sign-in', :path => '../node_modules/@react-native-community/apple-sign-in'
```
</details>

TODO: Describe enabling the entitlement in Xcode

## Usage

Show the Sign In with Apple button:

```jsx
import { SignInWithAppleButton } from "@react-native-community/apple-sign-in";

function YourComponent() {
    return (
        <SignInWithAppleButton onPress={() => {
            // Start the sign in process
        }} />
    );
}
```

Performing the sign in:

```javascript
import { SignInWithApple } from "@react-native-community/apple-sign-in";

SignInWithApple.perform({
    requestedScopes: [
        SignInWithApple.Scopes.FullName,
        SignInWithApple.Scopes.Email,
    ]
}).then(credentials => {
    // Handle successful authenticated
}).catch(error => {
    // Handle authentication errors
})
```

Checking if an existing user ID is valid:

```javascript
import { SignInWithApple } from "@react-native-community/apple-sign-in";

SignInWithApple.getCredentialState(userId).then(state => {
    switch (state) {
        case SignInWithAppleCredential.State.Authorized:
            // Handle the authorised state
            break;
        case SignInWithAppleCredential.State.Revoked:
            // The user has signed out
            break;
        case SignInWithAppleCredential.State.NotFound:
            // The user id was not found
            break;
    }
})
```

Listening for credientials being revoked:

```javascript
import { SignInWithApple } from "@react-native-community/apple-sign-in";

// Subscribe
const unsubscribe = SignInWithApple.addRevokeListener(() => {
    // Handle the token being revoked
})

// Unsubscribe
unsubscribe();
```

## API

* **Component:**
  * [`SignInWithAppleButton`](#signinwithapplebutton)
    * **Enums:**
      * [`SignInWithAppleButton.Type`](#signinwithapplebuttontype)
      * [`SignInWithAppleButton.Style`](#signinwithapplebuttonstyle)
* **Methods:**
  * [`SignInWithApple.isAvailable()`](#signinwithappleisavailable)
  * [`SignInWithApple.perform()`](#signinwithappleperform)
  * [`SignInWithApple.getCredentialState()`](#signinwithapplegetcredentialstate)
  * [`SignInWithApple.addRevokeListener()`](#signinwithappleaddrevokelistener)
  * **Enums:**
    * [`SignInWithApple.Scopes`](#signinwithapplescopes)
    * [`SignInWithApple.Operation`](#signinwithappleoperation)
    * [`SignInWithApple.CredentialState`](#signinwithapplecredentialstate)
    * [`SignInWithApple.UserDetectionStatus`](#signinwithappleuserdetectionstatus)
* **Types:**
  * [`SignInWithAppleOptions`](#signinwithappleoptions)
  * [`SignInWithAppleCredential`](#signinwithapplecredential)

### `SignInWithAppleButton`

This component displays the "Sign In with Apple" button on your screen. The App Store Guidelines require you to use this component to start the sign in process instead of a custom button. You can customise the design of the button using the properties. You should start the sign in process when the `onPress` property is called.

You should only attempt to render this if `SignInWithApple.isAvailable()` resolves to `true`. This component will render nothing if it is not available and you will get a warning in `__DEV__ === true`.

The properties of this component extends from `View`, however, you should not attempt to restyle the background color or border radius with the `style` property. This will not work and is against the App Store Guidelines. The additionally accepted properties are:

| Property       | Type                                                         | Required? | Default                              | Description                                                    |
| -------------- | ------------------------------------------------------------ | --------- | ------------------------------------ | -------------------------------------------------------------- |
| `onPress`      | `() => void`                                                 | Yes       |                                      | The callback which is called when the user pressed the button. |
| `type`         | [`SignInWithAppleButton.Type`](#signinwithapplebuttontype)   | No        | `SignInWithAppleButton.Type.Default` | Controls the text that is shown on the button.                 |
| `style`        | [`SignInWithAppleButton.Style`](#signinwithapplebuttonstyle) | No        | `SignInWithAppleButton.Style.Black`  | Controls the style of the button.                              |
| `cornerRadius` | `number`                                                     | No        | ?                                    | The radius of the corners of the button.                       |

```jsx
import { SignInWithAppleButton, SignInWithAppleScopes } from "@react-native-community/apple-sign-in";

function YourComponent() {
    return (
        <SignInWithAppleButton
            type={SignInWithAppleButton.Type.Default}
            style={SignInWithAppleButton.Type.Black}
            cornerRadus={5}
            onPress={() => {
                // Start the sign in process
            }}
        />
    );
}
```

See the [Apple Documentation](https://developer.apple.com/documentation/authenticationservices/asauthorizationappleidbutton) for more details.

#### Enums

##### `SignInWithAppleButton.Type`

Controls the text that is shown of the [`SignInWithAppleButton`](#signinwithapplebutton). Possible values are:

* `SignInWithAppleButton.Type.Default`
* `SignInWithAppleButton.Type.SignUp`
* `SignInWithAppleButton.Type.Continue`

##### `SignInWithAppleButton.Style`

Controls the style of the [`SignInWithAppleButton`](#signinwithapplebutton). Possible values are:

* `SignInWithAppleButton.Style.Black`
* `SignInWithAppleButton.Style.White`
* `SignInWithAppleButton.Style.WhiteOutline`

### `SignInWithApple.isAvailable()`

A method which returns a `Promise` which resolves to a `boolean` if you are able to perform a Sign In with Apple. Generally users need to be on iOS 13+.

### `SignInWithApple.perform()`

Perform a Sign In with Apple request with the given [`SignInWithAppleOptions`](#signinwithappleoptions). The method will return a `Promise` which will resolve to a [`SignInWithAppleCredential`](#signinwithapplecredential) on success. You should make sure you include error handling.

```javascript
import { SignInWithApple } from "@react-native-community/apple-sign-in";

SignInWithApple.perform({
    requestedScopes: [
        SignInWithApple.Scopes.FullName,
        SignInWithApple.Scopes.Email,
    ]
}).then(credentials => {
    // Handle successful authenticated
}).catch(error => {
    // Handle authentication errors
})
```

### `SignInWithApple.getCredentialState()`

You can query the current state of a user ID. It will tell you if the token is still valid or if it has been revoked by the user.

```javascript
import { SignInWithApple } from "@react-native-community/apple-sign-in";

SignInWithApple.getCredentialState(userId).then(state => {
    switch (state) {
        case SignInWithAppleCredential.State.Authorized:
            // Handle the authorised state
            break;
        case SignInWithAppleCredential.State.Revoked:
            // The user has signed out
            break;
        case SignInWithAppleCredential.State.NotFound:
            // The user id was not found
            break;
    }
})
```

See the [Apple Documentation](https://developer.apple.com/documentation/authenticationservices/asauthorizationappleidprovider/3175423-getcredentialstateforuserid) for more details.

### `SignInWithApple.addRevokeListener()`

Adds a listener for when a token has been revoked. This means that the user has signed out and you should update your UI to reflect this.

```javascript
import { SignInWithApple } from "@react-native-community/apple-sign-in";

// Subscribe
const unsubscribe = SignInWithApple.addRevokeListener(() => {
    // Handle the token being revoked
})

// Unsubscribe
unsubscribe();
```

### Enums

#### `SignInWithApple.Scopes`

Controls which scopes you are requesting when the call [`SignInWithApple.perform()`](#signinwithappleperform). Possible values are:

* `SignInWithApple.Scopes.FullName`
  * A scope that includes the user’s full name.
* `SignInWithApple.Scopes.Email`
  * A scope that includes the user’s email address.

See the [Apple Documentation](https://developer.apple.com/documentation/authenticationservices/asauthorizationscope) for more details.

Not that it is possible that you will not be granted all of the scopes which you request. You need to check which ones you are granted in the [`SignInWithAppleCredential`](#signinwithapplecredential) you get back.

#### `SignInWithApple.Operations`

Controls what operation you are requesting when the call [`SignInWithApple.perform()`](#signinwithappleperform). Possible values are:

* `SignInWithApple.Operations.Login`
  * An operation used to authenticate a user.
* `SignInWithApple.Operations.Logout`
  * An operation that ends an authenticated session.
* `SignInWithApple.Operations.Refresh`
  * An operation that refreshes the logged-in user’s credentials.
* `SignInWithApple.Operations.Implicit`
  * An operation that depends on the particular kind of credential provider.

See the [Apple Documentation](https://developer.apple.com/documentation/authenticationservices/asauthorizationopenidoperation) for more details.

#### `SignInWithApple.CredentialState`

Defines the state that the credential is in when responding to your call to [`SignInWithApple.getCredentialState()`](#signinwithapplegetcredentialstate). Possible values are:

* `SignInWithApple.CredentialState.Authorized`
  * The user is authorized.
* `SignInWithApple.CredentialState.Revoked`
  * Authorization for the given user has been revoked.
* `SignInWithApple.CredentialState.NotFound`
  * The user can’t be found.

See the [Apple Documentation](https://developer.apple.com/documentation/authenticationservices/asauthorizationappleidprovidercredentialstate) for more details.

#### `SignInWithApple.UserDetectionStatus`

A value that indicates whether the user appears to be a real person. You get this in the `realUserStatus` property of a [`SignInWithAppleCredential`](#signinwithapplecredential) object. It can be used as one metric to help prevent fraud. Possible values are:

* `SignInWithApple.UserDetectionStatus.LikelyReal`
  * The user appears to be a real person.
* `SignInWithApple.UserDetectionStatus.Unknown`
  * The system hasn’t determined whether the user might be a real person.
* `SignInWithApple.UserDetectionStatus.Unsupported`
  * The system can’t determine this user’s status as a real person.

See the [Apple Documentation](https://developer.apple.com/documentation/authenticationservices/asuserdetectionstatus) for more details.

### Types

#### `SignInWithAppleOptions`

The options you can supply when making a call to [`SignInWithApple.perform()`](#signinwithappleperform). It is an object with these properties:

| Property             | Type                                                     | Required?                                         | Default                              | Description                                                                                                                                                                                                                                                                                         |
| -------------------- | -------------------------------------------------------- | ------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `requestedScopes`    | [`SignInWithApple.Scopes[]`](#signinwithapplescopes)     | No                                                | []                                   | The scopes that you are requesting. Supply an array. Defaults to an empty array (no scopes).                                                                                                                                                                                                        |
| `requestedOperation` | [`SignInWithApple.Operation`](#signinwithappleoperation) | No                                                | `SignInWithApple.Operation.Login`    | The operation that you would like to perform.                                                                                                                                                                                                                                                       |
| `user`               | `string`                                                 | Must be set for `Refresh` and `Logout` operations | `null`                               | Typically you leave this property set to nil the first time you authenticate a user. Otherwise, if you previously received an [`SignInWithAppleCredential`](#signinwithapplecredential) set this property to the value from the `user` property. Must be set for `Refresh` and `Logout` operations. |
| `state`              | `string`                                                 | No                                                | `null`                               | Data that’s returned to you unmodified in the corresponding credential after a successful authentication. Used to verify that the response was from the request you made. Can be used to avoid replay attacks.                                                                                      |

See the [Apple Documentation](https://developer.apple.com/documentation/authenticationservices/asauthorizationopenidrequest) for more details.

#### `SignInWithAppleCredential`

The user credentials returned to a successful call to [`SignInWithApple.perform()`](#signinwithappleperform). It is an object with these properties:

| Property            | Type                                                                         | Description                                                                                                                                                                                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `identityToken`     | `string`                                                                     | A JSON Web Token (JWT) that securely communicates information about the user to your app.                                                                                                                                                                                                              |
| `authorizationCode` | `string`                                                                     | A short-lived token used by your app for proof of authorization when interacting with the app’s server counterpart.                                                                                                                                                                                    |
| `user`              | `string`                                                                     | An arbitrary string that your app provided to the request that generated the credential. You can set this in [`SignInWithAppleOptions`](#signinwithappleoptions).                                                                                                                                      |
| `state`             | `string?`                                                                    | An identifier associated with the authenticated user. You can use this to check if the user is still authenticated later. This is stable and can be shared across apps released under the same development team. The same user will have a different identifier for apps released by other developers. |
| `authorizedScopes`  | [`SignInWithApple.Scopes[]`](#signinwithapplescopes)                         | The contact information the user authorized your app to access.                                                                                                                                                                                                                                        |
| `fullName`          | `string?`                                                                    | The user’s name. Might not present if you didn't request access or if the user denied access.                                                                                                                                                                                                          |
| `email`             | `string?`                                                                    | The user’s email address. Might not present if you didn't request access or if the user denied access.                                                                                                                                                                                                 |
| `realUserStatus`    | [`SignInWithApple.UserDetectionStatus`](#signinwithappleuserdetectionstatus) | A value that indicates whether the user appears to be a real person.                                                                                                                                                                                                                                   |

See the [Apple Documentation](https://developer.apple.com/documentation/authenticationservices/asauthorizationappleidcredential) for more details.

## Contributing

Please see the [contributing guide](/CONTRIBUTING.md).

## License

The library is released under the MIT license. For more information see [`LICENSE`](/LICENSE).
