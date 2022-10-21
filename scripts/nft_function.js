//require("dotenv").config()
const API_URL = "https://eth-rinkeby.alchemyapi.io/v2/p67-VCwz84zZGDM4rcjKf6s_8Av1kRC5";
const PUBLIC_KEY = "0xa3BD72E30b12B32667357b33CB7Ddcdf922aA0b8";
const PRIVATE_KEY = "46e190076a6d9881fd2fe818a83fac788aa707ce33fb07070b0a27dadb7e63c9";

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
// https://stackoverflow.com/questions/68485638/js-code-working-when-ran-in-a-node-context-but-uncaught-referenceerror-in-consol

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
console.log(contract);
const contractAddress = "0xD5724FBd715DccFCF8049a98644cdD3c51c10B9E";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce
  
    //the transaction
    const tx = {
      from: PUBLIC_KEY, // input the student address
      to: contractAddress, // token creater
      nonce: nonce,
      gas: 500000,
      data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(), // NFT school certification
    }
  
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              )
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
            }
          }
        )
      })
      .catch((err) => {
        console.log("Promise failed:", err)
      })
      
}

//mintNFT("ipfs://Qmabt3DufNNSq4fRufUpY1nCxZbPYEoh2VZzTWJ4UwMSSP") //JSON file
//getnft()
nftdata()
async function getnft(){
  const ownerAddr = document.getElementById("publicKey").value;
      const nfts = await web3.alchemy.getNfts({owner: ownerAddr})
      // Print owner's wallet address:


      console.log("fetching NFTs for address:", ownerAddr);
      console.log("...");

      // Print total NFT count returned in the response:
      console.log("number of NFTs found:", nfts.totalCount);
      console.log("...");
      console.log(nfts.totalCount);
      // Print contract address and tokenId for each NFT:
      for (const nft of nfts.ownedNfts) {
        console.log("===");
        console.log("contract address:", nft.contract.address);
        console.log("token ID:", nft.id.tokenId);
      }
      console.log("===");
      console.log(nfts);
}
async function nftdata(){
  console.log("fetching metadata for a crypto coven NFT...");
  const metadata = await web3.alchemy.getNftMetadata({
    contractAddress: "0xD5724FBd715DccFCF8049a98644cdD3c51c10B9E",
    tokenId: "23"
  })
  console.log(metadata);
}
