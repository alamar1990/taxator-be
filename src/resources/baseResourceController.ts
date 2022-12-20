'use strict'

const methodNotImplemented = 'Method not implemented.'

/**
 * @abstract
 * Abstract base class for basic API resource controllers.
 */
export class BaseResourceController {
  /**
   * @abstract
   * Returns all the documents in the collection.
   * @param req
   * @param res
   */
  async all(req, res) {
    throw new Error(methodNotImplemented)
  }

  /**
   * @abstract
   * Return the requested document by ID.
   * @param req
   * @param res
   */
  async view(req, res) {
    throw new Error(methodNotImplemented)
  }

  /**
   * @abstract
   * Returns all the documents, but paginated and optimized for listing in data tables.
   * @param req
   * @param res
   */
  async list(req, res) {
    throw new Error(methodNotImplemented)
  }

  /**
   * @abstract
   * Creates a new document.
   * @param req
   * @param res
   */
  async create(req, res) {
    throw new Error(methodNotImplemented)
  }

  /**
   * @abstract
   * Updates the requested document by ID.
   * @param req
   * @param res
   */
  async update(req, res) {
    throw new Error(methodNotImplemented)
  }

  /**
   * @abstract
   * Performs database deletion of the requested document by ID.
   * @param req
   * @param res
   */
  async remove(req, res) {
    throw new Error(methodNotImplemented)
  }
}
