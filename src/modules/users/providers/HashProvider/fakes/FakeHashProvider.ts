import IHashProvaider from '../models/IHashProvaider';

export default class FakeHashProvider implements IHashProvaider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
