export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';     make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';     make this `/api`, for example, if your API is namespaced
  // this.timing = 400;       delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  this.get('/i18n', () => {
    return {
      "brand": {
        "poweredBy": "Simple authentication powered by AuthMaker"
      },
      "social": {
        "optional": "Or",
        "terms": {
          "signIn": "By signing in with any of these social logins you agree to our",
          "signUp": "By signing up with any of these social logins you agree to our",
          "link": "terms and conditions"
        }
      },
      "titles": {
        "admin": "Authmaker - Admin",
        "account-disabled": "Authmaker - Account Disabled",
        "account-enabled": "Authmaker - Account Enabled",
        "resend-confirmation": "Authmaker - Resend Confirmation",
        "reset-password.index": "Authmaker - Reset Password",
        "reset-password.confirm": "Authmaker - New Password",
        "signin": "Authmaker - Sign in",
        "signup": "Authmaker - Sign up"
      },
      "button": {
        "signIn": "Sign in",
        "signUp": "Sign up",
        "reset": "Reset password",
        "request": "Request confirmation email",
        "verify": "Verify account",
        "download": "Download",
        "saveChanges": "Save Changes",
        "social": {
          "signIn": "Sign in with {{network}}",
          "signUp": "Sign up with {{network}}"
        }
      },
      "label": {
        "name": "Name",
        "email": "Email",
        "domain": "Domain",
        "password": "Password",
        "passwordConfirm": "Confirm Password",
        "website": "Website",
        "confirm": {
          "email": "Confirm Email",
          "password": "Confirm Password"
        }
      },
      "signIn": {
        "label": {
          "forgot": "Forgot your password?"
        }
      },
      "signUp": {
        "placeholder": {
          "website": "Website"
        },
        "label": {
          "terms": "I have read and accept the",
          "emailSubscribe": "Subscribe to email updates"
        }
      },
      "download": {
        "error": {
          "title": "Fiddlesticks",
          "message": {
            "one": "Need help getting it sorted",
            "two": "Drop us a line"
          }
        },
        "success": {
          "title": "Download",
          "message": {
            "one": "Thanks! Your account and payment have been verified. Click below to download",
            "two": "and start the installation process"
          }
        }
      },
      "accountEnabled": {
        "title": "Your account is now enabled!",
        "message": "You can now sign in with the e-mail and password you used when registering"
      },
      "accountDisabled": {
        "title": "Your account has not been activated",
        "header": "To activate your account please click the link in the email you received after sign up.",
        "message": "If you have not yet received your confirmation mail please sit tight, it can take some time."
      },
      "authmakerAccountDisabled": {
        "title": "Your Authmaker account has not been activated",
        "header": "Thanks for signing up to Authmaker! You are now on the waiting list to become an Authmaker pioneer.",
        "message": "While we're in beta, all new accounts are reviewed before activation. You will receive a confirmation email with a link to activate your account once you've been accepted."
      },
      "confirmPassword": {
        "error": {
          "title": "There has been an error"
        },
        "change": {
          "title": "Welcome back",
          "message": "All we need is your new password to keep everything nice and secure"
        },
        "success": {
          "title": "Password updated successfully",
          "message": "You can now use your new password to login"
        }
      },
      "serverError": {
        "message": "We've encountered an error and cannot proceed, please contact support if you are having difficulties."
      },
      "errors": {
        "inclusion": "is not included in the list",
        "exclusion": "is reserved",
        "invalid": "is invalid",
        "confirmation": "doesn't match {{attribute}}",
        "accepted": "must be accepted",
        "empty": "can't be empty",
        "blank": "can't be blank",
        "present": "must be blank",
        "tooLong": "is too long (maximum is {{count}} characters)",
        "tooShort": "is too short (minimum is {{count}} characters)",
        "wrongLength": "is the wrong length (should be {{count}} characters)",
        "notANumber": "is not a number",
        "notAnInteger": "must be an integer",
        "greaterThan": "must be greater than {{count}}",
        "greaterThanOrEqualTo": "must be greater than or equal to {{count}}",
        "equalTo": "must be equal to {{count}}",
        "lessThan": "must be less than {{count}}",
        "lessThanOrEqualTo": "must be less than or equal to {{count}}",
        "otherThan": "must be other than {{count}}",
        "odd": "must be odd",
        "even": "must be even"
      }
    }
  })

  this.get('/settings/login', () => {
    return {
      "loginLink": "https://app.authmaker.com/login",
      "askName": true,
      "emailSubscribe": true,
      "isAuthmakerApp": true,
      "showFormLink": true,
      "formMessage": "Psst! Skip to the front of the line and get approved sooner by completing your application with a simple questionnaire at the link below ",
      "formLink": "https://stonecircle.typeform.com/to/uBQ6G4",
      "formLinkText": "Complete My Application"
    }
  })
}
