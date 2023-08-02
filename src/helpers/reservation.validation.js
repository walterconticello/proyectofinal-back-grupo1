import mongoose from "mongoose";

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  };

  export default isValidObjectId;

    