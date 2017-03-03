<%@ page import="streama.Settings" %>
<!doctype html>
<html lang="en" class="no-js" ng-app="streama">
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

<body class="ng-cloak">
    <g:render template="/templates/header"></g:render>

    <div class="content ng-cloak">
        <ui-view/>
    </div>

    <asset:javascript src="vendor.js" />
    <asset:javascript src="streama/streama.js" />
</body>
</html>
