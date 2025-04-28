
const { session } = require('electron');

/**
 * Content Security Policy configuration for Electron
 */
function setupCsp() {
  // Intercepta requisições para evitar redirecionamentos não autorizados
  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    const url = new URL(details.url);
    
    // Bloquear redirecionamentos para domínios externos em requisições de API
    if (details.url.includes('/api/') && 
        !details.url.includes('localhost') && 
        !details.url.includes('127.0.0.1') && 
        !url.hostname.includes('gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com')) {
      console.log('Blocking external API redirect:', details.url);
      callback({cancel: true});
      return;
    }
    
    callback({});
  });

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
          "connect-src 'self' https://*.stripe.com https://gamepathai.com http://localhost:* https://localhost:* https://gamepathai-dev-lb-1728469102.us-east-1.elb.amazonaws.com wss://*.stripe.com;",
          "frame-src 'self' https://*.stripe.com;"
        ].join(' ')
      }
    });
  });
}

module.exports = { setupCsp };
