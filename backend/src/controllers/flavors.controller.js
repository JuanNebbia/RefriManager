import flavorsJson from "../mock/flavors.mock.json" with {type: "json"};

class FlavorsController {
  static getAllFlavors = async (req, res, next) => {
    const flavors = flavorsJson;
    try {
      res.status(200).send(flavors);
    } catch (error) {
      next(error);
    }
  };
}

export default FlavorsController;
