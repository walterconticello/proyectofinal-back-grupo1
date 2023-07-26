import mongoose from "mongoose"

export const connect = async (req, res) => {
	try {
		await mongoose.connect(process.env.MONGO)
		console.log("Conectado a la base de datos")
	} catch (err) {
		throw err
	} 
}

mongoose.connection.on("disconnected", () => {
	console.log("MongoDB esta desconectado")
}
)

export default connect