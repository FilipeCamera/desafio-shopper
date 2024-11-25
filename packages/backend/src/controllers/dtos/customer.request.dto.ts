export const customerCreateSchemaDto = {
  type: 'object' as const,
  required: ['name'],
  properties: {
    name: {
      type: 'string' as const,
      nullable: false,
      minLength: 3,
    },
  },
};
