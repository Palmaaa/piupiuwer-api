export default interface IEmailProvider {
    sendEmail(email: string, user_id: string): Promise<string>;
}