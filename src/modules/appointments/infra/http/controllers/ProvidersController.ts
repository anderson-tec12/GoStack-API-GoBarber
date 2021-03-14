import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { parseISO } from 'date-fns';
import { classToClass } from 'class-transformer';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProviersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    // const parsedDate = parseISO(date);
    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({ user_id });
    return response.json(classToClass(providers));
  }
}
