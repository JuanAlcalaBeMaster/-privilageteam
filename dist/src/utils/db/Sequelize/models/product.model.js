"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = require("../sequelize.config");
class ProductInstance extends sequelize_1.Model {
}
exports.default = ProductInstance;
ProductInstance.init({
    idProduct: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    affiliationsActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    enableProvider: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    urlConversionPage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    basePrice: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    urlFunnel: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    temperature: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    affOnlyMembers: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tagAccount: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    orderProduct: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    urlImageProduct: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    baseCurrencyPrice: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    warrantyPeriod: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    idTypeProduct: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    idState: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    urlCheckoutBaseOffer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: sequelize_config_1.db,
    tableName: 'product',
    timestamps: true,
});
//  Relationships region
// ProductInstance.hasOne(productOwnerInstance, { foreignKey: 'idProductOwner' });
// productOwnerInstance.belongsTo(ProductInstance);
