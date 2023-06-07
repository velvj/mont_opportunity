import {  DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/sequelize";

//common Data interfacee
export interface CommonData {
  common_id: number;
  orginal_project: boolean;
  additional_project: boolean;
  date_time: Date;
  project_type: string;
  job_name: string;
  address: String;
  unit: number;
  zip_code: number;
  city: string;
  state: string;
  country: string;
  phone_type: string;
  phone: string;
  email: string;
  internal_print: string;
}

export class CommonMod extends Model<CommonData> {}

CommonMod.init(
  {
    common_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    orginal_project: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    additional_project: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    project_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    internal_print: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "commons",
    sequelize,
    modelName: "CommonMod",
  }
);
