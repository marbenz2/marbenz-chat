import mongoose from "mongoose";

export type FormDataLogin = {
  email: string;
  password: string;
};

export type FormDataSignup = {
  fullName: string;
  email: string;
  password: string;
};

export type FormDataUpdateProfile = {
  profilePic: string | null;
};

export type User = {
  _id: mongoose.Schema.Types.ObjectId;
  fullName: string;
  email: string;
  profilePic: string | null;
  isSuperUser: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PreviewType = {
  name: string;
  data: string;
};

export type Message = {
  _id: mongoose.Schema.Types.ObjectId;
  senderId: mongoose.Schema.Types.ObjectId;
  receiverId: mongoose.Schema.Types.ObjectId;
  text: string;
  image: string;
  pdf: string;
  createdAt: string;
  updatedAt: string;
};
