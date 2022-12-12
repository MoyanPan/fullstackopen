const listHelper = require('../utils/list_helper')
describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: 'ANOTHER ALMOST',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 255,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'ALMOST',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2266,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'ALMOST',
        author: 'JDK',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 22,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test("the blog with almost likes", () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: 'ALMOST',
            author: 'Edsger W. Dijkstra',
            likes: 2266,
          })
    })

    test("highest number of blogs", () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 3
        })
    })

    test("most likes of blogs", () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result).toEqual({
        author:"Edsger W. Dijkstra",
        likes : 2266
      })
    })

  })