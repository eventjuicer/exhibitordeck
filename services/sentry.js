import Sentry from 'sentry-expo';
Sentry.enableInExpoDevelopment = true;

export default function(){

    Sentry.config('https://66b467cc8a61480cbd381f811a5e7ac5@sentry.io/240287').install();

}