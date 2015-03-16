'use strict';

/**
 * @ngdoc service
 * @name SC-app-person.factory:personFactory
 * @factory
 *
 * @description
 * Factory for loading person data
 */

angular.module('SC-app-person')
  .factory('personFactory', function($http, $rootScope, appConfig) {

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
      getPersonSingle: function (personId, callbackSuccess, callbackError) {

        $http.get('/json/api/person/' + personId)
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

  });