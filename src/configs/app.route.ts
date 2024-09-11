// Root
const usersRoot = `users`;

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  user: {
    root: usersRoot,
    findOne: `/${usersRoot}/:id`,
    patch: `/${usersRoot}/:id`,
    delete: `/${usersRoot}/:id`
  }
} as const;
