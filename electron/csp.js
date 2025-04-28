
const { session } = require('electron');

/**
 * Content Security Policy configuration for Electron
 */
function setupCsp() {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self';",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com;",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
          "font-src 'self' https://fonts.gstatic.com;",
          "img-src 'self' data: https://*.stripe.com;",
          "connect-src 'self' https://*.stripe.com https://gamepathai.com http://localhost:8080 https://gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com wss://*.stripe.com;",
          "frame-src 'self' https://*.stripe.com;"
        ].join(' ')
      }
    });
  });
}

module.exports = { setupCsp };
