import { Router } from 'express';
import user from './routes/user.js';
import comments from './routes/comments.js';

// this is the single entry point for loading all the routes
export default () => {
	const app = Router();
	/// creating a new router and then assigning all the sub-routes by passing the main router element
	user(app);
	comments(app);
	// return this to the expressjs loader to attach it as the main router object
	return app
}