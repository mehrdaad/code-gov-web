import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MobileService } from '../../services/mobile';

@Component({
  selector: 'header-navigation',
  styles: [require('./header-navigation.style.scss')],
  template: require('./header-navigation.template.html'),
  host: {
    '(window:scroll)': 'onScrollHandler($event)',
  },
})

export class HeaderNavigationComponent {
  searchQuery: string = '';
  isAtTop: boolean = true;
  isSearchBoxShown: boolean = false;
  searchBoxActiveSubscription: Subscription;

  constructor(
    public router: Router,
    private mobileService: MobileService,
  ) {
    this.searchBoxActiveSubscription = this.mobileService.activeSearchBox$.subscribe(isSearchBoxShown => this.isSearchBoxShown = isSearchBoxShown);
  }

  ngOnDestroy() {
    this.searchBoxActiveSubscription.unsubscribe();
  }

  /**
   * Whenever the form is submitted, perform a search and then reset the search
   * query.
   */
  handleFormSubmission() {
    this.search();
    this.resetSearchQuery();
  }

  /**
   * Reset the search query to a blank value.
   */
  resetSearchQuery() {
    this.searchQuery = '';
  }

  /**
   * Navigate to the search results page.
   *
   * @return {void}
   */
  search() {
    this.router.navigateByUrl('/search?q=' + this.searchQuery);
  }

  /**
   * Whether we are on an Policy Guide page.
   */
  isPolicyGuide() {
    return this.router.isActive('/policy-guide', false);
  }

  /**
   * Triggers whenever the window is scrolled.
   * 
   * @param $event - the scrolling event
   */
  onScrollHandler($event) {
    this.isAtTop = $event.target.scrollingElement.scrollTop === 0;
  }

  showSearchBox() {
    this.mobileService.showSearchBox();
  }

  hideSearchBox() {
    this.mobileService.hideSearchBox();
  }

  toggleSearchBox() {
    this.mobileService.toggleSearchBox();
  }
}
