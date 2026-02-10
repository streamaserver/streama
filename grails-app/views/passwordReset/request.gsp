<!DOCTYPE html>
<html lang="en" class="no-js" ng-app="streamaPublic">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>${streama.Settings.findByName('title').value} - Reset Password</title>
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
      <h1>Reset Your Password</h1>

      <g:if test="${flash.message}">
        <div class="alert alert-success">
          If an account exists with that email address, a password reset link has been sent.
        </div>
      </g:if>

      <g:if test="${flash.error}">
        <div class="alert alert-danger">
          ${flash.error}
        </div>
      </g:if>

      <p>Enter your email address and we'll send you a link to reset your password.</p>

      <g:form class="form-horizontal" action="sendResetEmail" controller="passwordReset">
        <div class="form-group">
          <div class="col-sm-3">
            <label class="control-label">Email</label>
          </div>
          <div class="col-sm-9">
            <input type="email" class="form-control" name="email" placeholder="Enter your email address" required>
          </div>
        </div>

        <button class="btn btn-primary pull-right">Send Reset Link</button>
      </g:form>

      <div style="margin-top: 60px;">
        <a href="${request.contextPath}/login/auth">Back to Login</a>
      </div>
    </div>


  <asset:javascript src="vendor.js" />
  <asset:javascript src="streama/streama-public.js" />

  </body>
</html>
