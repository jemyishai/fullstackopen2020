import React, {useState} from "react";
import services from "../services/blogs.js";

const RemoveBlog = ({ blog }) => {
  const [blankBlog,setBlankBlog] = useState({})

  function deleteABlog(aBlog){
        let asyncDelete = async () => {
          await services.deletion(aBlog.id);
        }
        try {
          let input = window.confirm(`Remove blog ${aBlog.title} by ${aBlog.author}`)
          if (input){
            asyncDelete();
          }
        } catch (err) {
          console.log(err);
        }
    }

  return (<button onClick={()=>deleteABlog(blog)}>remove blog</button>);
};

export default RemoveBlog;
