import { createContainer } from 'meteor/react-meteor-data';
import App from './App';
import Score from '../../../lib/Score.import';

export default createContainer((props) => {
  const score = Score.findOne();
  const count = score ? score.count : 0;

  const increment = () => {
    let { _id } = Score.findOne();
    Score.update(_id, { $inc: { count: 1 } });
  }

  return { count, increment }
}, App);