

export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    // Empty file
    if(!file) return callback(new Error('No file uploaded helper'), false);
    // Check if file is an image
    const fileExt = file.originalname.split('.').pop();
    const allowedMimeTypes = ['jpg', 'jpeg', 'png', 'gif'];

    if(allowedMimeTypes.includes(fileExt)) {
        callback(null, true);
    } else {
        callback(new Error('Only image files are allowed!'), false);
    }
}