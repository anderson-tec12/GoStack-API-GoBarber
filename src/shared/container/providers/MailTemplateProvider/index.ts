import { container } from 'tsyringe';

import IMailTemplateProviders from './models/IMailTemplateProviders';

import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProviders>(
  `MailTemplateProvider`,
  providers.handlebars,
);
