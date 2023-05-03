import {
  ModelInit,
  MutableModel,
  __modelMeta__,
  ManagedIdentifier,
} from '@aws-amplify/datastore';
// @ts-ignore
import {
  LazyLoading,
  LazyLoadingDisabled,
  AsyncItem,
} from '@aws-amplify/datastore';

export enum Role {
  ADMIN = 'ADMIN',
  EVALUATOR = 'EVALUATOR',
}

type EagerEvaluator = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Evaluator, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly role?: Role | keyof typeof Role | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyEvaluator = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Evaluator, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly role?: Role | keyof typeof Role | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type Evaluator = LazyLoading extends LazyLoadingDisabled
  ? EagerEvaluator
  : LazyEvaluator;

export declare const Evaluator: (new (
  init: ModelInit<Evaluator>
) => Evaluator) & {
  copyOf(
    source: Evaluator,
    mutator: (draft: MutableModel<Evaluator>) => MutableModel<Evaluator> | void
  ): Evaluator;
};

type EagerClient = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Client, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyClient = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Client, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type Client = LazyLoading extends LazyLoadingDisabled
  ? EagerClient
  : LazyClient;

export declare const Client: (new (init: ModelInit<Client>) => Client) & {
  copyOf(
    source: Client,
    mutator: (draft: MutableModel<Client>) => MutableModel<Client> | void
  ): Client;
};

type EagerServiceRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ServiceRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Client?: Client | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly serviceRequestClientId?: string | null;
};

type LazyServiceRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ServiceRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Client: AsyncItem<Client | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly serviceRequestClientId?: string | null;
};

export declare type ServiceRequest = LazyLoading extends LazyLoadingDisabled
  ? EagerServiceRequest
  : LazyServiceRequest;

export declare const ServiceRequest: (new (
  init: ModelInit<ServiceRequest>
) => ServiceRequest) & {
  copyOf(
    source: ServiceRequest,
    mutator: (
      draft: MutableModel<ServiceRequest>
    ) => MutableModel<ServiceRequest> | void
  ): ServiceRequest;
};
