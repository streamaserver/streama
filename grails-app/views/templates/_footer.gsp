<%@ page import="streama.Settings" %>
<div class="footer" ng-if="isCurrentState('dash')">
  <g:if test="${streama.Settings.findByName('show_version_num').value == 'true'}">
    <div class="version">v${grailsApplication.metadata.getApplicationVersion()}</div>
  </g:if>

  <div ng-bind-html="$root.getSetting('footer-content').parsedValue | trustHtml"></div>
</div>
