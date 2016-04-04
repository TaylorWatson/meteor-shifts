import React, { Component, PropTypes } from 'react';

// import { ShiftService } from '../services/shift-service';
import Title from '../reactive-vars/Title';

// import { EditShift } from './edit-shift.jsx';
// import { DeliveriesPage } from './deliveries-page.jsx';
import ShiftCard from './ui/ShiftCard';

//take out after shiftCards is finished.
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close';

import _ from 'lodash';
import moment from 'moment';

import Shift from '../models/Shift';

export default class Home extends Component {

  constructor() {
    super();

    this.state = {
      shifts: []
    }
  }

  componentDidMount() {
    $(this.refs.test).sideNav();
    Materialize.showStaggeredList('#shifts');

    Shift.find((err, shifts) => {
      this.setState({ shifts });
    })
  }


  addShift() {
    FlowRouter.go('/shifts');
  }

  render() {

    let shiftList;

    if (this.state.shifts.length) {

      let currentlyClockedIn = !!_.find(this.state.shifts, s => (s.clockInTime !== "undefined" && s.clockOutTime == "undefined"));

      shiftList = this.state.shifts.map((shift, i) => (
        <ShiftCard
          shift={ shift }
          currentlyClockedIn={ currentlyClockedIn }
          onClick={ this.selectShift }
          key={ shift.id } />
      ));

    } else {
      shiftList = <p style={{ paddingLeft: '20px' }} className="flow-text">No upcoming shifts.</p>
    }

    return (
      <ul className="collection" id='shifts'>
        { shiftList }
      </ul>
    );
  }
}

Home.propTypes = {
  shifts: PropTypes.array.isRequired
}


        // <li className='collection-item'>
        //   <div className='card grey lighten-4 row waves-effect waves-block default'>
        //   <div className='card-content'>
        //     <h5 className='activator'>Sunday the 5th<MoreVertIcon className='activator right' color={ "black" } /></h5>
        //     <p>Shift Title: Chicken <br /> Shift location: Butt</p>
        //   </div>
        //   <div className='card-reveal'>
        //     <span className='card-title' style={{ margin: '5px' }}><CloseIcon className='right card-title' color={ "black" } /></span>
        //     <a className="waves-effect waves-light btn" key={ 1 } style={{ margin: '0 0 10px 0' }} >Resume Shift</a><br />
        //     <a className="waves-effect waves-light btn" key={ 2 } >End Shift</a>
        //   </div>
        //   </div>
        // </li>

        // <li className='collection-item card grey lighten-4 row waves-effect waves-block default' style={{ margin: '10px 10px 10px 10px' }}>
        //   <div className='card-content'>
        //     <h5 className='activator'>Sunday the 5th<MoreVertIcon className='activator right' color={ "black" } /></h5>
        //     <p>Shift Title: Chicken <br /> Shift location: Butt</p>
        //   </div>
        //   <div className='card-reveal'>
        //     <span className='card-title' style={{ margin: '5px' }}><CloseIcon className='right card-title' color={ "black" } /></span>
        //     <a className="waves-effect waves-light btn" key={ 1 } style={{ margin: '0 0 10px 0' }} >Resume Shift</a><br />
        //     <a className="waves-effect waves-light btn" key={ 2 } >End Shift</a>
        //   </div>
        // </li>

        // <li className='collection-item card grey lighten-4 row waves-effect waves-block default' style={{ margin: '10px 10px 10px 10px' }}>
        //   <div className='card-content'>
        //     <h5 className='activator'>Sunday the 5th<MoreVertIcon className='activator right' color={ "black" } /></h5>
        //     <p>Shift Title: Chicken <br /> Shift location: Butt</p>
        //   </div>
        //   <div className='card-reveal'>
        //     <span className='card-title' style={{ margin: '5px' }}><CloseIcon className='right card-title' color={ "black" } /></span>
        //     <a className="waves-effect waves-light btn" key={ 1 } style={{ margin: '0 0 10px 0' }} >Resume Shift</a><br />
        //     <a className="waves-effect waves-light btn" key={ 2 } >End Shift</a>
        //   </div>
        // </li>
        // <li className='collection-item card grey lighten-4 row waves-effect waves-block default' style={{ margin: '10px 10px 10px 10px' }}>
        //   <div className='card-content'>
        //     <h5 className='activator'>Sunday the 5th<MoreVertIcon className='activator right' color={ "black" } /></h5>
        //     <p>Shift Title: Chicken <br /> Shift location: Butt</p>
        //   </div>
        //   <div className='card-reveal'>
        //     <span className='card-title' style={{ margin: '5px' }}><CloseIcon className='right card-title' color={ "black" } /></span>
        //     <a className="waves-effect waves-light btn" key={ 1 } style={{ margin: '0 0 10px 0' }} >Resume Shift</a><br />
        //     <a className="waves-effect waves-light btn" key={ 2 } >End Shift</a>
        //   </div>
        // </li>
        // <li className='collection-item card grey lighten-4 row waves-effect waves-block default' style={{ margin: '10px 10px 10px 10px' }}>
        //   <div className='card-content'>
        //     <h5 className='activator'>Sunday the 5th<MoreVertIcon className='activator right' color={ "black" } /></h5>
        //     <p>Shift Title: Chicken <br /> Shift location: Butt</p>
        //   </div>
        //   <div className='card-reveal'>
        //     <span className='card-title' style={{ margin: '5px' }}><CloseIcon className='right card-title' color={ "black" } /></span>
        //     <a className="waves-effect waves-light btn" key={ 1 } style={{ margin: '0 0 10px 0' }} >Resume Shift</a><br />
        //     <a className="waves-effect waves-light btn" key={ 2 } >End Shift</a>
        //   </div>
        // </li>