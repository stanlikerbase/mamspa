import jwt from 'jsonwebtoken'
import SessionMamba from '../models/Session.js'

export default async (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

	if (token) {
		try {
			const decoded = jwt.verify(token, 'secretTextForJWT')

			// Проверяем, существует ли сессия с данным токеном
			const session = await SessionMamba.findOne({ token })
			if (!session) {
				// Если сессия не найдена, токен недействителен
				return res.status(403).json({
					message: 'Сессия не найдена или истекла. Пожалуйста, войдите заново.',
				})
			}

			// Если сессия существует, добавляем информацию о пользователе в объект запроса
			req.userId = decoded._id

			next()
		} catch (error) {
			// Этот блок catch отлавливает ошибки, связанные с невалидностью токена
			return res.status(403).json({
				message: 'Нет доступа. Токен недействителен.',
			})
		}
	} else {
		return res.status(403).json({
			message: 'Нет доступа. Токен не предоставлен.',
		})
	}
}
