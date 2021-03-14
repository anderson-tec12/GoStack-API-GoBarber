import handlebar from   'handlebars'
import fs from 'fs'

import ImailTemplateProvider from '../models/IMailTemplateProviders'
import IPaserMailTemplate from '../dtos/IParseMailTemplateDTO'

class HandlebarsMailTemplateProvider implements ImailTemplateProvider {
  public async parse({file, variables}:IPaserMailTemplate):Promise<string>{
    const templateFileContent = await fs.promises.readFile(file,{
      encoding:'utf-8'
    })
    const parseTemplate = handlebar.compile(templateFileContent)

    return parseTemplate(variables)
  }
}


export default HandlebarsMailTemplateProvider
