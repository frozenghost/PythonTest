from common import privateKey
import rsa


def rsa_long_decrypt(priv_key_str, msg, length=128):
    """rsa私钥加密，1024bit的证书用128，2048bit证书用256位
    
    Arguments:
        priv_key_str {str} -- 私钥pem中的内容
        msg {str} -- 需要加密的信息
    
    Keyword Arguments:
        length {int} -- 加密长度 (default: {128})
    
    Returns:
        str -- 加密后的字符串
    """

    privobj = rsa.PrivateKey.load_pkcs1(privateKey)
    res = []
    for i in range(0, len(msg), length):
        res.append(bytes.decode(rsa.decrypt(msg[i:i + length], privobj)))
    return "".join(res)