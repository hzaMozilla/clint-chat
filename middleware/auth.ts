import config from 'config';
import jwt from 'jsonwebtoken';

export default function(req: any, res:any, next:any) {
    // Get token from header
    const token = req.header('x-auth-token');
    // tokn校验，没有携带token则返回404
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    // 确认token是否正确，不正确则抛出异常
    try {
        jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Token is not valid' });
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } catch (err) {
        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });
    }
}
