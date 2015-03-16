'use strict';

/**
 * @ngdoc overview
 * @name SC-app-person
 * @description
 *
 * Provides the app with the ability to display person content and features
 */
angular
  .module('SC-app-person', [
    'SC-app-utils'
  ]);;'use strict';

/**
 * @ngdoc controller
 * @name SC-app-person.controller:PersonListCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the personListView state
 */

angular.module('SC-app-person')
  .controller('PersonListCtrl', ["$scope", "personFactory", "utilitiesFactory", function($scope, personFactory, utilitiesFactory) {

    /**
     * Method for getting person list from the API
     */
    personFactory.getPersonList( function(data) {

      // Success
      // Attach the person data to the scope
      $scope.persons = data;

    }, utilitiesFactory.genericHTTPCallbackError);

}]);;'use strict';

/**
 * @ngdoc controller
 * @name SC-app-person.controller:PersonSingleCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the personSingleView state
 */
angular.module('SC-app-person')
  .controller('PersonSingleCtrl', ["$scope", "$stateParams", "personFactory", "utilitiesFactory", function ($scope, $stateParams, personFactory, utilitiesFactory) {

    /**
     * Method for getting a single person from the API
     */
    personFactory.getPersonSingle($stateParams.personAlias, function(person) {

      $scope.person = person;

    }, utilitiesFactory.genericHTTPCallbackError);

  }]);
;'use strict';

/**
 * @ngdoc service
 * @name SC-app-person.factory:personFactory
 * @factory
 *
 * @description
 * Factory for loading person data
 */

angular.module('SC-app-person')
  .factory('personFactory', ["$http", "$rootScope", "appConfig", function($http, $rootScope, appConfig) {

    return {

      /**
       * @ngdoc method
       * @methodOf SC-app-person.factory:personFactory
       * @name SC-app-person.factory:personFactory#getPersonSingle
       * @returns {undefined} Undefined
       * @param {string} personId The ID of the person
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds
       * @param {function} callbackError The function to call when the HTTP request fails
       *
       * @description
       * For getting data for a single person by person ID
       */
      getPersonSingle: function (personAlias, callbackSuccess, callbackError) {

        $http.get('/json/api/person/' + personAlias)
          .success(callbackSuccess)
          .error(callbackError);

      },

      /**
       * @ngdoc method
       * @methodOf SC-app-person.factory:personFactory
       * @name SC-app-person.factory:personFactory#getPersonList
       * @returns {undefined} Undefined
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds
       * @param {function} callbackError The function to call when the HTTP request fails
       *
       * @description
       * For getting data about all published persons, sorted by last name descending
       */
      getPersonList: function (callbackSuccess, callbackError) {

        var reqUrl = '/json/node.json?type=person&sort=field_last_name&direction=ASC';

        // Add the 'field_festival' filter if a festival has been defined
        if (appConfig.festivalId) {
          reqUrl = reqUrl + '&field_festival=' + appConfig.festivalId;
        }

        $http.get(reqUrl)

        .success(function(persons) {

          angular.forEach(persons.list, function(item) {

            if (item.field_last_name) {

              // Get first character of surname for use in list group headings
              var characterHeading = item.field_last_name.charAt(0);
              item.characterHeading = characterHeading;

            }

          });

          callbackSuccess(persons);

        })

        .error(callbackError);

      },

      /**
       * @ngdoc method
       * @methodOf SC-app-person.factory:personFactory
       * @name SC-app-person.factory:personFactory#getPersonCount
       * @returns {undefined} Undefined
       * @param {function} callbackSuccess The function to call when the HTTP request succeeds
       * @param {function} callbackError The function to call when the HTTP request fails
       *
       * @description
       * For getting the count of all published persons for this festival
       */
      getPersonCount: function(callbackSuccess, callbackError) {

        var reqUrl = '/json/node.count?type=person';

        // Add the 'field_festival' filter if a festival has been defined
        if (appConfig.festivalId) {
          reqUrl = reqUrl + '&field_festival=' + appConfig.festivalId;
        }

        $http.get(reqUrl)

          .success(function(personCount) {

            callbackSuccess(personCount.count);

          })

          .error(callbackError);

      }

    };

  }]);