
const notify = (notifyType, notifyMessage, type, message) => {
  notifyType(type);
  notifyMessage(message);
  setTimeout(() => {
    notifyMessage(null);
    notifyType(null);
  }, 5000);
}

const resetUserFields = (user,pass) => {
  user("");
  pass("");
};

const resetBlog = (resetBlog) => resetBlog({})

const filterBlogsForUser = (blogs=[], user={}) => blogs.filter((blog)=>blog.user.name === user.name)

export { notify, resetUserFields, resetBlog, filterBlogsForUser };
