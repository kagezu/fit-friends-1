import 'multer';

export type UserFiles = {
  avatar?: Express.Multer.File[],
  certificate?: Express.Multer.File[]
}
