const axios = {
  create: () => axios,
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  defaults: { headers: { common: {} } }
};

export default axios;
