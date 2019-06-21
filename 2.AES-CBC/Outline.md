#### AES-CBC 加解密

CBC 相对 ECB 安全一些。主要是因为 CBC 可以多传入一个偏移量。

```
const cipher = forge.cipher.createCipher('AES-CBC', key);
cipher.start({iv: iv});
cipher.update(input);
cipher.finish();
```
这里的 iv 就是一个偏移量。input 就是需要加密的 password 等内容。

[AES-CBC 加解密样例代码](https://github.com/timnity/CryptoExample/2.AES-CBC/AES-CBC.js)

##### AES-ECB 的 Java 端解密
```
try {
    Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
    cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec("这里是16字节密钥".getBytes(), "AES"), new IvParameterSpec("这里是16字节偏移量".getBytes()));
    String plaintext = new String(cipher.doFinal(Base64.getDecoder().decode("这里是明文".getBytes())), "UTF-8");
    System.out.println(plaintext);
} catch (Exception e) {
    System.out.println("解密出错：" + e.toString());
}
```
跟 ECB 解密时几乎一样，只是增加了一个 `IvParameterSpec`，用来生成 iv。