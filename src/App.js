import './App.css'
import { Form } from './Form'

const nodeSchema = {
	nodes: [
		{
			key: String, // UNIQUE
			type: String, // DEFAULT = 'text': 'email' || 'password' || 'text' || 'number' || 'date' || 'button' || 'group' || 'slider'
			label: String, // DEFAULT = key

			// ADDITION: for 'group'
			children: Array, // REQUIRED: specify children node of group
			childrenType: String, // REQUIRED: 'checkbox' || 'radio' || 'select'

			// ADDITION: for 'button'
			click: String, // DEFAULT = 'button': 'button' || 'submit' || 'reset'

			// UI attributes. Must initialize {} at least
			ui: {
				width: Number, // min = 1 - max = 12
				variant: String, // 'contained' 'outlined' 'text',
				margin: Number,
				padding: Number,
				// ...
			},

			// Validation
			validate: {
				returnType: String, // 'string', 'number', 'boolean', 'date', 'array', 'object'
				required: Boolean, // DEFAULT: false (exclude 'button', 'radio', 'select')
				min: Number,
				max: Number,
				matches: RegExp, // for 'string'
			},
		},
	],
}

const sampleNodes = [
	{
		key: 'text',
		type: 'text',
		label: 'Username',
		ui: {
			margin: 1,
		},
		validate: {
			returnType: 'string',
			min: 3,
			matches: /^[\w-.]+@([\w-]+\.)+[\w-]/,
		},
	},
	{
		key: 'password',
		type: 'password',
		ui: {
			variant: 'filled',
			margin: 1,
		},
		validate: {
			returnType: 'string',
			min: 3,
		},
	},
	{
		key: 'radioGroup',
		type: 'group',
		label: 'Gender',
		ui: {
			margin: 1,
			width: 6,
		},
		childrenType: 'radio',
		children: [
			{
				key: 'radio1',
				label: 'Male',
			},
			{
				key: 'radio2',
				label: 'Female',
			},
		],
		validate: {
			returnType: 'string',
			required: true,
		},
	},
	{
		key: 'checkboxGroup',
		type: 'group',
		label: 'Fav.',
		childrenType: 'checkbox',
		ui: {
			margin: 1,
			width: 6,
		},
		children: [
			{
				key: 'checkbox1',
				label: 'Football',
			},
			{
				key: 'checkbox2',
				label: 'Badminton',
			},
		],
		validate: {
			returnType: 'array',
			max: 1,
		},
	},
	{
		key: 'selectGroup',
		type: 'group',
		label: 'Year',
		childrenType: 'select',
		ui: {
			margin: 1,
		},
		children: [
			{
				key: 'select1',
				label: '2022',
			},
			{
				key: 'select2',
				label: '2021',
			},
		],
	},
	{
		key: 'date',
		type: 'date',
		ui: {
			margin: 1,
		},
		validate: {
			returnType: 'date',
		},
	},
	{
		key: 'slider',
		type: 'slider',
		label: 'Slider',
		ui: {
			margin: 1,
		},
	},
	{
		key: 'button',
		type: 'button',
		click: 'submit',
		label: 'login',
		ui: {
			width: 12,
			margin: 1,
		},
	},
]

function App() {
	return (
		<div className='App'>
			<Form nodes={sampleNodes} />
		</div>
	)
}

export default App
