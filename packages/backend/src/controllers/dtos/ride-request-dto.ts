const rideRequestEstimateSchemaDto = {
  type: 'object' as const,
  required: ['customer_id', 'origin', 'destination'],
  properties: {
    customer_id: {
      type: 'number' as const,
      nullable: false,
    },
    origin: {
      type: 'string' as const,
      nullable: false,
      minLength: 8,
    },
    destination: {
      type: 'string' as const,
      nullable: false,
      minLength: 8,
    },
  },
};

export { rideRequestEstimateSchemaDto };
