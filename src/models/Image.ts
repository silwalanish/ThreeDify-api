import User from './User';
import BaseModel from './BaseModel';

const TABLE_NAME: string = 'images';

/**
 * @swagger
 *
 * components:
 *  schemas:
 *    Image:
 *      type: object
 *      required:
 *        - id
 *        - fileName
 *        - mimetype
 *        - uploadedBy
 *      properties:
 *        id:
 *          type: number
 *        fileName:
 *          type: string
 *        mimetype:
 *          type: string
 *        uploadedBy:
 *          type: number
 *        uploadedByUser:
 *          $ref: '#/components/schemas/User'
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *  responses:
 *    Image:
 *      description: Image data in JSON response.
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Image'
 *    ImageArray:
 *      description: Array of Image data in JSON response.
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Image'
 */
export class Image extends BaseModel {
  id!: number;
  fileName!: string;
  mimetype!: string;
  uploadedBy!: number;

  createdAt?: Date;
  updatedAt?: Date;

  uploadedByUser?: User;

  static get tableName() {
    return TABLE_NAME;
  }

  static get relationMappings() {
    return {
      uploadedByUser: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'images.uploadedBy',
          to: 'users.id',
        },
      },
    };
  }
}

export default Image;
