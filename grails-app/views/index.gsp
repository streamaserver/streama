<%@ page import="streama.Settings" %>
<!doctype html>
<html lang="en" class="no-js" ng-app="streama">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>${Settings.findByName('title').value}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <style type="text/css">
        [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
            display: none !important;
        }
    </style>

    <asset:stylesheet src="vendor.css"/>
    <asset:stylesheet src="application.css"/>
    <g:linkRelIconSetting setting="${Settings.findByName('favicon').value}"></g:linkRelIconSetting>

    <script type="text/javascript">
        window.contextPath = "${request.contextPath}";
    </script>
</head>

<body class="ng-cloak">
  <div class="page-container">
    <g:if test="${sec.username() == 'anonymous'}">
      <g:render template="/templates/header_anonymous"></g:render>
    </g:if>
    <g:else>
      <g:render template="/templates/header"></g:render>
    </g:else>

    <div class="content ng-cloak">
        <ui-view/>
    </div>

    <div class="page-container-push"></div>
  </div>

  <g:render template="/templates/footer"></g:render>

    <asset:javascript src="vendor.js" />
    <asset:javascript src="streama/streama.js" />
</body>
</html>
