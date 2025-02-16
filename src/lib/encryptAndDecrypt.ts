import crypto from "crypto";

const encrypt = (text: string) : string => {    
    const AES_SECRET = process.env.NEXT_PUBLIC_AES_SECRET as string;

    if (!AES_SECRET) {
        throw new Error(
            "NEXT_PUBLIC_AES_SECRET is not defined in the environment variables."
        );
    }
    
    const cipher = crypto.createCipheriv(
        "aes-256-ctr",
        Buffer.from(AES_SECRET),
        Buffer.alloc(16, 0)
    );
    const encryptedText =
        cipher.update(text, "utf8", "hex") + cipher.final("hex");
    return encryptedText;
};

const decrypt = (encryptedText: string): string => {
    const AES_SECRET = process.env.NEXT_PUBLIC_AES_SECRET as string;

    if (!AES_SECRET) {
        throw new Error(
            "NEXT_PUBLIC_AES_SECRET is not defined in the environment variables."
        );
    }

    const decipher = crypto.createDecipheriv(
        "aes-256-ctr",
        Buffer.from(AES_SECRET, "utf8"),
        Buffer.alloc(16, 0)
    );

    const decryptedText =
        decipher.update(encryptedText, "hex", "utf8") +
        decipher.final("utf8");

    return decryptedText;
};

export { encrypt, decrypt};
