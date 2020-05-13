//= wrapped

angular.module('streama')
  .directive('streamaWysiwyg', function () {
  return {
    require: 'ngModel',
    restrict: 'E',
    template: '<div class="quill-editor"></div>',
    scope: {
    },
    link: function ($scope, $elem, $attrs, $ctrl) {

      var toolbarOptions = [
        ['bold', 'italic', 'underline'],        // toggled buttons
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']                                         // remove formatting button
      ];

      $ctrl.$render = render;
      var quill = new Quill($elem[0], {
        theme: 'bubble',
        modules: {
          toolbar: toolbarOptions
        }
      });
      quill.on('text-change', onTextChange);

      function onTextChange(delta, oldDelta, source) {
        $ctrl.$setViewValue(quill.root.innerHTML);
      }

      function render() {
        quill.root.innerHTML = $ctrl.$modelValue;
      }
    }
  }
});
