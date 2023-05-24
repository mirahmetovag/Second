const http = require ('http');
const fs = require ('fs').promises

http.
createServer(async (req,res)=> {
    res.setHeader('Content-Type', 'application/json'); // set datatype
    const path = process.cwd() + '/warehouse.json';
    let warehouse;
    try {
        warehouse = JSON.parse (await fs.readFile(path, 'utf-8'));
    } catch (error) {
        warehouse = [];
    }
    if (req.url === '/' && req.method === 'GET') {
        let warehouse;
        try {
            warehouse = JSON.parse (await fs.readFile(path, 'utf-8'));
        } catch (error) {
            warehouse = [];
        }
        res.end(JSON.stringify(warehouse));
    } else if (req.url = '/' && req.method === 'POST') {
        req.on('data', async (data) => {
            const {name,amount} = JSON.parse(data);
            let warehouse;
        try {
            warehouse = JSON.parse (await fs.readFile(path, 'utf-8'));
        } catch (error) {
            warehouse = [];
        }
        const findItem = warehouse.find((item) => item.name === name);
        if (findItem) {
            warehouse.forEach(async(item)=>{
            if (item.name === name) {
                item.amount += amount;
                await fs.writeFile(path,JSON.stringify(warehouse, null,2));
                res.end('Successfully renewed')
            } })
        } else {
            await fs.writeFile(path, JSON.stringify(warehouse.length? [...warehouse,{name,amount}]: [{name,amount}],null,2));
            res.end('Successfully added')
        }
        })
    }
} 
).listen(4001, () => {
    console.log(4001);
})