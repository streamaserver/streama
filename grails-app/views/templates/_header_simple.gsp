<%@ page import="streama.Settings" %>
<header class="main" ng-if="!isCurrentState('player')">
  <div class="pull-left flex">
    <a class="logo" ui-sref="dash">
      <g:imgSetting setting="${Settings.findByName('logo').value}" alt="${streama.Settings.findByName('title').value} Logo"></g:imgSetting>
    </a>
  </div>

  <i class="ion-navicon navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"></i>
</header>
