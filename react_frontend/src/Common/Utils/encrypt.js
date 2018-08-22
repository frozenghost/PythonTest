
import { JSEncrypt } from 'jsencrypt';

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDQwMs+PkWu9KFfLTZa/Y9IyWnlqc62+d/ZNetDGeVNTW9aDgvcJ0SHvGacJro5TCiVxT5mu0wHgnLlovVY8Q5+TXyPgRbVN1s1m1uN7UcscNCT6FSB8D66Ie5LODvUx7bZrbxw73wQ711elzD02JVcfRX1jhvmNDM9Mtyh5V88OwIDAQAB';

export default function encryptData(data) {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    var k = encrypt.getKey();
    var maxLength = 117;

    var lt = "";
    var result = "";

    if (data.length > maxLength) {
        lt = data.match(/.{1,117}/g);
        lt.array.forEach(element => {
            result += encrypt.encrypt(element).toString('base64');
        });
    }

    result = encrypt.encrypt(data).toString('base64');


    return result;
}