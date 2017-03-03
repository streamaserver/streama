<%@ page import="streama.Settings" %>
<header class="main" ng-if="!isCurrentState('player')">
  <div class="pull-left flex">
    <a class="logo" ui-sref="dash">
      <img src="${streama.Settings.findByName('logo').value}" alt="Streama">
      <g:if test="${streama.Settings.findByName('show_version_num').value == 'true'}">
        <div class="version">v${grailsApplication.metadata.getApplicationVersion()}</div>
      </g:if>
    </a>
  </div>

  <i class="ion-navicon navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"></i>
</header>