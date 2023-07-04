const express = require('express');
const stuff = require('openai');
const app = express();
const port = 3000;

const {Configuration, OpenAIApi} = stuff;
const configuration = new Configuration({
	organization: 'org-LvUugZFjVqpgsMejyUdcR5IE',
	apiKey: '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', //process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function test() {
	const completion = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [
			{role: 'system', content: 'You are a helpful assistant.'},
			{role: 'user', content: 'Hello world'},
		],
	});
	return completion;
}

app.get('/', (req, res) => {
	const completion = test();
	res.send(completion.data); //.choices[0].message)
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
