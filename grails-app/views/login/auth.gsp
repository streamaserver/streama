<%@ page import="grails.converters.JSON" %>
<%@ page import="streama.Settings" %>
<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	<title>${Settings.findByName('title').value}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>

	<style type="text/css">
	[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
		display: none !important;
	}
	.setup-form .form-group { margin-bottom: 14px; }
	.setup-form .setup-title {
		font-size: 20px;
		font-weight: 300;
		text-align: center;
		margin-bottom: 6px;
		color: white;
	}
	.setup-form .setup-subtitle {
		font-size: 13px;
		text-align: center;
		color: #999;
		margin-bottom: 22px;
	}
	.setup-form .setup-error {
		background: rgba(206, 47, 57, 0.15);
		border: 1px solid rgba(206, 47, 57, 0.3);
		color: #e85d5d;
		padding: 8px 12px;
		border-radius: 4px;
		margin-bottom: 14px;
		font-size: 13px;
	}
	.setup-form .setup-success {
		background: rgba(5, 148, 111, 0.15);
		border: 1px solid rgba(5, 148, 111, 0.3);
		color: #4ecba5;
		padding: 12px;
		border-radius: 4px;
		text-align: center;
		font-size: 14px;
	}
	.setup-form .setup-success .redirect-note {
		font-size: 12px;
		color: #999;
		margin-top: 6px;
	}
	</style>

	<asset:stylesheet src="vendor.css"/>
	<asset:stylesheet src="application.css"/>

  <g:linkRelIconSetting setting="${Settings.findByName('favicon').value}"></g:linkRelIconSetting>

	<script type="text/javascript">
		window.contextPath = "${request.contextPath}";
	</script>
</head>

<body >
  <g:cssBackgroundSetting selector=".login-page" setting="${Settings.findByName('loginBackground').value}"></g:cssBackgroundSetting>
	<div class="page-container login-page">
    <div id='login' ng-app="streama.auth" class="ng-cloak" ng-controller="authController">
      <g:imgSetting class="auth-logo"  setting="${Settings.findByName('logo').value}" alt="${streama.Settings.findByName('title').value} Logo"></g:imgSetting>

      <!-- SETUP FORM (shown when no users exist) -->
      <div class='inner setup-form' ng-if="showSetup">
        <div class="setup-title">Initial Setup</div>
        <div class="setup-subtitle">Create your administrator account</div>

        <div class="setup-error" ng-if="setupError">{{setupError}}</div>

        <div ng-if="setupSuccess" class="setup-success">
          Account created successfully!
          <div class="redirect-note">Redirecting to login...</div>
        </div>

        <form ng-if="!setupSuccess" ng-submit="doSetup()">
          <div class="form-group">
            <div class="col-lg-12">
              <input type="text" class="form-control" ng-model="setupData.username" placeholder="Username or Email" required autofocus>
            </div>
          </div>

          <div class="form-group">
            <div class="col-lg-12">
              <input type="text" class="form-control" ng-model="setupData.fullName" placeholder="Full Name">
            </div>
          </div>

          <div class="form-group">
            <div class="col-lg-12">
              <input type="password" class="form-control" ng-model="setupData.password" placeholder="Password (min. 6 characters)" required>
            </div>
          </div>

          <div class="form-group">
            <div class="col-lg-12">
              <input type="password" class="form-control" ng-model="setupData.passwordRepeat" placeholder="Repeat Password" required>
            </div>
          </div>

          <span>
            <button type="submit" class="btn btn-primary pull-right" ng-disabled="setupLoading">
              <span ng-if="!setupLoading">Create Account &nbsp; <i class="ion-chevron-right"></i></span>
              <span ng-if="setupLoading">Creating...</span>
            </button>
          </span>
        </form>
      </div>

      <!-- LOGIN FORM (normal login) -->
			<div class='inner' ng-if="!showSetup">

      <g:if test='${flash.message}'>
			  <div class='login_message'>${flash.message}</div>
			</g:if>

        <form action='${postUrl}' method='POST' id='loginForm' class='cssform form-horizontal' autocomplete='off'>

          <div class="form-group">
            <div class="col-lg-12">
              <input type="text" name="username" class="form-control" placeholder="{{'LOGIN.USERNAME' | translate}}">
            </div>
          </div>

          <div class="form-group">
            <div class="col-lg-12">
              <input type="password" name='password' class="form-control" placeholder="{{'LOGIN.PASSWORD' | translate}}">
            </div>
          </div>
          <span>
            <g:if test="${streama.Settings.findBySettingsKey('First Time Login Info')?.value == 'true'}">
              {{'LOGIN.FIRST_TIME_HINT' | translate}}
            </g:if>
            <input style="display: none;" type='checkbox' name='remember_me' id='remember_me' checked='checked'/>

            <button class="btn btn-primary pull-right">{{'LOGIN.SUBMIT' | translate}} &nbsp; <i class="ion-chevron-right"></i></button></span>
        </form>
        <div class="forgot-password-link" style="margin-top: 15px; text-align: center;">
          <a href="${request.contextPath}/passwordReset/request" style="color: #aaa;">{{'LOGIN.FORGOT_PASSWORD' | translate}}</a>
        </div>
      </div>
    </div>
    <div class="page-container-push"></div>
  </div>

  <g:render template="/templates/footer"></g:render>


	<asset:javascript src="vendor.js" />
	<asset:javascript src="/streama/streama.translations.js" />

  <script type='text/javascript'>
    <!--
    (function() {
      document.forms['loginForm'] && document.forms['loginForm'].elements['username'].focus();
    })();

    angular.module('streama.auth', ['streama.translations', 'LocalStorageModule']);

    angular.module('streama.auth').controller('authController', function ($scope, $http, $translate, localStorageService) {
      localStorageService.remove('currentProfile');

      $scope.showSetup = false;
      $scope.setupData = {};
      $scope.setupError = null;
      $scope.setupSuccess = false;
      $scope.setupLoading = false;

      // Check if initial setup is required
      $http.get(window.contextPath + '/setup/status.json').then(function (response) {
        if (response.data && response.data.setupRequired === true) {
          $scope.showSetup = true;
        }
      });

      $scope.doSetup = function () {
        $scope.setupError = null;

        if (!$scope.setupData.username || !$scope.setupData.username.trim()) {
          $scope.setupError = 'Please enter a username.';
          return;
        }
        if (!$scope.setupData.password || $scope.setupData.password.length < 6) {
          $scope.setupError = 'Password must be at least 6 characters.';
          return;
        }
        if ($scope.setupData.password !== $scope.setupData.passwordRepeat) {
          $scope.setupError = 'Passwords do not match.';
          return;
        }

        $scope.setupLoading = true;

        $http.post(window.contextPath + '/setup/init.json', {
          username: $scope.setupData.username,
          password: $scope.setupData.password,
          fullName: $scope.setupData.fullName
        }).then(function () {
          $scope.setupSuccess = true;
          $scope.setupLoading = false;
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }, function (err) {
          $scope.setupLoading = false;
          if (err.status === 403) {
            $scope.setupError = 'Setup has already been completed.';
            setTimeout(function () { window.location.reload(); }, 1500);
          } else {
            $scope.setupError = (err.data && err.data.error) || 'An error occurred. Please try again.';
          }
        });
      };

      var sessionExpired = ${params.sessionExpired?"true":"false"};
      if(sessionExpired){
        alertify.log($translate.instant('LOGIN.SESSION_EXPIRED'));
      }
    })
    // -->
  </script>


  <g:googleAnalytics/>

</body>
</html>
