'use strict'
import { Router } from 'express'

/**
 * Generates an API resource mapper for the main CRUD endponts related to BaseResourceController.
 *
 * It maps the following resource controller methods [all, view, list, create, update, remove] to the handler controller.
 *
 * @param {BaseCRUDResourceController} controller The resource controller instance that maps the API endpoints.
 * @return {Router}
 */
const resource = (controller: any) => {
  return (
    Router()
      //Read operations.
      .get('/', controller.all)
      .post('/paginated', controller.list)
      .get('/:id', controller.view)

      //Write operations.
      .post('/', controller.create)
      .put('/:id', controller.update)
      .delete('/:id', controller.remove)
  )
}

export default resource
