import { createContainer } from 'meteor/react-meteor-data';
import EditShift from './EditShift';
import Shifts from '../../../lib/imports/collections/Shifts';

export default createContainer(({ isNew, shiftId }) => {
  if (isNew) {
    return {}
  } else {
    return {
      shift: Shifts.findOne(shiftId)
    }
  }
}, EditShift);