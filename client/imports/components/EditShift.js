import React, { Component } from 'react';
// import TextField from 'material-ui/lib/text-field';
// import Toggle from 'material-ui/lib/toggle';
// import Paper from 'material-ui/lib/paper';
// import { Colors } from 'material-ui/lib/styles';

// import TimePicker from 'material-ui/lib/time-picker/time-picker';

// import TimePicker from 'material-ui/lib/time-picker/time-picker';

// import DatePicker from 'material-ui/lib/date-picker/date-picker';
// import IconButton from 'material-ui/lib/icon-button';
// import KeyboardArrowLeft from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-left';
// import AppBar from 'material-ui/lib/app-bar';
// import RaisedButton from 'material-ui/lib/raised-button';

// import { NavigationService } from '../services/navigation-service';
// import { ShiftService } from '../services/shift-service';
// import FloatingHeader from './ui/FloatingHeader';
import { Shift, Shifts } from '../../../lib/imports/collections/Shifts';

import moment from 'moment';

// const Style = {
//   width: '100%',
//   padding: '10px',
//   backgroundColor: Colors.blueGrey50,
//   height: 'calc(100vh - 64px)',
//   display: 'inline-block',
//   overflowX: 'auto'
// };

// const SaveButton = {
//   width: '100%',
//   height: '50px',
//   backgroundColor: Colors.blueGrey900,
// };

// const SubStyle = {
//   backgroundColor: Colors.grey100,
//   padding: '15px'
// };

export default class EditShift extends Component {

  constructor(props) {

    super(props);

    this.state = {
      shift: new Shift(props.shift || {})
    }

    this.saveClicked = this.saveClicked.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this);

  }

  componentDidMount() {
    $(this.refs.startTime).pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectHours: true,
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    $(this.refs.endTime).pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectHours: true,
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
  }

  changeHandler(event) {
    let { shift } = this.state;
    let { name, value } = event.target;

    shift[name] = value;

    this.setState({ shift });
  }

  handleChange(event) {
    let { shift } = this.state;
    let { name, value } = event.target;

    shift[name] = value;

    this.setState({ shift });
  }

  saveClicked() {
    let { shift } = this.state;

    shift = new Shift(shift);

    var result = shift.validate(err => {
      console.log('Validated!');
      if (err) {
      } else {
        let _id = Shifts.insert(shift.raw());
        FlowRouter.go('/');
      }
    });

  }

  navBack() {
    window.history.back();
  }

  handleDateTimeChange(procedure) {
    let [ field, action ] = procedure.split(':');

    return (err, newDate) => {
      let { shift } = this.state;

      shift[field] = (moment(new Date(newDate)).set(
        action == 'date' ?
        {
          year: newDate.getFullYear(),
          month: newDate.getMonth(),
          date: newDate.getDate()
        } :
        {
          hour: newDate.getHours(),
          minute: newDate.getMinutes(),
          second: newDate.getSeconds(),
          millisecond: newDate.getMilliseconds()
        }
      )).toDate();

      let { eTime, sTime } = this.fixBeforeAfter(shift);
      shift.startTime = sTime;
      if (shift.endTime) shift.endTime = eTime;
      this.setState({ shift });
    }
  }

  fixBeforeAfter(shift) {
    let { startTime, endTime } = shift;
    startTime = moment(new Date(startTime));
    endTime = moment(new Date(endTime));

    if (endTime.isBefore(startTime)) {
      endTime.add({ days: 1 });
    }

    return {
      sTime: startTime.toDate(),
      eTime: endTime.toDate()
    }
  }

  render() {
    let shift = this.state.shift;
    return (
      <div className="container">
        <form className="">
          <div className="input-field">
            <input id="title" name="title" onChange={ this.handleChange } type="text"/>
            <label htmlFor="title">Title</label>
          </div>
          <div className="input-field">
            <input id="location" name="location" onChange={ this.handleChange } type="text"/>
            <label htmlFor="location">Location</label>
          </div>
          <label htmlFor='startTime'>Start Time</label>
          <input type="date" id='startTime' ref='startTime' className="datepicker" />
          <label htmlFor='startTime'>End Time</label>
          <input type="date" id='endTime' ref='endTime' className="datepicker" />


          <p className='flow-text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos commodi nulla nam nisi minus fugit, temporibus modi eum molestiae aliquam suscipit delectus aspernatur, iusto cum impedit incidunt. Asperiores deserunt doloremque eum saepe tempora quod autem, error, optio maiores! Tempora quo a, repudiandae nam, inventore itaque deleniti tempore architecto adipisci laboriosam fugit quibusdam nemo cum, atque perspiciatis, est eligendi voluptas. Blanditiis, magni, quisquam ut ullam voluptates adipisci amet, pariatur inventore facere provident hic. Odit tenetur officia quo asperiores, vel repudiandae iure pariatur expedita doloribus eaque eos hic qui accusamus quasi cumque! Doloribus accusantium qui quae quis ducimus in, eos pariatur earum!</p>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus est vitae, dolore possimus quia fugiat vel temporibus voluptatibus unde. Nam enim cum, perspiciatis ratione, ut, eos quod totam quo sit dignissimos neque. Porro recusandae quam ipsam facere, cupiditate illum ab ipsum dolorum, voluptatibus a quia qui rem expedita optio modi deleniti quae maiores soluta. Expedita a perspiciatis eius sapiente iste temporibus recusandae, harum repellat corporis laboriosam porro doloremque consectetur ipsam quos ut incidunt saepe aut nam fuga cum voluptas officia repudiandae fugit neque! Molestias quasi quia dolor non atque repudiandae vero ratione qui velit eos cum ipsa, debitis sint delectus quibusdam dolore tempora blanditiis, illo commodi sapiente minus consequuntur, dolorum eveniet! Optio rem cum quasi est omnis cumque sint, rerum voluptatibus placeat nisi. Quibusdam maxime praesentium, dolorum cumque incidunt. Repellat quam consequuntur qui aspernatur. Dolores recusandae laudantium aperiam doloremque adipisci eaque officiis reiciendis reprehenderit fuga consequuntur quia dicta excepturi atque magni consequatur, deleniti illo eligendi unde, repudiandae! Culpa nihil iusto vel quibusdam reiciendis tempore alias sit eaque autem ab excepturi possimus, eum nam velit sunt ipsam veritatis, exercitationem distinctio nisi quaerat doloremque quia corporis pariatur error? Eligendi dolores maiores cupiditate iste quas dolore sint deleniti dolor id quia praesentium animi expedita impedit modi, minus asperiores a tempora magni earum ducimus ipsam eaque odit odio. Nulla possimus sapiente repellat et perferendis, laboriosam placeat, sed eos deserunt quis impedit porro ad! Dicta nemo est officia, nulla reprehenderit excepturi commodi corporis quisquam mollitia libero molestiae iure dolor quam facere, possimus, consequuntur temporibus amet aliquid, nihil. Culpa iusto laboriosam, velit maiores quisquam quas ab quibusdam. Consectetur, distinctio officiis nesciunt incidunt, cum a obcaecati ipsa fugit ducimus nulla porro, aliquam! Omnis quam qui exercitationem, voluptate culpa ratione dolorem facere eaque, est totam corporis, impedit libero at laborum tempora suscipit modi unde quos eius illum voluptas debitis. Blanditiis dignissimos nobis, enim asperiores in. Rerum earum, sunt accusamus possimus iste numquam consectetur hic quod iure natus placeat, unde a vero ipsam officia fugiat itaque fugit quasi magni voluptates! Laborum ex recusandae beatae laudantium voluptatem nisi, quae sed blanditiis magnam natus architecto dolorum inventore dolorem harum eius veniam illo odit, distinctio quo at nemo id quod. Odio, iusto blanditiis accusamus optio quae doloribus nisi molestiae atque, vitae, maxime asperiores incidunt ea eveniet consectetur. Possimus laudantium voluptatum fuga, aut cum sit culpa quis a laborum nesciunt. Modi earum tempore accusantium quod animi suscipit, pariatur reprehenderit nam mollitia, voluptatem enim ipsum consequatur illo sit rerum omnis dolorem odit odio? Soluta blanditiis iusto reprehenderit sed aut quod voluptatibus commodi sint rem quis recusandae saepe, laudantium sapiente facere ab provident. Nisi quis eos voluptate perspiciatis tempore ipsa sed saepe atque explicabo deleniti expedita iste quidem, maxime, reprehenderit ex id velit. Eligendi quibusdam perspiciatis, quidem quasi, voluptatem vel eius expedita est, sapiente at velit magnam quod provident quis unde, iste illum tenetur aspernatur minus minima quisquam repellendus mollitia molestiae! Alias, quaerat error necessitatibus facilis est blanditiis ut in expedita dolorum molestias pariatur non deleniti obcaecati tenetur voluptates architecto velit totam cupiditate iusto dolorem.</p>
        </form>
      </div>
    );
  }
}


//      <div>
//        <AppBar
//          title="Add Shift"
//          iconElementLeft={<IconButton onClick={ this.navBack }><KeyboardArrowLeft /></IconButton>}
//          style={{ backgroundColor: Colors.blueGrey900 }} />
//
//        <Paper style={ Style } zDepth={2}>
//          <FloatingHeader backgroundColor={ Colors.blueGrey900 } color={ Colors.grey50 }>Shift Info</FloatingHeader>
//
//          <Paper style={ SubStyle } zDepth={1}><br />
//            <TextField name="title" hintText="Title" value={ shift.title } fullWidth onChange={ this.changeHandler } /><br />
//            <TextField name="location" hintText="Location" value={ shift.location } fullWidth onChange={ this.changeHandler } />
//          </Paper>
//
//          <FloatingHeader backgroundColor={ Colors.blueGrey900 } color={ Colors.grey50 }>Shift Time</FloatingHeader>
//
//          <Paper style={ SubStyle } zDepth={1}><br />
//            <DatePicker
//              hintText="Start Date"
//              defaultDate={ this.state.editing ? new Date(shift.startTime) : new Date() }
//              value={ shift.startTime }
//              onChange={ this.handleDateTimeChange('startTime:date') } />
//            <TimePicker
//              ref="startTime"
//              format="ampm"
//              hintText="Start Time"
//              value={ shift.startTime }
//              onChange={ this.handleDateTimeChange('startTime:time') } />
//            <TimePicker
//              ref="endTime"
//              format="ampm"
//              hintText="End Time"
//              value={ shift.endTime }
//              onChange={ this.handleDateTimeChange('endTime:time') } />
//          </Paper>
//          <RaisedButton label="Save" onMouseUp={ this.saveClicked } style={ SaveButton } />
//        </Paper>
//
//
//      </div>
//