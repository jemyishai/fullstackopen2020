let object = require("lodash/fp/object");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (likes) => likes.reduce((sum, item) => sum + item.likes, 0);


    // cleaner and/or more efficient way of writing this??

    // _.maxBy
//  const favouriteBlog = (blogs) => _.maxBy(blogs, (blog) => blog.likes)

const favoriteBlog = (blogs) =>
  [
    blogs.find(
      (blog) => blog.likes === Math.max(...blogs.map((blog) => blog.likes))
    ),
  ].map((blog) => {
    return { title: blog.title, author: blog.author, likes: blog.likes };
  })[0];

//combined mostBlogs && mostLikes
// countBy && maxBy from Lodash
// const blogCounts = _.countBy(blogs, 'author')
// David's use of lodash

const mostBlogs = (blogs) => {
  let dict = {};

  blogs.forEach((blog) => {
    dict[blog.author] ? dict[blog.author]++ : (dict[blog.author] = 1);
  });

  let max = Math.max(...object.valuesIn(dict));

  let person = "";

  for (let prop in dict) {
    if (dict[prop] == max) {
      person = prop;
      break;
    } else {
      person = null;
    }
  }

  return {
    author: person,
    blogs: max,
  };
};

const mostLikes = (blogs) => {
  let dict = {};

  blogs.forEach((blog) => {
    dict[blog.author]
      ? (dict[blog.author] = dict[blog.author] += blog.likes)
      : (dict[blog.author] = blog.likes);
  });

  let max = Math.max(...object.valuesIn(dict));

  let person = "";

  for (let prop in dict) {
    if (dict[prop] == max) {
      person = prop;
      break;
    } else {
      person = null;
    }
  }

  return {
    author: person,
    likes: max,
  };
};

const listOfBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

module.exports = {
  dummy,
  listOfBlogs,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
