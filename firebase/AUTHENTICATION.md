# Firebase Authentication
Most apps need to know the identity of a user. Knowing a user's identity allows an app to securely save user data in the cloud and provide the same personalized experience across all of the user's devices.
Firebase Authentication provides `backend services`, `easy-to-use SDKs`, and `ready-made UI` libraries to authenticate users to your app. It supports authentication using `passwords`, `phone numbers`, popular `federated identity providers `like Google, Facebook and Twitter, and more.
Firebase Authentication integrates tightly with other Firebase services, and it leverages industry standards like OAuth 2.0 and OpenID Connect, so it can be easily integrated with your custom backend.

# Usage
- FirebaseUI Auth
    FirebaseUI provides a `drop-in auth solution` that handles the `UI flows` for `signing in` users with `email` addresses and `passwords`, `phone numbers`, and with `popular federated identity providers`, including `Google Sign-In` and `Facebook Login`.
- Firebase SDK Authentication
    - `Email and password based authentication`
        Authenticate users with their email addresses and passwords. The Firebase Authentication SDK provides methods to create and manage users that use their email addresses and passwords to sign in. Firebase Authentication also handles sending password reset emails.
        https://firebase.google.com/docs/auth/web/password-auth?authuser=0#web-namespaced-api
    - `Federated identity provider integration`
        Authenticate users by integrating with federated identity providers. The Firebase Authentication SDK provides methods that allow users to sign in with their Google, Facebook, Twitter, and GitHub accounts.
    - `Phone number authentication`
        Authenticate users by sending SMS messages to their phones.
    - `Custom auth system integration`
        Connect your app's existing sign-in system to the Firebase Authentication SDK and gain access to Firebase Realtime Database and other Firebase services.
    - `Anonymous auth`
        Use features that require authentication without requiring users to sign in first by creating temporary anonymous accounts. If the user later chooses to sign up, you can upgrade the anonymous account to a regular account, so the user can continue where they left off.
- Firebase Authentication with `Identity Platform`
    Firebase Authentication with Identity Platform is an optional upgrade that adds several new features to Firebase Authentication.
    - Features
        `Multi-factor authentication` 
            Multi-factor authentication with SMS protects your users' data by adding a second layer of security to your app.
        `Blocking functions`
            Blocking functions let you run custom code that modifies the result of a user registering or signing in to your app.
        `SAML and OpenID Connect providers`
            REF- https://www.onelogin.com/learn/saml#:~:text=SAML%20is%20an%20acronym%20used,one%20set%20of%20login%20credentials.

            Support sign-in using SAML (web only) and OpenID Connect providers not natively supported by Firebase.
        `User activity and audit logging`
            Monitor and log administrative access and end-user activity.
        `Abuse prevention with App Check`
            App Check helps protect your project from abuse by preventing unauthorized clients from accessing your auth endpoints.
        `Multi-tenancy`
            Using tenants, you can create multiple unique silos of users and configurations within a single project.
        `Enterprise support and SLA`
            Upgraded projects get uptime guarantees for Auth services according to the Identity Platform Service Level Agreement (SLA) and access to enterprise-grade support.
        `Automatic clean-up of anonymous users`
            You will get the option to enable anonymous accounts to be automatically deleted if they are over thirty days old. Anonymous accounts also will no longer count towards billing and usage quotas.
    
