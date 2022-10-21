/*Lab1----------------------------userAddress----------------------------------------*/
window.userAddress = null;
window.richAddress = null;
window.richPrivatekey = null;
window.onload = async () => {
if (!window.ethereum){

    alert("You need install the MetaMask Wallet !");
}
    window.userAddress = window.localStorage.getItem("userAddress");
if (!window.userAddress){
    return false;
}
    document.getElementById("userAddress").value = `${window.userAddress}`;
    getBalance();
}


/*Lab1----------------------------Login function----------------------------------------*/
async function getAccount(){ 
    if (window.ethereum){
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        const account = accounts[0];
        window.userAddress = account;
        window.localStorage.setItem("userAddress",truncateAddress(account));
        document.getElementById("userAddress").value = `${window.userAddress}`;
    
        //getBalance();
    } else{
        alert("No ETH brower extension detected.");
    }
}

function truncateAddress(address) {
    if (!address) {
      return "";
    }
    return `${address.substr(0, 5)}...${address.substr(
      address.length - 5,
      address.length
    )}`;
  }
 /*Lab1----------------------------Logout function----------------------------------------*/
async function logout() { 
    alert("Bye bye~~");
    window.userAddress = null; 
    window.localStorage.removeItem("userAddress");
    document.getElementById( "userAddress" ).value = "";
  //  document.getElementById( "userBalance" ).value = "";
}

/*Lab2----------------------------View balance function----------------------------------------*/
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:5500'));  
//df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e
// JSON-RPC API : https://eth.wiki/json-rpc/API#eth_getbalance      
async function getBalance(){
    const web3 = new Web3(window.ethereum);
    //get account address for view the balance ETH
    const balances = await window.ethereum.request({method: 'eth_requestAccounts'});
    const balance = balances[0];
    web3.eth.defaultAccount = balance;
    web3.eth.getBalance(web3.eth.defaultAccount, function(err, result) {
        if (err) {
            console.log(err)
        } else {
    //        document.getElementById("userBalance").innerText = web3.utils.fromWei(result, "ether") + " ETH";
        }
    })
}
/*Lab2----------------------------Search balance function----------------------------------------*/
async function searchBalance(){
    const web3 = new Web3(window.ethereum);
    var keyresult = document.getElementById("publickeyforsearch").value;
    web3.eth.getBalance(keyresult, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            document.getElementById("resultbalance").innerText = web3.utils.fromWei(result, "ether") + " ETH";
        }
    })
    Lab2outputAccountURL();
}
function Lab2outputAccountURL(){
    var url = "https://rinkeby.etherscan.io/address/" + document.getElementById("publickeyforsearch").value;
    document.getElementById("account_link").innerHTML = "<a href=\""+url+"\">"+url+"</a>";
    console.log(url);
}

/*Lab3----------------------------Create new Account function----------------------------------------*/
// Web3 library : https://web3js.readthedocs.io/en/v1.2.11/web3-eth-accounts.html    
async function createNewAccount(){
    const web3 = new Web3(window.ethereum);  
    const newAccount = web3.eth.accounts.create()    
    document.getElementById("NewUserPublicKey").innerHTML = newAccount.address;
    document.getElementById("NewuSerPrivateKey").innerHTML = newAccount.privateKey;
    console.log(newAccount);
}
/*Lab3----------------------------Forget Account function----------------------------------------*/
async function forgetAccount(){
    const web3 = new Web3(window.ethereum);
    var address = document.getElementById("userPrivateKey").value;
    const own_account = web3.eth.accounts.privateKeyToAccount(address); 
    document.getElementById("userPublicKey").value = own_account.address; 
    console.log(own_account);
}

/*Lab4----------------------------Hacking function----------------------------------------*/
/*
        MataMask Wallet Private Key output
        Range : num -> 0-9 and a-f 
        Private key size  : 4 * 16 = 64 
        Patten : xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx
        Sample : df57-089f-ebba-cf7b-a0bc-227d-afbf-fa9f-c08a-93fd-c68e-1e42-411a-14ef-cf23-656e
        RS     : df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e
        Create Date : 5/23/2022
*/
async function ScannerTesting(){
    
    const web3 = new Web3(window.ethereum);
    //Get the private key 
    //Get the public key by web3.eth.accounts.privateKeyToAccoun(private_key) function
    //Get the balance from public key by web3.eth.getBalance function
    let publickey = "";
    let randomkey = "";
    let result = "";
    for (let i = 1 ; i <= 9 ; i++ ){
        randomkey = getPrivateKey_mode0();
        publickey = web3.eth.accounts.privateKeyToAccount(randomkey).address;//getTestPublicKey();
        document.getElementById("time").innerText = "Loop time : "+i;
        /*eth = web3.eth.getBalance(publickey, function(err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("Private Key:"+randomkey,"ETH: "+web3.utils.fromWei(result, "ether"));             
            }
        });*/
        getBalanceHack(publickey,randomkey);
        
        if(document.getElementById("ETH_key").innerText === ""){
            continue;
        }else if(document.getElementById("ETH_key").innerText === "0"){
            console.log("This is zero ETH, Time :"+i);
            continue;
        }else{
            continue;
            
        }
       
    }
}
async function ScannerMode1(){
    
    const web3 = new Web3(window.ethereum);
    //Get the private key 
    //Get the public key by web3.eth.accounts.privateKeyToAccoun(private_key) function
    //Get the balance from public key by web3.eth.getBalance function
    let publickey = "";
    let randomkey = "";
    let result = "";
    for (let i = 1 ; i <= 10000 ; i++ ){
        randomkey = getPrivateKey_mode1();
        publickey = web3.eth.accounts.privateKeyToAccount(randomkey).address;//getTestPublicKey();
        document.getElementById("time").innerText = "Loop time : "+i;
        /*eth = web3.eth.getBalance(publickey, function(err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("Private Key:"+randomkey,"ETH: "+web3.utils.fromWei(result, "ether"));             
            }
        });*/
        getBalanceHack(publickey,randomkey);
        
        if(document.getElementById("ETH_key").innerText === ""){
            continue;
        }else if(document.getElementById("ETH_key").innerText === "0"){
            console.log("This is zero ETH, Time :"+i);
            continue;
        }else{
            continue;
            
        }
       
    }
}
async function ScannerMode2(){

    const web3 = new Web3(window.ethereum);
    //Get the private key 
    //Get the public key by web3.eth.accounts.privateKeyToAccoun(private_key) function
    //Get the balance from public key by web3.eth.getBalance function
    let publickey = "";
    let randomkey = "";
    let result = "";
    for (let i = 1 ; i <= 10000 ; i++ ){
        randomkey = getPrivateKey_mode2();
        publickey = web3.eth.accounts.privateKeyToAccount(randomkey).address;//getTestPublicKey();
        document.getElementById("time").innerText = "Loop time : "+i;
        /*eth = web3.eth.getBalance(publickey, function(err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("Private Key:"+randomkey,"ETH: "+web3.utils.fromWei(result, "ether"));             
            }
        });*/
        getBalanceHack(publickey,randomkey);
        
        if(document.getElementById("ETH_key").innerText === ""){
            continue;
        }else if(document.getElementById("ETH_key").innerText === "0"){
            console.log("This is zero ETH, Time :"+i);
            continue;
        }else{
            continue;
            
        }
       
    }
}
async function ScannerMode3(){
   
    const web3 = new Web3(window.ethereum);
    //Get the private key 
    //Get the public key by web3.eth.accounts.privateKeyToAccoun(private_key) function
    //Get the balance from public key by web3.eth.getBalance function
    let publickey = "";
    let randomkey = "";
    let result = "";
    for (let i = 1 ; i <= 10000 ; i++ ){
        randomkey = getPrivateKey_mode3();
        publickey = web3.eth.accounts.privateKeyToAccount(randomkey).address;//getTestPublicKey();
        document.getElementById("time").innerText = "Loop time : "+i;
        /*eth = web3.eth.getBalance(publickey, function(err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("Private Key:"+randomkey,"ETH: "+web3.utils.fromWei(result, "ether"));             
            }
        });*/
        getBalanceHack(publickey,randomkey);
        
        if(document.getElementById("ETH_key").innerText === ""){
            continue;
        }else if(document.getElementById("ETH_key").innerText === "0"){
            console.log("This is zero ETH, Time :"+i);
            continue;
        }else{
            continue;
            
        }
       
    }
}
async function ScannerMode4(){
    
    const web3 = new Web3(window.ethereum);
    const count = document.getElementById("loopCount").value;
    //Get the private key 
    //Get the public key by web3.eth.accounts.privateKeyToAccoun(private_key) function
    //Get the balance from public key by web3.eth.getBalance function
    let publickey = "";
    let randomkey = "";
    let result = "";
    for (let i = 1 ; i <= count ; i++ ){
        randomkey = getPrivateKey_mode4();
        publickey = web3.eth.accounts.privateKeyToAccount(randomkey).address;//getTestPublicKey();
        
        result +="Account "+i+"<br>"+ "Public Key :"+publickey+"<br>"
                 +"Private Key:"+randomkey+"<br><br>"
                 +"<hr><br>"

        getBalanceHack(publickey,randomkey);
        
       
    }
    document.getElementById("result").innerHTML = result;
}
async function ScannerModeMAX(){
  
    const web3 = new Web3(window.ethereum);
    //Get the private key 
    //Get the public key by web3.eth.accounts.privateKeyToAccoun(private_key) function
    //Get the balance from public key by web3.eth.getBalance function
    let publickey = "";
    let randomkey = "";
    let eth = 0;
    let i = 1;
    let richPrivatekey = "";
    let richAddress = "";
    let rs = "";
while (i <= 80000){
        randomkey = getPrivateKey_mode4();
        publickey = web3.eth.accounts.privateKeyToAccount(randomkey).address;//getTestPublicKey();
        document.getElementById("time").innerText = "Loop time : "+i;
        getBalanceHackMax(publickey,randomkey);   
       
        window.localStorage.removeItem("richAddress");
        window.localStorage.removeItem("richPrivatekey");
        
       i++;
    }
}

function getBalanceHack(publickey,randomkey){
    console.clear()
    const web3 = new Web3(window.ethereum);
    let re = ""
    web3.eth.getBalance(publickey, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log("Private Key:"+randomkey,"ETH: "+web3.utils.fromWei(result, "ether")); 
            re = result;  
                     
        }
    });
    let eth = web3.utils.fromWei(re, "ether");
  
}
function getBalanceHackMax(publickey,randomkey){
    //console.clear()
    const web3 = new Web3(window.ethereum);
    let re = "";
    let eth = "";
    let value = "";
    eth = web3.eth.getBalance(publickey, function(err, result) {
        if (err) {
            console.log(err)
            window.localStorage.removeItem("richAddress");
            window.localStorage.removeItem("richPrivatekey");
        } else {
            window.localStorage.setItem("richPrivatekey",randomkey);
            window.localStorage.setItem("richAddress",web3.utils.fromWei(result, "ether"));
            console.log("ETH : "+ window.localStorage.getItem("richAddress")+" Private Key : "+
                         window.localStorage.getItem("richPrivatekey")); 
       // console.log("Private Key:"+randomkey,"ETH: "); 
        
        }
    });
    //console.log(eth);
    
   // return {"eth":window.localStorage.getItem("richAddress"),"privatekey":window.localStorage.getItem("richPrivatekey")};
  
}
function getTestPublicKey(){
    var test_key = ["0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
                    "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
                    "0x7bEbD2B61250528c3BaE4cA92b73031Ecae0450C"
                   ];
    var result=   test_key[getRandomInt2(3)];
    return result;
}
function getPrivateKey_mode0(){
    var private_key = ["98e193676a6d6491fd2fe818a83afc89cda818ce33ae09292b0a27dadb7e64c0",
                       "98e193676a6d6491fd2fe818a83afc89cda818ce33ae09292b0a27dadb7e64c1",
                       "98e193676a6d6491fd2fe818a83afc89cda818ce33ae09292b0a27dadb7e64c2",
                       "98e193676a6d6491fd2fe818a83afc89cda818ce33ae09292b0a27dadb7e64c3",
                       "98e193676a6d6491fd2fe818a83afc89cda818ce33ae09292b0a27dadb7e64c4",
                       "98e193676a6d6491fd2fe818a83afc89cda818ce33ae09292b0a27dadb7e64c5",
                       "98e193676a6d6491fd2fe818a83afc89cda818ce33ae09292b0a27dadb7e64c6",
                       "98e193676a6d6491fd2fe818a83afc89cda818ce33ae09292b0a27dadb7e64c7",
                       "df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"
                      ];

                  // 1
    private_key = private_key[getRandomInt()] ;
                  
    return private_key;
    
}
function getPrivateKey_mode1(){
    var key_patten_number = ['0','1','2','3','4','5','6','7','8','9'];
    var key_patten_string = ['a','b','c','d','e','f'];
    var private_key = null;

                  // 1
    private_key = key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  // 2
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  // 3
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  // 4
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  // 5
                  key_patten_string[getRandomString()] + key_patten_number[getRandomInt()]    +
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  // 6
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  // 7
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  // 8
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  // 9
                  key_patten_string[getRandomString()] + key_patten_number[getRandomInt()]    +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  // 10
                  key_patten_string[getRandomString()] + key_patten_number[getRandomInt()]    +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  // 11
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  // 12
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  // 13
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  // 14
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  // 15
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  // 16
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] ;
    
    return private_key;
    
}
function getPrivateKey_mode2(){
    //55ba-3b3a-4407-74fc-2626-fc78-48d4-982e-d43d-e33d-f078-aee4-a22b-e753-8328-b843
    // 1    2    3    4    5    6     7   8    9    10   11   12   13   14   15   16
    var key_patten_number = ['0','1','2','3','4','5','6','7','8','9'];
    var key_patten_string = ['a','b','c','d','e','f'];
    var private_key = null;

                  // 1
    private_key = "5"    + "5"    +
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +                 
                  // 2
                  "3"    + key_patten_string[getRandomString()] +
                  "3"    + key_patten_string[getRandomString()] +
                  // 3
                  "4"    + "4"    +
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  // 4
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  // 5
                  "2"    + "6"    +
                  "2"    + "6"    +
                  // 6
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()] +
                  // 7
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  // 8
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  // 9
                  key_patten_string[getRandomString()] + key_patten_number[getRandomInt()]    +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  // 10
                  key_patten_string[getRandomString()] + key_patten_number[getRandomInt()]    +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  // 11
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  // 12
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  // 13
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  // 14
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  // 15
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  // 16
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] ;
    
    return private_key;
    
}
function getPrivateKey_mode3(){
    //46e1-9007-6a6d-9881-fd2f-e818-a83f-ac78-8aa7-07ce-33fb-0707-0b0a-27da-db7e-63c9
    // 1    2    3    4    5    6     7   8    9    10   11   12   13   14   15   16
    var key_patten_number = ['0','1','2','3','4','5','6','7','8','9'];
    var key_patten_string = ['a','b','c','d','e','f'];
    var private_key = null;

                  // 1
    private_key = "3"   + "6"    +
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +                 
                  // 2
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  // 3
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  // 4
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  // 5
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  // 6
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()] +
                  // 7
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  // 8
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  // 9
                  key_patten_string[getRandomString()] + key_patten_number[getRandomInt()]    +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  // 10
                  key_patten_string[getRandomString()] + key_patten_number[getRandomInt()]    +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  // 11
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  // 12
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  // 13
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] +
                  // 14
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  // 15
                  key_patten_string[getRandomString()] + key_patten_string[getRandomString()] +
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  // 16
                  key_patten_number[getRandomInt()]    + key_patten_number[getRandomInt()]    +
                  key_patten_number[getRandomInt()]    + key_patten_string[getRandomString()] ;
    
    return private_key;
    
}
function getPrivateKey_mode4(){
    //55ba-3b3a-4407-74fc-2626-fc78-48d4-982e-d43d-e33d-f078-aee4-a22b-e753-8328-b843
    // 1    2    3    4    5    6     7   8    9    10   11   12   13   14   15   16
    var key_patten = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    var private_key = null;

                  // 1
    private_key = key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] +
                  key_patten[getRandomAll()] + key_patten[getRandomAll()] ;
    
    return private_key;
    
}
function getRandomInt() {
    return Math.floor(Math.random() * 9);
}
function getRandomInt2(max) {
    return Math.floor(Math.random() * max);
}
function getRandomString() {
    return Math.floor(Math.random() * 6);
}
function getRandomAll() {
    return Math.floor(Math.random() * 16);
}
function Lab4outputAccountURL(){
    var url = "https://etherscan.io/address/" + document.getElementById("publickeyforsearch").value;
    document.getElementById("account_link").innerHTML = "<a href=\""+url+"\">"+url+"</a>";
    console.log(url);
}

async function copytext() {
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