import { IOutputEntry } from "@/app/types"
import axios from "axios"
axios.defaults.baseURL = "http://localhost:3100"

export async function getIndex(): Promise<any> {
	try {
		const response = await axios.get("/", {})
		return response
	} catch (error) {
		console.error(error)
	}
}

export async function postPromptInput(entry: IOutputEntry): Promise<any> {
	try {
		const response = await axios.post("/", {
			data: entry,
		})
		console.log(response)
		return response.data
	} catch (error) {
		console.error(error)
	}
}
