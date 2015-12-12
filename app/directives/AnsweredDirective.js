'use strict';

// This directive ensures that the "active" class is set correctly on the navbar list item that matches the current navigation path
angular.module('NGQuiz')
.directive('answered', function() {
  return {
    restrict: 'E',
    scope: {
      question: '='
    },
    template:
      '<p>' +
        '<span ng-if="question.answer" class="label label-success"><span class="glyphicon glyphicon-ok"></span> Answered</span>' +
        '<span ng-if="!question.answer" class="label label-danger"><span class="glyphicon glyphicon-remove"></span> Not answered</span>' +
      '</p>'
  };
});
