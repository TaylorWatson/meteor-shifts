import $ from 'jquery';
import { DatabaseService } from './services/database-service';
import { NavigationService } from './services/navigation-service';
import injectTapEventPlugin from 'react-tap-event-plugin';
import fastclick from 'fastclick';

$(document).on('deviceready', init);

function init() {


  injectTapEventPlugin();
  DatabaseService.init();
  NavigationService.init();

  // fastclick(document.body);
}