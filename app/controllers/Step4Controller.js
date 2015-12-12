'use strict';

angular.module('NGQuiz')
.controller('Step4Controller', function($scope, $location, QuizService) {

  $scope.quiz = QuizService.getQuiz();
  $scope.quizSummary = QuizService.getQuizSummary();

  $scope.previous = function() {
    $location.path('/step3');
  };
  $scope.submit = function() {
  };
});
