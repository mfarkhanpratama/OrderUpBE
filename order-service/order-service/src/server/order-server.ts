import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {MongodbDataSource} from '../datasources';
import {Order} from '../models';
import {OrderRepository} from '../repositories';

// Load proto files
const orderPackageDefinition = protoLoader.loadSync('order.proto', {});
const orderProto = grpc.loadPackageDefinition(orderPackageDefinition)
  .OrderService as any;

const productPackageDefinition = protoLoader.loadSync('product.proto', {});
const productProto = grpc.loadPackageDefinition(productPackageDefinition)
  .ProductService as any;

// Initialize LoopBack DataSource and Repositories
const ds = new MongodbDataSource();
const orderRepository = new OrderRepository(ds);

// gRPC client for ProductService
const productClient = new productProto(
  'localhost:50054',
  grpc.credentials.createInsecure(),
);

// Implement gRPC server
const server = new grpc.Server();

server.addService(orderProto.service, {
  CreateOrder: async (call: any, callback: any) => {
    const orderData = call.request;
    const order = new Order({
      id: orderData.order_id,
      productId: orderData.productId,
      quantity: orderData.quantity,
      orderDate: orderData.order_date,
    });

    try {
      // Create the order in the database
      const createdOrder = await orderRepository.create(order);

      // Update the stock in ProductService
      productClient.UpdateStock(
        {id: order.productId, quantity: order.quantity},
        (error: any, response: any) => {
          if (error || !response.success) {
            throw new Error('Failed to update product stock');
          }

          // Send the response back to the client
          callback(null, createdOrder);
        },
      );
    } catch (err) {
      callback({
        code: grpc.status.INTERNAL,
        details: err.message,
      });
    }
  },
  GetOrder: async (call: any, callback: any) => {
    try {
      const order = await orderRepository.findById(call.request.order_id);
      callback(null, order);
    } catch (err) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Order not found',
      });
    }
  },
});

server.bindAsync(
  '0.0.0.0:50055',
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log('OrderService gRPC server running at http://0.0.0.0:50055');
    server.start();
  },
);
