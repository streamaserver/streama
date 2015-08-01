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
			<div class="logo"><i class="ion-play"></i> Streama</div>

			<ul class="navigation">
				<sec:ifAnyGranted roles="ROLE_CONTENT_MANAGER">
					<li><a ui-sref="admin.shows">Admin</a></li>
				</sec:ifAnyGranted>
				<sec:ifAnyGranted roles="ROLE_ADMIN">
					<li><a ui-sref="admin.users">Admin</a></li>
				</sec:ifAnyGranted>

				<sec:ifLoggedIn>
					<li><a ui-sref="dash">Dashboard</a></li>
					<li><g:link uri="/j_spring_security_logout">Logout</g:link></li>
				</sec:ifLoggedIn>
			</ul>
		</header>

		<g:layoutBody/>
	</body>
</html>
