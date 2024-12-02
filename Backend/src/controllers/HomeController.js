import HomeService from "../../src/services/Homeservice.js"
import {successResponse} from "../utils/responseUtil.js"
import {errorResponse}   from "../utils/responseUtil.js";
const homeService = new HomeService();

class HomeController {
    async createActionController(req, res, next) {
        try {
            const dto = req.body;
      
            const response = await homeService.createActionService(dto);
            if (response && response.success) {
              return successResponse(res, response.message, response.data);
            } else {
              return errorResponse(res, response.message, 500);
            }
          } catch (error) {
            next(error);
          }
    }

    async getAllActionsController(req, res, next) {
      try {
        const dto = {
          page: req.query.page,
          limit: req.query.limit,
          sort: req.query.sort,
          order: req.query.order,
          search: req.query.search,
        };
        const response = await homeService.getAllActionsService(dto);
        if (response.success) {
          return successResponse(res, response.message, response.data);
        } else {
          return errorResponse(res, response.message, 500);
        }
      } catch (error) {
        next(error);
      }
    }
}

export default HomeController;
