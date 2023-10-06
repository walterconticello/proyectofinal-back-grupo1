import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isOwner: {
      type: Boolean,
      default: false
    },
    photo: {
      url: {
        type: String,
        default: "https://us.123rf.com/450wm/salamatik/salamatik1801/salamatik180100019/92979836-perfil-an%C3%B3nimo-icono-de-la-cara-persona-silueta-gris-avatar-masculino-por-defecto-foto-de.jpg"
      },
      public_id: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", UserSchema)