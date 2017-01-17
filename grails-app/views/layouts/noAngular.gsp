<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title><g:layoutTitle default="Grails"/></title>
	<base href="<g:createLink uri="/" />">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="${assetPath(src: 'favicon.ico')}" type="image/x-icon">
	<link rel="apple-touch-icon" href="${assetPath(src: 'apple-touch-icon.png')}">
	<link rel="apple-touch-icon" sizes="114x114" href="${assetPath(src: 'apple-touch-icon-retina.png')}">

	<asset:stylesheet src="vendor.css"/>
	<asset:stylesheet src="application.css"/>

	<g:layoutHead/>

	<asset:javascript src="vendor.js"/>
	<asset:javascript src="/streama/streama.js" />

	<style type="text/css">
	[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
		display: none !important;
	}
	</style>

</head>
<body>

<header class="main" ng-if="!isCurrentState('player')">
	<a class="logo" ui-sref="dash">
		<asset:image src="logo.png"></asset:image>
	</a>
</header>

<g:layoutBody/>


</body>
</html>
