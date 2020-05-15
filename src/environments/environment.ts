// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Sample config. Replace it with your firebase project config.
  firebase: {
    apiKey: 'AIzaSyBwGSgCh0CKqop9vqrn89f3sGJxp7wOy7o',
    authDomain: 'floc-chat.firebaseapp.com',
    projectId: 'floc-chat',
    appId: '1:669034206890:web:0f5a2f6dcbe6676d03e2d3'
  },
  botBuilderURL: 'http://localhost:5005',
  apiURL: 'http://localhost:8080/api/v1',
  downloadURL: 'http://localhost:8080/starter/zip',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
