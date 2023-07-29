import fs from 'node:fs/promises'

async function ocr(img){
  const data = new Buffer(img).toString('base64');
  const result = (await fetch('http://localhost:3001/ocr/character', {
    method: 'POST',
    body: JSON.stringify({image: data}),
    headers: {
      'Content-Type': 'application/json'
    }
  })).json()

  return result
}

async function main(){
  const files = await fs.readdir('./img')

  for (const file of files) {
    const img = await fs.readFile(`./img/${file}`)
    const result = await ocr(img)
    console.log(result)
  }
}

main();