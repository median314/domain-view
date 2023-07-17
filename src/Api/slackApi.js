// import axios from "axios"
// const url = process.env.REACT_APP_SLACK

let json = {
	channel:'#general',
	username:'webhookBot',
	text:'this is the text',
	icon_emoji:':ghost:'
}

export const errorSlack = async(error)=>{
	json.text=error
	// axios.post(url,
	// `payload=${JSON.stringify(json)}` )
}

export const loginSlack=async(data)=>{
	json.text=`${data} loggedin ${new Date()}`
	json.channel='#login'
	json.icon_emoji=':wave:'

	// axios.post(url,
	// 	`payload=${JSON.stringify(json)}` )

}

export const logoutSlack=async(data)=>{

	json.text=`${data} loggedout ${new Date()}`
	json.channel='#logout'
	json.icon_emoji=':wave:'

	// axios.post(url,
	// 	`payload=${JSON.stringify(json)}` )

}