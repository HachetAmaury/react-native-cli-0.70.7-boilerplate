describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display the hello text', async () => {
    await expect(element(by.text('Hello'))).toBeVisible();
  });
});
