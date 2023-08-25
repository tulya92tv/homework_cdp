/**
 * Class representing basic functionality on the Sources page.
 *
 * @export SourcesPage
 * @class SourcesPage
 */

import { BasePage } from '../basePage';

export class SourcesPage extends BasePage {
  private addSourceLink() {
    return cy.get('a[href$="pipelines/sources/add"]');
  }
  private enableSourceSpan() {
    return cy.get('span[class$="mantine-Button-label"]').contains('Install Source');
  }
  private popupWindowEnableSourceSpan() {
    return cy.get('span[class$="mantine-Button-label"]').contains('Yes, enable source');
  }
  private sourceActionsSpan() {
    return cy.get('span[class$="mantine-Button-label"]').contains('Actions');
  }
  private deleteSourceButton() {
    return cy.get('button[class^="mantine-Menu-item"]').contains('Delete source');
  }
  private popupWindowDeleteSourceSpan() {
    return cy.get('span[class$="mantine-Button-label"]').contains('Yes, enable source');
  }
  private searchSourceInput() {
    return cy.get('input[placeholder="Search sources"]');
  }
  private sourcesTableDiv() {
    return cy.get('table');
  }
  private sourceNamesInTableDiv() {
    return cy.get('tbody').find('tr').find('a').find('div[class^="mantine-Text-root"]');
  }
  private sourceNameInTableDiv(index: number) {
    return cy.get('tbody').find('tr').find('a').find('div[class^="mantine-Text-root"]').eq(index);
  }

  /**
   * Add a new source
   *
   * @return {void}
   */
  public addNewSource(): void {
    this.addSourceLink().click();
  }

  /**
   * Enable source after it is saved but not connected
   *
   * @return {void}
   */
  public enableSource(): void {
    this.enableSourceSpan().click();
  }

  /**
   * Confirm enabling source after it is saved but not connected
   *
   * @return {void}
   */
  public confirmEnablingSource(): void {
    this.popupWindowEnableSourceSpan().click();
    cy.wait('@completeSourceSetup');
  }

  /**
   * Delete selected source
   *
   * @return {void}
   */
  public deleteSelectedSource(): void {
    this.sourceActionsSpan().click();
    this.deleteSourceButton().click();
    this.popupWindowDeleteSourceSpan().click();
    cy.wait('@deleteSource').its('response.statusCode').should('eq', 200);
  }

  /**
   * Search source by name
   *
   * @param  {string} sourceName - source name
   * @return {void}
   */
  public searchSourceByName(sourceName: string): void {
    this.searchSourceInput().click().clear().type(sourceName, { delay: 300 });
  }

  /**
   * Go to source by name
   *
   * @param  {string} sourceName - source name
   * @param  {number} index - source name
   * @return {void}
   */
  public goToSourceByName(sourceName: string): void {
    this.searchSourceByName(sourceName);
    this.sourceNamesInTableDiv().each(($el, index) => {
      if ($el.text() === sourceName) {
        this.sourceNameInTableDiv(index).click();
        cy.wait('@sourceMetrics');
      }
    });
  }

  /**
   * Delete source by name
   *
   * @param  {string} sourceName - source name
   * @return {void}
   */
  public deleteSourceByName(sourceName: string): void {
    this.goToSourceByName(sourceName);
    this.deleteSelectedSource();
  }

  /**
   * Verify sources table is present
   *
   * @param  {boolean} isPresent - true - there is sources table
   * @return {void}
   */
  public verifySourcesTableIsPresent(isPresent: boolean): void {
    const assertion = isPresent ? 'be.visible' : 'not.be.visible';
    this.sourcesTableDiv().should(assertion);
  }
}
