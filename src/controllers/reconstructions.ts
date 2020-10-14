import Debug, { Debugger } from 'debug';
import { Request, NextFunction, Response } from 'express';

import Reconstruction from '../models/Reconstruction';
import { ValidationErrorItem } from '../domain/validations';
import NewReconstruction from '../domain/NewReconstruction';
import reconstructionService from '../services/reconstructions';
import { AuthRequestWithFiles } from '../middlewares/uploadImage';

const debug: Debugger = Debug('threedify:controller:reconstructions');

interface ReconstructionCreationResponse {
  reconstruction: Reconstruction;
  errors: ValidationErrorItem[];
}

export async function index(
  req: Request,
  res: Response<Reconstruction[]>,
  next: NextFunction
) {
  try {
    let reconstructions:
      | Reconstruction[]
      | undefined = await reconstructionService.fetchAllReconstructions();

    if (reconstructions) {
      res.json(reconstructions);
      return;
    }

    next({
      status: 404,
      message: 'Reconstructions not found.',
    });
  } catch (err) {
    debug('ERROR: %O', err);

    next({
      status: 500,
      message: 'Error occurred while fetching reconstructions.',
      ...err,
    });
  }
}

export async function reconstruction(
  req: Request,
  res: Response<Reconstruction>,
  next: NextFunction
) {
  try {
    let reconstruction:
      | Reconstruction
      | undefined = await reconstructionService.fetchReconstructionById(
      +req.params.id
    );

    if (reconstruction) {
      res.json(reconstruction);
      return;
    }

    next({
      status: 404,
      message: 'Reconstruction not found.',
    });
  } catch (err) {
    debug('ERROR: %O', err);

    next({
      status: 500,
      message: 'Error occurred while fetching reconstruction.',
      ...err,
    });
  }
}

export async function userReconstruction(
  req: Request,
  res: Response<Reconstruction[]>,
  next: NextFunction
) {
  try {
    let reconstructions:
      | Reconstruction[]
      | undefined = await reconstructionService.fetchReconstructionByUserId(
      +req.params.userId
    );

    if (reconstructions) {
      res.json(reconstructions);
      return;
    }

    next({
      status: 404,
      message: 'Reconstructions not found.',
    });
  } catch (err) {
    debug('ERROR: %O', err);

    next({
      status: 500,
      message: 'Error occurred while fetching reconstructions for user.',
      ...err,
    });
  }
}

export async function create(
  req: Request,
  res: Response<ReconstructionCreationResponse>,
  next: NextFunction
) {
  const authReq: AuthRequestWithFiles<
    {},
    ReconstructionCreationResponse,
    NewReconstruction
  > = req as AuthRequestWithFiles<
    {},
    ReconstructionCreationResponse,
    NewReconstruction
  >;
  try {
    debug('Creating reconstruction.');
    let reconstruction: Reconstruction = await reconstructionService.insertReconstruction(
      {
        createdBy: authReq.user.id,
        name: authReq.body.reconstruction_name,
      }
    );

    if (reconstruction.id && authReq.images) {
      debug('Adding images for reconstruction.');

      reconstruction = await reconstructionService.addImages(
        reconstruction,
        authReq.images
      );
    }

    res.json({
      reconstruction: reconstruction,
      errors: authReq.fileValidationErrors,
    });
  } catch (err) {
    debug('ERROR: %O', err);

    next({
      status: 500,
      message: 'Error occurred while creating reconstruction.',
      ...err,
    });
  }
}

export default {
  index,
  create,
  reconstruction,
  userReconstruction,
};