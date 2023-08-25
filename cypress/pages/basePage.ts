/**
 * Class representing basic functionality across all pages.
 *
 * @export BasePage
 * @class BasePage
 */

export class BasePage {
  private mainBarSourcesLink() {
    return cy.get('a[href$="/pipelines/sources"]');
  }

  /**
   * Go to the Sources page by clicking this option in the Main bar
   *
   * @return {void}
   */
  public goToSourcesPage(): void {
    this.mainBarSourcesLink().click();
    cy.wait('@sources').its('response.statusCode').should('eq', 200);
    this.verifyUrl('pipelines/sources');
  }

  /**
   * Verify URL contains specific text
   *
   * @param  {string} url
   * @return {void}
   */
  public verifyUrl(url: string): void {
    cy.url().should('include', url);
  }

  /**
   * Verify which page is currently displayed
   *
   * @param  {string} url
   * @param  {string} pageSpecificText - use specific text for the page
   * @return {void}
   */
  public verifyWhichPageIsDisplayed(url: string, pageSpecificText: string): void {
    this.verifyUrl(url);
    cy.contains(pageSpecificText);
  }

  /**
   * Get a random string with length from 1 to 11
   *
   * @param  {number} length - how many characters to return in the string
   * @return {string}
   */
  public getRandomString(length: number): string {
    let len = length <= 0 ? 2 : length + 2;
    return Math.random().toString(36).slice(2, len);
  }
}
