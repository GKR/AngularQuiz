'use strict';

var app = angular.module('NGQuiz', ['ngRoute']);
app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
      .when("/step1", {templateUrl: "templates/step1.html", controller: "Step1Controller"})
      .when("/step2", {templateUrl: "templates/step2.html", controller: "Step2Controller"})
      .when("/step3", {templateUrl: "templates/step3.html", controller: "Step3Controller"})
      .when("/step4", {templateUrl: "templates/step4.html", controller: "Step4Controller"})
      .otherwise({redirectTo: "/step1"});
});

$('.nav a').on('click', function() {
  $('.navbar-toggle').click();
});
