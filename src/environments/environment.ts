// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyArDq6YXC7ADyysVLoj4TLgDj6stCCMye8",
    authDomain: "solaris-dev.firebaseapp.com",
    databaseURL: "https://solaris-dev.firebaseio.com",
    projectId: "solaris-dev",
    storageBucket: "solaris-dev.appspot.com",
    messagingSenderId: null
  }
};
