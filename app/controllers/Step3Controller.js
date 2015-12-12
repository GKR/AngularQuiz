'use strict';

angular.module('NGQuiz')
.controller('Step3Controller', function($scope, $location, QuizService) {

  $scope.quiz = QuizService.getQuiz();
  $scope.questions = {};

  // Create map of answered questions based on bitmask to make Angular checkboxes work properly (to get ng-change to work properly we need to provide ng-model)
  $scope.updateQuestionMap = function() {
    _.each($scope.quiz.questions, function(question, index) {
      $scope.questions[index] = {};
      _.each($scope.quiz.questions[index].answers, function(answer) {
        $scope.questions[index][answer.id] = ($scope.quiz.questions[index].answer & answer.id) === answer.id;
      });
    });
  };

  $scope.answerQuestion = function(index, value) {
    QuizService.setQuizAnswer(index, value);
    $scope.quiz = QuizService.getQuiz();
  };

  $scope.answerUpdateQuestionMultiple = function(index, value) {
    QuizService.updateQuizAnswerMultiple(index, value);
    $scope.quiz = QuizService.getQuiz();
    $scope.updateQuestionMap();
  };

  $scope.updateQuestionMap();

  $scope.previous = function() {
    $location.path('/step2');
  };
  $scope.next = function() {
    $location.path('/step4');
  };
});
