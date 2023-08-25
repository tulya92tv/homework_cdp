/**
 * Class to assist with sources connection
 *
 * @export SourcesConnectionHelpers
 * @class SourcesConnectionHelpers
 */

import { Constants } from './constants';

export class SourcesConnectionHelpers {
  /**
   * Connect source to Data Pipelines by sending /page request with provided API key.
   *
   * @return {void}
   */
  public static connectSourceToDP(): void {
    cy.readFile(Constants.dpApiTestData).then((dpApiTestData) => {
      cy.readFile(Constants.apiKeyFile).then((apiKey) => {
        cy.request({
          method: 'POST',
          url: Cypress.env('dpApiUrl') + '/page',
          headers: {
            authorization: `Basic ${btoa(apiKey.api_key + ':')}`,
          },
          body: dpApiTestData.pagePayload,
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.success).to.eq(true);
        });
      });
    });
  }
}
