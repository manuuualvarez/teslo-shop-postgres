import { v4 as uuid } from 'uuid'

export const fileNamer = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    // Empty file
    if(!file) return callback(new Error('No file uploaded helper'), false);
    const fileExt = file.originalname.split('.').pop();
    // ! Double validation, fileFilter include this validation
    const allowedMimeTypes = ['jpg', 'jpeg', 'png', 'gif'];
    if(allowedMimeTypes.includes(fileExt)) {
        const fileName = `${ uuid()}.${fileExt}`
        callback(null, fileName);
    } else {
        callback(new Error('Only image files are allowed!'), false);
    }
}