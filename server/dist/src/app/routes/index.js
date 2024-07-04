"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_routes_1 = require("../modules/auth/auth.routes");
var user_routes_1 = require("../modules/User/user.routes");
var admin_routes_1 = require("../modules/Admin/admin.routes");
var blog_routes_1 = require("../modules/Blog/blog.routes");
var author_routes_1 = require("../modules/Author/author.routes");
var moderator_routes_1 = require("../modules/Moderator/moderator.routes");
var comment_routes_1 = require("../modules/Comment/comment.routes");
var like_routes_1 = require("../modules/Like/like.routes");
var meta_routes_1 = require("../modules/Meta/meta.routes");
var router = express_1.default.Router();
var moduleRoutes = [
    {
        path: '/user',
        route: user_routes_1.userRoutes,
    },
    {
        path: '/admin',
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: '/author',
        route: author_routes_1.AuthorRoutes,
    },
    {
        path: '/moderator',
        route: moderator_routes_1.ModeratorRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.authRoutes,
    },
    {
        path: '/blog',
        route: blog_routes_1.blogRoutes,
    },
    {
        path: '/comment',
        route: comment_routes_1.CommentRoutes,
    },
    {
        path: '/like',
        route: like_routes_1.LikeRoutes,
    },
    {
        path: '/metadata',
        route: meta_routes_1.MetaRoutes,
    },
];
moduleRoutes.forEach(function (route) { return router.use(route.path, route.route); });
exports.default = router;
