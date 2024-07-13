import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Orderitem,
  Order,
} from '../models';
import {OrderitemRepository} from '../repositories';

export class OrderitemOrderController {
  constructor(
    @repository(OrderitemRepository)
    public orderitemRepository: OrderitemRepository,
  ) { }

  @get('/orderitems/{id}/order', {
    responses: {
      '200': {
        description: 'Order belonging to Orderitem',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Order),
          },
        },
      },
    },
  })
  async getOrder(
    @param.path.string('id') id: typeof Orderitem.prototype.id,
  ): Promise<Order> {
    return this.orderitemRepository.order(id);
  }
}
