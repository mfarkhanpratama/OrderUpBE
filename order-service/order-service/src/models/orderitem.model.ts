import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Order} from './order.model';

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

  @property({
    type: 'number',
    required: true,
  })
  unitPrice: number;

  @property({
    type: 'number',
    required: true,
  })
  totalPrice: number;

  @belongsTo(() => Order)
  orderId: string;

  constructor(data?: Partial<Orderitem>) {
    super(data);
  }
}

export interface OrderitemRelations {
  // describe navigational properties here
}

export type OrderitemWithRelations = Orderitem & OrderitemRelations;
