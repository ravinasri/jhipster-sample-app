import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NoticeComponentsPage, NoticeDeleteDialog, NoticeUpdatePage } from './notice.page-object';

const expect = chai.expect;

describe('Notice e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let noticeComponentsPage: NoticeComponentsPage;
  let noticeUpdatePage: NoticeUpdatePage;
  let noticeDeleteDialog: NoticeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Notices', async () => {
    await navBarPage.goToEntity('notice');
    noticeComponentsPage = new NoticeComponentsPage();
    await browser.wait(ec.visibilityOf(noticeComponentsPage.title), 5000);
    expect(await noticeComponentsPage.getTitle()).to.eq('jhipsterSampleApp.notice.home.title');
    await browser.wait(ec.or(ec.visibilityOf(noticeComponentsPage.entities), ec.visibilityOf(noticeComponentsPage.noResult)), 1000);
  });

  it('should load create Notice page', async () => {
    await noticeComponentsPage.clickOnCreateButton();
    noticeUpdatePage = new NoticeUpdatePage();
    expect(await noticeUpdatePage.getPageTitle()).to.eq('jhipsterSampleApp.notice.home.createOrEditLabel');
    await noticeUpdatePage.cancel();
  });

  it('should create and save Notices', async () => {
    const nbButtonsBeforeCreate = await noticeComponentsPage.countDeleteButtons();

    await noticeComponentsPage.clickOnCreateButton();

    await promise.all([
      noticeUpdatePage.setTitleInput('title'),
      noticeUpdatePage.setDescriptionInput('description'),
      noticeUpdatePage.setAuthorInput('author'),
      noticeUpdatePage.authorSelectLastOption(),
      noticeUpdatePage.noticeListSelectLastOption(),
    ]);

    expect(await noticeUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await noticeUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await noticeUpdatePage.getAuthorInput()).to.eq('author', 'Expected Author value to be equals to author');

    await noticeUpdatePage.save();
    expect(await noticeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await noticeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Notice', async () => {
    const nbButtonsBeforeDelete = await noticeComponentsPage.countDeleteButtons();
    await noticeComponentsPage.clickOnLastDeleteButton();

    noticeDeleteDialog = new NoticeDeleteDialog();
    expect(await noticeDeleteDialog.getDialogTitle()).to.eq('jhipsterSampleApp.notice.delete.question');
    await noticeDeleteDialog.clickOnConfirmButton();

    expect(await noticeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
