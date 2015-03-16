'use strict';

/**
 * @ngdoc controller
 * @name SC-app-person.controller:PersonSingleCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the personSingleView state
 */
angular.module('SC-app-person')
  .controller('PersonSingleCtrl', function ($scope, $stateParams, personFactory, utilitiesFactory) {

    /**
     * Method for getting a single person from the API
     */
    personFactory.getPersonSingle($stateParams.personId, function(person) {

      $scope.person = person;

    }, utilitiesFactory.genericHTTPCallbackError);

  });
