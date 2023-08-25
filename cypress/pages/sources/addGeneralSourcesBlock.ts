/**
 * Class representing functionality for adding a new general source.
 *
 * @export AddGeneralSourcesBlock
 * @class AddGeneralSourcesBlock
 */

import { SourcesPage } from './sourcesPage';
import { SourceTypes } from '../baseEnums';
import { Constants } from '../../support/constants';
import { SourcesConnectionHelpers } from '../../support/sourcesConnectionHelpers';

export class AddGeneralSourcesBlock extends SourcesPage {
  private sourceTypeDiv(sourceType: SourceTypes) {
    return cy.get('div[class^="mantine-Group-root mantine-UnstyledButton-root mantine"]').contains(sourceType.toString());
  }
  private nextConnectSourceButton() {
    return cy.get('button[class^="mantine-UnstyledButton-root mantine-Button-root"]').contains('Next');
  }
  private sourceNameInput() {
    return cy.get('input[class^="mantine-Input-input mantine-TextInput-input"]');
  }
  private apiKeySpan() {
    return cy.get('span[class="token plain"]');
  }
  private testConnectionButton() {
    return cy.get('button[class^="mantine-UnstyledButton-root mantine-Button-root"]').contains('Test');
  }
  private completeSetupButton() {
    return cy.get('button[class^="mantine-UnstyledButton-root mantine-Button-root"]').contains('Complete Setup');
  }
  private testConnectionAlertSpan() {
    return cy.get('span[class$="mantine-Alert-label"]');
  }
  private saveSourceAndCompleteLaterSpan() {
    return cy.get('span[class$="mantine-Button-label"]').contains('Save & Complete Later');
  }
  private popupWindowEditSourceSpan() {
    return cy.get('span[class$="mantine-Button-label"]').contains('Edit Source');
  }
  private popupWindowInstallSourceSpan() {
    return cy.get('span[class$="mantine-Button-label"]').contains('Install Source');
  }

  /**
   * Select source type
   *
   * @param  {SourceTypes} sourceType - what source to add
   * @return {void}
   */
  public selectSourceType(sourceType: SourceTypes): void {
    this.sourceTypeDiv(sourceType).click();
  }

  /**
   * Connect a new source (click on the "Next: Connect XXX" button)
   *
   * @return {void}
   */
  public nextConnectNewSource(): void {
    this.nextConnectSourceButton().click();
  }

  /**
   * Enter source name
   *
   * @param  {string} sourceName - source name
   * @return {void}
   */
  public enterSourceName(sourceName: string): void {
    this.sourceNameInput().clear().type(sourceName, { delay: 100 });
    this.writeApiKeyToFile();
  }

  /**
   * Write API key to a file
   *
   * @return {void}
   */
  public writeApiKeyToFile(): void {
    this.sourceNameInput()
      .invoke('prop', 'value')
      .then((name) => {
        this.apiKeySpan()
          .invoke('text')
          .then((text) => {
            cy.writeFile(Constants.apiKeyFile, { source_name: name, api_key: text });
          });
      });
  }

  /**
   * Test that source is connected
   *
   * @return {void}
   */
  public testSourceConnection(): void {
    this.testConnectionButton().click();
  }

  /**
   * Connect source to DP API and test connection
   * This method requires API key in the apiKey.json and uses /page request
   *
   * @param  {boolean} isConnected - true - source is connected
   * @return {void}
   */
  public connectSourceAndTestConnection(isConnected: boolean): void {
    SourcesConnectionHelpers.connectSourceToDP();
    this.testSourceConnection();
    this.verifyTestConnectionResult(isConnected);
  }

  /**
   * Complete source setup
   *
   * @return {void}
   */
  public completeSourceSetup(): void {
    this.completeSetupButton().click();
  }

  /**
   * Save source and complete later
   *
   * @return {void}
   */
  public saveSourceAndCompleteLater(): void {
    this.saveSourceAndCompleteLaterSpan().click();
    cy.wait('@completeSourceSetup');
  }

  /**
   * Edit source
   *
   * @return {void}
   */
  public editSource(): void {
    this.popupWindowEditSourceSpan().click();
  }

  /**
   * Install source after it is saved but not connected
   *
   * @return {void}
   */
  public installSource(): void {
    this.popupWindowInstallSourceSpan().click();
  }

  /**
   * Verify test connection result
   *
   * @param  {boolean} isConnected - true - source is connected
   * @return {void}
   */
  public verifyTestConnectionResult(isConnected: boolean): void {
    const assertion = isConnected ? 'be.visible' : 'not.be.visible';
    const alertMessage = isConnected ? 'Success! Your source is connected.' : 'Uh oh! Your source is not connected.';
    this.testConnectionAlertSpan().should(assertion);
    this.testConnectionAlertSpan().should('contain.text', alertMessage);
  }
}
