import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from '../components/layout.jsx';
import { Home } from '../components/home.jsx';
import { DeliveriesPage } from '../components/deliveries-page.jsx';

class NavigationService {
  constructor() {
    this.state = [];
  }

  init() {
    document.addEventListener("backbutton", this.backbuttonPressed, false);

    this.setState(<Home />);
  }

  backbuttonPressed() {
    this.popState();
  }

  render(component) {
    ReactDOM.render(<Layout>{ component }</Layout>, document.getElementById("app"));
  }

  pushState(component) {
    this.state.push(component);
    this.render(component);
  }

  setState(component) {
    this.state = [component];
    this.render(component);
  }

  popState() {
    this.state.pop();
    let component = this.state[this.state.length - 1];
    this.render(component);
  }
}

NavigationService = new NavigationService();

export { NavigationService };