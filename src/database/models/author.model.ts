import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
      requird: true,
    },
    bio: String,
    birthDate: Date,
    books: {
      type: [Schema.Types.ObjectId],
      ref: "Book",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Author || model("Author", schema);
