import { AngularCampPage } from './app.po';

describe('angular-camp App', () => {
  let page: AngularCampPage;

  beforeEach(() => {
    page = new AngularCampPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
