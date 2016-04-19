<html>
<head>
	<meta name='layout' content='noAngular'/>
	<title><g:message code="springSecurity.login.title"/></title>
</head>

<body>
<div id='login'>
	<div class='inner'>
		<div class='fheader'><g:message code="springSecurity.login.header"/></div>

		<g:if test='${flash.message}'>
			<div class='login_message'>${flash.message}</div>
		</g:if>

		<form action='${postUrl}' method='POST' id='loginForm' class='cssform form-horizontal' autocomplete='off'>

			<div class="form-group">
				<label for="inputEmail" class="col-lg-2 control-label">Username</label>
				<div class="col-lg-10">
					<input type="text" name="j_username" class="form-control" placeholder="Username">
				</div>
			</div>

			<div class="form-group">
				<label for="inputPassword" class="col-lg-2 control-label">Password</label>
				<div class="col-lg-10">
					<input type="password" name='j_password' class="form-control" placeholder="Password">
				</div>
			</div>

			<input style="display: none;" type='checkbox' class='chk' name='${rememberMeParameter}' id='remember_me' checked='checked'/>

			<button class="btn btn-primary pull-right">Submit</button>
		</form>
	</div>
</div>
<script type='text/javascript'>
	<!--
	(function() {
		document.forms['loginForm'].elements['j_username'].focus();
	})();
	// -->
</script>
</body>
</html>
