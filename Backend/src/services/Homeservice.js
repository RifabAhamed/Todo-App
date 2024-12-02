import HomeRepository from "../../src/repositories/HomeRepository.js"
class HomeService{
    constructor(){
        this.repository = new HomeRepository();
    }

    async createActionService(dto){
        try {
            const response = await this.repository.createActionRepository(dto);
            return response;
        } catch (error) {
            return{
                success: false,
                message: error.message,
                data: null,
            }
        }
    }

    async getAllActionsService(dto) {
        try {
          const response = await this.repository.getAllActionsRepository(
            dto
          );
          return response;
        } catch (error) {
          return {
            success: false,
            message: error.message,
            data: null,
          };
        }
      }
}

export default HomeService;