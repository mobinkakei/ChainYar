// 

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function symbol() external view returns (string memory);
    function totalSupply() external view returns (uint256);
    function name() external view returns (string memory);
}

contract ICOMarketplace {
    struct TokenDetails {
        address token;
        bool supported;
        uint256 price;
        address creator;
        string name;
        string symbol;
    }
    
    mapping(address => TokenDetails) public tokenDetails;
    address[] public allSupportedTokens;
    address public owner;
    
    event TokensReceived(address indexed token, address indexed from, uint256 amount);
    event TokensTransferred(address indexed token, address indexed to, uint256 amount);
    event TokensWithdrawn(address indexed token, address indexed to, uint256 amount);
    event TokenAdded(address indexed token, uint256 price,  address indexed creator, string name, string symbol);
   

    modifier supportedToken(address _token) {
        require(tokenDetails[_token].supported, "Token not supported");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    modifier onlyCreator(address _token) {
        require(msg.sender == tokenDetails[_token].creator, "Caller is not the token creator");
        _;
    }
    
    receive() external payable {
        revert("Contract does not accept Ether directly");
    }

    constructor() {
        owner = msg.sender;
    }
    
    function createICOSale(address _token, uint256 _price) external  {
        IERC20 token = IERC20(_token);
        string memory tokenName = token.name();
        string memory tokenSymbol = token.symbol();

        tokenDetails[_token] = TokenDetails({
            token: _token,
            supported: true,
            price: _price,
            creator: msg.sender,
            name: tokenName,
            symbol: tokenSymbol
        });
        allSupportedTokens.push(_token);
        
        emit TokenAdded(_token, _price, msg.sender, tokenName, tokenSymbol);
    }
    

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }
    
    function buyToken(address _token, uint256 _amount) external payable supportedToken(_token) {
        require(_amount > 0, "Amount must be greater than 0");
        
        TokenDetails memory details = tokenDetails[_token];
        uint256 totalCost = multiply(details.price, _amount);
        require(msg.value == totalCost, "Incorrect Ether amount sent");
        
        // Transfer the payment to the token creator
        (bool sent, ) = details.creator.call{value: msg.value}("");
        require(sent, "Failed to transfer Ether to token creator");

        IERC20 token = IERC20(_token);
        require(token.transfer(msg.sender, _amount * 10**18), "Transfer failed"); // Assuming 18 decimal places for token
        
        emit TokensTransferred(_token, msg.sender, _amount);
    }
    
    function getBalance(address _token) external view returns (uint256) {
        require(tokenDetails[_token].supported, "Token not supported");
        
        IERC20 token = IERC20(_token);
        return token.balanceOf(address(this));
    }
    
    function getSupportedTokens() external view returns (address[] memory) {
        return allSupportedTokens;
    }

    function withdrawToken(address _token, uint256 _amount) external onlyCreator(_token) supportedToken(_token) {
        require(_amount > 0, "Amount must be greater than 0");
        
        IERC20 token = IERC20(_token);
        uint256 balance = token.balanceOf(address(this));
        require(balance >= _amount, "Insufficient token balance");
        
        require(token.transfer(msg.sender, _amount), "Token transfer failed");
        
        emit TokensWithdrawn(_token, msg.sender, _amount);
    }
    
    function getTokenDetails(address _token) external view returns (TokenDetails memory) {
        require(tokenDetails[_token].supported, "Token not supported");
        return tokenDetails[_token];
    }

    function getTokensCreatedBy(address _creator) external view returns (TokenDetails[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < allSupportedTokens.length; i++) {
            if (tokenDetails[allSupportedTokens[i]].creator == _creator) {
                count++;
            }
        }

        TokenDetails[] memory tokens = new TokenDetails[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < allSupportedTokens.length; i++) {
            if (tokenDetails[allSupportedTokens[i]].creator == _creator) {
                tokens[index] = tokenDetails[allSupportedTokens[i]];
                index++;
            }
        }

        return tokens;
    }

     function getAllTokens() external view returns (TokenDetails[] memory) {
        uint256 length = allSupportedTokens.length;
        TokenDetails[] memory tokens = new TokenDetails[](length);
        for (uint256 i = 0; i < length; i++) {
            tokens[i] = tokenDetails[allSupportedTokens[i]];
        }
        return tokens;
    }

    function transferEther(address payable _receiver, uint256 _amount) external payable {
        require(msg.value >= _amount, "Insufficient funds sent");
        
        (bool success, ) = _receiver.call{value: _amount}("");
        require(success, "Transfer failed");
    }
}
