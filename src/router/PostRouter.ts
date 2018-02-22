import { Router, Request, Response, NextFunction } from 'express';
import Post from '../models/Post';

export class PostRouter {

    public router : Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public findOne(req : Request, res : Response) : void {
        const slug: string = req.params.slug;
        Post.findOne({slug}).then((data) =>{
            res.status(200).json({ data });
        }).catch((error) =>{
            res.json({ error });
        });
    }
    
    public findAll(req : Request, res : Response) : void {
        Post.find().then((data) =>{
            res.status(200).json({ data });
        }).catch((error) =>{
            res.json({ error });
        });
    }
    
    public create(req : Request, res : Response) : void {
        const title: string = req.body.title;
        const slug: string = req.body.slug;
        const content: string = req.body.content;
        const image: string = req.body.image;

        this.validate(title, slug, content, res);

        const post = new Post({
            title,
            slug,
            content,
            image
          });

        post.save().then((data) => {
            res.status(200).json({ data });
        }).catch((error) => {
            res.status(500).json({ error });
        });
    }

    public update(req: Request, res: Response): void {
        const slug: string = req.body.slug;

        Post.findOneAndUpdate({slug}, req.body).then((data) => {
          res.status(200).json({ data });
        }).catch((error) => {
          res.status(500).json({ error });
        });
    }

    public delete(req: Request, res: Response): void {
        const slug: string = req.body.slug;
    
        Post.findOneAndRemove({slug}).then(() => {
          res.status(204).end();
        }).catch((error) => {
          res.status(500).json({ error });
        });
    }


    public validate(title : String, slug : String, content : String , res : Response) : void {
        if (!title) {
            res.status(400).json({ message: 'title is Required.' });
        }else if(!slug){
            res.status(400).json({ message: 'slug is Required.' });
        }else if(!content){
            res.status(400).json({ message: 'content id Required.' });
        }
    }

    public routes(){
        this.router.get('/', this.findAll);
        this.router.get('/:slug', this.findOne);
        this.router.post('/', this.create);
        this.router.put('/:slug', this.update);
        this.router.delete('/:slug', this.delete);
    }
}

const postRoutes = new PostRouter();
postRoutes.routes();
export default postRoutes.router;