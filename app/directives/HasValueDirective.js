'use strict';

// This directive ensures that the "active" class is set correctly on the navbar list item that matches the current navigation path
angular.module('NGQuiz')
.directive('hasvalue', function() {
  return {
    restrict: 'E',
    scope: {
      value: '='
    },
    template:
      '<div class="has-value">' +
        '<span ng-if="value" class="label label-success"><span class="glyphicon glyphicon-ok"></span></span>' +
        '<span ng-if="!value" class="label label-danger"><span class="glyphicon glyphicon-remove"></span></span>' +
      '</div>'
  };
});
