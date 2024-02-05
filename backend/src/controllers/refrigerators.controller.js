import refrigeratorJson from "../mock/refrigerators.mock.json" with {type: "json"};

class RefrigeratorsController {
  static getAllRefrigerators = async (req, res, next) => {
    const refrigerators = refrigeratorJson;
    try {
      res.status(200).send(refrigerators);
    } catch (error) {
      next(error);
    }
  };
}

export default RefrigeratorsController;
