export const customerCreateSchemaDto = {
  type: 'object' as const,
  required: ['id', 'name'],
  properties: {
    id: {
      type: 'number' as const,
      nullable: false,
    },
    name: {
      type: 'string' as const,
      nullable: false,
      minLength: 3,
    },
  },
};
