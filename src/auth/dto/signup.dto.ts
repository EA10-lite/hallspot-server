import { SignInDTO } from "./signin.dto";

export class SignUpDTO extends SignInDTO {
    name: string;
    role: 'USER' | 'AGENT';   
}