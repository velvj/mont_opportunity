import {  DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/sequelize";
import { CommonMod } from "./commonMod";

//opportunity Data interface
export interface OpportunityData {
  opportunity_id: number;
  common_id: number;
}

export class OpportunityMod extends Model<OpportunityData> {}

OpportunityMod.init(
  {
    opportunity_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    common_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: CommonMod,
        key: "common_id",
      },
    },
  },
  { timestamps: true, tableName: "opportunities", sequelize }
);
//Association
OpportunityMod.belongsTo(CommonMod, {
  foreignKey: "common_id",
  as: "commonModDatas",
});
CommonMod.hasOne(OpportunityMod, {
  sourceKey: "common_id",
  foreignKey: "common_id",
  as: "OpportunityMod",
});

//Association Common
OpportunityMod.hasMany(CommonMod,{
  sourceKey:'common_id',
  foreignKey:'common_id',
  as:"commonDataList"
})
