
var Raven = require('raven-js');
require('raven-js/plugins/react-native')(Raven);

Raven
  .config('https://eb9c505411b8419faf730b2017687f8b@sentry.io/35311', { release: RELEASE_ID })
  .install();

const logException = (ex, context) => {
    Raven.captureException(ex, {
      extra: context
    });
    /*eslint no-console:0*/
    window.console && console.error && console.error(ex);
}


export default logException;
