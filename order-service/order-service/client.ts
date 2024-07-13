import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const orderPackageDefinition = protoLoader.loadSync('order.proto', {});
const orderProto = grpc.loadPackageDefinition(orderPackageDefinition)
  .OrderService as any;

const client = new orderProto(
  'localhost:50055',
  grpc.credentials.createInsecure(),
);

// Create an order
const orderId = 'order1';
const productId = '6683b74146c2ea3c10f81e95';
const quantity = 2;
const orderDate = new Date().toISOString();

client.CreateOrder(
  {
    order_id: orderId,
    productId: productId, // Use product_id to match proto
    quantity: quantity,
    order_date: orderDate,
  },
  (error: any, response: any) => {
    if (!error) {
      console.log('Order created:', response);
    } else {
      console.error(error);
    }
  },
);
