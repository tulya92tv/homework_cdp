/**
 * Class to assist with authorization
 *
 * @export AuthHelpers
 * @class AuthHelpers
 */

import { Pages } from '../pages/baseEnums';
import { Constants } from './constants';

export class AuthHelpers {
  /**
   * Get Auth Data via API requests and write to a file. This will be needed for setAuthDataAndVisitPage().
   * Typically this method should be run once before all tests to get the data and then reuse it from the file.
   * It will be more complicated than a single request given the use of different users.
   */
  public static getAuthDataAndWriteToFile(): void {
    cy.request('POST', 'auth/url').then((response) => {
      cy.writeFile(Constants.authData, { response });
    });
  }

  /**
   * Visit the provided page. LocalStorage/Cookie will be preconfigured before loading the page.
   * This methos should be implemented to avoid UI login and do it programmatically by getting auth data via API requests and then setting LocalStorage/Cookie.
   * Since this is a test project and I don't have access to the code source, I can't implement such a method.
   *
   * @param  {Pages} page - which page to visit
   * @param  {any} authData - JSON js object containing the auth data
   * @return {void}
   */
  public static setAuthDataAndVisitPage(page: Pages): void {
    cy.readFile(Constants.authData).then((authData) => {
      cy.readFile(Constants.testUsersData).then((userJson) => {
        const url = page.toString().replace('XXX', userJson.userEmail);
        cy.visit(url, {
          failOnStatusCode: false,
          onBeforeLoad(contentWindow) {
            // Set LocalStorage and/or Cookie before loading the page. For example:
            contentWindow.localStorage.setItem('token', authData.token);
          },
        });
      });
    });
  }
}
