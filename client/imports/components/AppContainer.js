import { createContainer } from 'meteor/react-meteor-data';
import App from './App';
import Score from '../../../lib/imports/Score';
import LeftNavOpen from '../reactive-vars/LeftNavOpen';

export default createContainer(({ content }) => {

  let open = LeftNavOpen.get();

  return { content, open }

}, App);