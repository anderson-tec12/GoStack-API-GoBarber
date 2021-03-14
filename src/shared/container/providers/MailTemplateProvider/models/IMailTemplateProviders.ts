import IparseMailTemplateDTO from '../dtos/IParseMailTemplateDTO'

export default interface IMailTemplanteProvider{
  parse(data :IparseMailTemplateDTO): Promise<string>
}
