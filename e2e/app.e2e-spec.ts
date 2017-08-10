import { SystemSolarisPage } from './app.po';

describe('system-solaris App', () => {
  let page: SystemSolarisPage;

  beforeEach(() => {
    page = new SystemSolarisPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
