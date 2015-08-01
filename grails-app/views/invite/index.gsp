<!DOCTYPE html>
<html>
<head>
  <meta name="layout" content="main"/>
  <title>Streama</title>
</head>
<body>

  <div class="invitation-wrapper">
    <g:if test="${params.uuid && params.uuid != 'null'}">
      <h1>You have been invited!</h1>

      <g:form class="form-horizontal" action="setPassword" controller="invite">
        <div class="form-group" >
          <div class="col-sm-3">
            <label class="control-label">Password</label>
          </div>
          <div class="col-sm-9" ng-class="{'has-success has-feedback': valid}">
            <input type="password" class="form-control" name="password" ng-model="password" placeholder="Password (min. 6 Characters)" ng-change="valid = (password == passwordRepeat && password.length > 5)">
            <span class="glyphicon ion-checkmark form-control-feedback" ng-show="valid" aria-hidden="true"></span>
          </div>
        </div>

        <div class="form-group" >
          <div class="col-sm-3">
            <label class="control-label">Repeat Password</label>
          </div>
          <div class="col-sm-9" ng-class="{'has-success has-feedback': valid}">
            <input type="password" class="form-control" name="passwordRepeat" ng-model="passwordRepeat" placeholder="Repeat Password " ng-change="valid = (password == passwordRepeat && password.length > 5)">
            <span class="glyphicon ion-checkmark form-control-feedback" ng-show="valid" aria-hidden="true"></span>
          </div>
        </div>

        <g:hiddenField name="uuid" value="${params.uuid}" />

        <button class="btn btn-success pull-right" ng-disabled="!valid">Save Password & Continue</button>
      </g:form>
    </g:if>


    <g:else>
      <h1 class="color-danger">Your link is not valid anymore.</h1>
    </g:else>
  </div>


</body>
</html>
