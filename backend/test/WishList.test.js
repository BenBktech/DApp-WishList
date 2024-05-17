const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { assert, expect } = require("chai");
require("@nomicfoundation/hardhat-chai-matchers")

describe("WishList Tests", function () {

  let owner;
  let addr1;
  let addr2;
  let addr3;
  let wishList;

  async function deployWishList() {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const WishList = await ethers.getContractFactory("WishList");
    const wishList = await WishList.deploy();

    return { wishList, owner, addr1, addr2, addr3 }
  }

  async function deployWishListAndAddWish() {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const WishList = await ethers.getContractFactory("WishList");
    const wishList = await WishList.deploy();

    const name = "Voiture";
    const price = ethers.parseEther('3');
    await wishList.addToWishList(name, price);

    return { wishList, owner, addr1, addr2, addr3 }
  }

  describe('Deployment', function() {
    beforeEach(async function() {
      const fixture = await loadFixture(deployWishList);
      owner = fixture.owner;
      addr1 = fixture.addr1;
      addr2 = fixture.addr2;
      addr3 = fixture.addr3;
      wishList = fixture.wishList;
    })

    it('should deploy the smart contract', async function() {
      let nextId = await wishList.nextId();
      assert(nextId.toString() === "0");
    })
  })

  describe('addToWishList', function() {
    beforeEach(async function() {
      const fixture = await loadFixture(deployWishList);
      owner = fixture.owner;
      addr1 = fixture.addr1;
      addr2 = fixture.addr2;
      addr3 = fixture.addr3;
      wishList = fixture.wishList;
    })

    it('should add an element in the wishList', async function() {
      const name = "Voiture";
      const price = ethers.parseEther('3');
      await wishList.addToWishList(name, price);
      const wishListElement = await wishList.getWishList(owner.address);
      assert(wishListElement[0][0] === 1n);
      assert(wishListElement[0][1] === name);
      assert(wishListElement[0][2] === price);
      assert(wishListElement[0][3] === false);
      assert(wishListElement[0][4] === '0x0000000000000000000000000000000000000000');
    })
  })

  describe('buyItem', function() {
    beforeEach(async function() {
      const fixture = await loadFixture(deployWishListAndAddWish);
      owner = fixture.owner;
      addr1 = fixture.addr1;
      addr2 = fixture.addr2;
      addr3 = fixture.addr3;
      wishList = fixture.wishList;
    })

    it('should NOT buy item if not enough funds are provided', async function() {
      const etherGiven = ethers.parseEther('1');
      await expect(wishList.connect(addr1).buyItem(owner.address, 1, { value: etherGiven })).to.be.revertedWithCustomError(
        wishList,
        "NotEnoughFunds"
      )
    })

    it('should buy the item if enough funds are provided', async function() {
      const balanceOwnerBefore = await ethers.provider.getBalance(owner.address);
      const etherGiven = ethers.parseEther('3');
      await wishList.connect(addr1).buyItem(owner.address, 1, { value: etherGiven })
      const wishListElement = await wishList.getWishList(owner.address);
      const balanceOwnerAfter = await ethers.provider.getBalance(owner.address);
      const total = balanceOwnerBefore + etherGiven;
      assert(wishListElement[0][0] === 1n);
      assert(wishListElement[0][1] === 'Voiture');
      assert(wishListElement[0][2] === etherGiven);
      assert(wishListElement[0][3] === true);
      assert(wishListElement[0][4] === addr1.address);
      assert(total === balanceOwnerAfter);
    })

    it('should NOT buy the item if the item has already been bought', async function() {
      const etherGiven = ethers.parseEther('3');
      await wishList.connect(addr1).buyItem(owner.address, 1, { value: etherGiven })
      await expect(wishList.connect(addr2).buyItem(owner.address, 1, { value: etherGiven })).to.be.revertedWithCustomError(
        wishList,
        "AlreadyBought"
      )
    })
  })
  
});
