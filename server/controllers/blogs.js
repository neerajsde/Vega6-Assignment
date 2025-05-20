import Blog from "../models/blog.js";
import User from "../models/user.js";
import resSender from "../utils/resSender.js";
import { imageUploader, deleteFile } from "../utils/fileUploader.js";

export async function createBlog(req, res) {
  try {
    const { title, desc } = req.body;
    const blogImg = req.files?.blogImg;

    if (!title || !desc || !blogImg) {
      return resSender(res, 400, false, "All fields are required");
    }

    const uploadResult = await imageUploader("blog_images", blogImg);

    if (!uploadResult.flag) {
      return resSender(res, 400, false, uploadResult.message);
    }

    const blog = await Blog.create({
      user_id: req.user.id,
      title,
      description: desc,
      image: uploadResult.url || "",
    });

    if (blog?._id) {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { blogs: blog._id },
      });
      return resSender(res, 201, true, "Blog created successfully", blog);
    } else {
      return resSender(res, 500, false, "Blog creation failed");
    }
  } catch (err) {
    console.error("Error in createBlog:", err.message);
    return resSender(res, 500, false, err.message);
  }
}

export async function updateBlog(req, res) {
  try {
    const { id, title, desc } = req.body;
    const blogImg = req.files?.blogImg;

    const blog = await Blog.findById(id);
    if (!blog) {
      return resSender(res, 404, false, "Blog not found");
    }

    if (title) blog.title = title;
    if (desc) blog.description = desc;

    if (blogImg) {
      const uploadResult = await imageUploader("blog_images", blogImg);
      if (!uploadResult.flag) {
        return resSender(res, 400, false, uploadResult.message);
      }
      if (blog.image) {
        const fileName = blog.image.split("/").at(-1);
        await deleteFile("blog_images", fileName);
      }
      blog.image = uploadResult.url || blog.image;
    }

    await blog.save();
    return resSender(res, 200, true, "Blog updated successfully", blog);
  } catch (err) {
    console.error("Error in updateBlog:", err.message);
    return resSender(res, 500, false, err.message);
  }
}

export async function deleteBlog(req, res) {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return resSender(res, 404, false, "Blog not found");
    }

    if (blog.image) {
      const fileName = blog.image.split("/").at(-1);
      await deleteFile("blog_images", fileName);
    }

    await Blog.findByIdAndDelete(id);

    // Remove from user's blogs list
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { blogs: id },
    });

    return resSender(res, 200, true, "Blog deleted successfully");
  } catch (err) {
    console.error("Error in deleteBlog:", err.message);
    return resSender(res, 500, false, err.message);
  }
}

export async function getBlogs(req, res) {
  try {
    const blogs = await Blog.find()
      .populate("user_id", "_id name profile_img")
      .populate({
        path: "comments",
        populate: [
          {
            path: "user_id",
            select: "name profile_img",
          },
          {
            path: "replies",
            populate: {
              path: "user_id",
              select: "name profile_img",
            },
          },
        ],
      })
      .sort({ createdAt: -1 });

    return resSender(res, 200, true, "Blogs fetched successfully", blogs);
  } catch (err) {
    console.error("Error in getBlogs:", err.message);
    return resSender(res, 500, false, err.message);
  }
}

export async function getBlogById(req, res) {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id)
      .populate("user_id", "_id name profile_img")
      .populate({
        path: "comments",
        populate: [
          {
            path: "user_id",
            select: "name profile_img",
          },
          {
            path: "replies",
            populate: {
              path: "user_id",
              select: "name profile_img",
            },
          },
        ],
      });

    if (!blog) {
      return resSender(res, 404, false, "Blog not found");
    }

    return resSender(res, 200, true, "Blog fetched successfully", blog);
  } catch (err) {
    console.error("Error in getBlogById:", err.message);
    return resSender(res, 500, false, err.message);
  }
}

export async function getUserBlogsById(req, res) {
  try {
    const userId = req.user.id;

    const blogs = await Blog.find({ user_id: userId })
      .populate("user_id", "_id name profile_img")
      .populate({
        path: "comments",
        populate: [
          {
            path: "user_id",
            select: "name profile_img",
          },
          {
            path: "replies",
            populate: {
              path: "user_id",
              select: "name profile_img",
            },
          },
        ],
      })
      .sort({ createdAt: -1 });

    return resSender(res, 200, true, "User blogs fetched successfully", blogs);
  } catch (err) {
    console.error("Error in getUserBlogsById:", err.message);
    return resSender(res, 500, false, err.message);
  }
}
