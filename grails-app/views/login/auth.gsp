<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	<title>${streama.Settings.findByName('title').value}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>

	<style type="text/css">
	[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
		display: none !important;
	}
	</style>

	<asset:stylesheet src="vendor.css"/>
	<asset:stylesheet src="application.css"/>

	<asset:link rel="icon" href="favicon.ico" type="image/x-ico" />

	<script type="text/javascript">
		window.contextPath = "${request.contextPath}";
	</script>
</head>

<body >
	<g:render template="/templates/header_simple"></g:render>
	<div id='login' ng-app="streama.translations" class="ng-cloak">
		<div class='inner'>
			<div class='fheader'>{{'LOGIN.TITLE' | translate}}</div>

			<g:if test='${flash.message}'>
				<div class='login_message'>${flash as grails.converters.JSON}</div>
			</g:if>

			<form action='${postUrl}' method='POST' id='loginForm' class='cssform form-horizontal' autocomplete='off'>

				<div class="form-group">
					<label for="inputEmail" class="col-lg-2 control-label">{{'LOGIN.USERNAME' | translate}}</label>
					<div class="col-lg-10">
						<input type="text" name="username" class="form-control" placeholder="{{'LOGIN.USERNAME' | translate}}">
					</div>
				</div>

				<div class="form-group">
					<label for="inputPassword" class="col-lg-2 control-label">{{'LOGIN.PASSWORD' | translate}}</label>
					<div class="col-lg-10">
						<input type="password" name='password' class="form-control" placeholder="{{'LOGIN.PASSWORD' | translate}}">
					</div>
				</div>
				<span>
					<g:if test="${streama.Settings.findBySettingsKey('First Time Login Info')?.value == 'true'}">
						{{'LOGIN.FIRST_TIME_HINT' | translate}}
					</g:if>
				<input style="display: none;" type='checkbox' name='remember_me' id='remember_me' checked='checked'/>

				<button class="btn btn-primary pull-right">{{'LOGIN.SUBMIT' | translate}}</button></span>
			</form>
		</div>
	</div>
	<script type='text/javascript'>
		<!--
		(function() {
			document.forms['loginForm'].elements['username'].focus();
		})();
		// -->
	</script>


	<asset:javascript src="vendor.js" />
	<asset:javascript src="/streama/streama.translations.js" />

</body>
</html>
