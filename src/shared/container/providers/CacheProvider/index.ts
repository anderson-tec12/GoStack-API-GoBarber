import { container } from 'tsyringe';

import ICacheProvider from './model/ICacheProvider';

import RedisCacheProvider from './implementations/RedisCacheProvider';

const providers = {
  cache: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>(
  `RedisCacheProvider`,
  providers.cache,
);
