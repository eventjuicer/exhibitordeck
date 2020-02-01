import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';

const Init = () => {

    Sentry.init({
        dsn : "https://66b467cc8a61480cbd381f811a5e7ac5@sentry.io/240287",
        enableInExpoDevelopment : true,
        debug : true
    })
    
    Sentry.setRelease(Constants.manifest.revisionId);

}

export default Init;