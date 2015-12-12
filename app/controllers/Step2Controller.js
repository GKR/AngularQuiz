'use strict';

angular.module('NGQuiz')
.controller('Step2Controller', function($scope, $location, QuizService) {

  $scope.quiz = QuizService.getQuiz();

  $scope.answerQuestion = function(index, value) {
    QuizService.setQuizAnswer(index, value);
    $scope.quiz = QuizService.getQuiz();
  };

  $scope.previous = function() {
    $location.path('/step1');
  };
  $scope.next = function() {
    $location.path('/step3');
  };
});
