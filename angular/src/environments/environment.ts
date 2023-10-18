// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  hmr: false,
  appConfig: "appconfig.json",
  firebaseConfig: {
    apiKey: "AIzaSyCqpfc2FZ-eSAtcd6bupNHB1a1UHjFbw-I",
    authDomain: "bookroom-392808.firebaseapp.com",
    databaseURL: "https://bookroom-392808-default-rtdb.firebaseio.com",
    projectId: "bookroom-392808",
    storageBucket: "bookroom-392808.appspot.com",
    messagingSenderId: "466971835181",
    appId: "1:466971835181:web:245d6fd65b91bfda0d71a4",
    measurementId: "G-0W0DEW9GFY",
  },
};
