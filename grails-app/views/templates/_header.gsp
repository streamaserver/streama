<%@ page import="streama.Settings" %>
<header class="main navbar-fixed-top" ng-if="!isCurrentState('player')">
  <div class="pull-left flex">
    <a class="logo" ui-sref="dash">
      <g:imgSetting setting="${Settings.findByName('logo').value}" alt="${streama.Settings.findByName('title').value} Logo"></g:imgSetting>
      <div class="spinner" ng-show="baseData.loading">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </a>
    <g:if test="${streama.Settings.findByName('show_version_num').value == 'true'}">
      <div class="version">v${grailsApplication.metadata.getApplicationVersion()}</div>
    </g:if>

    <div class="collapse navbar-collapse" id="navbar-collapse-nav">
      <ul class="nav navbar-nav">
        <li><a ng-click="changeDashType('home')" ng-class="{active: (isDashType('home') || isDashType(undefined))}">{{'DASHBOARD.HOME' | translate}}</a></li>
        <li ng-if="$root.settings && !$root.getSetting('hide-dash-sections').parsedValue">
          <a ng-click="changeDashType('discover-shows')" ng-class="{active: (isDashType('discover-shows'))}">{{'DASHBOARD.TV_SHOWS' | translate}}</a>
        </li>
        <li ng-if="$root.settings && !$root.getSetting('hide-dash-sections').parsedValue">
          <a ng-click="changeDashType('discover-movies')" ng-class="{active: (isDashType('discover-movies'))}">{{'DASHBOARD.MOVIES' | translate}}</a>
        </li>
        <li ng-if="$root.settings && !$root.getSetting('hide-dash-sections').parsedValue && $root.getSetting('hide-mylist-button').parsedValue != true">
          <a ng-click="changeDashType('watchlist')" ng-class="{active: (isDashType('watchlist'))}">{{'DASHBOARD.MY_LIST' | translate}}</a>
        </li>
        <li class="browse-genres" ng-if="isCurrentState('dash') && genres.length && !$root.currentProfile.isChild">
          <a ng-class="{active: selectedGenre}" ng-click="toggleGenreMenu()">
            <span ng-if="selectedGenre">
              <span>{{'VIDEO.GENRE' | translate}}:</span>
              <span ng-bind="selectedGenre.name"></span>
            </span>
            <span ng-if="!selectedGenre">{{'DASHBOARD.BROWSE_GENRES' | translate}}</span>
            <i class="ion-android-arrow-dropdown"></i>
          </a>

          <div class="toggle-menu-content" ng-show="genreMenuOpen">
            <i class="ion-close-circled pull-right" ng-click="toggleGenreMenu()"></i>
            <ul>
              <li>
                <a ng-click="changeGenre()"><i class="ion-grid"></i> All</a>
              </li>
              <li ng-repeat="genre in ::genres">
                <a ng-click="changeGenre(genre)" ng-bind="::genre.name"></a>
              </li>
            </ul>
          </div>

        </li>
      </ul>
    </div>



    <i class="ion-navicon navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-nav"></i>
  </div>

  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul class="nav navbar-nav">

      <li ng-if="isCurrentState('dash') && $root.getSetting('hide-dash-search').parsedValue != true">
        <div class="dash-search form-group has-feedback">
          <input type="text" placeholder="Search.." class="form-control input-xs" ng-model="dashSearch"
                 typeahead-append-to-body="true" uib-typeahead="(item.title || item.name) for item in searchMedia($viewValue)"
                 typeahead-on-select="selectFromSearch($item)" typeahead-template-url="/streama/typeahead--media.htm" typeahead-loading="baseData.loading"/>
          <span class="form-control-feedback ion-android-search" aria-hidden="true"></span>
        </div>
      </li>
      <sec:ifLoggedIn>
        <li ng-if="$root.getSetting('hide-dash-button').parsedValue != true">
          <a ui-sref="dash">{{'DASHBOARD.TITLE' | translate}}</a>
        </li>
      </sec:ifLoggedIn>

      <sec:ifAnyGranted roles="ROLE_CONTENT_MANAGER">
        <li><a ui-sref="admin.shows">{{'MANAGE_CONTENT' | translate}}</a></li>
      </sec:ifAnyGranted>

      <sec:ifAnyGranted roles="ROLE_ADMIN">
        <li><a ui-sref="settings.settings">{{'ADMIN' | translate}}</a></li>
      </sec:ifAnyGranted>

      <sec:ifLoggedIn>
        <li>
          <div class="btn-group" uib-dropdown is-open="status.isopen" style="margin: 4px 0;">
            <button id="single-button" type="button" class="btn btn-primary btn-sm header-btn profile-select-dropdown"
                    uib-dropdown-toggle ng-disabled="disabled">
              <div class="avatar-in-header" ng-style="{'background-color': '#'+($root.currentProfile.avatarColor || '0b74b2')}">
                <img src="/assets/streama-profile-smiley.png" alt="">
              </div>
              <p>{{$root.currentProfile.profileName || $root.currentUser.fullName || $root.currentUser.username}}</p>
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-right"
                uib-dropdown-menu role="menu" aria-labelledby="single-button">
              <li role="menuitem" class="header-profile-item" ng-repeat="prof in $root.usersProfiles" ng-click="$root.setCurrentSubProfile(prof)">
                <div class="avatar-in-header" ng-style="{'background-color': '#'+(prof.avatarColor || '0b74b2')}">
                  <img src="/assets/streama-profile-smiley.png" alt="">
                </div>
                <a>{{prof.profileName}} <i ng-if="prof.isChild" class="icon-baby2"></i></a>
              </li>
              <li class="divider"></li>
              <li role="menuitem">
                <a ui-sref="sub-profiles">{{'MANAGE_SUB_PROFILES' | translate}}</a>
              </li>
              <li class="divider"></li>
              <li ng-if="!$root.getSetting('hide_help_faq').parsedValue" role="menuitem"><a ui-sref="help">{{'HELP_FAQ' | translate}}</a></li>
              <li role="menuitem"><a ui-sref="userSettings">{{'PROFILE_SETTINGS' | translate}}</a></li>
              <li class="divider"></li>
              <li><g:link uri="/logoff">{{'LOGOUT' | translate}}</g:link></li>
            </ul>
          </div>
        </li>
      </sec:ifLoggedIn>
    </ul>
  </div>

  <i class="ion-navicon navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"></i>
</header>
