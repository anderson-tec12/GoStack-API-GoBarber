import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUserIdToAppointments1603105217867
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentUser', // nome do relacionamento
        columnNames: ['user_id'], // campo a ser referenciado
        referencedColumnNames: ['id'], // nome da coluna que tem o campo referenciado
        referencedTableName: 'users', // tabela a qual possui o campo
        onDelete: ' SET NULL', // se deletar o id da user setara null aqui
        onUpdate: 'CASCADE', // se altera na users alterara aqui tambem
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentUser');
    await queryRunner.dropColumn('appointments', 'user_id');
  }
}
