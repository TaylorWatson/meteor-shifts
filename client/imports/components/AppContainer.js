import { createContainer } from 'meteor/react-meteor-data';
import App from './App';
import Title from '../reactive-vars/Title';

export default createContainer(({ content }) => {

  let title = Title.get();

  return { content, title }

}, App);