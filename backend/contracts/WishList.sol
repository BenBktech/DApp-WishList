// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

error NotEnoughFunds();
error AlreadyBought();

contract WishList {

    struct Item {
        uint256 id;
        string name;
        uint256 price;
        bool bought;
        address boughtBy;
    }

    uint256 public nextId;

    mapping(address => Item[]) private wishList;

    function getWishList(address _of) external view returns(Item[] memory) {
        return wishList[_of];
    }

    function addToWishList(string calldata _name, uint256 _price) external {
        nextId++;
        Item memory thisItem = Item(nextId, _name, _price, false, address(0));
        wishList[msg.sender].push(thisItem); 
    }

    function getKeyByAddressAndId(address _for, uint256 _id) internal view returns(uint256) {
        uint256 result;
        for(uint256 i = 0 ; i < wishList[_for].length ; i++) {
            if(wishList[_for][i].id == _id) {
                result = i;
            }
        }
        return result;
    }

    function buyItem(address _for, uint256 _id) external payable {
        uint256 key = getKeyByAddressAndId(_for, _id);
        if(msg.value < wishList[_for][key].price) {
            revert NotEnoughFunds();
        }
        if(wishList[_for][key].bought) {
            revert AlreadyBought();
        }
        wishList[_for][key].bought = true;
        wishList[_for][key].boughtBy = msg.sender;
        (bool sent,) = _for.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

}