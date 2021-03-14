import { container } from 'tsyringe';

import IStorageProvider from './model/IStorageProvider';

import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  diskStorage: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  `StorageProviders`,
  providers.diskStorage,
);
