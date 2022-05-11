import {
	Button,
	FormControl,
	Grid,
	TextField,
	FormLabel,
	Radio,
	RadioGroup,
	FormControlLabel,
	Container,
	Slider,
	InputLabel,
	Select,
	MenuItem,
	FormGroup,
	Checkbox,
	Autocomplete,
} from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

const yup = (node) => {
	try {
		switch (node.validate.returnType) {
			case 'string':
				return node.validate.required
					? Yup.string()
							.min(node.validate.min || 0)
							.max(node.validate.max || 10000)
							.matches(node.validate.matches || /[\s\S]*/, 'Not match!')
							.required()
					: Yup.string()
							.min(node.validate.min || 0)
							.max(node.validate.max || 10000)
							.matches(node.validate.matches || /[\s\S]*/, 'Not match!')
			case 'number':
				return node.validate.required
					? Yup.number()
							.min(node.validate.min || 0)
							.max(node.validate.max || 10000)
							.required()
					: Yup.string()
							.min(node.validate.min || 0)
							.max(node.validate.max || 10000)
			case 'bool':
				return node.validate.required ? Yup.bool().required() : Yup.bool()
			case 'array':
				return node.validate.required
					? Yup.array()
							.min(node.validate.min || 0)
							.max(node.validate.max || 10000)
							.required()
					: Yup.array()
							.min(node.validate.min || 0)
							.max(node.validate.max || 10000)
			case 'date':
				return node.validate.required ? Yup.date().required() : Yup.date()
			case 'object':
				return node.validate.required ? Yup.object().required() : Yup.object()
			default:
				break
		}
	} catch (error) {}
}

const initialize = (nodes) => {
	let initialValues = {}
	let shape = {}
	for (const node of nodes) {
		if (node.childrenType === 'checkbox' || node.type === 'autocomplete') {
			initialValues[node.key] = []
		} else if (node.type === 'slider') {
			initialValues[node.key] = 0
		} else {
			initialValues[node.key] = ''
		}
		shape[node.key] = yup(node)
	}
	return { initialValues, shape }
}

export const Form = ({ nodes }) => {
	const { initialValues, shape } = initialize(nodes)
	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object().shape(shape),
		onSubmit: (values) => {
			console.log(Date(), values)
		},
	})
	return (
		<Container maxWidth='md'>
			<form onSubmit={formik.handleSubmit}>
				<Grid key='container' container>
					{nodes.map((node) => {
						switch (node.type) {
							case 'button':
								return (
									<Grid key={'gridItem' + node.key} item sm={node.ui.width || 12}>
										<Button
											sx={{ m: node.ui.margin, p: node.ui.padding }}
											id={node.key}
											type={node.click || 'button'}
											variant={node.ui.variant || 'contained'}
											fullWidth={true}
										>
											{node.label || node.key}
										</Button>
									</Grid>
								)
							case 'group':
								return (
									<Grid key={'gridItem' + node.key} item sm={node.ui.width || 12}>
										{node.childrenType === 'select' ? (
											<FormControl fullWidth sx={{ m: node.ui.margin, p: node.ui.padding }}>
												<InputLabel>{node.label || node.key}</InputLabel>
												<Select
													id={node.key}
													name={node.key}
													value={formik.values[`${node.key}`] || ''}
													label={node.label || node.key}
													onChange={formik.handleChange}
												>
													{node.children.map((child) => (
														<MenuItem key={child.key} value={child.key}>
															{child.label || child.key}
														</MenuItem>
													))}
												</Select>
												{formik.errors[`${node.key}`] ? <div>{formik.errors[`${node.key}`]}</div> : null}
											</FormControl>
										) : (
											<FormControl fullWidth sx={{ m: node.ui.margin, p: node.ui.padding }}>
												<FormLabel>{node.label || node.key}</FormLabel>
												{node.childrenType === 'radio' ? (
													<RadioGroup name={node.key} onChange={formik.handleChange}>
														{node.children.map((child) => {
															return (
																<FormControlLabel
																	key={child.key}
																	value={child.key}
																	control={<Radio />}
																	label={child.label || child.key}
																/>
															)
														})}
													</RadioGroup>
												) : (
													<FormGroup>
														{node.children.map((child) => (
															<FormControlLabel
																key={child.key}
																name={child.key}
																control={
																	<Checkbox
																		onClick={() => {
																			const index = formik.initialValues[`${node.key}`].findIndex(
																				(result) => result === child.key
																			)
																			if (index === -1) {
																				formik.initialValues[`${node.key}`].push(child.key)
																			} else {
																				formik.initialValues[`${node.key}`].splice(index, 1)
																			}
																		}}
																	/>
																}
																label={child.label || child.key}
															/>
														))}
													</FormGroup>
												)}
												{formik.errors[`${node.key}`] ? <div>{formik.errors[`${node.key}`]}</div> : null}
											</FormControl>
										)}
									</Grid>
								)
							case 'slider':
								return (
									<Grid key={'gridItem' + node.key} item sm={node.ui.width || 12}>
										{node.label || node.key}
										<Slider
											id={node.key}
											key={node.key}
											name={node.key}
											value={parseInt(formik.values[`${node.key}`])}
											onChange={formik.handleChange}
											sx={{ m: node.ui.margin, p: node.ui.padding }}
										/>
									</Grid>
								)
							case 'autocomplete': {
								return node.multiple ? (
									<Grid key={'gridItem' + node.key} item sm={node.ui.width || 12}>
										<Autocomplete
											multiple
											options={node.options}
											disableCloseOnSelect
											getOptionLabel={(option) => option.label}
											renderOption={(props, option, { selected }) => (
												<li {...props}>
													<Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
													{option.label}
												</li>
											)}
											renderInput={(params) => <TextField {...params} label={node.label || node.key} />}
										/>
									</Grid>
								) : (
									<Grid key={'gridItem' + node.key} item sm={node.ui.width || 12}>
										<Autocomplete
											disablePortal
											options={node.options}
											renderInput={(params) => <TextField {...params} label={node.label || node.label} />}
										/>
									</Grid>
								)
							}
							case 'date':
								return (
									<Grid key={'gridItem' + node.key} item sm={node.ui.width || 12}>
										<TextField
											id={node.key}
											label={node.label || node.key}
											fullWidth={true}
											onChange={formik.handleChange}
											value={formik.values[`${node.key}`]}
											type={node.type}
											variant={node.ui.variant}
											InputLabelProps={{
												shrink: true,
											}}
											sx={{ m: node.ui.margin, p: node.ui.padding }}
										/>
										{formik.errors[`${node.key}`] ? <div>{formik.errors[`${node.key}`]}</div> : null}
									</Grid>
								)
							default:
								return (
									<Grid key={'gridItem' + node.key} item sm={node.ui.width || 12}>
										<TextField
											id={node.key}
											label={node.label || node.key}
											fullWidth={true}
											onChange={formik.handleChange}
											value={formik.values[`${node.key}`]}
											type={node.type}
											variant={node.ui.variant}
											sx={{ m: node.ui.margin, p: node.ui.padding }}
										/>
										{formik.errors[`${node.key}`] ? <div>{formik.errors[`${node.key}`]}</div> : null}
									</Grid>
								)
						}
					})}
				</Grid>
			</form>
		</Container>
	)
}
