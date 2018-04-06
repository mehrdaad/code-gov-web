import { Component } from '@angular/core';

@Component({
  selector: 'home-header-navigation',
  styles: [
    require('./home-header-navigation.style.scss'),
    require('../../header-navigation/header-navigation.style.scss'),
  ],
  template: require('../../header-navigation/header-navigation.template.html'),
  host: {
    '(window:scroll)': 'onScrollHandler($event)',
  },
})

export class HomeHeaderNavigationComponent {
  private isAtTop: boolean = true;
  private color: string = "dark transparent";
  private dropdownSearchBox: boolean = false;

  /**
   * Triggers whenever the window is scrolled.
   *
   * @param $event - the scrolling event
   */
  onScrollHandler($event) {
    const top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    this.isAtTop = top === 0;
  }
}
