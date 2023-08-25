### Steps to set up the framework and run tests
> TLDR: run in terminal ```npm install``` and then ```npx cypress open```

- Install [Node.js](https://nodejs.org/) (see cypress [system requirements](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements))
- Go to the project root and run ```npm install```
- Add test user's credentials (```CYPRESS_USER_EMAIL``` and ```CYPRESS_USER_PASSWORD```) as environment variables.
    For example using ```export``` command: ```export CYPRESS_USER_EMAIL=testEmail@customer.io```
- After that cypress tests can be run in cypress runner ```npx cypress open``` or in terminal ```npm run-script runSmokeTestsProd```
 

### About the project
1. I used the PageObject appraoch to organize the framework's structure. Because the project has a fairly extensive UI structure, I've split the Sources page into a main SourcePage class and additional blocks that represents parts of the Sources page (for example AddGeneralSourcesBlock class).
2. Two-factor authentication should be disabled in a test environment in order to run cypress tests for the Sources page. Since it cannot be disabled in the Prod environment, some additional fixes may be required to successfully run tests.
3. Some spec files contain "empty" tests to show how the framework is structured and what tests should be placed there.

### Possible issues or improvements
While doing this homework I noticed two things that might be good candidats to fix:
1. Source name input has no length limit, so users can enter thousands of characters. It's probably worth adding a constraint on entering the source name.
2. Source names are not unique, so it could be inconvenient for users to search for a source by name, and this may lead to some difficulties in the back-end.