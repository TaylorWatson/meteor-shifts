import Home from './Home';
import { createContainer } from 'meteor/react-meteor-data';
import Shifts from '../../../lib/imports/Shifts';

export default createContainer(() => {


  return {
    shifts: Shifts.find().fetch()
  }
}, Home);