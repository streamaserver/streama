<!DOCTYPE html>
<html lang="en" class="no-js" ng-app="streamaPublic">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>${streama.Settings.findByName('title').value} - Link Expired</title>
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

  <body>
    <g:render template="/templates/header_simple"></g:render>

    <div class="invitation-wrapper">
      <h1 class="color-danger">This link has expired</h1>

      <p>Password reset links are only valid for 30 minutes. Please request a new one.</p>

      <div style="margin-top: 30px;">
        <a href="${request.contextPath}/passwordReset/request" class="btn btn-primary">Request New Link</a>
      </div>

      <div style="margin-top: 30px;">
        <a href="${request.contextPath}/login/auth">Back to Login</a>
      </div>
    </div>


  <asset:javascript src="vendor.js" />
  <asset:javascript src="streama/streama-public.js" />

  </body>
</html>
