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
        res.end(JSON.stringify(warehouse.filter(n => n.amount > 0)));
    } else if (req.url = '/' && req.method === 'POST') {
        req.on('data', async (data) => {
        const {name,amount} = JSON.parse(data);
        if (!name || !amount) {
            return res.end('Name or Amount was not entered')
        }
        const findItem = warehouse.find((item) => item.name === name);
        if (findItem) {
            if (findItem.amount + amount < 0) {
                return res.end(`There are only ${findItem.amount}`)
            }
                findItem.amount += amount;
                await fs.writeFile(path,JSON.stringify(warehouse, null,2));
                res.end('Successfully renewed')
        } else {
            const id = (warehouse[warehouse.length - 1]?.id || 0) + 1;
            warehouse.push({
                id,
                name,
                amount,
            })
            await fs.writeFile(path, JSON.stringify(warehouse,null,2));
            res.end('Successfully added')
        }
        })
    }
} 
).listen(4001, () => {
    console.log(4001);
})