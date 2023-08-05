// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "",
    authDomain: "vfr-flight.firebaseapp.com",
    databaseURL: "https://vfr-flight-default-rtdb.firebaseio.com",
    projectId: "vfr-flight",
    storageBucket: "vfr-flight.appspot.com",
    messagingSenderId: "",
    appId: "1:581325165540:web:707850dbc756707c692df1",
    measurementId: "G-NEGWC5Z4LM"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
