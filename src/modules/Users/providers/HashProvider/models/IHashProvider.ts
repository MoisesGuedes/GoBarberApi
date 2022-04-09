export default interface IHashProvider {
    generateHash(playload: string): Promise<string>;
    compareHash(payload: string, hashed: string): Promise<boolean>;
}
