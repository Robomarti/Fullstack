const { GraphQLError } = require('graphql')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async (root, args) => {
      if (!args.author) {
          return Book.collection.countDocuments()
      }
      const author = await Author.findOne({ name: args.author })
      const bookCount = await Book.find({ author: author }).countDocuments()
      await Author.updateOne({ id: author.id }, { bookCount: bookCount })
      return author.bookCount
    },
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.find({ name: args.author })
        const books = await Book.find({ author: author, genres: args.genre })
        return books
      }
      if (args.author) {
        const author = await Author.find({ name: args.author })
        const books = await Book.find({ author: author })
        return books
      }
      if (args.genre) {
        const books = await Book.find({ genres: args.genre })
        return books
      }
      return Book.find({})
    },
    allAuthors: async () => {
      async function updateBookCount(author) {
        const bookCount = await Book.find({ author: author }).countDocuments()
        await Author.updateOne({ name: author.name }, { bookCount: bookCount })
        return author
      }
      await Author.find({}).map(updateBookCount)
      let authors = await Author.find({})
      return authors
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    bookCount: (root) => root.bookCount,
    id: (root) => root.id
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: async (root) => {
      const book_author = await Author.findOne({ _id: root.author })
      return {
        name: book_author.name,
        born: book_author.born,
        bookCount: book_author.bookCount,
        id: book_author.id
      }
    },
    genres: (root) => root.genres,
    id: (root) => root.id
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      if (args.title.length < 5) {
        throw new GraphQLError('Title is too short', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      if (args.author.length < 4) {
        throw new GraphQLError('Author name is too short', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
            error
          }
        })
      }
      let author = await Author.findOne({ name: args.author })
      
      if (!author) {
        author = new Author({ name: args.author, born: null, bookCount: 0 })
        try {
          await author.save()
        }
        catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }
      const book = new Book({ title: args.title, published: args.published, author: author, genres: args.genres })
      try {
        await book.save()
      } 
      catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      const bookCount = await Book.find({ author: author }).countDocuments()
      await Author.updateOne({ name: author.name }, { bookCount: bookCount })
	  pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const author = await Author.findOne({ name: args.name })
      try {
        await Author.updateOne({ name: author.name }, { born: args.setBornTo })
      }
      catch (error) {
        throw new GraphQLError('Editing author age failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      const updatedAuthor = await Author.findOne({ name: args.name })
      return updatedAuthor
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save().catch(error => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  }
}

module.exports = resolvers