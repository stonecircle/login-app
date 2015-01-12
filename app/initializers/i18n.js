import Ember from 'ember';

var translations = {
  // Button titles
  button: {
    'signIn': "Sign in",
    'signUp': "Sign up",
    'reset': "Reset password",
    'request': "Request confirmation email",
    'verify': "Verify account",
    'download': "Download"
  },
  // Form labels
  label: {
    'email': "Email",
    'domain': "Domain",
    'password': "Password",
    confirm: {
      'email': "Confirm Email",
      'password': "Confirm Password"
    }
  },
  // Sign in page
  signIn: {
    label: {
      'forgot': "Forgot your password"
    }
  },
  // Sign up page
  signUp: {
    label: {
      'terms': "I have read and accept the"
    }
  },
  //Download page
  download: {
    error: {
      'title': "Fiddlesticks",
      message: {
        'one': "Need help getting it sorted",
        'two': "Drop us a line"
      }
    },
    success: {
      'title': "Download",
      message: {
        'one': "Thanks! Your account and payment have been verified. Click below to download",
        'two': "and start the installation process"
      }
    }
  },
  // Account enabled page
  accountEnabled: {
    'title': "Your account is now enabled!",
    'message': "You can now sign in with the e-mail and password you used when registering"
  },
  // Confirm password page
  confirmPassword: {
    error: {
      'title': "There has been an error"
    },
    change: {
      'title': "Welcome back",
      'message': "All we need is your new password to keep everything nice and secure"
    },
    success: {
      'title': "Password updated successfully",
      'message': "You can now use your new password to login"
    }
  }
};

var i18n = {
  name: 'i18n',
  initialize: function() {
    Ember.I18n.translations = translations;
    Ember.FEATURES.I18N_TRANSLATE_HELPER_SPAN = false;
  }
};

export default i18n;
