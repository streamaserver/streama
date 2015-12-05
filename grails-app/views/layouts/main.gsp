<!DOCTYPE html>
<html ng-app="streamaApp" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title><g:layoutTitle default="Grails"/></title>
	<base href="<g:createLink uri="/" />">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="${assetPath(src: 'favicon.ico')}" type="image/x-icon">
	<link rel="apple-touch-icon" href="${assetPath(src: 'apple-touch-icon.png')}">
	<link rel="apple-touch-icon" sizes="114x114" href="${assetPath(src: 'apple-touch-icon-retina.png')}">

	<asset:stylesheet src="application.css"/>
	<asset:javascript src="application.js"/>

	<g:layoutHead/>
</head>
<body>

<header class="main" ng-if="!isCurrentState('player')">
	<a class="logo" ui-sref="dash">
		<asset:image src="logo.png"></asset:image>
		<div class="version">v0.1.6.1</div>
    <div class="spinner" ng-show="baseData.loading">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
	</a>

	<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		<ul class="nav navbar-nav">

			<li ng-if="isCurrentState('dash')">
				<div class="dash-search form-group has-feedback">
					<input type="text" placeholder="Search.." class="form-control input-xs" ng-model="dashSearch"
								 typeahead-append-to-body="true" typeahead="(item.title || item.name) for item in searchMedia($viewValue)"
								 typeahead-on-select="selectFromSearch($item)" typeahead-template-url="typeahead--media.htm" typeahead-loading="baseData.loading"/>
					<span class="form-control-feedback ion-android-search" aria-hidden="true"></span>
				</div>
			</li>
			<sec:ifLoggedIn>
				<li><a ui-sref="dash">Dashboard</a></li>
			</sec:ifLoggedIn>

			<sec:ifAnyGranted roles="ROLE_CONTENT_MANAGER">
				<li><a ui-sref="admin.shows">Manage Content</a></li>
			</sec:ifAnyGranted>
			<sec:ifAnyGranted roles="ROLE_ADMIN">
				<li><a ui-sref="admin.users">Admin</a></li>
			</sec:ifAnyGranted>

			<sec:ifLoggedIn>
				<li><a ui-sref="profile">Profile</a></li>
				<li><g:link uri="/j_spring_security_logout">Logout</g:link></li>
			</sec:ifLoggedIn>
		</ul>
	</div>

	<i class="ion-navicon navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"></i>
</header>

<g:layoutBody/>
</body>
</html>
