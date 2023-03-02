describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should display the Home Page ', async () => {
    await expect(element(by.text('Home Screen'))).toBeVisible();
  });

  it('should Go to Details ', async () => {
    await element(by.id('go-to-details')).tap();
    await expect(element(by.text('Details Screen'))).toBeVisible();
  });

  it('should Go to Home ', async () => {
    await element(by.id('go-to-home')).tap();
    await expect(element(by.text('Home Screen'))).toBeVisible();
  });
});
