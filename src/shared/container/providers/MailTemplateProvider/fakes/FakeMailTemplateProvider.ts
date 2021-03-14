import ImailTemplateProvider from '../models/IMailTemplateProviders'


class FakeMailTemplateProvider implements ImailTemplateProvider {
  public async parse():Promise<string>{
    return 'mail content'
  }
}


export default FakeMailTemplateProvider
