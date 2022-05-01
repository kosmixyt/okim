const si = require("systeminformation");
const express = require("express");
const app = express();
const fs = require("fs");
const ni = "eth0";





function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return 'n/a';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i == 0) return bytes + ' ' + sizes[i];
  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};







function getstats()
{


  return new Promise((resolve, rejects) => {


    si.networkStats(ni, function(data){

      resolve(data)
    })
  })




}



if(process.argv[3] == "--json")
{
async function main(write, towrite)
{

return new Promise(async (resolve, rejects) =>{

  frx = await getstats();
  ftx = frx[0].tx_bytes;
  frx = frx[0].rx_bytes;


  
setTimeout(async () => {

nrx = await getstats();
ntx = nrx[0].tx_bytes;
nrx = nrx[0].rx_bytes;


dl_speed = (nrx - frx);
up_speed = (ntx - ftx);

dl_co = parseInt(bytesToSize(dl_speed));
dl_co = dl_co * 8;
dl_size = bytesToSize(dl_speed).replace(/[0-9]/g, '').replace('.', "");
dl_size = dl_size.replace("MB", "Mbit/s").replace("KB", 'Kbit/s').replace("Bytes", "B/s").replace("GB", "Gbit/s").replace("TB", "Terabit/s").trim()

up_co = parseInt(bytesToSize(up_speed));
up_co = up_co * 8;
up_size = bytesToSize(up_speed).replace(/[0-9]/g, '').replace('.', "");
up_size = up_size.replace("MB", "Mbit/s").replace("KB", 'Kbit/s').replace("Bytes", "B/s").replace("GB", "Gbit/s").replace("TB", "Terabit/s").trim()

dt = JSON.stringify({ "up_speed" : up_co, "up_size" : up_size ,"down_speed" : dl_co, "down_size" : dl_size});
console.log(dt);

if(write)
{
  if(fs.existsSync(towrite)){ fs.unlinkSync(towrite); console.log("removed") }
  fs.writeFileSync(towrite, dt)
}

process.exit(0)



}, 1000);

  







  
})
}

if(typeof(process.argv[4]) !== 'undefined'){
main(true, process.argv[4]);
}else
{
  main();
}


}else{

app.get("/speed", async (req, res) => {

res.send(JSON.stringify({ "up_speed" : up_co, "up_size" : up_size ,"down_speed" : dl_co, "down_size" : dl_size}))

})



setTimeout(async () => {
  frx = await getstats();
  ftx = frx[0].tx_bytes;
  frx = frx[0].rx_bytes;
setInterval(async () => {
  

nrx = await getstats();
ntx = nrx[0].tx_bytes;
nrx = nrx[0].rx_bytes;


dl_speed = (nrx - frx);
up_speed = (ntx - ftx);
console.clear();

dl_co = parseInt(bytesToSize(dl_speed));
dl_co = dl_co * 8;
dl_size = bytesToSize(dl_speed).replace(/[0-9]/g, '').replace('.', "");
dl_size = dl_size.replace("MB", "Mbit/s").replace("KB", 'Kbit/s').replace("Bytes", "B/s").replace("GB", "Gbit/s").replace("TB", "Terabit/s")

up_co = parseInt(bytesToSize(up_speed));
up_co = up_co * 8;
up_size = bytesToSize(up_speed).replace(/[0-9]/g, '').replace('.', "");
up_size = up_size.replace("MB", "Mbit/s").replace("KB", 'Kbit/s').replace("Bytes", "B/s").replace("GB", "Gbit/s").replace("TB", "Terabit/s")

console.log("Dl : " + dl_co + dl_size);
console.log("UP : " + up_co  + up_size);

frx = nrx;
ftx = ntx ;

}, 1000);

}, 1000);




}






app.listen("100");
