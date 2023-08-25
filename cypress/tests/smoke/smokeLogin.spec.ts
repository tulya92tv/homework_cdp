import { LoginPage } from '../../pages/loginPage';
import { BasePage } from '../../pages/basePage';

const loginPage = new LoginPage();
const basePage = new BasePage();
const userEmail = Cypress.env('USER_EMAIL');
const userPassword = Cypress.env('USER_PASSWORD');

describe('Login smoke tests', () => {
  it('Positive: Login with valid user', () => {
    loginPage.loginWithDefaultUser();
    // Assumption is that 2FA is disabled on test environments, so the user is redirected to the main page after logging in.
    // basePage.verifyWhichPageIsDisplayed()
  });

  it('Negative. Login with invalid email', () => {
    loginPage.loginWithDefaultUser(`${basePage.getRandomString(5)}invalidEmail@gmail.com`, userPassword, 401);
    loginPage.verifyInvalidEmailOrPassErrorIsVisible(true);
  });

  it('Negative. Login with invalid password', () => {
    loginPage.loginWithDefaultUser(userEmail, basePage.getRandomString(5), 401);
    loginPage.verifyInvalidEmailOrPassErrorIsVisible(true);
  });
});
