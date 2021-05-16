const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
  info: {
    age: String,
    gender: String,
    weight: String,
    height: String,
    activity: String,
    bmi: String,
    targetWeight: String,
    kcal: Number,
    Proteins: Number,
    carbohydrates: Number,
    fats: Number,
  },

  food: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meal",
    },
  ],
});

const userModel = model("User", userSchema);

module.exports = userModel;
