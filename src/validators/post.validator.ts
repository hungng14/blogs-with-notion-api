export const postValidator = {
  title: {
    required: "Title is required",
  },
  content: {
    required: "Content is required",
  },
  description: {
    maxLength: {
        value: 300,
        message: 'Max length of description not greater than 300'
    }
  },
  tags: {},
};
