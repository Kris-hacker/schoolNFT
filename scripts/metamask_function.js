/*

Function list  [ Web3.js ] v1.0 :
_____________________________________________________________________________________________

1.) Login with MetaMask wallet                ----> loginWithEth() 
2.) Display own wallet address                ----> showAddress()
3.) Own ETH address in abbreviations          ----> truncateAddress(address)
4.) Hidden address (Disappear)                ----> Logout()
5.) Copy address from the member card         ----> copytext()
6.) Return thr opensea nft                    ----> getOpenseaItems()

We need find the API / other way to call the NFT from wallet to HTML ...

---------------------------------------------------------------------------------------------

1.) Detect the MetaMask on browser            ----> window.ethereum
2.) Get the own ETH address from MetaMask     ----> window.localStorage.getItem("userAddress")
3.) Own ETH address from MetaMask             ----> window.userAddress
______________________________________________________________________________________________

*/



window.userAddress = null;
window.onload = async () => {
  // Init Web3 connected to ETH network , deteced the Metamask wallet
  if (!window.ethereum) {
    
    alert("You need install the MetaMask Wallet !");
  }
  
  // Load in Localstore key
  window.userAddress = window.localStorage.getItem("userAddress");

  showAddress();
};

// Use this function to turn a 42 character ETH address
// into an address like 0x345...12345
function truncateAddress(address) {
  if (!address) {
    return "";
  }
  return `${address.substr(0, 5)}...${address.substr(
    address.length - 5,
    address.length
  )}`;
}

// Display or remove the users know address on the frontend
function showAddress() {
  if (!window.userAddress) {

    document.getElementById("userAddress").innerText = 'Login with MetaMask';
    return false;
  }

  document.getElementById(
    "userAddress"
  ).innerText = `Account : ${truncateAddress(window.userAddress)}`;
  
}





// remove stored user address and reset frontend
function logout() {
  alert("Bye bye~~");
  window.userAddress = null;
  window.localStorage.removeItem("userAddress");
  showAddress();
  
}

// Login with Web3 via Metamasks window.ethereum library
async function loginWithEth() {
  if (window.ethereum) {
    try {
      // We use this since ethereum.enable() is deprecated. This method is not
      // available in Web3JS - so we call it directly from metamasks' library
      const selectedAccount = await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => accounts[0])
        .catch(() => {
          throw Error("No account selected!");
        });
      window.userAddress = selectedAccount;
      window.localStorage.setItem("userAddress", selectedAccount);
      showAddress();
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("No ETH brower extension detected.");
  }
}

//

//Card
function copytext() {
  if (!window.userAddress) {
    alert("No any data here");
    return false;
  }

  /* Get the text field */
  var copyText = document.getElementById("copycardaddress")
 
  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);

  /* Alert the copied text */
  alert("Copied the ETH Address: " + copyText.value);
}

//search NFT
function searchNFT(){
   /* Get the text field */
   

}

//
async function getOpenseaItems() {
  if (!window.userAddress) { 
    alert("No any data here");
    return 
  }
  var memberaddress = $("#cardaddress").val();
  const osContainer = document.getElementById('openseaItems')

 // const items = await fetch(`https://api.opensea.io/api/v1/assets?owner=${window.userAddress}&order_direction=desc&offset=0&limit=50`)
 const items = await fetch(`https://api.opensea.io/api/v1/assets?owner=${memberaddress}`)
    .then((res) => res.json())
    .then((res) => {
      return res.assets
    })
    .catch((e) => {
      console.error(e)
      console.error('Could not talk to OpenSea')
      return null
    })

  if (items.length === 0) { return }

  items.forEach((nft) => {
    const { name, image_url, description, permalink } = nft

    const newElement = document.createElement('div')
    newElement.innerHTML = `
      <!-- Opensea listing item-->
      <a href='${permalink}' target="_blank">
        <div class='flex flex-col'>
          <img
            src='${image_url}'
            class='w-full rounded-lg' />
          <div class='flex-col w-full space-y-1'>
            <p class='text-white-800 text-lg'>${name}</p>
            <p class='text-white-500 text-xs word-wrap'>${description ?? ''}</p>
          </div>
        </div>
      </a>
      <!-- End Opensea listing item-->
    `

    osContainer.appendChild(newElement)
  })
}
