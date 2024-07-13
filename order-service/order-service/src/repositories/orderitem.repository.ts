import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Order, Orderitem, OrderitemRelations} from '../models';
import {OrderRepository} from './order.repository';

export class OrderitemRepository extends DefaultCrudRepository<
  Orderitem,
  typeof Orderitem.prototype.id,
  OrderitemRelations
> {
  public readonly order: BelongsToAccessor<
    Order,
    typeof Orderitem.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('OrderRepository')
    protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Orderitem, dataSource);
    this.order = this.createBelongsToAccessorFor(
      'order',
      orderRepositoryGetter,
    );
    this.registerInclusionResolver('order', this.order.inclusionResolver);
  }
}
