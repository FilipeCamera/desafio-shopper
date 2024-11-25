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

const rideRequestConfirmSchemaDto = {
  type: 'object' as const,
  required: [
    'customer_id',
    'origin',
    'destination',
    'distance',
    'duration',
    'driver',
    'value',
  ],
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
    distance: {
      type: 'number' as const,
      nullable: false,
    },
    duration: {
      type: 'string' as const,
      nullable: false,
      minLength: 1,
    },
    driver: {
      type: 'object' as const,
      nullable: false,
      properties: {
        id: { type: 'number' as const },
        name: { type: 'string' as const },
      },
      required: ['id', 'name'],
    },
  },
};

export { rideRequestEstimateSchemaDto, rideRequestConfirmSchemaDto };
