// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Role = {
  ADMIN: 'ADMIN',
  EVALUATOR: 'EVALUATOR',
};

const { Evaluator, Client, ServiceRequest } = initSchema(schema);

export { Evaluator, Client, ServiceRequest, Role };
