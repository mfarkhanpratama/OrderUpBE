import {Entity, model, property} from '@loopback/repository';

@model()
export class Orderitem extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  productId: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;


  constructor(data?: Partial<Orderitem>) {
    super(data);
  }
}

export interface OrderitemRelations {
  // describe navigational properties here
}

export type OrderitemWithRelations = Orderitem & OrderitemRelations;
