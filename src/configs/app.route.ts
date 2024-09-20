// Root
const authRoot = `auth`;
const usersRoot = `users`;
const fancyRoot = `fancy`;
// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,

  auth: {
    root: authRoot,
    login: `/${authRoot}/:provider/login`,
    logout: `/${authRoot}/:provider/logout`,
    generateNewAccessToken: `/${authRoot}/new-access-token`
  },

  user: {
    root: usersRoot,
    findOne: `/${usersRoot}/:id`,
    patch: `/${usersRoot}/:id`,
    delete: `/${usersRoot}/:id`
  },

  fancy: {
    root: fancyRoot,
    create: `/${fancyRoot}`,
    findAllForPagination: `/${fancyRoot}`,
    findOne: `/${fancyRoot}/:id`,
    patch: `/${fancyRoot}/:id`,
    delete: `/${fancyRoot}/:id`
  }
} as const;
