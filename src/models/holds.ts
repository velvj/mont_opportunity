import {  DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/sequelize";
import { CommonMod } from "./commonMod";
import { OpportunityMod } from "./opportunity";

//hold Data interface
export interface HoldsData {
  hold_id: number;
  hold_date_time: Date;
  hold_label: string;
  printed_notes: string;
  opportunity_id: number;
  common_id: number;
  is_allocated: boolean;
}

export class HoldMod extends Model<HoldsData> {}

HoldMod.init(
  {
    hold_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    hold_date_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
    hold_label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    printed_notes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    opportunity_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: { model: OpportunityMod, key: "opportunity_id" },
    },
    common_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: { model: CommonMod, key: "common_id" },
    },
    is_allocated: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "holds",
    sequelize,
  }
);

//Association
HoldMod.belongsTo(CommonMod, {
  foreignKey: "common_id",
  as: "commonDatas",
});
CommonMod.hasMany(HoldMod, {
  sourceKey: "common_id",
  foreignKey: "common_id",
  as: "holdDatas",
});

HoldMod.belongsTo(OpportunityMod, {
  foreignKey: "opportunity_id",
  as: "OpportunityModDatas",
});
OpportunityMod.hasMany(HoldMod, {
  sourceKey: "opportunity_id",
  foreignKey: "opportunity_id",
  as: "holdDatas",
});

//Association Common Model
HoldMod.hasMany(CommonMod, {
  sourceKey: "common_id",
  foreignKey: "common_id",
  as: "holdCommonDatalists",
});
