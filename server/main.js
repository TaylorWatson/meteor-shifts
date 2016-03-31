import { Meteor } from 'meteor/meteor';
import Score from '../lib/imports/Score';

Meteor.startup(() => {
  // code to run on server at startup

  if (Score.find().count() === 0) {
    Score.insert({
      score: 0
    });
  }

});
