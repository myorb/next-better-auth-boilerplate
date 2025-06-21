type AppConfig = {
  authRoutes: {
    default: string;
    magicLink: string;
  };
  appRoutes: {
    userProfile: string;
  };
};

export const appConfig: AppConfig = {
  authRoutes: {
    default: "/",
    magicLink: "/magic-link",
  },
  appRoutes: {
    userProfile: "/profile",
  },
};
