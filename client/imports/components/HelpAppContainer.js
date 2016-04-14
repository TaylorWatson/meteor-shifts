import { createContainer } from 'meteor/react-meteor-data';
import HelpApp from './HelpApp';
import Title from '../reactive-vars/Title';

export default createContainer(({ content }) => {

  let title = Title.get();

  return { content, title }

}, HelpApp);