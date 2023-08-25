describe('Login functional tests', () => {
  it('Login with empty email');
  it('Login with invalid email format');
  it('Sign in with Google');
  it('Login with empty password');
  it('Change email on the password page (Use a different email)');
  it('Change password using Forgot password');
  // Skip testing the "Use a different email" link on the "login/2fa_email_link" page, assuming that this page is not displayed when 2FA is disabled in test environments.
});
