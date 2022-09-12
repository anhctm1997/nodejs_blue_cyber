import crypto from "crypto";
import util from "util";
class Chacha20 {
  private randomBytes = util.promisify(crypto.randomBytes);
  public async encrypt(key: string, plaintext: string) {
    const iv = await this.randomBytes(12);
    const cipher = crypto.createCipheriv("chacha20-poly1305", key, iv, {
      authTagLength: 16,
    });
    const encrypted = Buffer.concat([
      cipher.update(plaintext, "utf-8"),
      cipher.final(),
    ]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([iv, tag, encrypted]);
  }
  public async decrypt(key: string, encrypted: string): Promise<string> {
    const iv = encrypted.slice(0, 12);
    const tag = encrypted.slice(12, 28);
    const tagBuffer = Buffer.from(tag);
    const cipherText = encrypted.slice(28);
    const decipher = crypto.createDecipheriv("chacha20-poly1305", key, iv, {
      authTagLength: 16,
    });
    decipher.setAuthTag(tagBuffer);
    const decrypted = Buffer.concat([
      decipher.update(cipherText, "utf-8"),
      decipher.final(),
    ]);
    return decrypted.toString("utf-8");
  }
}

export default new Chacha20();
