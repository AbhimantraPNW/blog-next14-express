import { createBlogService } from '@/services/blog/createBlog.service';
import { getBlogService } from '@/services/blog/get-blog.service';
import { getBlogsService } from '@/services/blog/get-blogs.service';
import { NextFunction, Request, Response } from 'express';

export class BlogController {
  async createBlogController(req: Request, res: Response) {
    const files = req.files as Express.Multer.File[];

    if (!files.length) {
      throw new Error('No file uploaded');
    }
      
    const result = await createBlogService(req.body, files[0]);

    return res.status(200).send(result);
  }

  async getBlogController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await getBlogService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getBlogsController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 10,
        page: parseInt(req.query.page as string) || 1,
        sortBy: req.query.sortBy as string || 'createdAt',
        sortOrder: req.query.sortOrder as string || 'desc',
        search: req.query.search as string || '',
      }
      const result = await getBlogsService(query);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
