/**
 * Methods to assist with routes interception
 *
 * @export InterceptRoutes
 * @class InterceptRoutes
 */

export class InterceptRoutes {
  public static setInterceptRoutes(): void {
    // Get login_email request data
    cy.intercept('POST', '**/v1/login_email').as('loginEmail');

    // Sources
    // Get sources request data
    cy.intercept('GET', '**/sources').as('sources');
    // Create a new source
    cy.intercept('PUT', '**/api/workspaces/**/sources/**').as('completeSourceSetup');
    // Get source metrics data
    cy.intercept('GET', '**/api/workspaces/**/sources/**/metrics**').as('sourceMetrics');
    // Delete source
    cy.intercept('DELETE', '**/api/workspaces/**/sources/**').as('deleteSource');

    // Destinations
    // Get destinations request data
    cy.intercept('GET', '**/destinations').as('destinations');
  }
}
