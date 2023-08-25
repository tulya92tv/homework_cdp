import { AddGeneralSourcesBlock } from '../../pages/sources/addGeneralSourcesBlock';
import { AuthHelpers } from '../../support/authHelpers';
import { Pages, SourceTypes } from '../../pages/baseEnums';

const addGeneralSource = new AddGeneralSourcesBlock();

describe('Source page: add, connect, save, enable, delete source', () => {
  beforeEach(() => {
    AuthHelpers.setAuthDataAndVisitPage(Pages.SOURCES);
  });

  it('HTTP source: add, save without connection, enable and delete', () => {
    addGeneralSource.addNewSource();
    addGeneralSource.selectSourceType(SourceTypes.HTTP);
    addGeneralSource.nextConnectNewSource();
    addGeneralSource.enterSourceName(`http_${addGeneralSource.getRandomString(4)}`);
    addGeneralSource.saveSourceAndCompleteLater();
    addGeneralSource.installSource();
    addGeneralSource.enableSource();
    addGeneralSource.confirmEnablingSource();
    addGeneralSource.deleteSelectedSource();
    addGeneralSource.verifySourcesTableIsPresent(false);
  });

  it('HTTP source: add, test connection, enable and delete', () => {
    addGeneralSource.addNewSource();
    addGeneralSource.selectSourceType(SourceTypes.HTTP);
    addGeneralSource.nextConnectNewSource();
    addGeneralSource.enterSourceName(`http_${addGeneralSource.getRandomString(4)}`);
    addGeneralSource.connectSourceAndTestConnection(true);
    addGeneralSource.completeSourceSetup();
    addGeneralSource.editSource();
    addGeneralSource.deleteSelectedSource();
    addGeneralSource.verifySourcesTableIsPresent(false);
  });

  xit('More E2E tests to cover sources creation flow with different outcomes (including different types of sources)');
});
