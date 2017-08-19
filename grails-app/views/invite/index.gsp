<!DOCTYPE html>
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

  <body>
    <g:render template="/templates/header_simple"></g:render>

    <div class="invitation-wrapper">
      <g:if test="${params.uuid && params.uuid != 'null'}">
        <h1>You have been invited!</h1>

        <g:form class="form-horizontal" action="setPassword" controller="invite">
          <div class="form-group" >
            <div class="col-sm-3">
              <label class="control-label">Password</label>
            </div>
            <div class="col-sm-9" ng-class="{'has-success has-feedback': vm.valid}">
              <input type="password" class="form-control" name="password" ng-model="password" placeholder="Password (min. 6 Characters)"
                     ng-change="vm.valid = (password == passwordRepeat && password.length > 5)">
              <span class="ion-checkmark form-control-feedback" ng-show="vm.valid" aria-hidden="true"></span>
            </div>
          </div>

          <div class="form-group" >
            <div class="col-sm-3">
              <label class="control-label">Repeat Password</label>
            </div>
            <div class="col-sm-9" ng-class="{'has-success has-feedback': vm.valid}">
              <input type="password" class="form-control" name="passwordRepeat" ng-model="passwordRepeat" placeholder="Repeat Password "
                     ng-change="vm.valid = (password == passwordRepeat && password.length > 5)">
              <span class="ion-checkmark form-control-feedback" ng-show="vm.valid" aria-hidden="true"></span>
            </div>
          </div>

          <g:hiddenField name="uuid" value="${params.uuid}" />

          <button class="btn btn-success pull-right" ng-disabled="!vm.valid">Save Password & Continue</button>
        </g:form>
      </g:if>


      <g:else>
        <h1 class="color-danger">Your link is not valid anymore.</h1>
      </g:else>
    </div>


  <asset:javascript src="vendor.js" />
  <asset:javascript src="streama/streama.js" />

  </body>
</html>
