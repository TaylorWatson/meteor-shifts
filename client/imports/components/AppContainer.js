import { createContainer } from 'meteor/react-meteor-data';
import App from './App';
import Score from '../../../lib/imports/Score';
import LeftNavService from '../services/LeftNavService';

export default createContainer(({ content }) => {

  let open = LeftNavService.getOpenState();

  return { content, open }

}, App);