import './App.css'
import { Form } from './Form'

//test commit
const nodeSchema = {
	nodes: [
		{
			key: String, // UNIQUE

			// DEFAULT = 'text': 'email' || 'password' || 'text' || 'number' || 'date' || 'button' || 'group' || 'slider'
			type: String,

			label: String, // DEFAULT = key

			// ADDITION: for 'group'
			children: Array, // REQUIRED: specify children node of group
			childrenType: String, // || 'checkbox' || 'radio' || 'select'

			// ADDITION: for 'button'
			click: String, // DEFAULT = 'button': 'button' || 'submit' || 'reset'

			// UI attributes. Must initialize = {} at least
			ui: {
				width: Number, // min = 1 - max = 12
				variant: String, // 'contained' 'outlined' 'text',
				margin: Number,
				padding: Number,
				// ...
			},
			validate: {
				minLength: Number,
				maxLength: Number,
				required: Boolean, // DEFAULT: false (exclude 'button', 'radio', 'select')
			},
		},
	],
}

const sampleNodes = [
	{
		key: 'text',
		type: 'text',
		ui: {
			width: 8,
			margin: 1,
		},
	},
	{
		key: 'password',
		type: 'password',
		ui: {
			variant: 'filled',
			margin: 1,
		},
	},
	{
		key: 'radioGroup',
		type: 'group',
		label: 'radio',
		ui: {
			margin: 1,
			width: 6,
		},
		childrenType: 'radio',
		children: [
			{
				key: 'radioMale',
				label: 'Male',
			},
			{
				key: 'radioFemale',
				label: 'Female',
			},
		],
	},
	{
		key: 'checkboxGroup',
		type: 'group',
		label: 'checkbox',
		childrenType: 'checkbox',
		ui: {
			margin: 1,
			width: 6,
		},
		children: [
			{
				key: 'checkboxMale',
				label: 'Male',
			},
			{
				key: 'checkboxFemale',
				label: 'Female',
			},
		],
	},
	{
		key: 'selectGroup',
		type: 'group',
		label: 'Select',
		childrenType: 'select',
		ui: {
			margin: 1,
		},
		children: [
			{
				key: 'selectMale',
				label: 'Male',
			},
			{
				key: 'selectFemale',
				label: 'Female',
			},
		],
	},
	{
		key: 'date',
		type: 'date',
		ui: {
			margin: 1,
		},
	},
	{
		key: 'slider',
		type: 'slider',
		ui: {
			margin: 1,
		},
	},
	{
		key: 'button',
		type: 'button',
		click: 'submit',
		ui: {
			width: 12,
			variant: 'contained',
			margin: 1,
		},
	},
]

const validate = (values) => {
	const errors = {}
	return errors
}

function App() {
	return (
		<div className='App'>
			<Form nodes={sampleNodes} validate={validate} />
		</div>
	)
}

export default App
