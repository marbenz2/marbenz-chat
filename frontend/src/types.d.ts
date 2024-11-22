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
  profilePic: string | ArrayBuffer | null;
};

export type User = {
  _id: mongoose.Schema.Types.ObjectId;
  fullName: string;
  email: string;
  profilePic: string | ArrayBuffer | null;
  isSuperUser: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  _id: mongoose.Schema.Types.ObjectId;
  senderId: mongoose.Schema.Types.ObjectId;
  receiverId: mongoose.Schema.Types.ObjectId;
  text: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};
