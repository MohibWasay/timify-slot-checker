import { Router } from "express";
const routes = Router();

import Resource from '@app/controllers/resource';
import Booking from '@app/controllers/booking';

routes.post("/resource", Resource.create);
routes.get("/resource/:id/availability", Booking.getAvailability);

export default routes;
