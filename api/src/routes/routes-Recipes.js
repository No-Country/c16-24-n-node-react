const { Router } = require("express");
const recipesRoutes = Router();

recipesRoutes.get("/", async (req, res) => {
  try {
    return res.status(200).send("Esta es la ruta get recipes");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

recipesRoutes.post("/", async (req, res) => {
  try {
    return res.status(200).send("Esta es la ruta post recipes");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

recipesRoutes.patch("/", async (req, res) => {
  try {
    return res.status(200).send("Esta es la ruta patch recipes");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

recipesRoutes.delete("/", async (req, res) => {
  try {
    return res.status(200).send("Esta es la ruta delete recipes");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = recipesRoutes;
