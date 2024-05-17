const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("WishListModule", (m) => {

  const wishList = m.contract("WishList");

  return { wishList };
});
