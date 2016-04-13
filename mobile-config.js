// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  name: 'Shifts',
  description: 'Shift and tip tracking app',
  author: 'Shifts'
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
