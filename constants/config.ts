type AppConfig = {
  authRoutes: {
    default: string;
    signin: string;
    signup: string;
    verifyOtp: string;
    onboarding: string;
    resetPassword: string;
    magicLink: string;
    chooseProvider: string;
  };
};

export const appConfig: AppConfig = {
  authRoutes: {
    default: "/organizations",
    signin: "/signin",
    signup: "/signup",
    verifyOtp: "/verify-otp",
    onboarding: "/onboarding",
    resetPassword: "/reset-password",
    magicLink: "/magic-link",
    chooseProvider: "/choose-provider",
  },
};
