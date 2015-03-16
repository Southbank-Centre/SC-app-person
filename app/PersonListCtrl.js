'use strict';

/**
 * @ngdoc controller
 * @name SC-app-person.controller:PersonListCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the personListView state
 */

angular.module('SC-app-person')
  .controller('PersonListCtrl', function($scope, personFactory, utilitiesFactory) {

    /**
     * Method for getting person list from the API
     */
    personFactory.getPersonList( function(data) {

      // Success
      // Attach the person data to the scope
      $scope.persons = data;

    }, utilitiesFactory.genericHTTPCallbackError);

});