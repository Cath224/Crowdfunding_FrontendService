export default {
  rows:[
    {
      cols: [
        {
          type: 'text',
          field: 'title',
          name: 'Title',
          required: true
        },
        {
          type: 'switch',
          field: 'type',
          name: 'Type',
          dictionary: 'projectType',
          required: true
        }
      ]
    },
    {
      cols: [
        {
          type: 'text',
          field: 'shortDescription',
          name: 'Short Description',
          required: true
        }
      ]
    },
    {
      cols: [
        {
          type: 'text-area',
          field: 'description',
          name: 'Description',
          required: true
        }
      ]
    }
  ]
}
