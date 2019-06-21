#### AES-ECB 加解密

ECB(ee cc block)模式，是 AES 所有模式中最简单也最不被推荐的一种模式，它的固定明文对应的是固定密文，很容易被破解。此处以 ECB 模式入门作为了解 AES 加解密的练习。

注意几个参数：

1. **填充**：常用的是 `pkcs` 标准的 `pkcs7padding`。
2. **数据块**：选择 `128` 位，原因是 Java 端解密算法只支持 `AES128`。
3. **密钥**：随意填一个，不同项目建议用不同的密钥。
4. **偏移量**：ECB 模式没有偏移量。

##### AES-ECB 的 JavaScript 端加密
JavaScript 的加密库选择是个难点，[aes-js](https://github.com/ricmoo/aes-js) 这个库不支持 `RSA` 算法，[Web Crypto API]是浏览器自带的加密 API 库，原生支持 `AES` 和 `RSA`，但它的 `RSA` 和 `Java` 的还不兼容。所以选择 [node-forge](https://github.com/digitalbazaar/forge/)。


[AES-ECB 加解密样例代码](https://github.com/timnity/CryptoExample/1.AES-ECB/AES-ECB.js)

##### AES-ECB 的 Java 端解密
```
try {
    Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
    cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec("这里是16字节密钥".getBytes(), "AES"));
    String plaintext = new String(cipher.doFinal(Base64.getDecoder().decode("这里是明文".getBytes())), "UTF-8");
    System.out.println(plaintext);
} catch (Exception e) {
    System.out.println("解密出错：" + e.toString());
}
```
注意，这里用到的是 `PKCS5Padding`，而 `forge` 的 AES-ECB 是默认 `pkcs7padding`。这是因为……Java 端的工程师命名错误……实际实现的是 pkcs7
，所以在 Java 端用 5 就对了。

    pkcs 的全称是 Public Key Cryptography Standards（公钥加密标准），在这里我们是用它们来做填充，而 5 是 7 的一个子集。pkcs5 是 8 字节固定的，而 pcks7 可以是 1~255 任意字节。