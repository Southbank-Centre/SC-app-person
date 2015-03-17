# Southbank Centre App: Person

## Installation

### Step 1
Run the following command in your app's root directory.

    $ bower install --save Southbank-Centre/SC-app-person#n.n.n

Replace n.n.n with the version number of this module that you require. See [the list of releases](https://github.com/Southbank-Centre/SC-app-person/releases).

*Please don't install without a release number or your app will be unstable.*

### Step 2

Add **SC-app-person** to the dependency list in **[YourAppName].module.js**

### Step 3
Add the app.pageSingle and app.pageList states to your app:

    .state('app.personSingle', {
      url: '^/person/:personAlias',
      views: {
        '@': {
          templateUrl: 'bower_components/SC-app-person/release/personSingleView.html'
        }
      }
    })
    .state('app.personList', {
      url: '^/person',
      views: {
        '@': {
          templateUrl: 'bower_components/SC-app-person/release/personListView.html'
        }
      }
    })

The URLs can be changed to whatever is required, although the parameter *:personAlias* should remain the same for the page to work.