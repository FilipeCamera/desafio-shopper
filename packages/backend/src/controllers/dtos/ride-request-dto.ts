const rideRequestEstimateSchemaDto = {
  type: 'object' as const,
  required: ['customer_id', 'origin', 'destination'],
  properties: {
    customer_id: {
      type: 'number' as const,
    },
    origin: {
      type: 'string' as const,
    },
    destination: {
      type: 'string' as const,
    },
  },
};

export { rideRequestEstimateSchemaDto };
