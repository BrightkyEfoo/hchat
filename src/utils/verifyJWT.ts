import { verify } from "jsonwebtoken"

export default function(tokenInput: string) {
    try {
        const token = tokenInput.startsWith('Bearer ') ? tokenInput.split(' ')[1] : tokenInput
        const private_key = process.env.PRIVATE_KEY;
    
        return {isValid : true as const, data : verify(token, private_key || "")}
    } catch (error) {
        return {isValid : false, data : null} as const
    }
}