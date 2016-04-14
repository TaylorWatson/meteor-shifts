// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  name: 'Shifts',
  description: 'Shift and tip tracking app',
  author: 'Shifts'
});


// Set up resources such as icons and launch screens.
App.icons({
  'iphone_2x': './client/imports/assets/images/icons/iphone_2x.png',
  'iphone_3x': './client/imports/assets/images/icons/iphone_3x.png',
  'ios_settings': './client/imports/assets/images/icons/ios_settings.png',
  'ios_settings_2x': './client/imports/assets/images/icons/ios_settings_2x.png',
  'ios_settings_3x': './client/imports/assets/images/icons/ios_settings_3x.png',
  'ios_spotlight': './client/imports/assets/images/icons/ios_spotlight.png',
  'ios_spotlight_2x': './client/imports/assets/images/icons/ios_spotlight_2x.png',
  'android_mdpi': './client/imports/assets/images/icons/android_mdpi.png',
  'android_hdpi': './client/imports/assets/images/icons/android_hdpi.png',
  'android_xhdpi': './client/imports/assets/images/icons/android_xhdpi.png',
  'android_xxhdpi': './client/imports/assets/images/icons/android_xxhdpi.png',
  'android_xxxhdpi': './client/imports/assets/images/icons/android_xxxhdpi.png'
});

App.launchScreens({
  'iphone_2x': './client/imports/assets/images/launchScreens/iphone_2x.png',
  'iphone5': './client/imports/assets/images/launchScreens/iphone5.png',
  'iphone6': './client/imports/assets/images/launchScreens/iphone6.png',
  'iphone6p_portrait': './client/imports/assets/images/launchScreens/iphone6p_portrait.png',
  'android_mdpi_portrait': './client/imports/assets/images/launchScreens/android_mdpi_portrait.png',
  'android_hdpi_portrait': './client/imports/assets/images/launchScreens/android_hdpi_portrait.png',
  'android_xhdpi_portrait': './client/imports/assets/images/launchScreens/android_xhdpi_portrait.png',
  'android_xxhdpi_portrait': './client/imports/assets/images/launchScreens/android_xxhdpi_portrait.png'
});

App.setPreference('HideKeyboardFromAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');


App.setPreference('StatusBarOverlaysWebView', 'false');
App.accessRule('*');