<%@ page import="streama.Settings" %>
<div class="footer">
  <g:if test="${streama.Settings.findByName('show_version_num').value == 'true'}">
    <div class="version">v${grailsApplication.metadata.getApplicationVersion()}</div>
  </g:if>
</div>
