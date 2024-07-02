import {Entity, model, property} from '@loopback/repository';

@model()
export class Report extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  totalSales: number;

  @property({
    type: 'number',
    required: true,
  })
  totalRevenue: number;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  reportDate?: string;

  constructor(data?: Partial<Report>) {
    super(data);
  }
}

export interface ReportRelations {
  // describe navigational properties here
}

export type ReportWithRelations = Report & ReportRelations;
