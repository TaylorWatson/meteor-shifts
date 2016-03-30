import { Meteor } from 'meteor/meteor';
import Score from '../lib/Score.import';

Meteor.startup(() => {
  // code to run on server at startup

  if (Score.find.count === 0){
    Score.insert({
      score: 0
    })
  }

});// beauty man you're pickin it up fast
