'use strict';

// This directive ensures that the "active" class is set correctly on the navbar list item that matches the current navigation path
angular.module('NGQuiz')
.directive('navbar', function($location) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: 'templates/navbar.html',
    scope: {
      heading: '@'
    },
    controller: 'NavbarController',
    link: function($scope, $element, $attrs, Navbar) {
      $scope.$location = $location;
      $scope.$watch('$location.path()', function(locationPath) {
        var $li, link, $liElements = $element.find("li");

        $.each($liElements, function(i, v) {
          $li = $($liElements[i]);
          link = $li.find("a").attr('href');
          if(link) {
            if(link.toLowerCase() === '#!' + locationPath) {
              $li.addClass("active");
            } else {
              $li.removeClass("active");
            }
          }
        });
      });
    }
  }
});
