import { DataTypes, Model } from 'sequelize';
import { ProductInterface } from '../interfaces/product/index';
import { db } from '../sequelize.config';

export default class ProductInstance extends Model<ProductInterface> {}

ProductInstance.init(
  {
    idProduct: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    affiliationsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    enableProvider: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    urlConversionPage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    basePrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    urlFunnel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    temperature: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    affOnlyMembers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tagAccount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    orderProduct: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    urlImageProduct: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    baseCurrencyPrice: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    warrantyPeriod: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idTypeProduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idState: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    urlCheckoutBaseOffer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: 'product',
    timestamps: true,
  },
);

//  Relationships region

// ProductInstance.hasOne(productOwnerInstance, { foreignKey: 'idProductOwner' });
// productOwnerInstance.belongsTo(ProductInstance);
