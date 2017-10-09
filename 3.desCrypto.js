const crypto = require('crypto')

const algorithm = 'des'
// const algorithm = 'des3'
const text = '道德良心做食品'
const key = 'timnity'

console.log(`\n----- crypto.getCiphers() = ${crypto.getCiphers()} -----\n`)

// DES 加密
function encrypt (text, key) {
  const cipher = crypto.createCipher(algorithm, key)
  let crypted = cipher.update(text, 'uft8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

// DES 解密
function decrypt (text, key) {
  const decipher = crypto.createDecipher(algorithm, key)
  let decrypted = decipher.update(text, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

const encryptText = encrypt(text, key)
console.log(`\n----- 加密后的数据： = ${encryptText} -----\n`)

const decryptText = decrypt(encryptText, key)
console.log(`\n----- 解密后的数据： = ${decryptText} -----\n`)
