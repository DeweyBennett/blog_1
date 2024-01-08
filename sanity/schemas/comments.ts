import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comments',
  title: 'Comments',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
        name: 'approved',
        title: 'Approved',
        type: 'boolean',
        description: 'Comments will not show on site until approved'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
        name: 'comment',
        title: 'Comment',
        type: 'string',
    }),
    defineField({
        name: 'post',
        title: 'Post',
        type: 'reference',
        to: [{ type: 'post' }]
    }),
  ],
})