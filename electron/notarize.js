
const { notarize } = require('@electron/notarize');
const { build } = require('../package.json');

exports.default = async function notarizeApp(context) {
  const { electronPlatformName, appOutDir } = context;
  
  // Only notarize macOS builds
  if (electronPlatformName !== 'darwin') {
    return;
  }

  if (!process.env.APPLE_ID || !process.env.APPLE_ID_PASSWORD) {
    console.log('Skipping notarization: APPLE_ID and/or APPLE_ID_PASSWORD environment variables not set');
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  
  console.log(`Notarizing ${appName}...`);

  try {
    await notarize({
      tool: 'notarytool',
      appPath: `${appOutDir}/${appName}.app`,
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_ID_PASSWORD,
      teamId: process.env.APPLE_TEAM_ID,
    });
    
    console.log(`Successfully notarized ${appName}`);
  } catch (error) {
    console.error(`Notarization failed: ${error}`);
    throw error;
  }
};
