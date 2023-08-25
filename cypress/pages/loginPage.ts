/**
 * Class representing Login page.
 *
 * @export LoginPage
 * @class LoginPage
 */

import { Pages } from './baseEnums';

const userEmail = Cypress.env('USER_EMAIL');
const userPassword = Cypress.env('USER_PASSWORD');

export class LoginPage {
  private emailInput() {
    return cy.get('input[name="email"]');
  }
  private passwordInput() {
    return cy.get('input[name="password"]');
  }
  private submitButton() {
    return cy.get('button[type="submit"]');
  }
  private emailErrorDiv() {
    return cy.get('div[class="fly-form-error__message"]');
  }
  private invalidEmailOrPassErrorDiv() {
    return cy.get('div[role="alert"]').contains('Invalid email or password');
  }

  /**
   * Enter email on the Login page
   *
   * @param  {string} email - user email
   * @return {void}
   */
  public enterEmail(email: string): void {
    this.emailInput().clear().type(email);
  }

  /**
   * Enter password on the Login page
   *
   * @param  {string} password - user password
   * @return {void}
   */
  public enterPassword(password: string): void {
    this.passwordInput().clear().type(password);
  }

  /**
   * Click on "Log in to Customer.io" button
   *
   * @return {void}
   */
  public clickLoginButton(): void {
    this.submitButton().click();
  }

  /**
   * Login with default user
   *
   * @param  {string} email - Optional. User email.
   * @param  {string} password - Optional. User password.
   * @param  {number} statusCode - Optional. expected response status code for the loginEmail request (200 by default)
   * @return {void}
   */
  public loginWithDefaultUser(email: string = userEmail, password: string = userPassword, statusCode: number = 200): void {
    cy.visit(Pages.LOGIN.toString());
    this.enterEmail(email);
    this.clickLoginButton();
    this.enterPassword(password);
    this.clickLoginButton();
    cy.wait('@loginEmail').its('response.statusCode').should('eq', statusCode);
  }

  // The following two functions can be transformed into a generic one by adding unique identifiers to the error elements.
  /**
   * Verify if email or password input errors are visible
   *
   * @param  {boolean} errorIsVisible - true or false
   * @param  {string} errorType - use "email" or "password" values to specify the field name
   * @return {void}
   */
  public verifyLoginErrorIsVisible(errorIsVisible: boolean, errorType: string): void {
    const assertion = errorIsVisible ? 'be.visible' : 'not.be.visible';
    const errorText = errorType === 'email' ? 'a valid email address' : 'your password';
    this.emailErrorDiv().should(assertion);
    this.emailErrorDiv().should('have.text', `Please enter ${errorText}`);
  }

  /**
   * Verify "Invalid email or password" error is visible
   *
   * @param  {boolean} errorIsVisible - true/yes or false/not
   * @return {void}
   */
  public verifyInvalidEmailOrPassErrorIsVisible(errorIsVisible: boolean): void {
    const assertion = errorIsVisible ? 'be.visible' : 'not.be.visible';
    this.invalidEmailOrPassErrorDiv().should(assertion);
    this.invalidEmailOrPassErrorDiv().should('have.text', 'Invalid email or password');
  }
}
