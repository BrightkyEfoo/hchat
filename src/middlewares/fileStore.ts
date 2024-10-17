import multer from 'multer';
import { NextFunction, Request, Response } from 'express';
import slugify from 'slugify';
import { AppError } from '../utils/Errors/AppError';

const storage = multer.diskStorage({
    destination: function(_req, _file, cb) {
        cb(null, 'public/images');
    },
    filename: function(_req, file, cb) {
        cb(null, Date.now() + '-' + slugify(file.originalname.toLowerCase()));
    },
});

const upload = multer({ storage: storage });

const uploadSingle = (fieldName: string) => (req: Request, res: Response, next: NextFunction) => {
    upload.single(fieldName)(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ msg: 'Une erreur de téléchargement de fichier s\'est produite.', err });
        } else if (err) {
            return res.status(500).json({
                msg: 'Une erreur s\'est produite lors du téléchargement de fichier.',
                err,
            });
        }
        next();
    });
};
const uploadM = (req: Request, res: Response, next: NextFunction) => {
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 10 },
    ])(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ msg: 'Une erreur de téléchargement de fichier s\'est produite.', err });
        } else if (err) {
            return res.status(500).json({
                msg: 'Une erreur s\'est produite lors du téléchargement de fichier.',
                err,
            });
        }
        next();
    });
};

const hydradeBody = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = JSON.parse(req.body.body);
        if (!req.body.update) req.body.update = {};

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        if (files) {
            Object.keys(files).forEach(key => {
                if (files) {
                    if (files[key].length > 1 || key.endsWith('s')) {
                        req.body[key] = files[key].map(file => {
                            return `${process.env.API_URI}/${file.path}`;
                        });
                        req.body.update[key] = files[key].map(file => {
                            return `${process.env.API_URI}/${file.path}`;
                        });
                    } else if (files[key].length === 1) {
                        req.body[key] = `${process.env.API_URI}/${files[key][0].path}`;
                        req.body.update[key] = `${process.env.API_URI}/${files[key][0].path}`;
                    }
                }
            });
        } else if (req.file) {
            req.body[req.file.fieldname] = `${process.env.API_URI}/${req.file.path}`;
            req.body.update[req.file.fieldname] = `${process.env.API_URI}/${req.file.path}`;
        }

        next();
    } catch (err: any) {
        if (err.name === 'SyntaxError') {
            console.log('err', err);
            return next(new AppError('BAD_ENTRY', `body is not provided or inconsitent, it should be a valid JSON string`, true));
        }
        next(new AppError('ERROR', `Unknow expection when uploading file`, false));
    }
};


export { upload, uploadM, hydradeBody, uploadSingle };