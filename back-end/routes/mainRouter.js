const mainRouter = require("express").Router();
const userModel = require("../models/userModel");

//
mainRouter.post("/user/signupcheck", async (req, res) => {
  const { email, name, password } = req.body;
  console.log(req.body);
  try {
    const currentUser = await userModel.findOne({ email });
    if (currentUser) {
      return res.status(516).send("The email is already used");
    } else {
      const user = await userModel.create({ name, email, password });
      console.log(user, "333333");
      return res.status(200).json(user._id);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

mainRouter.post("/user/signincheck", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body, "4444");
  try {
    const currentUser = await userModel.findOne({ email });
    console.log(currentUser, "555");
    if (currentUser) {
      if (currentUser.password === password) {
        return res
          .status(200)
          .json({ userId: currentUser._id, userName: currentUser.name });
      }
      return res.status(516).send("Incorrect password");
    } else {
      return res.status(516).send("This email is not registered");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

mainRouter.post("/user/googleauth", async (req, res) => {
  const { email, name } = req.body;
  try {
    const currentUser = await userModel.findOne({ email });
    if (currentUser) {
      console.log(currentUser);
      return res.status(200).json(currentUser._id);
    } else {
      const user = await userModel.create({ name, email });
      console.log(user);
      return res.status(200).json(user._id);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

mainRouter.patch("/profileData/:id", async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, {
      _id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      info: {
        age: req.body.age,
        gender: req.body.gender,
        weight: req.body.weight,
        height: req.body.height,
        activity: req.body.activity,
        bmi: req.body.bmi,
        Proteins: req.body.Proteins,
        carbohydrates: req.body.carbohydrates,
        fats: req.body.fats,
        kcal: req.body.kcal,
        targetWeight: req.body.targetWeight,
      },
    });
    return await res.json(user);
  } catch (error) {
    res.send(error);
  }
});

mainRouter.patch("/macroData/:id", async (req, res) => {
  try {
    const { Proteins, carbohydrates, fats, kcal, targetWeigth } = req.body;
    const macros = await userModel.findByIdAndUpdate(req.params.id, {
      target: { ...req.body },
    });
    return res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
});

mainRouter.post("/profileImg/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const macros = await userModel.findByIdAndUpdate(req.params.id, {
      profileImg: { ...req.body },
    });
    return res.sendStatus(200);
  } catch (error) {
    res.send(error);
  }
});

module.exports = mainRouter;
