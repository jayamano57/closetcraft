import { PhotoService } from './photo.types';

export class PhotoServiceImpl implements PhotoService {
  constructor() {}

  removeBackground(): void {}
}

export const photoService = new PhotoServiceImpl();
