import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvaider';
// import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

// import { container } from 'tsyringe';

// // importando a depedencias
// import IHashProvaider from './HashProvider/models/IHashProvaider';
// import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

// container.registerSingleton<IHashProvaider>('HashProvider', BCryptHashProvider);
