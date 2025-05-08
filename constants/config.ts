type AppConfig = {
  authRoutes: {
    default: string;
    signin: string;
    signup: string;
    signinWithOtp: string;
    verifyOtp: string;
    onboarding: string;
    resetPassword: string;
    magicLink: string;
    chooseProvider: string;
    forgotPassword: string;
  };
  appRoutes: {
    acceptInvitation: string;
  };
};

export const appConfig: AppConfig = {
  authRoutes: {
    default: "/organizations",
    signin: "/signin",
    signup: "/signup",
    signinWithOtp: "/signin-otp",
    verifyOtp: "/verify-otp",
    onboarding: "/onboarding",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    magicLink: "/magic-link",
    chooseProvider: "/choose-provider",
  },
  appRoutes: {
    acceptInvitation: "/accept-invitation",
  },
};
