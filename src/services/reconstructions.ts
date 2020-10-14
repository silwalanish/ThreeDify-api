import Debug, { Debugger } from 'debug';

import Image from '../models/Image';
import Reconstruction from '../models/Reconstruction';

const debug: Debugger = Debug('threedify:services:reconstructions');

export async function fetchAllReconstructions(): Promise<
  Reconstruction[] | undefined
> {
  debug('Fetching all reconstructions.');

  return await Reconstruction.query().withGraphFetched(
    '[createdByUser(defaultSelect), images.uploadedByUser(defaultSelect)]'
  );
}

export async function fetchReconstructionById(
  id: number
): Promise<Reconstruction | undefined> {
  debug('Fetching reconstruction with id: %d.', id);

  return await Reconstruction.query()
    .where('id', '=', id)
    .withGraphFetched(
      '[createdByUser(defaultSelect), images.uploadedByUser(defaultSelect)]'
    )
    .first();
}

export async function fetchReconstructionByUserId(
  userId: number
): Promise<Reconstruction[] | undefined> {
  debug('Fetching reconstructions for user: %d.', userId);

  return await Reconstruction.query()
    .where('createdBy', '=', userId)
    .withGraphFetched(
      '[createdByUser(defaultSelect), images.uploadedByUser(defaultSelect)]'
    );
}

export async function addImages(
  reconstruction: Reconstruction,
  images: Image[]
): Promise<Reconstruction> {
  await reconstruction.$relatedQuery('images').relate(images);

  return await reconstruction
    .$fetchGraph(
      '[createdByUser(defaultSelect), images.uploadedByUser(defaultSelect)]'
    )
    .first();
}

export async function insertReconstruction(
  reconstruction: Partial<Reconstruction>
): Promise<Reconstruction> {
  debug('Creating new reconstruction.');

  return await Reconstruction.query()
    .insertAndFetch(reconstruction)
    .withGraphFetched(
      '[createdByUser(defaultSelect), images.uploadedByUser(defaultSelect)]'
    );
}

export default {
  addImages,
  insertReconstruction,
  fetchAllReconstructions,
  fetchReconstructionById,
  fetchReconstructionByUserId,
};