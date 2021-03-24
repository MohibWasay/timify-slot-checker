import { Router } from "express";
const routes = Router();

import Resource from '@app/controllers/resource';

routes.post("/resource", Resource.create);
routes.get("/resource/:id/availability", Resource.getAvailability);

export default routes;
