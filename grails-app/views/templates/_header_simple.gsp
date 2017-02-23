<header class="main" ng-if="!isCurrentState('player')">
  <div class="pull-left flex">
    <a class="logo" ui-sref="dash">
      <asset:image src="logo.png"></asset:image>
      <div class="version">v${java.lang.System.properties.getProperty('info.app.version')}</div>
    </a>
  </div>

  <i class="ion-navicon navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"></i>
</header>