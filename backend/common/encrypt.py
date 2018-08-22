from common import privateKey
import rsa


def rsa_long_decrypt(priv_key_str, msg, length=128):
    """
    1024bit的证书用128，2048bit证书用256位
    """
    privobj = rsa.PrivateKey.load_pkcs1(privateKey)
    res = []
    for i in range(0, len(msg), length):
        res.append(bytes.decode(rsa.decrypt(msg[i:i + length], privobj)))
    return "".join(res)