'use strict';

angular.module('NGQuiz')
.controller('Step1Controller', function($scope, $location, QuizService) {
  $scope.quiz = QuizService.getQuiz();

  $scope.change = function(id) {
    QuizService.setQuizValue(id, $scope.quiz[id]);
  };
  $scope.reset = function() {
    QuizService.reset();
    $scope.quiz = QuizService.getQuiz();
  };
  $scope.next = function() {
    $location.path('/step2');
  };
});
