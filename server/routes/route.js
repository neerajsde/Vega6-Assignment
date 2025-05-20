import express from 'express'
const router = express.Router();
router.get('/', (req, res) => res.send(`<h1>Welcome to api Routes</h1>`));

// authentication
import {
    auth
} from "../middleware/Auth.js";

// auth controller and routes
import {
    loginHandler, logOutHandler, register
} from '../controllers/auth.js';
router.post('/user', register);
router.post('/login', loginHandler);
router.put('/logout', auth, logOutHandler);

// dashboard controller and routes
import {
    dashboardHandler
} from '../controllers/dashboard.js';
router.get('/dashboard', auth, dashboardHandler);

// blog controller and routes
import {
    getBlogs, getBlogById, createBlog, updateBlog, deleteBlog, getUserBlogsById
} from '../controllers/blogs.js';
router.get('/blogs', getBlogs);
router.get('/blog/:id', getBlogById);
router.post('/blog', auth, createBlog);
router.put('/blog', auth, updateBlog);
router.delete('/blog/:id', auth, deleteBlog);
router.get('/user-blogs', auth, getUserBlogsById);

// comment controller and routes
import {
    addCommentToBlog
} from '../controllers/comment.js';
router.post('/blog-comment/:blogId',auth, addCommentToBlog);

// reply on comment controller and routes
import {
    commentReply
} from '../controllers/reply.js'
router.post('/comment-reply/:commentId', auth, commentReply);


export default router;