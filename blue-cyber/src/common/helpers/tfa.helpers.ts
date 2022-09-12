import speakeasy from "speakeasy";
import express from "express";

class TOTP {
  async createSecret(): Promise<string> {
    const secret = await speakeasy.generateSecret();
    console.log(secret);

    return secret.base32;
  }
  async validateToken(token: string, secret: string) {
    const tokenValidate = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
      window: 1, // time window
    });
    return tokenValidate;
  }
}

export default new TOTP();

const totp = new TOTP();
