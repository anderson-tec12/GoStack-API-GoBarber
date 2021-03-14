import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ICacheProvider from '@shared/container/providers/CacheProvider/model/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository_')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('RedisCacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        { provider_id, year, month, day },
      );

      await this.cacheProvider.save(cacheKey, classToClass(appointments));

      console.log('Buscou do banco');
    }

    // await this.cacheProvider.save('chaveAqui', 'Valor');

    return appointments;
  }
}
export default ListProviderAppointmentsService;
