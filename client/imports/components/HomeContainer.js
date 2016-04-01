import Home from './Home';
import { createContainer } from 'meteor/react-meteor-data';
// import { Shifts } from '../../../lib/imports/collections/Shifts';

export default createContainer(() => {
  return {
    shifts: []
  }
}, Home);